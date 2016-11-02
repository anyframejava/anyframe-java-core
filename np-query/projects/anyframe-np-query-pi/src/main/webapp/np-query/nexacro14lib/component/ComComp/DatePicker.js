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

if (!nexacro.DatePicker) {
	nexacro.DatePicker_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}

		this.ncpadding = null;
		this.usetrailingday = null;
		this.headerformat = null;
		this.weekformat = null;
		this.viewyearspin = null;
		this.viewmonthspin = null;
		this.accessibility = null;

		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;

		this.headerheight = null;
		this.headercolor = null;
		this.headerbackground = null;
		this.headergradation = null;
		this.headerbordertype = null;
		this.headerborder = null;
		this.headerfont = null;

		this.bodybackground = null;
		this.bodygradation = null;
		this.bodybordertype = null;
		this.bodyborder = null;

		this.weekcolor = null;
		this.weekbackground = null;
		this.weekgradation = null;
		this.weekfont = null;

		this.todaybackground = null;
		this.todaygradation = null;
		this.todayborder = null;
		this.todaybordertype = null;
		this.todaycolor = null;
		this.todayfont = null;

		this.saturdaybackground = null;
		this.saturdaygradation = null;
		this.saturdayborder = null;
		this.saturdaybordertype = null;
		this.saturdaycolor = null;
		this.saturdayfont = null;

		this.sundaybackground = null;
		this.sundaygradation = null;
		this.sundayborder = null;
		this.sundaybordertype = null;
		this.sundaycolor = null;
		this.sundayfont = null;

		this.trailingdaybackground = null;
		this.trailingdaygradation = null;
		this.trailingdayborder = null;
		this.trailingdaybordertype = null;
		this.trailingdaycolor = null;
		this.trailingdayfont = null;
	};

	var _pDatePickerStyle = nexacro._createPrototype(nexacro.Style, nexacro.DatePicker_Style);
	nexacro.DatePicker_Style.prototype = _pDatePickerStyle;

	eval(nexacro._createPaddingAttributeEvalStr("_pDatePickerStyle", "ncpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "usetrailingday"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "headerformat"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "weekformat"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "daysize"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "daycolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "daybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "daygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "dayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "daybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "dayfont"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "headerheight"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "headercolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "headerbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "headergradation"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "headerbordertype"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "headerborder"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "headerfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "bodybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "bodygradation"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "bodybordertype"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "bodyborder"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "weekcolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "weekbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "weekgradation"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "weekfont"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "saturdaycolor"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "sundaycolor"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "todaycolor"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerStyle", "trailingdaycolor"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "viewyearspin"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerStyle", "viewmonthspin"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "todaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "todaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "todayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "todaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "todayfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "saturdaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "saturdaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "saturdayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "saturdaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "saturdayfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "sundaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "sundaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "sundayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "sundaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "sundayfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerStyle", "trailingdaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerStyle", "trailingdaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerStyle", "trailingdayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerStyle", "trailingdaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerStyle", "trailingdayfont"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pDatePickerStyle", "accessibility"));

	_pDatePickerStyle.__custom_emptyObject = function () {
		this.ncpadding = null;
		this.usetrailingday = null;
		this.headerformat = null;
		this.weekformat = null;
		this.viewyearspin = null;
		this.viewmonthspin = null;
		this.accessibility = null;

		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;

		this.headerheight = null;
		this.headercolor = null;
		this.headerbackground = null;
		this.headergradation = null;
		this.headerbordertype = null;
		this.headerborder = null;
		this.headerfont = null;

		this.bodybackground = null;
		this.bodygradation = null;
		this.bodybordertype = null;
		this.bodyborder = null;

		this.weekcolor = null;
		this.weekbackground = null;
		this.weekgradation = null;
		this.weekfont = null;

		this.todaybackground = null;
		this.todaygradation = null;
		this.todayborder = null;
		this.todaybordertype = null;
		this.todaycolor = null;
		this.todayfont = null;

		this.saturdaybackground = null;
		this.saturdaygradation = null;
		this.saturdayborder = null;
		this.saturdaybordertype = null;
		this.saturdaycolor = null;
		this.saturdayfont = null;

		this.sundaybackground = null;
		this.sundaygradation = null;
		this.sundayborder = null;
		this.sundaybordertype = null;
		this.sundaycolor = null;
		this.sundayfont = null;

		this.trailingdaybackground = null;
		this.trailingdaygradation = null;
		this.trailingdayborder = null;
		this.trailingdaybordertype = null;
		this.trailingdaycolor = null;
		this.trailingdayfont = null;
	};

	_pDatePickerStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.ncpadding && !this.ncpadding._is_empty) {
			val += "ncpadding:" + this.ncpadding._value + "; ";
		}
		if (this.usetrailingday && !this.usetrailingday._is_empty) {
			val += "usetrailingday:" + this.usetrailingday._value + "; ";
		}
		if (this.headerformat && !this.headerformat._is_empty) {
			val += "headerformat:" + this.headerformat._value + "; ";
		}
		if (this.weekformat && !this.weekformat._is_empty) {
			val += "weekformat:" + this.weekformat._value + "; ";
		}
		if (this.daysize && !this.daysize._is_empty) {
			val += "daysize:" + this.daysize._value + "; ";
		}
		if (this.daycolor && !this.daycolor._is_empty) {
			val += "daycolor:" + this.daycolor._value + "; ";
		}
		if (this.daybackground && !this.daybackground._is_empty) {
			val += "daybackground:" + this.daybackground._value + "; ";
		}
		if (this.daygradation && !this.daygradation._is_empty) {
			val += "daygradation:" + this.daygradation._value + "; ";
		}
		if (this.dayborder && !this.dayborder._is_empty) {
			val += "dayborder:" + this.dayborder._value + "; ";
		}
		if (this.daybordertype && !this.daybordertype._is_empty) {
			val += "daybordertype:" + this.daybordertype._value + "; ";
		}
		if (this.dayfont && !this.dayfont._is_empty) {
			val += "dayfont:" + this.dayfont._value + "; ";
		}
		if (this.headerheight && !this.headerheight._is_empty) {
			val += "headerheight:" + this.headerheight._value + "; ";
		}
		if (this.headercolor && !this.headercolor._is_empty) {
			val += "headercolor:" + this.headercolor._value + "; ";
		}
		if (this.headerbackground && !this.headerbackground._is_empty) {
			val += "headerbackground:" + this.headerbackground._value + "; ";
		}
		if (this.headergradation && !this.headergradation._is_empty) {
			val += "headergradation:" + this.headergradation._value + "; ";
		}
		if (this.headerbordertype && !this.headerbordertype._is_empty) {
			val += "headerbordertype:" + this.headerbordertype._value + "; ";
		}
		if (this.headerborder && !this.headerborder._is_empty) {
			val += "headerborder:" + this.headerborder._value + "; ";
		}
		if (this.headerfont && !this.headerfont._is_empty) {
			val += "headerfont:" + this.headerfont._value + "; ";
		}
		if (this.bodybackground && !this.bodybackground._is_empty) {
			val += "bodybackground:" + this.bodybackground._value + "; ";
		}
		if (this.bodygradation && !this.bodygradation._is_empty) {
			val += "bodygradation:" + this.bodygradation._value + "; ";
		}
		if (this.bodybordertype && !this.bodybordertype._is_empty) {
			val += "bodybordertype:" + this.bodybordertype._value + "; ";
		}
		if (this.bodyborder && !this.bodyborder._is_empty) {
			val += "bodyborder:" + this.bodyborder._value + "; ";
		}
		if (this.weekcolor && !this.weekcolor._is_empty) {
			val += "weekcolor:" + this.weekcolor._value + "; ";
		}
		if (this.weekbackground && !this.weekbackground._is_empty) {
			val += "weekbackground:" + this.weekbackground._value + "; ";
		}
		if (this.weekgradation && !this.weekgradation._is_empty) {
			val += "weekgradation:" + this.weekgradation._value + "; ";
		}
		if (this.weekfont && !this.weekfont._is_empty) {
			val += "weekfont:" + this.weekfont._value + "; ";
		}
		if (this.saturdaycolor && !this.saturdaycolor._is_empty) {
			val += "saturdaycolor:" + this.saturdaycolor._value + "; ";
		}
		if (this.sundaycolor && !this.sundaycolor._is_empty) {
			val += "sundaycolor:" + this.sundaycolor._value + "; ";
		}
		if (this.todaycolor && !this.todaycolor._is_empty) {
			val += "todaycolor:" + this.todaycolor._value + "; ";
		}
		if (this.trailingdaycolor && !this.trailingdaycolor._is_empty) {
			val += "trailingdaycolor:" + this.trailingdaycolor._value + "; ";
		}
		if (this.viewyearspin && !this.viewyearspin._is_empty) {
			val += "viewyearspin:" + this.viewyearspin._value + "; ";
		}
		if (this.viewmonthspin && !this.viewmonthspin._is_empty) {
			val += "viewmonthspin:" + this.viewmonthspin._value + "; ";
		}
		if (this.todaybackground && !this.todaybackground._is_empty) {
			val += "todaybackground:" + this.todaybackground._value + "; ";
		}
		if (this.todaygradation && !this.todaygradation._is_empty) {
			val += "todaygradation:" + this.todaygradation._value + "; ";
		}
		if (this.todayborder && !this.todayborder._is_empty) {
			val += "todayborder:" + this.todayborder._value + "; ";
		}
		if (this.todaybordertype && !this.todaybordertype._is_empty) {
			val += "todaybordertype:" + this.todaybordertype._value + "; ";
		}
		if (this.todayfont && !this.todayfont._is_empty) {
			val += "todayfont:" + this.todayfont._value + "; ";
		}
		if (this.saturdaybackground && !this.saturdaybackground._is_empty) {
			val += "saturdaybackground:" + this.saturdaybackground._value + "; ";
		}
		if (this.saturdaygradation && !this.saturdaygradation._is_empty) {
			val += "saturdaygradation:" + this.saturdaygradation._value + "; ";
		}
		if (this.saturdayborder && !this.saturdayborder._is_empty) {
			val += "saturdayborder:" + this.saturdayborder._value + "; ";
		}
		if (this.saturdaybordertype && !this.saturdaybordertype._is_empty) {
			val += "saturdaybordertype:" + this.saturdaybordertype._value + "; ";
		}
		if (this.saturdayfont && !this.saturdayfont._is_empty) {
			val += "saturdayfont:" + this.saturdayfont._value + "; ";
		}
		if (this.sundaybackground && !this.sundaybackground._is_empty) {
			val += "sundaybackground:" + this.sundaybackground._value + "; ";
		}
		if (this.sundaygradation && !this.sundaygradation._is_empty) {
			val += "sundaygradation:" + this.sundaygradation._value + "; ";
		}
		if (this.sundayborder && !this.sundayborder._is_empty) {
			val += "sundayborder:" + this.sundayborder._value + "; ";
		}
		if (this.sundaybordertype && !this.sundaybordertype._is_empty) {
			val += "sundaybordertype:" + this.sundaybordertype._value + "; ";
		}
		if (this.sundayfont && !this.sundayfont._is_empty) {
			val += "sundayfont:" + this.sundayfont._value + "; ";
		}
		if (this.trailingdaybackground && !this.trailingdaybackground._is_empty) {
			val += "trailingdaybackground:" + this.trailingdaybackground._value + "; ";
		}
		if (this.trailingdaygradation && !this.trailingdaygradation._is_empty) {
			val += "trailingdaygradation:" + this.trailingdaygradation._value + "; ";
		}
		if (this.trailingdayborder && !this.trailingdayborder._is_empty) {
			val += "trailingdayborder:" + this.trailingdayborder._value + "; ";
		}
		if (this.trailingdaybordertype && !this.trailingdaybordertype._is_empty) {
			val += "trailingdaybordertype:" + this.trailingdaybordertype._value + "; ";
		}
		if (this.trailingdayfont && !this.trailingdayfont._is_empty) {
			val += "trailingdayfont:" + this.trailingdayfont._value + "; ";
		}
		if (this.accessibility && this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}

		return val;
	};

	nexacro.DatePicker_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.ncpadding = null;
		this.usetrailingday = null;
		this.headerformat = null;
		this.weekformat = null;
		this.viewyearspin = null;
		this.viewmonthspin = null;
		this.accessibility = null;

		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;

		this.headerheight = null;
		this.headercolor = null;
		this.headerbackground = null;
		this.headergradation = null;
		this.headerbordertype = null;
		this.headerborder = null;
		this.headerfont = null;

		this.bodybackground = null;
		this.bodygradation = null;
		this.bodybordertype = null;
		this.bodyborder = null;

		this.weekcolor = null;
		this.weekbackground = null;
		this.weekgradation = null;
		this.weekfont = null;

		this.todaybackground = null;
		this.todaygradation = null;
		this.todayborder = null;
		this.todaybordertype = null;
		this.todaycolor = null;
		this.todayfont = null;

		this.saturdaybackground = null;
		this.saturdaygradation = null;
		this.saturdayborder = null;
		this.saturdaybordertype = null;
		this.saturdaycolor = null;
		this.saturdayfont = null;

		this.sundaybackground = null;
		this.sundaygradation = null;
		this.sundayborder = null;
		this.sundaybordertype = null;
		this.sundaycolor = null;
		this.sundayfont = null;

		this.trailingdaybackground = null;
		this.trailingdaygradation = null;
		this.trailingdayborder = null;
		this.trailingdaybordertype = null;
		this.trailingdaycolor = null;
		this.trailingdayfont = null;
	};

	var _pDatePickerCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.DatePicker_CurrentStyle);
	nexacro.DatePicker_CurrentStyle.prototype = _pDatePickerCurrentStyle;

	_pDatePickerCurrentStyle.__custom_emptyObject = _pDatePickerStyle.__custom_emptyObject;
	_pDatePickerCurrentStyle.__get_custom_style_value = _pDatePickerStyle.__get_custom_style_value;

	_pDatePickerStyle = null;
	_pDatePickerCurrentStyle = null;

	nexacro.DatePicker = function (id, position, left, top, width, height, right, bottom, parent, delay_create) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
		this._delay_create = delay_create;
		this._calendar = parent;
		this._accessibility_role = "datepicker";
		this._has_accessibility_value = false;
		this._is_focus_accept = false;
		this._locale = "";

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
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"ondayclick" : 1, 
			"oncloseup" : 1, 
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

	var _pDatePicker = nexacro._createPrototype(nexacro.Component, nexacro.DatePicker);
	nexacro.DatePicker.prototype = _pDatePicker;
	_pDatePicker._type_name = "DatePicker";

	_pDatePicker.prevbutton = "";
	_pDatePicker.nextbutton = "";
	_pDatePicker.yearspin = "";
	_pDatePicker.monthspin = "";
	_pDatePicker.value = "";


	_pDatePicker._header = null;
	_pDatePicker._body = null;
	_pDatePicker._preDay = -1;
	_pDatePicker._preToday = -1;
	_pDatePicker._selected_year = -1;
	_pDatePicker._selected_month = -1;
	_pDatePicker._selected_day = -1;
	_pDatePicker._delay_create = false;

	nexacro.DatePicker._defaultNCPadding = nexacro._getCachedStyleObj("padding", "30 6 6 6");
	nexacro.DatePicker._defaultSundaycolor = nexacro._getCachedStyleObj("color", "red");
	nexacro.DatePicker._defaultSaturdaycolor = nexacro._getCachedStyleObj("color", "blue");
	nexacro.DatePicker._defaultTodaycolor = nexacro._getCachedStyleObj("color", "#00FAFA");
	nexacro.DatePicker._defaultHeaderheight = nexacro._getCachedStyleObj("value", "21");
	nexacro.DatePicker._defaultDaysize = nexacro._getCachedStyleObj("value", "26 26");
	nexacro.DatePicker._defaultWeekformat = nexacro._getCachedStyleObj("value", "S M T W T F S");
	nexacro.DatePicker._defaultHeaderformat = nexacro._getCachedStyleObj("value", "yyyy.MM");
	nexacro.DatePicker._defaultUseTrailngday = nexacro._getCachedStyleObj("value", "false");
	nexacro.DatePicker._defaultViewYearSpin = nexacro._getCachedStyleObj("value", "false");
	nexacro.DatePicker._defaultViewMonthSpin = nexacro._getCachedStyleObj("value", "false");

	_pDatePicker.on_apply_custom_pseudo = function (pseudo) {
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

		var ncpadding = this.on_find_CurrentStyle_ncpadding(pseudo);
		if (curstyle.ncpadding != ncpadding) {
			curstyle.ncpadding = ncpadding;
			this.on_apply_style_ncpadding(ncpadding);
		}

		var headerformat = this.on_find_CurrentStyle_headerformat(pseudo);
		if (curstyle.headerformat != headerformat) {
			curstyle.headerformat = headerformat;
			this.on_apply_style_headerformat(headerformat);
		}
		var headerheight = this.on_find_CurrentStyle_headerheight(pseudo);
		if (curstyle.headerheight != headerheight) {
			curstyle.headerheight = headerheight;
			this.on_apply_style_headerheight(headerheight);
		}
		var headercolor = this.on_find_CurrentStyle_headercolor(pseudo);
		if (curstyle.headercolor != headercolor) {
			curstyle.headercolor = headercolor;
			this.on_apply_style_headercolor(headercolor);
		}
		var headerbackground = this.on_find_CurrentStyle_headerbackground(pseudo);
		if (curstyle.headerbackground != headerbackground) {
			curstyle.headerbackground = headerbackground;
			this.on_apply_style_headerbackground(headerbackground);
		}
		var headergradation = this.on_find_CurrentStyle_headergradation(pseudo);
		if (curstyle.headergradation != headergradation) {
			curstyle.headergradation = headergradation;
			this.on_apply_style_headergradation(headergradation);
		}
		var headerbordertype = this.on_find_CurrentStyle_headerbordertype(pseudo);
		if (curstyle.headerbordertype != headerbordertype) {
			curstyle.headerbordertype = headerbordertype;
			this.on_apply_style_headerbordertype(headerbordertype);
		}
		var headerborder = this.on_find_CurrentStyle_headerborder(pseudo);
		if (curstyle.headerborder != headerborder) {
			curstyle.headerborder = headerborder;
			this.on_apply_style_headerborder(headerborder);
		}
		var headerfont = this.on_find_CurrentStyle_headerfont(pseudo);
		if (curstyle.headerfont != headerfont) {
			curstyle.headerfont = headerfont;
			this.on_apply_style_headerfont(headerfont);
		}

		var bodybackground = this.on_find_CurrentStyle_bodybackground(pseudo);
		if (curstyle.bodybackground != bodybackground) {
			curstyle.bodybackground = bodybackground;
			this.on_apply_style_bodybackground(bodybackground);
		}
		var bodygradation = this.on_find_CurrentStyle_bodygradation(pseudo);
		if (curstyle.bodygradation != bodygradation) {
			curstyle.bodygradation = bodygradation;
			this.on_apply_style_bodygradation(bodygradation);
		}
		var bodybordertype = this.on_find_CurrentStyle_bodybordertype(pseudo);
		if (curstyle.bodybordertype != bodybordertype) {
			curstyle.bodybordertype = bodybordertype;
			this.on_apply_style_bodybordertype(bodybordertype);
		}
		var bodyborder = this.on_find_CurrentStyle_bodyborder(pseudo);
		if (curstyle.bodyborder != bodyborder) {
			curstyle.bodyborder = bodyborder;
			this.on_apply_style_bodyborder(bodyborder);
		}

		var weekformat = this.on_find_CurrentStyle_weekformat(pseudo);
		if (curstyle.weekformat != weekformat) {
			curstyle.weekformat = weekformat;
		}
		var weekcolor = this.on_find_CurrentStyle_weekcolor(pseudo);
		if (curstyle.weekcolor != weekcolor) {
			curstyle.weekcolor = weekcolor;
		}
		var weekbackground = this.on_find_CurrentStyle_weekbackground(pseudo);
		if (curstyle.weekbackground != weekbackground) {
			curstyle.weekbackground = weekbackground;
		}
		var weekgradation = this.on_find_CurrentStyle_weekgradation(pseudo);
		if (curstyle.weekgradation != weekgradation) {
			curstyle.weekgradation = weekgradation;
		}
		var weekfont = this.on_find_CurrentStyle_weekfont(pseudo);
		if (curstyle.weekfont != weekfont) {
			curstyle.weekfont = weekfont;
		}

		var todaycolor = this.on_find_CurrentStyle_todaycolor(pseudo);
		if (curstyle.todaycolor != todaycolor) {
			curstyle.todaycolor = todaycolor;
		}
		var todaybackground = this.on_find_CurrentStyle_todaybackground(pseudo);
		if (curstyle.todaybackground != todaybackground) {
			curstyle.todaybackground = todaybackground;
		}
		var todaygradation = this.on_find_CurrentStyle_todaygradation(pseudo);
		if (curstyle.todaygradation != todaygradation) {
			curstyle.todaygradation = todaygradation;
		}
		var todaybordertype = this.on_find_CurrentStyle_todaybordertype(pseudo);
		if (curstyle.todaybordertype != todaybordertype) {
			curstyle.todaybordertype = todaybordertype;
		}
		var todayborder = this.on_find_CurrentStyle_todayborder(pseudo);
		if (curstyle.todayborder != todayborder) {
			curstyle.todayborder = todayborder;
		}
		var todayfont = this.on_find_CurrentStyle_todayfont(pseudo);
		if (curstyle.todayfont != todayfont) {
			curstyle.todayfont = todayfont;
		}

		var saturdaycolor = this.on_find_CurrentStyle_saturdaycolor(pseudo);
		if (curstyle.saturdaycolor != saturdaycolor) {
			curstyle.saturdaycolor = saturdaycolor;
		}
		var saturdaybackground = this.on_find_CurrentStyle_saturdaybackground(pseudo);
		if (curstyle.saturdaybackground != saturdaybackground) {
			curstyle.saturdaybackground = saturdaybackground;
		}
		var saturdaygradation = this.on_find_CurrentStyle_saturdaygradation(pseudo);
		if (curstyle.saturdaygradation != saturdaygradation) {
			curstyle.saturdaygradation = saturdaygradation;
		}
		var saturdaybordertype = this.on_find_CurrentStyle_saturdaybordertype(pseudo);
		if (curstyle.saturdaybordertype != saturdaybordertype) {
			curstyle.saturdaybordertype = saturdaybordertype;
		}
		var saturdayborder = this.on_find_CurrentStyle_saturdayborder(pseudo);
		if (curstyle.saturdayborder != saturdayborder) {
			curstyle.saturdayborder = saturdayborder;
		}
		var saturdayfont = this.on_find_CurrentStyle_saturdayfont(pseudo);
		if (curstyle.saturdayfont != saturdayfont) {
			curstyle.saturdayfont = saturdayfont;
		}

		var sundaycolor = this.on_find_CurrentStyle_sundaycolor(pseudo);
		if (curstyle.sundaycolor != sundaycolor) {
			curstyle.sundaycolor = sundaycolor;
		}
		var sundaybackground = this.on_find_CurrentStyle_sundaybackground(pseudo);
		if (curstyle.sundaybackground != sundaybackground) {
			curstyle.sundaybackground = sundaybackground;
		}
		var sundaygradation = this.on_find_CurrentStyle_sundaygradation(pseudo);
		if (curstyle.sundaygradation != sundaygradation) {
			curstyle.sundaygradation = sundaygradation;
		}
		var sundaybordertype = this.on_find_CurrentStyle_sundaybordertype(pseudo);
		if (curstyle.sundaybordertype != sundaybordertype) {
			curstyle.sundaybordertype = sundaybordertype;
		}
		var sundayborder = this.on_find_CurrentStyle_sundayborder(pseudo);
		if (curstyle.sundayborder != sundayborder) {
			curstyle.sundayborder = sundayborder;
		}
		var sundayfont = this.on_find_CurrentStyle_sundayfont(pseudo);
		if (curstyle.sundayfont != sundayfont) {
			curstyle.sundayfont = sundayfont;
		}

		var usetrailingday = this.on_find_CurrentStyle_usetrailingday(pseudo);
		if (curstyle.usetrailingday != usetrailingday) {
			curstyle.usetrailingday = usetrailingday;
		}
		var trailingdaycolor = this.on_find_CurrentStyle_trailingdaycolor(pseudo);
		if (curstyle.trailingdaycolor != trailingdaycolor) {
			curstyle.trailingdaycolor = trailingdaycolor;
		}
		var trailingdaybackground = this.on_find_CurrentStyle_trailingdaybackground(pseudo);
		if (curstyle.trailingdaybackground != trailingdaybackground) {
			curstyle.trailingdaybackground = trailingdaybackground;
		}
		var trailingdaygradation = this.on_find_CurrentStyle_trailingdaygradation(pseudo);
		if (curstyle.trailingdaygradation != trailingdaygradation) {
			curstyle.trailingdaygradation = trailingdaygradation;
		}
		var trailingdaybordertype = this.on_find_CurrentStyle_trailingdaybordertype(pseudo);
		if (curstyle.trailingdaybordertype != trailingdaybordertype) {
			curstyle.trailingdaybordertype = trailingdaybordertype;
		}
		var trailingdayborder = this.on_find_CurrentStyle_trailingdayborder(pseudo);
		if (curstyle.trailingdayborder != trailingdayborder) {
			curstyle.trailingdayborder = trailingdayborder;
		}
		var trailingdayfont = this.on_find_CurrentStyle_trailingdayfont(pseudo);
		if (curstyle.trailingdayfont != trailingdayfont) {
			curstyle.trailingdayfont = trailingdayfont;
		}

		var viewyearspin = this.on_find_CurrentStyle_viewyearspin(pseudo);
		if (curstyle.viewyearspin != viewyearspin) {
			curstyle.viewyearspin = viewyearspin;
			this.on_apply_style_viewyearspin(viewyearspin);
		}
		var viewmonthspin = this.on_find_CurrentStyle_viewmonthspin(pseudo);
		if (curstyle.viewmonthspin != viewmonthspin) {
			curstyle.viewmonthspin = viewmonthspin;
			this.on_apply_style_viewmonthspin(viewmonthspin);
		}
	};

	_pDatePicker.on_create_custom_style = function () {
		return new nexacro.DatePicker_Style(this);
	};

	_pDatePicker.on_create_custom_currentStyle = function () {
		return new nexacro.DatePicker_CurrentStyle();
	};


	_pDatePicker.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent._find_pseudo_obj("popupalign", pseudo, "align") || this._find_pseudo_obj("align", pseudo, "align");
	};

	_pDatePicker.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_cursor("cursor", pseudo) || this._find_pseudo_obj("cursor", pseudo) || nexacro.Component._default_cursor;
	};

	_pDatePicker.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent._find_pseudo_obj("popupbackground", pseudo, "background") || this._find_pseudo_obj("background", pseudo, "background");
	};

	_pDatePicker.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent._find_pseudo_obj("popupborder", pseudo, "border") || this._find_pseudo_obj("border", pseudo, "border");
	};

	_pDatePicker.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("popupbordertype", pseudo, "bordertype") || this._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pDatePicker.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent._find_pseudo_obj("popupgradation", pseudo, "gradation") || this._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pDatePicker.on_find_CurrentStyle_ncpadding = function (pseudo) {
		return this._find_pseudo_obj("ncpadding", pseudo, "padding") || nexacro.DatePicker._defaultNCPadding;
	};

	_pDatePicker.on_find_CurrentStyle_daysize = function (pseudo) {
		return this.parent._find_pseudo_obj("daysize", pseudo) || this._find_pseudo_obj("daysize", pseudo) || nexacro.DatePicker._defaultDaysize;
	};

	_pDatePicker.on_find_CurrentStyle_daybackground = function (pseudo) {
		return this.parent._find_pseudo_obj("daybackground", pseudo, "background") || this._find_pseudo_obj("daybackground", pseudo, "background");
	};

	_pDatePicker.on_find_CurrentStyle_daygradation = function (pseudo) {
		return this.parent._find_pseudo_obj("daygradation", pseudo, "gradation") || this._find_pseudo_obj("daygradation", pseudo, "gradation");
	};

	_pDatePicker.on_find_CurrentStyle_dayborder = function (pseudo) {
		return this.parent._find_pseudo_obj("dayborder", pseudo, "border") || this._find_pseudo_obj("dayborder", pseudo, "border");
	};

	_pDatePicker.on_find_CurrentStyle_daybordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("daybordertype", pseudo, "bordertype") || this._find_pseudo_obj("daybordertype", pseudo, "bordertype");
	};

	_pDatePicker.on_find_CurrentStyle_daycolor = function (pseudo) {
		return this.parent._find_pseudo_obj("daycolor", pseudo, "color") || this._find_pseudo_obj("daycolor", pseudo, "color") || this._find_inherit_pseudo_obj("daycolor", pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_dayfont = function (pseudo) {
		return this.parent._find_pseudo_obj("dayfont", pseudo, "font") || this._find_pseudo_obj("dayfont", pseudo, "font") || this._find_inherit_pseudo_obj("dayfont", pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_headerformat = function (pseudo) {
		return this._find_pseudo_obj("headerformat", pseudo) || nexacro.DatePicker._defaultHeaderformat;
	};

	_pDatePicker.on_find_CurrentStyle_headerheight = function (pseudo) {
		return this._find_pseudo_obj("headerheight", pseudo) || nexacro.DatePicker._defaultHeaderheight;
	};

	_pDatePicker.on_find_CurrentStyle_headerbackground = function (pseudo) {
		return this._find_pseudo_obj("headerbackground", pseudo, "background");
	};

	_pDatePicker.on_find_CurrentStyle_headergradation = function (pseudo) {
		return this._find_pseudo_obj("headergradation", pseudo, "gradation");
	};

	_pDatePicker.on_find_CurrentStyle_headerborder = function (pseudo) {
		return this._find_pseudo_obj("headerborder", pseudo, "border");
	};

	_pDatePicker.on_find_CurrentStyle_headerbordertype = function (pseudo) {
		return this._find_pseudo_obj("headerbordertype", pseudo, "bordertype");
	};

	_pDatePicker.on_find_CurrentStyle_headercolor = function (pseudo) {
		return this._find_pseudo_obj("headercolor", pseudo, "color");
	};

	_pDatePicker.on_find_CurrentStyle_headerfont = function (pseudo) {
		return this._find_pseudo_obj("headerfont", pseudo, "font");
	};

	_pDatePicker.on_find_CurrentStyle_bodybackground = function (pseudo) {
		return this._find_pseudo_obj("bodybackground", pseudo, "background");
	};

	_pDatePicker.on_find_CurrentStyle_bodygradation = function (pseudo) {
		return this._find_pseudo_obj("bodygradation", pseudo, "gradation");
	};

	_pDatePicker.on_find_CurrentStyle_bodyborder = function (pseudo) {
		return this._find_pseudo_obj("bodyborder", pseudo, "border");
	};

	_pDatePicker.on_find_CurrentStyle_bodybordertype = function (pseudo) {
		return this._find_pseudo_obj("bodybordertype", pseudo, "bordertype");
	};

	_pDatePicker.on_find_CurrentStyle_weekformat = function (pseudo) {
		return this._find_pseudo_obj("weekformat", pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_weekbackground = function (pseudo) {
		return this._find_pseudo_obj("weekbackground", pseudo, "background");
	};

	_pDatePicker.on_find_CurrentStyle_weekgradation = function (pseudo) {
		return this._find_pseudo_obj("weekgradation", pseudo, "gradation");
	};
	_pDatePicker.on_find_CurrentStyle_weekcolor = function (pseudo) {
		return this._find_pseudo_obj("weekcolor", pseudo, "color");
	};

	_pDatePicker.on_find_CurrentStyle_weekfont = function (pseudo) {
		return this._find_pseudo_obj("weekfont", pseudo) || nexacro.Component._default_font;
	};

	_pDatePicker.on_find_CurrentStyle_saturdaybackground = function (pseudo) {
		return this._find_pseudo_obj("saturdaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_saturdayborder = function (pseudo) {
		return this._find_pseudo_obj("saturdayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_saturdaybordertype = function (pseudo) {
		return this._find_pseudo_obj("saturdaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_saturdaycolor = function (pseudo) {
		return this._find_pseudo_obj("saturdaycolor", pseudo, "color") || nexacro.DatePicker._defaultSaturdaycolor;
	};

	_pDatePicker.on_find_CurrentStyle_saturdayfont = function (pseudo) {
		return this._find_pseudo_obj("saturdayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_saturdaygradation = function (pseudo) {
		return this._find_pseudo_obj("saturdaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_sundaybackground = function (pseudo) {
		return this._find_pseudo_obj("sundaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_sundaygradation = function (pseudo) {
		return this._find_pseudo_obj("sundaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_sundayborder = function (pseudo) {
		return this._find_pseudo_obj("sundayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_sundaybordertype = function (pseudo) {
		return this._find_pseudo_obj("sundaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_sundaycolor = function (pseudo) {
		return this._find_pseudo_obj("sundaycolor", pseudo, "color") || nexacro.DatePicker._defaultSundaycolor;
	};

	_pDatePicker.on_find_CurrentStyle_sundayfont = function (pseudo) {
		return this._find_pseudo_obj("sundayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_todaybackground = function (pseudo) {
		return this._find_pseudo_obj("todaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_todaygradation = function (pseudo) {
		return this._find_pseudo_obj("todaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_todayborder = function (pseudo) {
		return this._find_pseudo_obj("todayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_todaybordertype = function (pseudo) {
		return this._find_pseudo_obj("todaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_todaycolor = function (pseudo) {
		return this._find_pseudo_obj("todaycolor", pseudo, "color") || nexacro.DatePicker._defaultTodaycolor;
	};

	_pDatePicker.on_find_CurrentStyle_todayfont = function (pseudo) {
		return this._find_pseudo_obj("todayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_usetrailingday = function (pseudo) {
		return this.parent._find_pseudo_obj("usetrailingday", pseudo) || this._find_pseudo_obj("usetrailingday", pseudo) || nexacro.DatePicker._defaultUseTrailngday;
	};

	_pDatePicker.on_find_CurrentStyle_trailingdaybackground = function (pseudo) {
		return this._find_pseudo_obj("trailingdaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_trailingdaygradation = function (pseudo) {
		return this._find_pseudo_obj("trailingdaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_trailingdayborder = function (pseudo) {
		return this._find_pseudo_obj("trailingdayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_trailingdaybordertype = function (pseudo) {
		return this._find_pseudo_obj("trailingdaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_trailingdaycolor = function (pseudo) {
		return this.parent._find_pseudo_obj("trailingdaycolor", pseudo, "color") || this._find_pseudo_obj("trailingdaycolor", pseudo, "color") || this.on_find_CurrentStyle_daycolor(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_trailingdayfont = function (pseudo) {
		return this._find_pseudo_obj("trailingdayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePicker.on_find_CurrentStyle_viewmonthspin = function (pseudo) {
		return this.parent._find_pseudo_obj("viewmonthspin", pseudo) || this._find_pseudo_obj("viewmonthspin", pseudo) || nexacro.DatePicker._defaultViewMonthSpin;
	};

	_pDatePicker.on_find_CurrentStyle_viewyearspin = function (pseudo) {
		return this.parent._find_pseudo_obj("viewyearspin", pseudo) || this._find_pseudo_obj("viewyearspin", pseudo) || nexacro.DatePicker._defaultViewYearSpin;
	};


	_pDatePicker.on_update_style_ncpadding = function () {
		this.on_apply_style_ncpadding(this.currentstyle.ncpadding = this.on_find_CurrentStyle_ncpadding(this._pseudo));
	};

	_pDatePicker.on_update_style_daysize = function () {
		this.on_apply_style_daysize(this.currentstyle.daysize = this.on_find_CurrentStyle_daysize(this._pseudo));
	};

	_pDatePicker.on_update_style_daycolor = function () {
		this.on_apply_style_daycolor(this.currentstyle.daycolor = this.on_find_CurrentStyle_daycolor(this._pseudo));
	};

	_pDatePicker.on_update_style_daybackground = function () {
		this.on_apply_style_daybackground(this.currentstyle.daybackground = this.on_find_CurrentStyle_daybackground(this._pseudo));
	};

	_pDatePicker.on_update_style_daygradation = function () {
		this.on_apply_style_daygradation(this.currentstyle.daygradation = this.on_find_CurrentStyle_daygradation(this._pseudo));
	};

	_pDatePicker.on_update_style_dayborder = function () {
		this.on_apply_style_dayborder(this.currentstyle.dayborder = this.on_find_CurrentStyle_dayborder(this._pseudo));
	};

	_pDatePicker.on_update_style_daybordertype = function () {
		this.on_apply_style_daybordertype(this.currentstyle.daybordertype = this.on_find_CurrentStyle_daybordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_dayfont = function () {
		this.on_apply_style_dayfont(this.currentstyle.dayfont = this.on_find_CurrentStyle_dayfont(this._pseudo));
	};

	_pDatePicker.on_update_style_headerformat = function () {
		this.on_apply_style_headerformat(this.currentstyle.headerformat = this.on_find_CurrentStyle_headerformat(this._pseudo));
	};

	_pDatePicker.on_update_style_headerheight = function () {
		this.on_apply_style_headerheight(this.currentstyle.headerheight = this.on_find_CurrentStyle_headerheight(this._pseudo));
	};

	_pDatePicker.on_update_style_headercolor = function () {
		this.on_apply_style_headercolor(this.currentstyle.headercolor = this.on_find_CurrentStyle_headercolor(this._pseudo));
	};

	_pDatePicker.on_update_style_headerbackground = function () {
		this.on_apply_style_headerbackground(this.currentstyle.headerbackground = this.on_find_CurrentStyle_headerbackground(this._pseudo));
	};

	_pDatePicker.on_update_style_headergradation = function () {
		this.on_apply_style_headergradation(this.currentstyle.headergradation = this.on_find_CurrentStyle_headergradation(this._pseudo));
	};

	_pDatePicker.on_update_style_headerborder = function () {
		this.on_apply_style_headerborder(this.currentstyle.headerborder = this.on_find_CurrentStyle_headerborder(this._pseudo));
	};

	_pDatePicker.on_update_style_headerbordertype = function () {
		this.on_apply_style_headerbordertype(this.currentstyle.headerbordertype = this.on_find_CurrentStyle_headerbordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_headerfont = function () {
		this.on_apply_style_headerfont(this.currentstyle.headerfont = this.on_find_CurrentStyle_headerfont(this._pseudo));
	};

	_pDatePicker.on_update_style_bodybackground = function () {
		this.on_apply_style_bodybackground(this.currentstyle.bodybackground = this.on_find_CurrentStyle_bodybackground(this._pseudo));
	};

	_pDatePicker.on_update_style_bodygradation = function () {
		this.on_apply_style_bodygradation(this.currentstyle.bodygradation = this.on_find_CurrentStyle_bodygradation(this._pseudo));
	};

	_pDatePicker.on_update_style_bodyborder = function () {
		this.on_apply_style_bodyborder(this.currentstyle.bodyborder = this.on_find_CurrentStyle_bodyborder(this._pseudo));
	};

	_pDatePicker.on_update_style_bodybordertype = function () {
		this.on_apply_style_bodybordertype(this.currentstyle.bodybordertype = this.on_find_CurrentStyle_bodybordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_weekformat = function () {
		this.on_apply_style_weekformat(this.currentstyle.weekformat = this.on_find_CurrentStyle_weekformat(this._pseudo));
	};

	_pDatePicker.on_update_style_weekcolor = function () {
		this.on_apply_style_weekcolor(this.currentstyle.weekcolor = this.on_find_CurrentStyle_weekcolor(this._pseudo));
	};

	_pDatePicker.on_update_style_weekbackground = function () {
		this.on_apply_style_weekbackground(this.currentstyle.weekbackground = this.on_find_CurrentStyle_weekbackground(this._pseudo));
	};

	_pDatePicker.on_update_style_weekgradation = function () {
		this.on_apply_style_weekgradation(this.currentstyle.weekgradation = this.on_find_CurrentStyle_weekgradation(this._pseudo));
	};

	_pDatePicker.on_update_style_weekfont = function () {
		this.on_apply_style_weekfont(this.currentstyle.weekfont = this.on_find_CurrentStyle_weekfont(this._pseudo));
	};

	_pDatePicker.on_update_style_todaycolor = function () {
		this.on_apply_style_todaycolor(this.currentstyle.todaycolor = this.on_find_CurrentStyle_todaycolor(this._pseudo));
	};

	_pDatePicker.on_update_style_todaybackground = function () {
		this.on_apply_style_todaybackground(this.currentstyle.todaybackground = this.on_find_CurrentStyle_todaybackground(this._pseudo));
	};

	_pDatePicker.on_update_style_todaygradation = function () {
		this.on_apply_style_todaygradation(this.currentstyle.todaygradation = this.on_find_CurrentStyle_todaygradation(this._pseudo));
	};

	_pDatePicker.on_update_style_todayborder = function () {
		this.on_apply_style_todayborder(this.currentstyle.todayborder = this.on_find_CurrentStyle_todayborder(this._pseudo));
	};

	_pDatePicker.on_update_style_todaybordertype = function () {
		this.on_apply_style_todaybordertype(this.currentstyle.todaybordertype = this.on_find_CurrentStyle_todaybordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_todayfont = function () {
		this.on_apply_style_todayfont(this.currentstyle.todayfont = this.on_find_CurrentStyle_todayfont(this._pseudo));
	};

	_pDatePicker.on_update_style_saturdaycolor = function () {
		this.on_apply_style_saturdaycolor(this.currentstyle.saturdaycolor = this.on_find_CurrentStyle_saturdaycolor(this._pseudo));
	};

	_pDatePicker.on_update_style_saturdaybackground = function () {
		this.on_apply_style_saturdaybackground(this.currentstyle.saturdaybackground = this.on_find_CurrentStyle_saturdaybackground(this._pseudo));
	};

	_pDatePicker.on_update_style_saturdaygradation = function () {
		this.on_apply_style_saturdaygradation(this.currentstyle.saturdaygradation = this.on_find_CurrentStyle_saturdaygradation(this._pseudo));
	};

	_pDatePicker.on_update_style_saturdayborder = function () {
		this.on_apply_style_saturdayborder(this.currentstyle.saturdayborder = this.on_find_CurrentStyle_saturdayborder(this._pseudo));
	};

	_pDatePicker.on_update_style_saturdaybordertype = function () {
		this.on_apply_style_saturdaybordertype(this.currentstyle.saturdaybordertype = this.on_find_CurrentStyle_saturdaybordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_saturdayfont = function () {
		this.on_apply_style_saturdayfont(this.currentstyle.saturdayfont = this.on_find_CurrentStyle_saturdayfont(this._pseudo));
	};

	_pDatePicker.on_update_style_sundaycolor = function () {
		this.on_apply_style_sundaycolor(this.currentstyle.sundaycolor = this.on_find_CurrentStyle_sundaycolor(this._pseudo));
	};

	_pDatePicker.on_update_style_sundaybackground = function () {
		this.on_apply_style_sundaybackground(this.currentstyle.sundaybackground = this.on_find_CurrentStyle_sundaybackground(this._pseudo));
	};

	_pDatePicker.on_update_style_sundaygradation = function () {
		this.on_apply_style_sundaygradation(this.currentstyle.sundaygradation = this.on_find_CurrentStyle_sundaygradation(this._pseudo));
	};

	_pDatePicker.on_update_style_sundayborder = function () {
		this.on_apply_style_sundayborder(this.currentstyle.sundayborder = this.on_find_CurrentStyle_sundayborder(this._pseudo));
	};

	_pDatePicker.on_update_style_sundaybordertype = function () {
		this.on_apply_style_sundaybordertype(this.currentstyle.sundaybordertype = this.on_find_CurrentStyle_sundaybordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_sundayfont = function () {
		this.on_apply_style_sundayfont(this.currentstyle.sundayfont = this.on_find_CurrentStyle_sundayfont(this._pseudo));
	};

	_pDatePicker.on_update_style_usetrailingday = function () {
		this.on_apply_style_usetrailingday(this.currentstyle.usetrailingday = this.on_find_CurrentStyle_usetrailingday(this._pseudo));
	};

	_pDatePicker.on_update_style_trailingdaycolor = function () {
		this.on_apply_style_trailingdaycolor(this.currentstyle.trailingdaycolor = this.on_find_CurrentStyle_trailingdaycolor(this._pseudo));
	};

	_pDatePicker.on_update_style_trailingdaybackground = function () {
		this.on_apply_style_trailingdaybackground(this.currentstyle.trailingdaybackground = this.on_find_CurrentStyle_trailingdaybackground(this._pseudo));
	};

	_pDatePicker.on_update_style_trailingdaygradation = function () {
		this.on_apply_style_trailingdaygradation(this.currentstyle.trailingdaygradation = this.on_find_CurrentStyle_trailingdaygradation(this._pseudo));
	};

	_pDatePicker.on_update_style_trailingdayborder = function () {
		this.on_apply_style_trailingdayborder(this.currentstyle.trailingdayborder = this.on_find_CurrentStyle_trailingdayborder(this._pseudo));
	};

	_pDatePicker.on_update_style_trailingdaybordertype = function () {
		this.on_apply_style_trailingdaybordertype(this.currentstyle.trailingdaybordertype = this.on_find_CurrentStyle_trailingdaybordertype(this._pseudo));
	};

	_pDatePicker.on_update_style_trailingdayfont = function () {
		this.on_apply_style_trailingdayfont(this.currentstyle.trailingdayfont = this.on_find_CurrentStyle_trailingdayfont(this._pseudo));
	};

	_pDatePicker.on_update_style_viewyearspin = function () {
		this.on_apply_style_viewyearspin(this.currentstyle.viewyearspin = this.on_find_CurrentStyle_viewyearspin(this._pseudo));
	};

	_pDatePicker.on_update_style_viewmonthspin = function () {
		this.on_apply_style_viewmonthspin(this.currentstyle.viewmonthspin = this.on_find_CurrentStyle_viewmonthspin(this._pseudo));
	};


	_pDatePicker.on_apply_style_border = function (border) {
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			control_elem.setElementBorder(border, curstyle.bordertype);
			control_elem.setElementBackground(this.on_find_CurrentStyle_background("normal"), this.on_find_CurrentStyle_gradation("normal"));
			this._updateClientSize(control_elem);
		}
	};

	_pDatePicker.on_apply_style_bordertype = function (bordertype) {
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			control_elem.setElementBorder(curstyle.border, bordertype);
			control_elem.setElementBackground(this.on_find_CurrentStyle_background("normal"), this.on_find_CurrentStyle_gradation("normal"));
			this._updateClientSize(control_elem);
		}
	};

	_pDatePicker.on_apply_style_ncpadding = function (ncpadding) {
		;
	};

	_pDatePicker.on_apply_style_daysize = function (size) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_daysize(size);
		}
	};

	_pDatePicker.on_apply_style_daycolor = function (color) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_daycolor(color);
		}
	};

	_pDatePicker.on_apply_style_daybackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_daybackground(background);
		}
	};

	_pDatePicker.on_apply_style_daygradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_daygradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_dayborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_dayborder(border);
		}
	};

	_pDatePicker.on_apply_style_daybordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_daybordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_dayfont = function (font) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_dayfont(font);
		}
	};

	_pDatePicker.on_apply_style_headerformat = function (format) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header._setFormat(format);
		}
	};

	_pDatePicker.on_apply_style_headerheight = function (height) {
		;
	};

	_pDatePicker.on_apply_style_headercolor = function (color) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header.on_apply_style_color(color);
		}
	};

	_pDatePicker.on_apply_style_headerbackground = function (background) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header.on_apply_style_background(background);
		}
	};

	_pDatePicker.on_apply_style_headergradation = function (gradation) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header.style.set_gradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_headerborder = function (border) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header.on_apply_style_border(border);
		}
	};

	_pDatePicker.on_apply_style_headerbordertype = function (bordertype) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header.on_apply_style_bordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_headerfont = function (font) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header.on_apply_style_font(font);
		}
	};

	_pDatePicker.on_apply_style_bodybackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_background(background);
		}
	};

	_pDatePicker.on_apply_style_bodygradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_gradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_bodyborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_border(border);
		}
	};

	_pDatePicker.on_apply_style_bodybordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_bordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_weekformat = function (format) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekformat(format);
		}
	};

	_pDatePicker.on_apply_style_weekcolor = function (color) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekcolor(color);
		}
	};

	_pDatePicker.on_apply_style_weekbackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekbackground(background);
		}
	};

	_pDatePicker.on_apply_style_weekgradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekgradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_weekborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekborder(border);
		}
	};

	_pDatePicker.on_apply_style_weekbordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekbordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_weekfont = function (font) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_weekfont(font);
		}
	};

	_pDatePicker.on_apply_style_todaycolor = function (color) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_todaycolor(color);
		}
	};

	_pDatePicker.on_apply_style_todaybackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_todaybackground(background);
		}
	};

	_pDatePicker.on_apply_style_todaygradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_todaygradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_todayborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_todayborder(border);
		}
	};

	_pDatePicker.on_apply_style_todaybordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_todaybordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_todayfont = function (font) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_todayfont(font);
		}
	};

	_pDatePicker.on_apply_style_saturdaycolor = function (color) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_saturdaycolor(color);
		}
	};

	_pDatePicker.on_apply_style_saturdaybackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_saturdaybackground(background);
		}
	};

	_pDatePicker.on_apply_style_saturdaygradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_saturdaygradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_saturdayborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_saturdayborder(border);
		}
	};

	_pDatePicker.on_apply_style_saturdaybordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_saturdaybordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_saturdayfont = function (font) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_saturdayfont(font);
		}
	};

	_pDatePicker.on_apply_style_sundaycolor = function (color) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_sundaycolor(color);
		}
	};

	_pDatePicker.on_apply_style_sundaybackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_sundaybackground(background);
		}
	};

	_pDatePicker.on_apply_style_sundaygradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_sundaygradation(gradation);
		}
	};
	_pDatePicker.on_apply_style_sundayborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_sundayborder(border);
		}
	};

	_pDatePicker.on_apply_style_sundaybordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_sundaybordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_sundayfont = function (font) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_sundayfont(font);
		}
	};

	_pDatePicker.on_apply_style_usetrailingday = function (usetrailingday) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_usetrailingday(usetrailingday);
		}
	};

	_pDatePicker.on_apply_style_trailingdaycolor = function (color) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_trailingdaycolor(color);
		}
	};

	_pDatePicker.on_apply_style_trailingdaybackground = function (background) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_trailingdaybackground(background);
		}
	};

	_pDatePicker.on_apply_style_trailingdaygradation = function (gradation) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_trailingdaygradation(gradation);
		}
	};

	_pDatePicker.on_apply_style_trailingdayborder = function (border) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_trailingdayborder(border);
		}
	};

	_pDatePicker.on_apply_style_trailingdaybordertype = function (bordertype) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_trailingdaybordertype(bordertype);
		}
	};

	_pDatePicker.on_apply_style_trailingdayfont = function (font) {
		var control_elem = this.getElement();
		var body = this._body;
		if (control_elem && body) {
			body.on_apply_style_trailingdayfont(font);
		}
	};

	_pDatePicker.on_apply_style_viewyearspin = function (v) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header._setViewYearSpin(v);
		}
	};
	_pDatePicker.on_apply_style_viewmonthspin = function (v) {
		var control_elem = this.getElement();
		var header = this._header;
		if (control_elem && header) {
			header._setViewMonthSpin(v);
		}
	};

	_pDatePicker.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var header = this._header = new nexacro.DatePickerHeader("", "absolute", 0, 0, 0, 0, null, null, this);
			var body = this._body = new nexacro.DatePickerBody("", "absolute", 0, 0, 0, 0, null, null, this);

			header.createComponent();
			this.prevbutton = header._prevButton;
			this.nextbutton = header._nextButton;
			this.yearspin = header._yearSpin;
			this.monthspin = header._monthSpin;

			if (!this._delay_create) {
				body.createComponent();
			}
		}
	};

	_pDatePicker.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var header = this._header;
			var body = this._body;

			if (this._delay_create) {
				body.createComponent(true);
			}

			header._setEventHandler("onprevclick", this.on_notify_datepicker_onprevclick, this);
			header._setEventHandler("onnextclick", this.on_notify_datepicker_onnextclick, this);
			header._setEventHandler("onyearspin", this.on_notify_datepicker_onyearspin, this);
			header._setEventHandler("onmonthspin", this.on_notify_datepicker_onmonthspin, this);
			body._setEventHandler("ondayclick", this.on_notify_datepicker_ondayclick, this);
			this._setEventHandler("onlbuttondown", this.on_notify_datepicker_onlbuttondown);
			this._setEventHandler("ontouchstart", this.on_notify_datepicker_onlbuttondown);

			header.on_created();
			body.on_created();

			this.on_apply_prop_rtldirection();

			this._resizePicker();
		}
	};

	_pDatePicker.on_destroy_contents = function () {
		this.prevbutton = null;
		this.nextbutton = null;
		this.yearspin = null;
		this.monthspin = null;

		if (this._header) {
			this._header.destroy();
		}
		if (this._body) {
			this._body.destroy();
		}
	};

	_pDatePicker.on_change_containerRect = function (width, height) {
		this._resizePicker();
	};

	_pDatePicker.on_apply_prop_enable = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			var header = this._header;
			var body = this._body;
			if (header) {
				header._setEnable(v);
			}
			if (body) {
				body._setEnable(v);
			}
		}
	};

	_pDatePicker.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pDatePicker.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		if (this._header) {
			this._header.set_readonly(v);
		}
		if (this._body) {
			this._body.set_readonly(v);
		}
	};

	_pDatePicker.set_value = function (v) {
		if (v != this.value) {
			this.value = v;
		}
		this.on_apply_value();
	};

	_pDatePicker.on_apply_value = function () {
		var v = this.value;

		var year = v.substr(0, 4);
		var month = v.substr(4, 2);
		var day = v.substr(6, 2);

		this._selected_year = parseInt(year, 10);
		this._selected_month = parseInt(month, 10);
		this._selected_day = parseInt(day, 10);

		if (this._header) {
			this._header._setYear(year);
			this._header._setMonth(month);
		}
		if (this._body) {
			this._body._setDate(year, month, day);
		}
	};

	_pDatePicker.set_backgroundcolumn = function (v) {
		if (this._body) {
			this._body.on_apply_backgroundcolumn(v);
		}
	};
	_pDatePicker.on_apply_backgroundcolumn = function (v) {
		if (this._body) {
			this._body.on_apply_backgroundcolumn(v);
		}
	};

	_pDatePicker.on_apply_bordercolumn = function (v) {
		if (this._body) {
			this._body.on_apply_bordercolumn(v);
		}
	};

	_pDatePicker.on_apply_datecolumn = function (v) {
		if (this._body) {
			this._body.on_apply_datecolumn(v);
		}
	};

	_pDatePicker.on_apply_innerdataset = function (v) {
		if (this._body) {
			this._body.on_apply_innerdataset(v);
		}
	};

	_pDatePicker.on_apply_textcolorcolumn = function (v) {
		if (this._body) {
			this._body.on_apply_textcolorcolumn(v);
		}
	};

	_pDatePicker.on_notify_datepicker_onprevclick = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		var body = this._body;
		if (body) {
			body._setYear(obj._year);
			body._setMonth(obj._month);
		}
	};

	_pDatePicker.on_notify_datepicker_onnextclick = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		var body = this._body;
		if (body) {
			body._setYear(obj._year);
			body._setMonth(obj._month);
		}
	};

	_pDatePicker.on_notify_datepicker_onyearspin = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		var body = this._body;
		if (body) {
			body._setYear(obj._year);
		}
	};

	_pDatePicker.on_notify_datepicker_onmonthspin = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		var body = this._body;
		if (body) {
			body._setMonth(obj._month);
		}
	};

	_pDatePicker.on_notify_datepicker_ondayclick = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		this._header.hide_spindate();


		var date = obj._post_year + obj._post_month + obj._post_day;
		var ret = this.on_fire_ondayclick(obj, date);

		if (ret || ret === undefined) {
			this._selected_year = obj._post_year;
			this._selected_month = obj._post_month;
			this._selected_day = obj._post_day;
		}

		return ret;
	};

	_pDatePicker.on_notify_datepicker_onlbuttondown = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			return false;
		}

		if (e.fromreferenceobject && (e.fromreferenceobject instanceof nexacro.DatePickerBody || 
			e.fromreferenceobject instanceof nexacro.DatePickerCtrl)) {
			this._hide_spindate();
		}
	};

	_pDatePicker.on_fire_ondayclick = function (obj, date) {
		if (this.ondayclick && this.ondayclick._has_handlers) {
			var evt = new nexacro.CalendarDayClickEventInfo(obj, "ondayclick", date);
			return this.ondayclick._fireEvent(this, evt);
		}
		return false;
	};

	_pDatePicker.on_fire_oncloseup = function (obj) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			return this.oncloseup._fireEvent(this);
		}

		return false;
	};

	_pDatePicker.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var calendar = this.parent;
		var header = this._header;
		var body = this._body;
		var year = body._year | 0;
		var month = body._month | 0;
		var day = body._day | 0;
		var ret;
		switch (keycode) {
			case 13:
				{

					var date = new nexacro.Date(year, month - 1, day);
					this.on_fire_ondayclick(this, date);
				}
				break;
			case 37:
				{

					var dec_month = false;
					var dec_day = false;
					if (ctrl_key) {
						dec_month = true;
					}
					else {
						dec_day = true;
					}

					if (dec_day) {
						day -= 1;
						if (day <= 0) {
							dec_month = true;
						}
					}

					if (dec_month) {
						month -= 1;
						if (month <= 0) {
							if (year <= 0) {
								year = 9999;
							}
							else {
								year -= 1;
							}

							month = 12;
						}

						if (!ctrl_key) {
							day = calendar._getEndDay(year, month) + day;
						}
					}
				}
				break;
			case 38:
				{

					if (ctrl_key) {
						year -= 1;
					}
					else {
						day -= 7;

						if (day <= 0) {
							month -= 1;

							if (month <= 0) {
								if (year <= 0) {
									year = 9999;
								}
								else {
									year -= 1;
								}

								month = 12;
							}

							day = calendar._getEndDay(year, month) + day;
						}
					}
					ret = true;
				}
				break;
			case 39:
				{

					var inc_month = false;
					var inc_day = false;
					if (ctrl_key) {
						inc_month = true;
					}
					else {
						inc_day = true;
					}

					var endday = calendar._getEndDay(year, month);
					if (inc_day) {
						day += 1;
						if (day > endday) {
							inc_month = true;
						}
					}

					if (inc_month) {
						month += 1;
						if (month > 12) {
							if (year >= 9999) {
								year = 0;
							}
							else {
								year += 1;
							}

							month = 1;
						}

						if (inc_day) {
							day -= endday;
						}
					}

				}
				break;
			case 40:
				{

					if (ctrl_key) {
						year += 1;
					}
					else {
						day += 7;
						var endday = calendar._getEndDay(year, month);
						if (day > endday) {
							month += 1;

							if (month > 12) {
								if (year >= 9999) {
									year = 0;
								}
								else {
									year += 1;
								}

								month = 1;
							}
							day -= endday;
						}
					}
					ret = true;
				}
				break;
		}

		if (keycode >= 37 && keycode <= 40) {
			year = body._makeDateText(year, "year");
			month = body._makeDateText(month, "month");
			day = body._makeDateText(day, "day");

			var date = new nexacro.Date(year, month - 1, day);
			this._hide_spindate();


			if (calendar.type == "monthonly") {
				this.on_fire_ondayclick(this, date);
			}
			else {
				this.set_value(year + month + day);
			}
		}

		return false;
	};

	_pDatePicker._resizePicker = function (headerheight, ncpadding) {
		var control_elem = this.getElement();
		if (control_elem) {
			var pseudo = this._pseudo;
			if (!ncpadding) {
				ncpadding = this.on_find_CurrentStyle_ncpadding(pseudo);
			}
			if (!headerheight) {
				headerheight = this.on_find_CurrentStyle_headerheight(pseudo);
			}

			var client_width = this._client_width;
			var client_height = this._client_height;
			var client_left = this._client_left;
			var client_top = this._client_top;

			var body_l = 0 + ncpadding.left;
			var body_t = 0 + ncpadding.top;
			var body_w = (client_width - ncpadding.left - ncpadding.right);
			var body_h = (client_height - ncpadding.top - ncpadding.bottom);

			var header_l = 0 + ncpadding.left;
			var header_t = (body_t / 2) - (parseInt(headerheight, 10) / 2);
			var header_w = (client_width - ncpadding.left - ncpadding.right);
			var header_h = parseInt(headerheight, 10);

			this._body.move(body_l, body_t, body_w, body_h, null, null);
			this._header.move(header_l, header_t, header_w, header_h, null, null);
		}
	};

	_pDatePicker._on_apply_style_day = function (flag) {
		var control = this.getElement();
		if (control) {
			var body = this._body;
			if (body) {
				var day = body._days;
				var day_idx = parseInt(body._day, 10);
				var day_len = day.length;
				var pre_day = this._preDay;
				var obj_day = null;
				var pseudo = "normal";
				if (pre_day != -1) {
					obj_day = day[pre_day];
					if (obj_day) {
						obj_day._pseudo = pseudo;
						var background = obj_day.on_find_CurrentStyle_background(pseudo);
						var border = obj_day.on_find_CurrentStyle_border(pseudo);
						var bordertype = obj_day.on_find_CurrentStyle_bordertype(pseudo);
						var color = obj_day.on_find_CurrentStyle_color(pseudo);
						var font = obj_day.on_find_CurrentStyle_font(pseudo);
						var gradation = obj_day.on_find_CurrentStyle_gradation(pseudo);

						obj_day.on_apply_style_background(background);
						obj_day.on_apply_style_border(border);
						obj_day.on_apply_style_bordertype(bordertype);
						obj_day.on_apply_style_color(color);
						obj_day.on_apply_style_font(font);
						obj_day.on_apply_style_gradation(gradation);
					}
				}

				for (var i = 0; i < day_len; i++) {
					if (day[i].text == "1") {
						break;
					}
				}
				day_idx += (i - 1);
				this._preDay = day_idx;

				pseudo = "selected";
				if (!flag) {
					pseudo = "normal";
				}
				obj_day = day[day_idx];
				if (obj_day) {
					obj_day._pseudo = pseudo;

					var background = obj_day.on_find_CurrentStyle_background(pseudo);
					var border = obj_day.on_find_CurrentStyle_border(pseudo);
					var bordertype = obj_day.on_find_CurrentStyle_bordertype(pseudo);
					var color = obj_day.on_find_CurrentStyle_color(pseudo);
					var font = obj_day.on_find_CurrentStyle_font(pseudo);
					var gradation = obj_day.on_find_CurrentStyle_gradation(pseudo);

					obj_day.on_apply_style_background(background);
					obj_day.on_apply_style_border(border);
					obj_day.on_apply_style_bordertype(bordertype);
					obj_day.on_apply_style_color(color);
					obj_day.on_apply_style_font(font);
					obj_day.on_apply_style_gradation(gradation);
				}

				var currentDate = new Date();
				var today = currentDate.getDate();

				currentDate = null;

				pseudo = "normal";
				if (body._isToday(today)) {
					today += (i - 1);
					obj_day = day[today];
					if (obj_day) {
						obj_day._pseudo = pseudo;

						var background = obj_day.on_find_CurrentStyle_background(obj_day._pseudo);
						var border = obj_day.on_find_CurrentStyle_border(obj_day._pseudo);
						var bordertype = obj_day.on_find_CurrentStyle_bordertype(obj_day._pseudo);
						var color = obj_day.on_find_CurrentStyle_color(obj_day._pseudo);
						var font = obj_day.on_find_CurrentStyle_font(obj_day._pseudo);
						var gradation = obj_day.on_find_CurrentStyle_gradation(obj_day._pseudo);

						obj_day.on_apply_style_background(background);
						obj_day.on_apply_style_border(border);
						obj_day.on_apply_style_bordertype(bordertype);
						obj_day.on_apply_style_color(color);
						obj_day.on_apply_style_font(font);
						obj_day.on_apply_style_gradation(gradation);
					}

					this._preToday = today;
				}
				else {
					var preToday = this._preToday;
					if (preToday != -1) {
						obj_day = day[preToday];
						if (obj_day) {
							obj_day._pseudo = pseudo;
							var background = obj_day.on_find_CurrentStyle_background(pseudo);
							var border = obj_day.on_find_CurrentStyle_border(pseudo);
							var bordertype = obj_day.on_find_CurrentStyle_bordertype(pseudo);
							var color = obj_day.on_find_CurrentStyle_color(pseudo);
							var font = obj_day.on_find_CurrentStyle_font(pseudo);
							var gradation = obj_day.on_find_CurrentStyle_gradation(pseudo);

							obj_day.on_apply_style_background(background);
							obj_day.on_apply_style_border(border);
							obj_day.on_apply_style_bordertype(bordertype);
							obj_day.on_apply_style_color(color);
							obj_day.on_apply_style_font(font);
							obj_day.on_apply_style_gradation(gradation);
						}
					}
				}
			}
		}
	};

	_pDatePicker.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var control_elem = this.getElement();
		if (control_elem) {
			this.on_change_containerRect();

			var _rtldirection = this._rtldirection;

			if (this._header) {
				this._header._setRtlDirection(_rtldirection);
			}
			if (this._body) {
				this._body._setRtlDirection(_rtldirection);
			}
		}
	};

	_pDatePicker._makeCssRefInfoCtrl = function (ctrl) {
		ctrl._refcssobj = this;
		ctrl._refcssid = "#" + ctrl.id;
		return this;
	};

	_pDatePicker._hide_spindate = function () {
		var header = this._header;

		if (header) {
			header.hide_spindate();
		}
	};

	delete _pDatePicker;

	nexacro.DatePickerHeader = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;


		this._event_list = {
			"onprevclick" : 1, 
			"onnextclick" : 1, 
			"onyearspin" : 1, 
			"onmonthspin" : 1
		};
	};

	var _pDatePickerHeader = nexacro._createPrototype(nexacro.Component, nexacro.DatePickerHeader);
	nexacro.DatePickerHeader.prototype = _pDatePickerHeader;

	_pDatePickerHeader._type_name = "DatePickerHeader";

	_pDatePickerHeader._prevButton = null;
	_pDatePickerHeader._nextButton = null;
	_pDatePickerHeader._yearStatic = null;
	_pDatePickerHeader._monthStatic = null;
	_pDatePickerHeader._yearSpin = null;
	_pDatePickerHeader._monthSpin = null;
	_pDatePickerHeader._year = "";
	_pDatePickerHeader._month = "";
	_pDatePickerHeader._day = "";
	_pDatePickerHeader._format = "";
	_pDatePickerHeader._viewyearspin = false;
	_pDatePickerHeader._viewmonthspin = false;
	_pDatePickerHeader._prevButton = null;

	_pDatePickerHeader.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}
	};


	_pDatePickerHeader.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerbackground(pseudo);
	};

	_pDatePickerHeader.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerborder(pseudo);
	};

	_pDatePickerHeader.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerbordertype(pseudo);
	};

	_pDatePickerHeader.on_find_CurrentStyle_color = function (pseudo) {
		var color = this.parent.on_find_CurrentStyle_headercolor(pseudo) || 
			this._find_inherit_pseudo_obj("color", pseudo) || 
			nexacro.Component._default_color;
		return color;
	};

	_pDatePickerHeader.on_find_CurrentStyle_font = function (pseudo) {
		var font = this.parent.on_find_CurrentStyle_headerfont(pseudo) || 
			this._find_inherit_pseudo_obj("font", pseudo) || 
			nexacro.Component._default_font;
		return font;
	};

	_pDatePickerHeader.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headergradation(pseudo);
	};

	_pDatePickerHeader.on_find_CurrentStyle_headerformat = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerformat(pseudo);
	};


	_pDatePickerHeader.on_apply_style_color = function (v) {
		if (this._yearStatic) {
			this._yearStatic.on_apply_style_color(v);
		}
		if (this._monthStatic) {
			this._monthStatic.on_apply_style_color(v);
		}
	};

	_pDatePickerHeader.on_apply_style_font = function (v) {
		if (this._yearStatic) {
			this._yearStatic.on_apply_style_font(v);
		}
		if (this._monthStatic) {
			this._monthStatic.on_apply_style_font(v);
		}
	};

	_pDatePickerHeader.on_create_contents = function () {
		this._prevButton = new nexacro.PrevButtonCtrl("prevbutton", "absolute", 0, 0, 0, 0, null, null, this);
		this._nextButton = new nexacro.NextButtonCtrl("nextbutton", "absolute", 0, 0, 0, 0, null, null, this);
		this._yearStatic = new nexacro.HeaderStaticCtrl("yearStatic", "absolute", 0, 0, 0, 0, null, null, this);
		this._monthStatic = new nexacro.HeaderStaticCtrl("monthStatic", "absolute", 0, 0, 0, 0, null, null, this);
		this._yearSpin = new nexacro.HeaderSpinCtrl("yearspin", "absolute", 0, 0, 0, 0, null, null, this);
		this._monthSpin = new nexacro.HeaderSpinCtrl("monthspin", "absolute", 0, 0, 0, 0, null, null, this);

		this._prevButton.createComponent();
		this._nextButton.createComponent();
		this._yearStatic.createComponent();
		this._monthStatic.createComponent();
		this._yearSpin.createComponent();
		this._monthSpin.createComponent();

		this._yearSpin.set_visible(false);
		this._yearSpin.set_min("0");
		this._yearSpin.set_max("9999");
		this._yearSpin.set_circulation(true);
		this._yearSpin.set_displaycomma(false);

		this._monthSpin.set_visible(false);
		this._monthSpin.set_min("1");
		this._monthSpin.set_max("12");
		this._monthSpin.set_circulation(true);
		this._monthSpin.set_displaycomma(false);
	};

	_pDatePickerHeader.on_created_contents = function () {
		this.on_apply_prop_enable(this.enable);

		this._prevButton._setEventHandler("onclick", this.on_notify_header_onprevclick, this);
		this._nextButton._setEventHandler("onclick", this.on_notify_header_onnextclick, this);

		this._yearStatic._setEventHandler("onlbuttondown", this.on_notify_header_onyearstatic_lbuttondown, this);
		this._yearStatic._setEventHandler("ontouchend", this.on_notify_header_onyearstatic_lbuttondown, this);
		this._monthStatic._setEventHandler("onlbuttondown", this.on_notify_header_onmonthstatic_lbuttondown, this);
		this._monthStatic._setEventHandler("ontouchend", this.on_notify_header_onmonthstatic_lbuttondown, this);

		this._yearSpin._setEventHandler("oneditclick", this.on_notify_header_onyearclick, this);
		this._yearSpin._setEventHandler("onspin", this.on_notify_header_onyearspin, this);

		this._monthSpin._setEventHandler("oneditclick", this.on_notify_header_onmonthclick, this);
		this._monthSpin._setEventHandler("onspin", this.on_notify_header_onmonthspin, this);

		this._yearSpin.set_value(this._year);
		this._monthSpin.set_value(this._month);

		this._prevButton.on_created();
		this._nextButton.on_created();
		this._yearStatic.on_created();
		this._monthStatic.on_created();
		this._yearSpin.on_created();
		this._monthSpin.on_created();

		this._yearSpin.spinedit.set_enable(false);
		this._monthSpin.spinedit.set_enable(false);

		this.on_apply_prop_rtldirection();
	};

	_pDatePickerHeader.on_destroy_contents = function () {
		if (this._prevButton) {
			this._prevButton.destroy();
			this._prevButton = null;
		}
		if (this._nextButton) {
			this._nextButton.destroy();
			this._nextButton = null;
		}
		if (this._yearStatic) {
			this._yearStatic.destroy();
			this._yearStatic = null;
		}
		if (this._monthStatic) {
			this._monthStatic.destroy();
			this._monthStatic = null;
		}
		if (this._yearSpin) {
			this._yearSpin.destroy();
			this._yearSpin = null;
		}
		if (this._monthSpin) {
			this._monthSpin.destroy();
			this._monthSpin = null;
		}
	};

	_pDatePickerHeader.on_change_containerRect = function (widht, height) {
		this._resizeHeader();
	};

	_pDatePickerHeader.on_apply_prop_enable = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._prevButton) {
				this._prevButton._setEnable(v);
			}
			if (this._nextButton) {
				this._nextButton._setEnable(v);
			}
			if (this._yearStatic) {
				this._yearStatic._setEnable(v);
			}
			if (this._monthStatic) {
				this._monthStatic._setEnable(v);
			}
		}
	};

	_pDatePickerHeader.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var control_elem = this.getElement();
		if (control_elem) {
			this.on_change_containerRect();

			var _rtldirection = this._rtldirection;

			if (this._prevButton) {
				this._prevButton._setRtlDirection(_rtldirection);
				var rtlimagemirroring = this._prevButton.on_find_CurrentStyle_rtlimagemirroring(this._pseudo);
				if (_rtldirection == "rtl") {
					rtlimagemirroring._setValue("true");
				}
				else {
					rtlimagemirroring._setValue("false");
				}
				this._prevButton.on_apply_style_rtlimagemirroring(rtlimagemirroring);
			}
			if (this._nextButton) {
				this._nextButton._setRtlDirection(_rtldirection);
				var rtlimagemirroring = this._nextButton.on_find_CurrentStyle_rtlimagemirroring(this._pseudo);
				if (_rtldirection == "rtl") {
					rtlimagemirroring._setValue("true");
				}
				else {
					rtlimagemirroring._setValue("false");
				}
				this._nextButton.on_apply_style_rtlimagemirroring(rtlimagemirroring);
			}

			if (this._yearStatic) {
				this._yearStatic._setRtlDirection("ltr");
			}
			if (this._monthStatic) {
				this._monthStatic._setRtlDirection("ltr");
			}
			if (this._yearSpin) {
				this._yearSpin._setRtlDirection("ltr");
			}
			if (this._monthSpin) {
				this._monthSpin._setRtlDirection("ltr");
			}
		}
	};

	_pDatePickerHeader.on_apply_custom_setfocus = function (evt_name) {
	};

	_pDatePickerHeader.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pDatePickerHeader.on_apply_readonly = function () {
		var v = this.readonly;
		var control_elem = this.getElement();

		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		if (control_elem) {
			var yearSpin = this._yearSpin;
			if (yearSpin) {
				yearSpin.set_readonly(v);
			}
			var monthSpin = this._monthSpin;
			if (monthSpin) {
				monthSpin.set_readonly(v);
			}
		}
	};

	_pDatePickerHeader._setYear = function (v) {
		if (v != this._year) {
			this._year = v;
			this.on_apply_year();
		}
	};

	_pDatePickerHeader.on_apply_year = function () {
		var control_elem = this.getElement();
		if (control_elem && this._yearStatic) {
			var year = this._year;
			if (year === null || year === undefined || year === "") {
				var date = new Date();
				year = date.getFullYear();
				date = null;
			}
			else {
				year = parseInt(year, 10);

				if (year < 10) {
					year = "000" + year;
				}
				else if (year < 100) {
					year = "00" + year;
				}
				else if (year < 1000) {
					year = "0" + year;
				}
			}
			var headerformat = this.on_find_CurrentStyle_headerformat(this._pseudo);
			this._yearStatic.set_text(year + (((this.on_find_CurrentStyle_headerformat(this._pseudo)) == "MM.yyyy") ? "" : "."));
			this._yearSpin.set_value(year);
		}
	};

	_pDatePickerHeader._setMonth = function (v) {
		if (v != this._month) {
			this._month = v;
			this.on_apply_month();
		}
	};

	_pDatePickerHeader.on_apply_month = function () {
		var control_elem = this.getElement();
		if (control_elem && this._monthStatic) {
			var month = this._month;
			if (month === null || month === undefined || month === "") {
				var date = new Date();
				month = date.getMonth() + 1;
				date = null;
			}
			else {
				month = parseInt(month, 10);
				month = (month < 10 ? "0" : "") + month;
			}

			this._monthStatic.set_text(month + (((this.on_find_CurrentStyle_headerformat(this._pseudo)) == "MM.yyyy") ? "." : ""));
			this._monthSpin.set_value(month);
		}
	};

	_pDatePickerHeader._setDay = function (v) {
		if (v != this._day) {
			this._day = v;
		}
	};

	_pDatePickerHeader._setViewYearSpin = function (v) {
		if (typeof v == 'object') {
			v = (v.value !== undefined) ? nexacro._toBoolean(v.value) : true;
		}
		else {
			v = nexacro._toBoolean(v);
		}
		if (v != this._viewyearspin) {
			this._viewyearspin = v;
			this.on_apply_viewyearspin();
		}
	};

	_pDatePickerHeader.on_apply_viewyearspin = function () {
		this.hide_spindate();
	};

	_pDatePickerHeader._setViewMonthSpin = function (v) {
		if (typeof v == 'object') {
			v = (v.value !== undefined) ? nexacro._toBoolean(v.value) : true;
		}
		else {
			v = nexacro._toBoolean(v);
		}
		if (v != this._viewmonthspin) {
			this._viewmonthspin = v;
			this.on_apply_viewmonthspin();
		}
	};

	_pDatePickerHeader.on_apply_viewmonthspin = function () {
		this.hide_spindate();
	};

	_pDatePickerHeader._setFormat = function (v) {
		if (v != this._format) {
			this._format = v;
			this.on_apply_format();
		}
	};
	_pDatePickerHeader.on_apply_format = function () {
		;
	};


	_pDatePickerHeader.on_notify_header_onprevclick = function (obj, e) {
		if (!this.enable || this.readonly) {
			return false;
		}

		var month = parseInt(this._month, 10);
		var year = parseInt(this._year, 10);

		if (month == 1) {
			month = 12;
			if (year <= 1) {
				year = 10000;
			}

			this._setYear(year - 1);
		}
		else {
			month--;
		}

		this.hide_spindate();

		this._setMonth(month);
		this.on_fire_onprevclick(obj, e);
	};

	_pDatePickerHeader.on_notify_header_onnextclick = function (obj, e) {
		if (!this.enable || this.readonly) {
			return false;
		}

		var month = parseInt(this._month, 10);
		var year = parseInt(this._year, 10);

		if (month == 12) {
			month = 1;
			if (year == 9999) {
				year = 0;
			}
			else {
				year += 1;
			}
		}
		else {
			month++;
		}

		this.hide_spindate();

		this._setYear(year);
		this._setMonth(month);
		this.on_fire_onnextclick(obj, e);
	};

	_pDatePickerHeader.on_notify_header_onyearstatic_lbuttondown = function (obj, e) {
		if (!this.enable || this.readonly) {
			return false;
		}

		if (this._yearSpin) {
			this._yearStatic.set_visible(false);
			this._yearSpin.set_visible(true);
			this._yearSpin.set_value(this._year);
		}
	};

	_pDatePickerHeader.on_notify_header_onmonthstatic_lbuttondown = function (obj, e) {
		if (!this.enable || this.readonly) {
			return false;
		}

		if (this._monthSpin) {
			this._monthStatic.set_visible(false);
			this._monthSpin.set_visible(true);

			this._monthSpin.set_value(this._month);
		}
	};

	_pDatePickerHeader.on_notify_header_onyearclick = function (obj, e) {
		if (!this.enable || this.readonly) {
			return false;
		}
	};

	_pDatePickerHeader.on_notify_header_onyearspin = function (obj, e) {
		if (this._yearSpin) {
			this._setYear(e.postvalue);
			this.on_fire_onyearspin(obj, e);
		}
	};

	_pDatePickerHeader.on_notify_header_onmonthclick = function (obj, e) {
		if (!this.enable || this.readonly) {
			return false;
		}
	};

	_pDatePickerHeader.on_notify_header_onmonthspin = function (obj, e) {
		if (this._monthSpin) {
			var v = parseInt(e.postvalue, 10);
			if (v < 1) {
				v = 12;
				obj.set_value(v);
			}
			else if (v > 12) {
				v = 1;
				obj.set_value(v);
			}

			this._setMonth(v);
			this.on_fire_onmonthspin(obj, e);
		}
	};

	_pDatePickerHeader.on_fire_onprevclick = function (obj, e) {
		if (this.onprevclick && this.onprevclick._has_handlers) {
			return this.onprevclick._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerHeader.on_fire_onnextclick = function (obj, e) {
		if (this.onnextclick && this.onnextclick._has_handlers) {
			return this.onnextclick._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerHeader.on_fire_onyearspin = function (obj, e) {
		if (this.onyearspin && this.onyearspin._has_handlers) {
			return this.onyearspin._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerHeader.on_fire_onmonthspin = function (obj, e) {
		if (this.onmonthspin && this.onmonthspin._has_handlers) {
			return this.onmonthspin._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerHeader.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);

		var p_id = from_elem ? from_elem.parent.parent.id : "";
		var pp_id = from_elem ? from_elem.parent.parent.parent.id : "";

		if (this._getWindow()._cur_ldown_elem == from_elem && (p_id != "yearspin" && p_id != "monthspin" && p_id != "yearStatic" && p_id != "monthStatic") && (pp_id != "yearspin" && pp_id != "monthspin" && pp_id != "yearStatic" && pp_id != "monthStatic")) {
			this.hide_spindate();
		}

		return ret;
	};

	_pDatePickerHeader.hide_spindate = function () {
		if (this._yearStatic || this._monthStatic) {
			var is_viewyear = this._viewyearspin;
			var is_viewmonth = this._viewmonthspin;
			if (is_viewyear) {
				if (is_viewmonth) {
					this._yearStatic.set_visible(false);
					this._yearSpin.set_visible(true);
					this._monthStatic.set_visible(false);
					this._monthSpin.set_visible(true);
				}
				else {
					this._yearStatic.set_visible(false);
					this._yearSpin.set_visible(true);
					this._monthStatic.set_visible(true);
					this._monthSpin.set_visible(false);
				}
			}
			else {
				if (is_viewmonth) {
					this._yearStatic.set_visible(true);
					this._yearSpin.set_visible(false);
					this._monthStatic.set_visible(false);
					this._monthSpin.set_visible(true);
				}
				else {
					this._yearStatic.set_visible(true);
					this._yearSpin.set_visible(false);
					this._monthStatic.set_visible(true);
					this._monthSpin.set_visible(false);
				}
			}
		}
	};

	_pDatePickerHeader._resizeHeader = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var clientWidth = this._client_width;
			var clientHeight = this._client_height;

			var prevBtn_l = 0;
			var prevBtn_t = 0;
			var prevBtn_w = clientHeight;
			var prevBtn_h = clientHeight;

			var nextBtn_l = clientWidth - clientHeight;
			var nextBtn_t = 0;
			var nextBtn_w = clientHeight;
			var nextBtn_h = clientHeight;

			var font = this.on_find_CurrentStyle_font(this._pseudo);
			var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
			var headerformat = this.on_find_CurrentStyle_headerformat(this._pseudo);

			var month = this._month < 10 ? "0" + parseInt(this._month, 10) : this._month + "";
			var yearTextSize = nexacro._getTextSize2(letterspace, this._year + ".", font);
			var monthTextSize = nexacro._getTextSize2(letterspace, this._month + ".", font);
			var yearWidth = yearTextSize[0] + 2;
			var yearHeight = yearTextSize[1];
			var monthWidth = monthTextSize[0] + 2;
			var monthHeight = monthTextSize[1];
			var offset_x = (((prevBtn_l + prevBtn_w) + nextBtn_l) / 2) - ((yearWidth + monthWidth) / 2);

			if (headerformat == "MM.yyyy") {
				var monthStatic_l = offset_x;
				var monthStatic_w = monthWidth;
				var yearStatic_l = monthStatic_l + monthStatic_w;
				var yearStatic_w = yearWidth;
			}
			else {
				var yearStatic_l = offset_x;
				var yearStatic_w = yearWidth;
				var monthStatic_l = yearStatic_l + yearStatic_w;
				var monthStatic_w = monthWidth;
			}
			var yearStatic_t = 0;
			var monthStatic_t = 0;
			var monthStatic_h = clientHeight;
			var yearStatic_h = clientHeight;

			var fontSize = parseInt(font.size, 10);
			var spinHeight = fontSize + 10;
			var spin_top = Math.ceil((clientHeight - spinHeight) / 2);
			var spin_alpha = (fontSize * 1.7);

			var yearSpin_t = spin_top;
			var yearSpin_w = yearWidth + spin_alpha;
			var yearSpin_h = spinHeight;
			var monthSpin_t = spin_top;
			var monthSpin_w = monthWidth + spin_alpha;
			var monthSpin_h = spinHeight;

			if (headerformat == "MM.yyyy") {
				var yearSpin_l = yearStatic_l + 1;
				var monthSpin_l = monthStatic_l - spin_alpha;
			}
			else {
				var yearSpin_l = offset_x - spin_alpha;
				var monthSpin_l = monthStatic_l + 1;
			}

			var prevButton = this._prevButton;
			var nextButton = this._nextButton;
			var yearStatic = this._yearStatic;
			var monthStatic = this._monthStatic;
			var yearSpin = this._yearSpin;
			var monthSpin = this._monthSpin;

			if (prevButton) {
				prevButton.move(prevBtn_l, prevBtn_t, prevBtn_w, prevBtn_h, null, null);
			}
			if (nextButton) {
				nextButton.move(nextBtn_l, nextBtn_t, nextBtn_w, nextBtn_h, null, null);
			}

			var rtl = this._rtldirection;
			this._rtldirection = "ltr";
			if (yearStatic) {
				yearStatic.move(yearStatic_l, yearStatic_t, yearStatic_w, yearStatic_h, null, null);
			}
			if (monthStatic) {
				monthStatic.move(monthStatic_l, monthStatic_t, monthStatic_w, monthStatic_h, null, null);
			}

			if (yearSpin) {
				yearSpin.move(yearSpin_l, yearSpin_t, yearSpin_w, yearSpin_h, null, null);
			}
			if (monthSpin) {
				monthSpin.move(monthSpin_l, monthSpin_t, monthSpin_w, monthSpin_h, null, null);
			}

			this._rtldirection = rtl;
		}
	};

	nexacro.PrevButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pPrevButtonCtrl = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.PrevButtonCtrl);
	nexacro.PrevButtonCtrl.prototype = _pPrevButtonCtrl;

	_pPrevButtonCtrl._makeCssRefInfo = function () {
		return (this.parent.parent._makeCssRefInfoCtrl(this));
	};

	nexacro.NextButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pNextButtonCtrl = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.NextButtonCtrl);
	nexacro.NextButtonCtrl.prototype = _pNextButtonCtrl;

	_pNextButtonCtrl._makeCssRefInfo = function () {
		return (this.parent.parent._makeCssRefInfoCtrl(this));
	};

	nexacro.HeaderStaticCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;
	};
	var _pHeaderStaticCtrl = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.HeaderStaticCtrl);
	nexacro.HeaderStaticCtrl.prototype = _pHeaderStaticCtrl;

	_pHeaderStaticCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_font(pseudo) || this._find_inherit_pseudo_obj("font", pseudo) || nexacro.Component._default_font;
	};
	_pHeaderStaticCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent.on_find_CurrentStyle_color(pseudo) || this._find_inherit_pseudo_obj("color", pseudo) || nexacro.Component._default_color;
	};

	nexacro.HeaderSpinCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.SpinCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;
	};
	var _pHeaderSpinCtrl = nexacro._createPrototype(nexacro.SpinCtrl, nexacro.HeaderSpinCtrl);
	nexacro.HeaderSpinCtrl.prototype = _pHeaderSpinCtrl;

	_pHeaderSpinCtrl.on_find_CurrentStyle_buttonsize = function (pseudo) {
		var size = this._client_height;
		return size;
	};

	_pHeaderSpinCtrl._makeCssRefInfo = function () {
		return (this.parent.parent._makeCssRefInfoCtrl(this));
	};

	delete _pPrevButtonCtrl;
	delete _pNextButtonCtrl;
	delete _pHeaderStaticCtrl;
	delete _pHeaderSpinCtrl;

	nexacro.DatePickerBody_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
	};

	var _pDatePickerBodyStyle = nexacro._createPrototype(nexacro.Style, nexacro.DatePickerBody_Style);
	nexacro.DatePickerBody_Style.prototype = _pDatePickerBodyStyle;

	eval(nexacro._createValueAttributeEvalStr("_pDatePickerBodyStyle", "usetrailingday"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerBodyStyle", "weekformat"));
	eval(nexacro._createValueAttributeEvalStr("_pDatePickerBodyStyle", "daysize"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerBodyStyle", "daycolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerBodyStyle", "daybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerBodyStyle", "daygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerBodyStyle", "dayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerBodyStyle", "daybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerBodyStyle", "dayfont"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerBodyStyle", "weekcolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerBodyStyle", "weekbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerBodyStyle", "weekgradation"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerBodyStyle", "weekfont"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerBodyStyle", "saturdaycolor"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerBodyStyle", "sundaycolor"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerBodyStyle", "todaycolor"));
	eval(nexacro._createColorAttributeEvalStr("_pDatePickerBodyStyle", "trailingdaycolor"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerBodyStyle", "todaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerBodyStyle", "todaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerBodyStyle", "todayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerBodyStyle", "todaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerBodyStyle", "todayfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerBodyStyle", "saturdaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerBodyStyle", "saturdaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerBodyStyle", "saturdayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerBodyStyle", "saturdaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerBodyStyle", "saturdayfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerBodyStyle", "sundaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerBodyStyle", "sundaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerBodyStyle", "sundayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerBodyStyle", "sundaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerBodyStyle", "sundayfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pDatePickerBodyStyle", "trailingdaybackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pDatePickerBodyStyle", "trailingdaygradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pDatePickerBodyStyle", "trailingdayborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pDatePickerBodyStyle", "trailingdaybordertype"));
	eval(nexacro._createFontAttributeEvalStr("_pDatePickerBodyStyle", "trailingdayfont"));

	_pDatePickerBodyStyle.__custom_emptyObject = function () {
		this.usetrailingday = null;
		this.weekformat = null;
		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;
		this.weekcolor = null;
		this.weekbackground = null;
		this.weekgradation = null;
		this.weekfont = null;
		this.saturdaycolor = null;
		this.sundaycolor = null;
		this.todaycolor = null;
		this.trailingdaycolor = null;
		this.todaybackground = null;
		this.todaygradation = null;
		this.todayborder = null;
		this.todaybordertype = null;
		this.todayfont = null;
		this.saturdaybackground = null;
		this.saturdaygradation = null;
		this.saturdayborder = null;
		this.saturdaybordertype = null;
		this.saturdayfont = null;
		this.sundaybackground = null;
		this.sundaygradation = null;
		this.sundayborder = null;
		this.sundaybordertype = null;
		this.sundayfont = null;
		this.trailingdaybackground = null;
		this.trailingdaygradation = null;
		this.trailingdayborder = null;
		this.trailingdaybordertype = null;
		this.trailingdayfont = null;
	};

	_pDatePickerBodyStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.usetrailingday && !this.usetrailingday._is_empty) {
			val += "usetrailingday:" + this.usetrailingday._value + "; ";
		}
		if (this.weekformat && !this.weekformat._is_empty) {
			val += "weekformat:" + this.weekformat._value + "; ";
		}
		if (this.daysize && !this.daysize._is_empty) {
			val += "daysize:" + this.daysize._value + "; ";
		}
		if (this.daycolor && !this.daycolor._is_empty) {
			val += "daycolor:" + this.daycolor._value + "; ";
		}
		if (this.daybackground && !this.daybackground._is_empty) {
			val += "daybackground:" + this.daybackground._value + "; ";
		}
		if (this.daygradation && !this.daygradation._is_empty) {
			val += "daygradation:" + this.daygradation._value + "; ";
		}
		if (this.dayborder && !this.dayborder._is_empty) {
			val += "dayborder:" + this.dayborder._value + "; ";
		}
		if (this.daybordertype && !this.daybordertype._is_empty) {
			val += "daybordertype:" + this.daybordertype._value + "; ";
		}
		if (this.dayfont && !this.dayfont._is_empty) {
			val += "dayfont:" + this.dayfont._value + "; ";
		}
		if (this.weekcolor && !this.weekcolor._is_empty) {
			val += "weekcolor:" + this.weekcolor._value + "; ";
		}
		if (this.weekbackground && !this.weekbackground._is_empty) {
			val += "weekbackground:" + this.weekbackground._value + "; ";
		}
		if (this.weekgradation && !this.weekgradation._is_empty) {
			val += "weekgradation:" + this.weekgradation._value + "; ";
		}
		if (this.weekfont && !this.weekfont._is_empty) {
			val += "weekfont:" + this.weekfont._value + "; ";
		}
		if (this.saturdaycolor && !this.saturdaycolor._is_empty) {
			val += "saturdaycolor:" + this.saturdaycolor._value + "; ";
		}
		if (this.sundaycolor && !this.sundaycolor._is_empty) {
			val += "sundaycolor:" + this.sundaycolor._value + "; ";
		}
		if (this.todaycolor && !this.todaycolor._is_empty) {
			val += "todaycolor:" + this.todaycolor._value + "; ";
		}
		if (this.trailingdaycolor && !this.trailingdaycolor._is_empty) {
			val += "trailingdaycolor:" + this.trailingdaycolor._value + "; ";
		}
		if (this.todaybackground && !this.todaybackground._is_empty) {
			val += "todaybackground:" + this.todaybackground._value + "; ";
		}
		if (this.todaygradation && !this.todaygradation._is_empty) {
			val += "todaygradation:" + this.todaygradation._value + "; ";
		}
		if (this.todayborder && !this.todayborder._is_empty) {
			val += "todayborder:" + this.todayborder._value + "; ";
		}
		if (this.todaybordertype && !this.todaybordertype._is_empty) {
			val += "todaybordertype:" + this.todaybordertype._value + "; ";
		}
		if (this.todayfont && !this.todayfont._is_empty) {
			val += "todayfont:" + this.todayfont._value + "; ";
		}
		if (this.saturdaybackground && !this.saturdaybackground._is_empty) {
			val += "saturdaybackground:" + this.saturdaybackground._value + "; ";
		}
		if (this.saturdaygradation && !this.saturdaygradation._is_empty) {
			val += "saturdaygradation:" + this.saturdaygradation._value + "; ";
		}
		if (this.saturdayborder && !this.saturdayborder._is_empty) {
			val += "saturdayborder:" + this.saturdayborder._value + "; ";
		}
		if (this.saturdaybordertype && !this.saturdaybordertype._is_empty) {
			val += "saturdaybordertype:" + this.saturdaybordertype._value + "; ";
		}
		if (this.saturdayfont && !this.saturdayfont._is_empty) {
			val += "saturdayfont:" + this.saturdayfont._value + "; ";
		}
		if (this.sundaybackground && !this.sundaybackground._is_empty) {
			val += "sundaybackground:" + this.sundaybackground._value + "; ";
		}
		if (this.sundaygradation && !this.sundaygradation._is_empty) {
			val += "sundaygradation:" + this.sundaygradation._value + "; ";
		}
		if (this.sundayborder && !this.sundayborder._is_empty) {
			val += "sundayborder:" + this.sundayborder._value + "; ";
		}
		if (this.sundaybordertype && !this.sundaybordertype._is_empty) {
			val += "sundaybordertype:" + this.sundaybordertype._value + "; ";
		}
		if (this.sundayfont && !this.sundayfont._is_empty) {
			val += "sundayfont:" + this.sundayfont._value + "; ";
		}
		if (this.trailingdaybackground && !this.trailingdaybackground._is_empty) {
			val += "trailingdaybackground:" + this.trailingdaybackground._value + "; ";
		}
		if (this.trailingdaygradation && !this.trailingdaygradation._is_empty) {
			val += "trailingdaygradation:" + this.trailingdaygradation._value + "; ";
		}
		if (this.trailingdayborder && !this.trailingdayborder._is_empty) {
			val += "trailingdayborder:" + this.trailingdayborder._value + "; ";
		}
		if (this.trailingdaybordertype && !this.trailingdaybordertype._is_empty) {
			val += "trailingdaybordertype:" + this.trailingdaybordertype._value + "; ";
		}
		if (this.trailingdayfont && !this.trailingdayfont._is_empty) {
			val += "trailingdayfont:" + this.trailingdayfont._value + "; ";
		}

		return val;
	};

	nexacro.DatePickerBody_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.usetrailingday = null;
		this.weekformat = null;
		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;
		this.weekcolor = null;
		this.weekbackground = null;
		this.weekgradation = null;
		this.weekfont = null;
		this.saturdaycolor = null;
		this.sundaycolor = null;
		this.todaycolor = null;
		this.trailingdaycolor = null;
		this.todaybackground = null;
		this.todaygradation = null;
		this.todayborder = null;
		this.todaybordertype = null;
		this.todayfont = null;
		this.saturdaybackground = null;
		this.saturdaygradation = null;
		this.saturdayborder = null;
		this.saturdaybordertype = null;
		this.saturdayfont = null;
		this.sundaybackground = null;
		this.sundaygradation = null;
		this.sundayborder = null;
		this.sundaybordertype = null;
		this.sundayfont = null;
		this.trailingdaybackground = null;
		this.trailingdaygradation = null;
		this.trailingdayborder = null;
		this.trailingdaybordertype = null;
		this.trailingdayfont = null;
	};

	var _pDatePickerBodyCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.DatePickerBody_CurrentStyle);
	nexacro.DatePickerBody_CurrentStyle.prototype = _pDatePickerBodyCurrentStyle;

	_pDatePickerBodyCurrentStyle.__custom_emptyObject = _pDatePickerBodyStyle.__custom_emptyObject;
	_pDatePickerBodyCurrentStyle.__get_custom_style_value = _pDatePickerBodyStyle.__get_custom_style_value;

	delete _pDatePickerBodyStyle;
	delete _pDatePickerBodyCurrentStyle;

	nexacro.DatePickerBody = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;

		this._weekBg = null;
		this._weeks = [];
		this._days = [];
		this._changedDays = [];
		this._calendar = parent._calendar;

		this._event_list = {
			"ondayclick" : 1
		};
	};

	var _pDatePickerBody = nexacro._createPrototype(nexacro.Component, nexacro.DatePickerBody);
	nexacro.DatePickerBody.prototype = _pDatePickerBody;
	_pDatePickerBody._type_name = "DatePickerBody";

	_pDatePickerBody._weeks = null;
	_pDatePickerBody._days = null;
	_pDatePickerBody._year = "";
	_pDatePickerBody._month = "";
	_pDatePickerBody._day = "";
	_pDatePickerBody._changedDays = null;
	_pDatePickerBody._endDayN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	_pDatePickerBody._endDayL = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	_pDatePickerBody.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}
		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		var daysize = this.on_find_CurrentStyle_daysize(pseudo);
		if (curstyle.daysize != daysize) {
			curstyle.daysize = daysize;
		}
		var daycolor = this.on_find_CurrentStyle_daycolor(pseudo);
		if (curstyle.daycolor != daycolor) {
			curstyle.daycolor = daycolor;
		}
		var daybackground = this.on_find_CurrentStyle_daybackground(pseudo);
		if (curstyle.daybackground != daybackground) {
			curstyle.daybackground = daybackground;
		}
		var daygradation = this.on_find_CurrentStyle_daygradation(pseudo);
		if (curstyle.daygradation != daygradation) {
			curstyle.daygradation = daygradation;
		}
		var dayborder = this.on_find_CurrentStyle_dayborder(pseudo);
		if (curstyle.dayborder != dayborder) {
			curstyle.dayborder = dayborder;
		}
		var daybordertype = this.on_find_CurrentStyle_daybordertype(pseudo);
		if (curstyle.daybordertype != daybordertype) {
			curstyle.daybordertype = daybordertype;
		}
		var dayfont = this.on_find_CurrentStyle_dayfont(pseudo);
		if (curstyle.dayfont != dayfont) {
			curstyle.dayfont = dayfont;
		}

		var weekformat = this.on_find_CurrentStyle_weekformat(pseudo);
		if (curstyle.weekformat != weekformat) {
			curstyle.weekformat = weekformat;
			this.on_apply_style_weekformat(weekformat);
		}
		var weekcolor = this.on_find_CurrentStyle_weekcolor(pseudo);
		if (curstyle.weekcolor != weekcolor) {
			curstyle.weekcolor = weekcolor;
		}
		var weekbackground = this.on_find_CurrentStyle_weekbackground(pseudo);
		if (curstyle.weekbackground != weekbackground) {
			curstyle.weekbackground = weekbackground;
		}
		var weekgradation = this.on_find_CurrentStyle_weekgradation(pseudo);
		if (curstyle.weekgradation != weekgradation) {
			curstyle.weekgradation = weekgradation;
		}
		var weekfont = this.on_find_CurrentStyle_weekfont(pseudo);
		if (curstyle.weekfont != weekfont) {
			curstyle.weekfont = weekfont;
		}

		var todaycolor = this.on_find_CurrentStyle_todaycolor(pseudo);
		if (curstyle.todaycolor != todaycolor) {
			curstyle.todaycolor = todaycolor;
		}
		var todaybackground = this.on_find_CurrentStyle_todaybackground(pseudo);
		if (curstyle.todaybackground != todaybackground) {
			curstyle.todaybackground = todaybackground;
		}
		var todaygradation = this.on_find_CurrentStyle_todaygradation(pseudo);
		if (curstyle.todaygradation != todaygradation) {
			curstyle.todaygradation = todaygradation;
		}
		var todaybordertype = this.on_find_CurrentStyle_todaybordertype(pseudo);
		if (curstyle.todaybordertype != todaybordertype) {
			curstyle.todaybordertype = todaybordertype;
		}
		var todayborder = this.on_find_CurrentStyle_todayborder(pseudo);
		if (curstyle.todayborder != todayborder) {
			curstyle.todayborder = todayborder;
		}
		var todayfont = this.on_find_CurrentStyle_todayfont(pseudo);
		if (curstyle.todayfont != todayfont) {
			curstyle.todayfont = todayfont;
		}

		var saturdaycolor = this.on_find_CurrentStyle_saturdaycolor(pseudo);
		if (curstyle.saturdaycolor != saturdaycolor) {
			curstyle.saturdaycolor = saturdaycolor;
		}
		var saturdaybackground = this.on_find_CurrentStyle_saturdaybackground(pseudo);
		if (curstyle.saturdaybackground != saturdaybackground) {
			curstyle.saturdaybackground = saturdaybackground;
		}
		var saturdaygradation = this.on_find_CurrentStyle_saturdaygradation(pseudo);
		if (curstyle.saturdaygradation != saturdaygradation) {
			curstyle.saturdaygradation = saturdaygradation;
		}
		var saturdaybordertype = this.on_find_CurrentStyle_saturdaybordertype(pseudo);
		if (curstyle.saturdaybordertype != saturdaybordertype) {
			curstyle.saturdaybordertype = saturdaybordertype;
		}
		var saturdayborder = this.on_find_CurrentStyle_saturdayborder(pseudo);
		if (curstyle.saturdayborder != saturdayborder) {
			curstyle.saturdayborder = saturdayborder;
		}
		var saturdayfont = this.on_find_CurrentStyle_saturdayfont(pseudo);
		if (curstyle.saturdayfont != saturdayfont) {
			curstyle.saturdayfont = saturdayfont;
		}

		var sundaycolor = this.on_find_CurrentStyle_sundaycolor(pseudo);
		if (curstyle.sundaycolor != sundaycolor) {
			curstyle.sundaycolor = sundaycolor;
		}
		var sundaybackground = this.on_find_CurrentStyle_sundaybackground(pseudo);
		if (curstyle.sundaybackground != sundaybackground) {
			curstyle.sundaybackground = sundaybackground;
		}
		var sundaygradation = this.on_find_CurrentStyle_sundaygradation(pseudo);
		if (curstyle.sundaygradation != sundaygradation) {
			curstyle.sundaygradation = sundaygradation;
		}
		var sundaybordertype = this.on_find_CurrentStyle_sundaybordertype(pseudo);
		if (curstyle.sundaybordertype != sundaybordertype) {
			curstyle.sundaybordertype = sundaybordertype;
		}
		var sundayborder = this.on_find_CurrentStyle_sundayborder(pseudo);
		if (curstyle.sundayborder != sundayborder) {
			curstyle.sundayborder = sundayborder;
		}
		var sundayfont = this.on_find_CurrentStyle_sundayfont(pseudo);
		if (curstyle.sundayfont != sundayfont) {
			curstyle.sundayfont = sundayfont;
		}

		var usetrailingday = this.on_find_CurrentStyle_usetrailingday(pseudo);
		if (curstyle.usetrailingday != usetrailingday) {
			curstyle.usetrailingday = usetrailingday;
		}

		var trailingdaycolor = this.on_find_CurrentStyle_trailingdaycolor(pseudo);
		if (curstyle.trailingdaycolor != trailingdaycolor) {
			curstyle.trailingdaycolor = trailingdaycolor;
		}
		var trailingdaybackground = this.on_find_CurrentStyle_trailingdaybackground(pseudo);
		if (curstyle.trailingdaybackground != trailingdaybackground) {
			curstyle.trailingdaybackground = trailingdaybackground;
		}
		var trailingdaygradation = this.on_find_CurrentStyle_trailingdaygradation(pseudo);
		if (curstyle.trailingdaygradation != trailingdaygradation) {
			curstyle.trailingdaygradation = trailingdaygradation;
		}
		var trailingdaybordertype = this.on_find_CurrentStyle_trailingdaybordertype(pseudo);
		if (curstyle.trailingdaybordertype != trailingdaybordertype) {
			curstyle.trailingdaybordertype = trailingdaybordertype;
		}
		var trailingdayborder = this.on_find_CurrentStyle_trailingdayborder(pseudo);
		if (curstyle.trailingdayborder != trailingdayborder) {
			curstyle.trailingdayborder = trailingdayborder;
		}
		var trailingdayfont = this.on_find_CurrentStyle_trailingdayfont(pseudo);
		if (curstyle.trailingdayfont != trailingdayfont) {
			curstyle.trailingdayfont = trailingdayfont;
		}
	};

	_pDatePickerBody.on_create_custom_style = function () {
		return new nexacro.DatePickerBody_Style(this);
	};

	_pDatePickerBody.on_create_custom_currentStyle = function () {
		return new nexacro.DatePickerBody_CurrentStyle();
	};


	_pDatePickerBody.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodybackground(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodyborder(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodybordertype(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodygradation(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent.on_find_CurrentStyle_daycolor(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_daysize = function (pseudo) {
		return this.parent.on_find_CurrentStyle_daysize(pseudo) || this._find_pseudo_obj("daysize", pseudo) || nexacro.DatePicker._defaultDaysize;
	};

	_pDatePickerBody.on_find_CurrentStyle_daybackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_daybackground(pseudo) || this._find_pseudo_obj("daybackground", pseudo, "background");
	};

	_pDatePickerBody.on_find_CurrentStyle_daygradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_daygradation(pseudo) || this._find_pseudo_obj("daygradation", pseudo, "gradation");
	};

	_pDatePickerBody.on_find_CurrentStyle_dayborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_dayborder(pseudo) || this._find_pseudo_obj("dayborder", pseudo, "border");
	};

	_pDatePickerBody.on_find_CurrentStyle_daybordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_daybordertype(pseudo) || this._find_pseudo_obj("daybordertype", pseudo, "bordertype");
	};

	_pDatePickerBody.on_find_CurrentStyle_daycolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_daycolor(pseudo) || this._find_pseudo_obj("daycolor", pseudo, "color") || this._find_inherit_pseudo_obj("daycolor", pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_dayfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_dayfont(pseudo) || this._find_pseudo_obj("dayfont", pseudo, "font") || this._find_inherit_pseudo_obj("dayfont", pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_headerformat = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerformat(pseudo) || this._find_pseudo_obj("headerformat", pseudo) || nexacro.DatePicker._defaultHeaderformat;
	};

	_pDatePickerBody.on_find_CurrentStyle_headerheight = function (pseudo) {
		return this.parent.on_find_CurrentStyle_Headerheight(pseudo) || this._find_pseudo_obj("headerheight", pseudo) || nexacro.DatePicker._defaultHeaderheight;
	};

	_pDatePickerBody.on_find_CurrentStyle_headerbackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerbackground(pseudo) || this._find_pseudo_obj("headerbackground", pseudo, "background");
	};

	_pDatePickerBody.on_find_CurrentStyle_headergradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headergradation(pseudo) || this._find_pseudo_obj("headergradation", pseudo, "gradation");
	};

	_pDatePickerBody.on_find_CurrentStyle_headerborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerborder(pseudo) || this._find_pseudo_obj("headerborder", pseudo, "border");
	};

	_pDatePickerBody.on_find_CurrentStyle_headerbordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bordertype(pseudo) || this._find_pseudo_obj("headerbordertype", pseudo, "bordertype");
	};

	_pDatePickerBody.on_find_CurrentStyle_headercolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headercolor(pseudo) || this._find_pseudo_obj("headercolor", pseudo, "color");
	};

	_pDatePickerBody.on_find_CurrentStyle_headerfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_headerfont(pseudo) || this._find_pseudo_obj("headerfont", pseudo, "font");
	};

	_pDatePickerBody.on_find_CurrentStyle_bodybackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodybackground(pseudo) || this._find_pseudo_obj("bodybackground", pseudo, "background");
	};

	_pDatePickerBody.on_find_CurrentStyle_bodygradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodygradation(pseudo) || this._find_pseudo_obj("bodygradation", pseudo, "gradation");
	};

	_pDatePickerBody.on_find_CurrentStyle_bodyborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodyborder(pseudo) || this._find_pseudo_obj("bodyborder", pseudo, "border");
	};

	_pDatePickerBody.on_find_CurrentStyle_bodybordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bodybordertype(pseudo) || this._find_pseudo_obj("bodybordertype", pseudo, "bordertype");
	};

	_pDatePickerBody.on_find_CurrentStyle_weekformat = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekformat(pseudo) || this._find_pseudo_obj("weekformat", pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_weekbackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekbackground(pseudo) || this._find_pseudo_obj("weekbackground", pseudo, "background");
	};

	_pDatePickerBody.on_find_CurrentStyle_weekgradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekgradation(pseudo) || this._find_pseudo_obj("weekgradation", pseudo, "gradation");
	};

	_pDatePickerBody.on_find_CurrentStyle_weekcolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekcolor(pseudo) || this._find_pseudo_obj("weekcolor", pseudo, "color");
	};

	_pDatePickerBody.on_find_CurrentStyle_weekfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekfont(pseudo) || this._find_pseudo_obj("weekfont", pseudo, "font") || nexacro.Component._default_font;
	};

	_pDatePickerBody.on_find_CurrentStyle_saturdaybackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_saturdaybackground(pseudo) || this._find_pseudo_obj("saturdaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_saturdayborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_saturdayborder(pseudo) || this._find_pseudo_obj("saturdayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_saturdaybordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_saturdaybordertype(pseudo) || this._find_pseudo_obj("saturdaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_saturdaycolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_saturdaycolor(pseudo) || this._find_pseudo_obj("saturdaycolor", pseudo, "color") || nexacro.DatePicker._defaultSaturdaycolor;
	};

	_pDatePickerBody.on_find_CurrentStyle_saturdayfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_saturdayfont(pseudo) || this._find_pseudo_obj("saturdayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_saturdaygradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_saturdaygradation(pseudo) || this._find_pseudo_obj("saturdaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_sundaybackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_sundaybackground(pseudo) || this._find_pseudo_obj("sundaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_sundaygradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_sundaygradation(pseudo) || this._find_pseudo_obj("sundaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_sundayborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_sundayborder(pseudo) || this._find_pseudo_obj("sundayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_sundaybordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_sundaybordertype(pseudo) || this._find_pseudo_obj("sundaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_sundaycolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_sundaycolor(pseudo) || this._find_pseudo_obj("sundaycolor", pseudo, "color") || nexacro.DatePicker._defaultSundaycolor;
	};

	_pDatePickerBody.on_find_CurrentStyle_sundayfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_sundayfont(pseudo) || this._find_pseudo_obj("sundayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_todaybackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_todaybackground(pseudo) || this._find_pseudo_obj("todaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_todaygradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_todaygradation(pseudo) || this._find_pseudo_obj("todaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_todayborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_todayborder(pseudo) || this._find_pseudo_obj("todayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_todaybordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_todaybordertype(pseudo) || this._find_pseudo_obj("todaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_todaycolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_todaycolor(pseudo) || this._find_pseudo_obj("todaycolor", pseudo, "color") || nexacro.DatePicker._defaultTodaycolor;
	};

	_pDatePickerBody.on_find_CurrentStyle_todayfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_todayfont(pseudo) || this._find_pseudo_obj("todayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_usetrailingday = function (pseudo) {
		return this.parent.on_find_CurrentStyle_usetrailingday(pseudo) || this._find_pseudo_obj("usetrailingday", pseudo) || nexacro.DatePicker._defaultUseTrailngday;
	};

	_pDatePickerBody.on_find_CurrentStyle_trailingdaybackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_trailingdaybackground(pseudo) || this._find_pseudo_obj("trailingdaybackground", pseudo, "background") || this.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_trailingdaygradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_trailingdaygradation(pseudo) || this._find_pseudo_obj("trailingdaygradation", pseudo, "gradation") || this.on_find_CurrentStyle_daygradation(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_trailingdayborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_trailingdayborder(pseudo) || this._find_pseudo_obj("trailingdayborder", pseudo, "border") || this.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_trailingdaybordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_trailingdaybordertype(pseudo) || this._find_pseudo_obj("trailingdaybordertype", pseudo, "bordertype") || this.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_trailingdaycolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_trailingdaycolor(pseudo) || this._find_pseudo_obj("trailingdaycolor", pseudo, "color") || this.on_find_CurrentStyle_daycolor(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_trailingdayfont = function (pseudo) {
		return this.parent.on_find_CurrentStyle_trailingdayfont(pseudo) || this._find_pseudo_obj("trailingdayfont", pseudo, "font") || this.on_find_CurrentStyle_dayfont(pseudo);
	};

	_pDatePickerBody.on_find_CurrentStyle_viewmonthspin = function (pseudo) {
		return this.parent.on_find_CurrentStyle_viewmonthspin(pseudo) || this._find_pseudo_obj("viewmonthspin", pseudo) || nexacro.DatePicker._defaultViewMonthSpin;
	};

	_pDatePickerBody.on_find_CurrentStyle_viewyearspin = function (pseudo) {
		return this.parent.on_find_CurrentStyle_viewyearspin(pseudo) || this._find_pseudo_obj("viewyearspin", pseudo) || nexacro.DatePicker._defaultViewYearSpin;
	};


	_pDatePickerBody.on_update_style_daysize = function () {
		this.on_apply_style_daysize(this.currentstyle.daysize = this.on_find_CurrentStyle_daysize(this._pseudo));
	};

	_pDatePickerBody.on_update_style_daycolor = function () {
		this.on_apply_style_daycolor(this.currentstyle.daycolor = this.on_find_CurrentStyle_daycolor(this._pseudo));
	};

	_pDatePickerBody.on_update_style_daybackground = function () {
		this.on_apply_style_daybackground(this.currentstyle.daybackground = this.on_find_CurrentStyle_daybackground(this._pseudo));
	};

	_pDatePickerBody.on_update_style_daygradation = function () {
		this.on_apply_style_daygradation(this.currentstyle.daygradation = this.on_find_CurrentStyle_daygradation(this._pseudo));
	};

	_pDatePickerBody.on_update_style_dayborder = function () {
		this.on_apply_style_dayborder(this.currentstyle.dayborder = this.on_find_CurrentStyle_dayborder(this._pseudo));
	};

	_pDatePickerBody.on_update_style_daybordertype = function () {
		this.on_apply_style_daybordertype(this.currentstyle.daybordertype = this.on_find_CurrentStyle_daybordertype(this._pseudo));
	};

	_pDatePickerBody.on_update_style_dayfont = function () {
		this.on_apply_style_dayfont(this.currentstyle.dayfont = this.on_find_CurrentStyle_dayfont(this._pseudo));
	};

	_pDatePickerBody.on_update_style_weekformat = function () {
		this.on_apply_style_weekformat(this.currentstyle.weekformat = this.on_find_CurrentStyle_weekformat(this._pseudo));
	};

	_pDatePickerBody.on_update_style_weekcolor = function () {
		this.on_apply_style_weekcolor(this.currentstyle.weekcolor = this.on_find_CurrentStyle_weekcolor(this._pseudo));
	};

	_pDatePickerBody.on_update_style_weekbackground = function () {
		this.on_apply_style_weekbackground(this.currentstyle.weekbackground = this.on_find_CurrentStyle_weekbackground(this._pseudo));
	};

	_pDatePickerBody.on_update_style_weekgradation = function () {
		this.on_apply_style_weekgradation(this.currentstyle.weekgradation = this.on_find_CurrentStyle_weekgradation(this._pseudo));
	};

	_pDatePickerBody.on_update_style_weekfont = function () {
		this.on_apply_style_weekfont(this.currentstyle.weekfont = this.on_find_CurrentStyle_weekfont(this._pseudo));
	};

	_pDatePickerBody.on_update_style_todaycolor = function () {
		this.on_apply_style_todaycolor(this.currentstyle.todaycolor = this.on_find_CurrentStyle_todaycolor(this._pseudo));
	};

	_pDatePickerBody.on_update_style_todaybackground = function () {
		this.on_apply_style_todaybackground(this.currentstyle.todaybackground = this.on_find_CurrentStyle_todaybackground(this._pseudo));
	};

	_pDatePickerBody.on_update_style_todaygradation = function () {
		this.on_apply_style_todaygradation(this.currentstyle.todaygradation = this.on_find_CurrentStyle_todaygradation(this._pseudo));
	};

	_pDatePickerBody.on_update_style_todayborder = function () {
		this.on_apply_style_todayborder(this.currentstyle.todayborder = this.on_find_CurrentStyle_todayborder(this._pseudo));
	};

	_pDatePickerBody.on_update_style_todaybordertype = function () {
		this.on_apply_style_todaybordertype(this.currentstyle.todaybordertype = this.on_find_CurrentStyle_todaybordertype(this._pseudo));
	};

	_pDatePickerBody.on_update_style_todayfont = function () {
		this.on_apply_style_todayfont(this.currentstyle.todayfont = this.on_find_CurrentStyle_todayfont(this._pseudo));
	};

	_pDatePickerBody.on_update_style_saturdaycolor = function () {
		this.on_apply_style_saturdaycolor(this.currentstyle.saturdaycolor = this.on_find_CurrentStyle_saturdaycolor(this._pseudo));
	};

	_pDatePickerBody.on_update_style_saturdaybackground = function () {
		this.on_apply_style_saturdaybackground(this.currentstyle.saturdaybackground = this.on_find_CurrentStyle_saturdaybackground(this._pseudo));
	};

	_pDatePickerBody.on_update_style_saturdaygradation = function () {
		this.on_apply_style_saturdaygradation(this.currentstyle.saturdaygradation = this.on_find_CurrentStyle_saturdaygradation(this._pseudo));
	};

	_pDatePickerBody.on_update_style_saturdayborder = function () {
		this.on_apply_style_saturdayborder(this.currentstyle.saturdayborder = this.on_find_CurrentStyle_saturdayborder(this._pseudo));
	};

	_pDatePickerBody.on_update_style_saturdaybordertype = function () {
		this.on_apply_style_saturdaybordertype(this.currentstyle.saturdaybordertype = this.on_find_CurrentStyle_saturdaybordertype(this._pseudo));
	};

	_pDatePickerBody.on_update_style_saturdayfont = function () {
		this.on_apply_style_saturdayfont(this.currentstyle.saturdayfont = this.on_find_CurrentStyle_saturdayfont(this._pseudo));
	};

	_pDatePickerBody.on_update_style_sundaycolor = function () {
		this.on_apply_style_sundaycolor(this.currentstyle.sundaycolor = this.on_find_CurrentStyle_sundaycolor(this._pseudo));
	};

	_pDatePickerBody.on_update_style_sundaybackground = function () {
		this.on_apply_style_sundaybackground(this.currentstyle.sundaybackground = this.on_find_CurrentStyle_sundaybackground(this._pseudo));
	};

	_pDatePickerBody.on_update_style_sundaygradation = function () {
		this.on_apply_style_sundaygradation(this.currentstyle.sundaygradation = this.on_find_CurrentStyle_sundaygradation(this._pseudo));
	};

	_pDatePickerBody.on_update_style_sundayborder = function () {
		this.on_apply_style_sundayborder(this.currentstyle.sundayborder = this.on_find_CurrentStyle_sundayborder(this._pseudo));
	};

	_pDatePickerBody.on_update_style_sundaybordertype = function () {
		this.on_apply_style_sundaybordertype(this.currentstyle.sundaybordertype = this.on_find_CurrentStyle_sundaybordertype(this._pseudo));
	};

	_pDatePickerBody.on_update_style_sundayfont = function () {
		this.on_apply_style_sundayfont(this.currentstyle.sundayfont = this.on_find_CurrentStyle_sundayfont(this._pseudo));
	};

	_pDatePickerBody.on_update_style_usetrailingday = function () {
		this.on_apply_style_usetrailingday(this.currentstyle.usetrailingday = this.on_find_CurrentStyle_usetrailingday(this._pseudo));
	};

	_pDatePickerBody.on_update_style_trailingdaycolor = function () {
		this.on_apply_style_trailingdaycolor(this.currentstyle.trailingdaycolor = this.on_find_CurrentStyle_trailingdaycolor(this._pseudo));
	};

	_pDatePickerBody.on_update_style_trailingdaybackground = function () {
		this.on_apply_style_trailingdaybackground(this.currentstyle.trailingdaybackground = this.on_find_CurrentStyle_trailingdaybackground(this._pseudo));
	};

	_pDatePickerBody.on_update_style_trailingdaygradation = function () {
		this.on_apply_style_trailingdaygradation(this.currentstyle.trailingdaygradation = this.on_find_CurrentStyle_trailingdaygradation(this._pseudo));
	};

	_pDatePickerBody.on_update_style_trailingdayborder = function () {
		this.on_apply_style_trailingdayborder(this.currentstyle.trailingdayborder = this.on_find_CurrentStyle_trailingdayborder(this._pseudo));
	};

	_pDatePickerBody.on_update_style_trailingdaybordertype = function () {
		this.on_apply_style_trailingdaybordertype(this.currentstyle.trailingdaybordertype = this.on_find_CurrentStyle_trailingdaybordertype(this._pseudo));
	};

	_pDatePickerBody.on_update_style_trailingdayfont = function () {
		this.on_apply_style_trailingdayfont(this.currentstyle.trailingdayfont = this.on_find_CurrentStyle_trailingdayfont(this._pseudo));
	};


	_pDatePickerBody.on_apply_style_daysize = function (size) {
		this._resizeBody();
	};

	_pDatePickerBody.on_apply_style_daycolor = function (color) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_daybackground = function (background) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_daygradation = function (gradation) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_dayborder = function (border) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_daybordertype = function (bordertype) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_dayfont = function (font) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_weekformat = function (format) {
		var control_elem = this.getElement();
		if (control_elem && format) {
			var weekStr;
			var weeks = this._weeks;
			var week_len = weeks.length;
			if (typeof format == "object") {
				weekStr = format.value.split(/\s+/);
			}
			else {
				weekStr = format.split(/\s+/);
			}

			for (var i = 0; i < week_len; i++) {
				weeks[i].set_text(weekStr[i]);
			}
		}
	};

	_pDatePickerBody.on_apply_style_weekcolor = function (color) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_weekbackground = function (background) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_weekgradation = function (gradation) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_weekborder = function (border) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_weekbordertype = function (bordertype) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_weekfont = function (font) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_todaycolor = function (color) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_todaybackground = function (background) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_todaygradation = function (gradation) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_todayborder = function (border) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_todaybordertype = function (bordertype) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_todayfont = function (font) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_saturdaycolor = function (color) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_saturdaybackground = function (background) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_saturdaygradation = function (gradation) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_saturdayborder = function (border) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_saturdaybordertype = function (bordertype) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_saturdayfont = function (font) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_sundaycolor = function (color) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_sundaybackground = function (background) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_sundaygradation = function (gradation) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_sundayborder = function (border) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_sundaybordertype = function (bordertype) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_sundayfont = function (font) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_usetrailingday = function (usetrailingday) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_trailingdaycolor = function (color) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_trailingdaybackground = function (background) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_trailingdaygradation = function (gradation) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_trailingdayborder = function (border) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_trailingdaybordertype = function (bordertype) {
		this._refreshDay();
	};

	_pDatePickerBody.on_apply_style_trailingdayfont = function (font) {
		this._refreshDay();
	};

	_pDatePickerBody.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;
			var week = this._weeks;
			var day = this._days;
			var maxWeek = 7;
			var weekformat;

			if (curstyle.weekformat) {
				weekformat = curstyle.weekformat.value.split(/\s+/);
			}
			else {
				weekformat = this.parent.parent._datelistS;
			}

			this._weekBg = new nexacro.WeekStaticCtrl("weekstatic", "absolute", 0, 0, 0, 0, null, null, this);
			this._weekBg.createComponent();

			for (var i = 0; i < maxWeek; i++) {
				var weekStatic = new nexacro.WeekStaticCtrl("weekstatic", "absolute", 0, 0, 0, 0, null, null, this);

				weekStatic.set_text(weekformat[i]);
				weekStatic._setDaysOfWeek(i % 7);

				weekStatic.createComponent();
				week[i] = weekStatic;
				weekStatic = null;
			}

			var maxDay = 42;
			for (var i = 0; i < maxDay; i++) {
				var dayStatic = new nexacro.DayStaticCtrl("daystatic", "absolute", 0, 0, 0, 0, null, null, this);
				dayStatic._setDaysOfWeek(i % 7);
				dayStatic.createComponent();

				day[i] = dayStatic;
				dayStatic = null;
			}
		}
	};

	_pDatePickerBody.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var week = this._weeks;
			var day = this._days;

			var week_len = week.length;
			var day_len = day.length;

			this._weekBg.on_created();

			for (var i = 0; i < week_len; i++) {
				week[i].on_created();
			}
			for (var i = 0; i < day_len; i++) {
				day[i].on_created();
				day[i]._setEventHandler("onclick", this.on_notify_DatePickerBody_dayclick, this);

				day[i].style.set_cursor("arrow");
			}

			this.on_apply_prop_rtldirection();
		}
	};

	_pDatePickerBody.on_destroy_contents = function () {
		var week = this._weeks;
		var day = this._days;
		var week_len = week.length;
		var day_len = day.length;

		this._weekBg.destroy();
		this._weekBg = null;

		if (week_len > 0) {
			for (var i = 0; i < week_len; i++) {
				week[i].destroy();
			}
			this._weeks = null;
		}
		if (day_len > 0) {
			for (i = 0; i < day_len; i++) {
				day[i].destroy();
			}
			this._days = null;
		}

		this._changedDays = null;
		this._calendar = null;
	};

	_pDatePickerBody.on_change_containerRect = function (width, height) {
		this._resizeBody();
	};

	_pDatePickerBody.on_apply_prop_enable = function (enable) {
		var control_elem = this.getElement();
		if (control_elem) {
			var week = this._weeks;
			var day = this._days;
			var week_len = week.length;
			var day_len = day.length;

			this._weekBg._setEnable(enable);

			if (week_len > 0) {
				for (var i = 0; i < week_len; i++) {
					week[i]._setEnable(enable);
				}
			}
			if (day_len > 0) {
				for (i = 0; i < day_len; i++) {
					day[i]._setEnable(enable);
				}
			}
		}
	};

	_pDatePickerBody.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var control_elem = this.getElement();
		if (control_elem) {
			this.on_change_containerRect();

			var _rtldirection = this._rtldirection;

			var week = this._weeks;
			var day = this._days;
			var week_len = week.length;
			var day_len = day.length;

			if (week_len > 0) {
				for (var i = 0; i < week_len; i++) {
					week[i]._setRtlDirection(_rtldirection);
				}
			}
			if (day_len > 0) {
				for (i = 0; i < day_len; i++) {
					day[i]._setRtlDirection(_rtldirection);
				}
			}
		}
	};

	_pDatePickerBody.on_apply_backgroundcolumn = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody.on_apply_bordercolumn = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody.on_apply_datecolumn = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody.on_apply_innerdataset = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody.on_apply_textcolorcolumn = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody._setYear = function (v) {
		if (v != this._year) {
			this._year = (v < 10 ? "000" : v < 100 ? "00" : v < 1000 ? "0" : "") + parseInt(v, 10);
			this.on_apply_year();
		}
	};

	_pDatePickerBody.on_apply_year = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody._setMonth = function (v) {
		if (v != this._month) {
			v = (v < 10 ? "0" : "") + parseInt(v, 10);
			this._month = v;
			this.on_apply_month();
		}
	};

	_pDatePickerBody.on_apply_month = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody._setDay = function (v) {
		if (v != this._day) {
			v = (v < 10 ? "0" : "") + parseInt(v, 10);
			this._day = v;
		}
		this.on_apply_day();
	};

	_pDatePickerBody.on_apply_day = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody._setDate = function (year, month, day) {
		this._year = (year < 10 ? "000" : year < 100 ? "00" : year < 1000 ? "0" : "") + parseInt(year, 10);
		this._month = (month < 10 ? "0" : "") + parseInt(month, 10);
		this._day = (day < 10 ? "0" : "") + parseInt(day, 10);
		this.on_apply_date();
	};

	_pDatePickerBody.on_apply_date = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._refreshDay();
		}
	};

	_pDatePickerBody.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pDatePickerBody.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}
	};

	_pDatePickerBody.on_notify_DatePickerBody_dayclick = function (obj, e) {
		this._post_year = (obj.currYear < 10 ? "000" : obj.currYear < 100 ? "00" : obj.currYear < 1000 ? "0" : "") + parseInt(obj.currYear, 10);
		this._post_month = (obj.currMonth < 10 ? "0" : "") + parseInt(obj.currMonth, 10);
		this._post_day = (obj.text < 10 ? "0" : "") + parseInt(obj.text, 10);

		var ret = this.on_fire_ondayclick(obj, e);
	};

	_pDatePickerBody.on_fire_ondayclick = function (obj, e) {
		if (this.ondayclick && this.ondayclick._has_handlers) {
			return this.ondayclick._fireEvent(this, e);
		}
		return false;
	};

	_pDatePickerBody._resizeBody = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var pseudo = this._pseudo;
			var week = this._weeks;
			var day = this._days;
			var week_len = week.length;
			var day_len = day.length;

			var client_width = this._client_width;
			var client_height = this._client_height;
			var client_left = this._client_left;
			var client_top = this._client_top;

			var daysize = this.on_find_CurrentStyle_daysize(pseudo);
			var padding = this.on_find_CurrentStyle_padding(pseudo);

			daysize = daysize.value.split(/\s+/);
			var dayWidth = parseInt(daysize[0], 10);
			var dayHeight = 0;
			if (daysize.length == 1) {
				dayHeight = dayWidth;
			}
			else {
				dayHeight = parseInt(daysize[1], 10);
			}

			var drawWidth_daysize = dayWidth * 7;
			var drawHeight_daysize = dayHeight * 7;

			var blankWidth = 0;
			var blankHeight = 0;
			var result = 0;
			if (drawWidth_daysize < client_width) {
				result = client_width - drawWidth_daysize;
				blankWidth = result / 14;
			}
			if (drawHeight_daysize < client_height) {
				result = client_height - drawHeight_daysize;
				blankHeight = result / 8;
			}

			var week_l = client_left + blankWidth;
			var week_t = client_top + blankHeight / 2;
			var week_w = dayWidth;
			var week_h = dayHeight;

			this._weekBg.move(client_left, week_t, client_width, week_h, null, null);

			for (var i = 0; i < week_len; i++) {
				week[i].move(week_l, week_t, week_w, week_h, null, null);
				week_l = week_l + week_w + blankWidth * 2;
			}

			var week_idx = 1;
			var day_l = client_left + blankWidth;
			var day_t = week_t + dayHeight + blankHeight;
			var day_w = dayWidth;
			var day_h = dayHeight;
			for (var i = 0; i < day_len; i++) {
				day[i].move(day_l, day_t, day_w, day_h, null, null);
				day_l = day_l + day_w + blankWidth * 2;
				if (((i + 1) % 7) == 0) {
					week_idx++;
					day_l = client_left + blankWidth;
					day_t = day_t + day_h + blankHeight;
				}
			}
		}
	};

	_pDatePickerBody._refreshDay = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var currentDate = this._getCurrentDate();
			var year = this._year ? parseInt(this._year, 10) : currentDate.year;
			var month = this._month ? parseInt(this._month, 10) : currentDate.month;
			var day = this._day ? parseInt(this._day, 10) : currentDate.day;

			var is_leapyear = this._getLeapYear(year);
			var firstDay = new Date(year, month - 1, 1);

			if (year < 100) {
				firstDay.setFullYear(year);
			}

			var endDay = is_leapyear ? this._endDayL[month - 1] : this._endDayN[month - 1];
			var week = firstDay.getDay();

			var usetrailingday = this.on_find_CurrentStyle_usetrailingday(this._pseudo);
			var is_usetrailingday = nexacro._toBoolean(usetrailingday.value);
			if (is_usetrailingday) {
				var trailingday_info = this._setUseTrailingDayInfo(year, month, firstDay, endDay);
			}

			var day = this._days;
			var day_len = day.length;
			var dayCount = 1;
			var daysofweek = -1;

			var dayInfo = {
			};

			var sundayfont = this.parent.on_find_CurrentStyle_sundayfont("normal");
			var sundaycolor = this.parent.on_find_CurrentStyle_sundaycolor("normal");
			var sundaybackground = this.parent.on_find_CurrentStyle_sundaybackground("normal");
			var saturdayfont = this.parent.on_find_CurrentStyle_saturdayfont("normal");
			var saturdaycolor = this.parent.on_find_CurrentStyle_saturdaycolor("normal");
			var saturdaybackground = this.parent.on_find_CurrentStyle_saturdaybackground("normal");
			var dayfont = this.parent.on_find_CurrentStyle_dayfont("normal");
			var daycolor = this.parent.on_find_CurrentStyle_daycolor("normal");
			var daybackground = this.parent.on_find_CurrentStyle_daybackground("normal");
			var dayborder = this.parent.on_find_CurrentStyle_dayborder("normal");
			var daybordertype = this.parent.on_find_CurrentStyle_daybordertype("normal");
			var trailingdayfont = this.parent.on_find_CurrentStyle_trailingdayfont("normal");
			var trailingdaycolor = this.parent.on_find_CurrentStyle_trailingdaycolor("normal");
			var trailingdaybackground = this.parent.on_find_CurrentStyle_trailingdaybackground("normal");
			var trailingdayborder = this.parent.on_find_CurrentStyle_trailingdayborder("normal");
			var trailingdaybordertype = this.parent.on_find_CurrentStyle_trailingdaybordertype("normal");

			for (var i = 0; i < day_len; i++) {
				if (week <= i && endDay >= dayCount) {
					dayInfo = this._setDayInfo(dayCount, false, true, year, month);

					this._refreshDayby(day[i], dayInfo.text, dayInfo.visible, dayInfo.currYear, dayInfo.currMonth, dayInfo.trailingday);

					daysofweek = i % 7;
					if (daysofweek == 0) {
						day[i].on_apply_style_font(sundayfont);
						day[i].on_apply_style_color(sundaycolor);
						day[i].on_apply_style_background(sundaybackground);
					}
					else if (daysofweek == 6) {
						day[i].on_apply_style_font(saturdayfont);
						day[i].on_apply_style_color(saturdaycolor);
						day[i].on_apply_style_background(saturdaybackground);
					}
					else {
						day[i].on_apply_style_font(dayfont);
						day[i].on_apply_style_color(daycolor);
						day[i].on_apply_style_background(daybackground);
					}

					day[i].on_apply_style_border(dayborder);
					day[i].on_apply_style_bordertype(daybordertype);

					dayCount++;
				}
				else {
					if (is_usetrailingday) {
						if (trailingday_info.idx >= 0) {
							dayInfo = this._setDayInfo(trailingday_info.pre_endDay - trailingday_info.idx, true, true, trailingday_info.year_front, trailingday_info.month_front);
							trailingday_info.idx--;
						}
						else {
							dayInfo = this._setDayInfo(trailingday_info.next_beginDay, true, true, trailingday_info.year_back, trailingday_info.month_back);
							trailingday_info.next_beginDay++;
							trailingday_info.endWeek++;
						}

						this._refreshDayby(day[i], dayInfo.text, dayInfo.visible, dayInfo.currYear, dayInfo.currMonth, dayInfo.trailingday);

						day[i].on_apply_style_font(trailingdayfont);
						day[i].on_apply_style_color(trailingdaycolor);
						day[i].on_apply_style_background(trailingdaybackground);
						day[i].on_apply_style_border(trailingdayborder);
						day[i].on_apply_style_bordertype(trailingdaybordertype);
					}
					else {
						dayInfo = this._setDayInfo("", false, false, 0, 0);
						this._refreshDayby(day[i], dayInfo.text, dayInfo.visible, dayInfo.currYear, dayInfo.currMonth, dayInfo.trailingday);
					}
				}
			}
		}

		this._initChangedDays();
		this._changedDays = [];
		var dataset_path = this.parent.parent;
		var dataset = dataset_path._innerdataset;

		if (dataset) {
			this._setDatasetStyle(dataset, dataset_path);
		}

		if (this._isSelectedDay(this._day)) {
			this.parent._on_apply_style_day(true);
		}
		else {
			this.parent._on_apply_style_day(false);
		}
		this._setCalendarAccessibility();
	};

	_pDatePickerBody._refreshDayby = function (day, text, visible, currYear, currMonth, trailingday) {
		day.set_text(text);
		day.set_wordwrap("none");
		day.set_visible(visible);
		day.currYear = currYear;
		day.currMonth = currMonth;
		day.trailingday = trailingday;
	};

	_pDatePickerBody._isToday = function (v) {
		var year = this._year;
		var month = this._month;
		var day = parseInt(v, 10);
		var currentDate = this._getCurrentDate();

		if (!year) {
			year = currentDate.year;
		}
		if (!month) {
			month = currentDate.month;
		}

		if (year == currentDate.year && month == currentDate.month && day == currentDate.day) {
			return true;
		}
		return false;
	};

	_pDatePickerBody._isSelectedDay = function (v) {
		v = parseInt(v, 10);
		var year = parseInt(this._year, 10);
		var month = parseInt(this._month, 10);
		if (year == this.parent._selected_year && month == this.parent._selected_month && v == this.parent._selected_day) {
			return true;
		}
		return false;
	};

	_pDatePickerBody._setDayInfo = function (text, trailingday, visible, currYear, currMonth) {
		return {
			text : text, 
			trailingday : trailingday, 
			visible : visible, 
			currYear : currYear, 
			currMonth : currMonth
		};
	};

	_pDatePickerBody._setUseTrailingDayInfo = function (year, month, dateObj, endDay) {
		var year_front = year;
		var year_back = year;
		var month_front = month;
		var month_back = month;

		if (month == 1) {
			year_front -= 1;
			month_front = 12;

			month_back += 1;
		}
		else {
			month_front -= 1;
			if (month == 12) {
				year_back += 1;
				month_back = 1;
			}
			else {
				month_back += 1;
			}
		}

		var idx = dateObj.getDay() - 1;

		dateObj.setDate(endDay);
		var endWeek = dateObj.getDay();


		var is_pre_leapyear = this._getLeapYear(year_front);
		var pre_endDay = is_pre_leapyear ? this._endDayL[month_front - 1] : this._endDayN[month_front - 1];
		var next_beginDay = 1;

		return {
			year_front : year_front, 
			year_back : year_back, 
			month_front : month_front, 
			month_back : month_back, 
			endWeek : endWeek, 
			idx : idx, 
			pre_endDay : pre_endDay, 
			next_beginDay : next_beginDay
		};
	};

	_pDatePickerBody._setDatasetStyle = function (dataset, dataset_path) {
		var day = this._days;
		var day_len = day.length;
		var backgroundcolumn = dataset_path.backgroundcolumn;
		var bordercolumn = dataset_path.bordercolumn;
		var datecolumn = dataset_path.datecolumn;
		var textcolorcolumn = dataset_path.textcolorcolumn;

		var rowCount = dataset.getRowCount();
		for (var i = 0; i < rowCount; i++) {
			var date = dataset.getColumn(i, datecolumn);
			var background, border, color;
			var week_idx = 0;
			var date_idx = 0;
			var date_year = 0;
			var date_month = 0;
			var date_day = 0;
			var datasetDateObj = {
			};

			if (date) {
				if (typeof date == "string") {
					date_year = parseInt(date.substr(0, 4), 10);
					date_month = parseInt(date.substr(4, 2), 10);
					date_day = parseInt(date.substr(6, 2), 10);
					datasetDateObj = new nexacro.Date(date_year, date_month, 1);
					week_idx = datasetDateObj.getDay();

					datasetDateObj = null;
				}
				else if (typeof date == "object") {
					date_year = date.getFullYear();
					date_month = date.getMonth() + 1;
					date_day = date.getDate();
					week_idx = date.getDay();
				}
				date_idx = week_idx + date_day + 1;
			}

			for (var j = 0; j < day_len; j++) {
				var year_val = this._makeDateText(day[j].currYear, "year");
				var month_val = this._makeDateText(day[j].currMonth, "month");
				var day_val = this._makeDateText(day[j].text, "day");

				var currStyle = day[j].currentstyle;
				var currDate = year_val + month_val + day_val;
				var changeday_len = this._changedDays.length;
				if (currDate == date) {
					if (day[j].trailingday) {
						continue;
					}

					background = dataset.getColumn(i, backgroundcolumn);
					background = nexacro._getCachedBackgroundObj(background);
					border = dataset.getColumn(i, bordercolumn);
					border = nexacro._getCachedBorderObj(border);
					color = dataset.getColumn(i, textcolorcolumn);
					color = nexacro._getCachedColorObj(color);

					if (background) {
						currStyle.background = background;
						day[j].on_apply_style_background(background);
					}
					if (border) {
						currStyle.border = border;
						day[j].on_apply_style_border(border);
					}
					if (color) {
						currStyle.color = color;
						day[j].on_apply_style_color(color);
					}
					this._changedDays[changeday_len] = day[j];
				}
				else if (date_year != day[j].currYear || date_month != day[j].currMonth) {
					if (date_idx == j) {
						background = day[j].on_find_CurrentStyle_background(day[j]._pseudo);
						border = day[j].on_find_CurrentStyle_border(day[j]._pseudo);
						color = day[j].on_find_CurrentStyle_color(day[j]._pseudo);

						currStyle.background = background;
						currStyle.border = border;
						currStyle.color = color;

						day[j].on_apply_style_background(background);
						day[j].on_apply_style_border(border);
						day[j].on_apply_style_color(color);
						this._changedDays[changeday_len] = day[j];
					}
				}
			}
		}
	};

	_pDatePickerBody._getCurrentDate = function () {
		var year, month, day;
		var currentDate = new Date();

		year = currentDate.getFullYear();
		month = currentDate.getMonth() + 1;
		day = currentDate.getDate();
		currentDate = null;
		return {
			year : year, 
			month : month, 
			day : day
		};
	};

	_pDatePickerBody._getLeapYear = function (year) {
		if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
			return true;
		}
		else {
			return false;
		}
	};

	_pDatePickerBody._initChangedDays = function () {
		var len = this._changedDays.length;
		for (var i = 0; i < len; i++) {
			var background = this.parent._find_pseudo_obj("daybackground", "normal", "background");
			var border = this.parent._find_pseudo_obj("dayborder", "normal", "border");
			var color = this.parent._find_pseudo_obj("daycolor", "normal", "color");
			this._changedDays[i].on_apply_style_background(background);
			this._changedDays[i].on_apply_style_border(border);
			this._changedDays[i].on_apply_style_color(color);
		}
	};

	_pDatePickerBody._makeDateText = function (v, type) {
		if (typeof v != "string") {
		}
		{

			v = nexacro._toString(v);
		}
		switch (type) {
			case "year":
				var year_val = v;
				while (year_val.length < 4) {
					year_val = "0" + year_val;
				}
				return year_val;
				break;
			case "month":
				var month_val = v.length >= 2 ? v : "0" + v;
				return month_val;
				break;
			case "day":
				var day_val = v.length >= 2 ? v : "0" + v;
				return day_val;
				break;
		}
	};

	_pDatePickerBody._setCalendarAccessibility = function () {
		if (nexacro._enableaccessibility) {
			var calendar = this._calendar;
			var cal_value = this._year + this._month + this._day;
			var accessibility_value = calendar._makeCalendarText(cal_value);
			this.parent._setAccessibilityLabel(accessibility_value);
			nexacro._notifyAccessibilityValue(this._control_element, accessibility_value, "daychange");
		}
	};

	delete _pDatePickerBody;

	nexacro.DayStaticCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._is_reference_control = false;

		this.trailingday = false;
		this.currYear = "";
		this.currMonth = "";

		this._flag_dataset = -1;
		this._dataset_background = "";
		this._refObj = parent.parent;
	};

	var _pDayStaticCtrl = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.DayStaticCtrl);
	nexacro.DayStaticCtrl.prototype = _pDayStaticCtrl;

	_pDayStaticCtrl._daysofweek = -1;


	_pDayStaticCtrl.on_find_CurrentStyle_background = function (pseudo) {
		var text = this.text;
		if (text && text.length > 0) {
			if (this.trailingday) {
				return this.parent.on_find_CurrentStyle_trailingdaybackground(pseudo);
			}
			else if (this.parent._isSelectedDay(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daybackground(pseudo);
				}
				return this.parent.on_find_CurrentStyle_daybackground("selected");
			}
			else if (this.parent._isToday(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daybackground(pseudo);
				}
				else {
					return this.parent.on_find_CurrentStyle_todaybackground(pseudo);
				}
			}
			if (this._refObj.parent.backgroundcolumn && pseudo == "normal") {
				var dataset = this._refObj.parent._innerdataset;
				var datecolumn = this._refObj.parent.datecolumn;
				var backgroundcolumn = this._refObj.parent.backgroundcolumn;
				var rowCount = dataset.getRowCount();
				for (var i = 0; i < rowCount; i++) {
					var date = dataset.getColumn(i, datecolumn);

					if (date) {
						var year = date.substr(0, 4);
						var month = date.substr(4, 2);
						var day = date.substr(6, 2);
						var statictext = this.parent._makeDateText(text, "day");
						if (year == this.currYear && month == this.currMonth && day === statictext) {
							var background = dataset.getColumn(i, backgroundcolumn);
							return background = nexacro._getCachedColorObj(background);
						}
					}
				}
			}
			if (this._daysofweek == 6) {
				return this.parent.on_find_CurrentStyle_saturdaybackground(pseudo);
			}
			if (this._daysofweek == 0) {
				return this.parent.on_find_CurrentStyle_sundaybackground(pseudo);
			}
		}
		return this.parent.on_find_CurrentStyle_daybackground(pseudo);
	};

	_pDayStaticCtrl.on_find_CurrentStyle_border = function (pseudo) {
		var text = this.text;
		if (text && text.length > 0) {
			if (this.trailingday) {
				return this.parent.on_find_CurrentStyle_trailingdayborder(pseudo);
			}
			if (this.parent._isSelectedDay(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_dayborder(pseudo);
				}
				return this.parent.on_find_CurrentStyle_dayborder("selected");
			}
			if (this.parent._isToday(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_dayborder(pseudo);
				}
				return this.parent.on_find_CurrentStyle_todayborder(pseudo);
			}

			var p_comp = this._refObj.bordercolumn ? this._refObj : this._refObj.parent;
			if (p_comp.bordercolumn) {
				var dataset = p_comp._innerdataset;
				var datecolumn = p_comp.datecolumn;

				var bordercolumn = p_comp.bordercolumn;
				var rowCount = dataset.getRowCount();
				for (var i = 0; i < rowCount; i++) {
					var date = dataset.getColumn(i, datecolumn);

					if (date) {
						var year = date.substr(0, 4);
						var month = date.substr(4, 2);
						var day = date.substr(6, 2);
						var statictext = this.parent._makeDateText(text, "day");
						if (year == this.currYear && month == this.currMonth && day === statictext) {
							var border = dataset.getColumn(i, bordercolumn);
							return border = nexacro._getCachedBorderObj(border);
						}
					}
				}
			}
			if (this._daysofweek == 6) {
				return this.parent.on_find_CurrentStyle_saturdayborder(pseudo);
			}
			if (this._daysofweek == 0) {
				return this.parent.on_find_CurrentStyle_sundayborder(pseudo);
			}
		}
		return this.parent.on_find_CurrentStyle_dayborder(pseudo);
	};

	_pDayStaticCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		var text = this.text;
		if (text && text.length > 0) {
			if (this.trailingday) {
				return this.parent.on_find_CurrentStyle_trailingdaybordertype(pseudo);
			}
			if (this.parent._isSelectedDay(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daybordertype(pseudo);
				}
				return this.parent.on_find_CurrentStyle_daybordertype("selected");
			}
			if (this.parent._isToday(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daybordertype(pseudo);
				}
				return this.parent.on_find_CurrentStyle_todaybordertype(pseudo);
			}
			if (this._daysofweek == 6) {
				return this.parent.on_find_CurrentStyle_saturdaybordertype(pseudo);
			}
			if (this._daysofweek == 0) {
				return this.parent.on_find_CurrentStyle_sundaybordertype(pseudo);
			}
		}
		return this.parent.on_find_CurrentStyle_daybordertype(pseudo);
	};

	_pDayStaticCtrl.on_find_CurrentStyle_color = function (pseudo) {
		var text = this.text;
		if (text && text.length > 0) {
			if (this._refObj.parent.textcolorcolumn && pseudo == "normal") {
				var dataset = this._refObj.parent._innerdataset;
				var datecolumn = this._refObj.parent.datecolumn;
				var textcolorcolumn = this._refObj.parent.textcolorcolumn;
				var rowCount = dataset.getRowCount();
				for (var i = 0; i < rowCount; i++) {
					var date = dataset.getColumn(i, datecolumn);

					if (date) {
						var year = date.substr(0, 4);
						var month = date.substr(4, 2);
						var day = date.substr(6, 2);
						var statictext = this.parent._makeDateText(text, "day");
						if (year == this.currYear && month == this.currMonth && day === statictext) {
							if (this.trailingday) {
								return this.parent.on_find_CurrentStyle_trailingdaycolor(pseudo);
							}
							else {
								var color = dataset.getColumn(i, textcolorcolumn);
								return color = nexacro._getCachedColorObj(color);
							}
						}
					}
				}
			}

			if (this.trailingday) {
				return this.parent.on_find_CurrentStyle_trailingdaycolor(pseudo);
			}
			if (this.parent._isSelectedDay(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daycolor(pseudo);
				}
				return this.parent.on_find_CurrentStyle_daycolor("selected");
			}
			if (this.parent._isToday(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daycolor(pseudo);
				}
				return this.parent.on_find_CurrentStyle_todaycolor(pseudo);
			}

			if (this._daysofweek == 6) {
				return this.parent.on_find_CurrentStyle_saturdaycolor(pseudo);
			}
			if (this._daysofweek == 0) {
				return this.parent.on_find_CurrentStyle_sundaycolor(pseudo);
			}
		}
		return this.parent.on_find_CurrentStyle_daycolor(pseudo) || 
			this._find_inherit_pseudo_obj("color", pseudo) || 
			nexacro.Component._default_color;
	};

	_pDayStaticCtrl.on_find_CurrentStyle_font = function (pseudo) {
		var text = this.text;
		if (text && text.length > 0) {
			if (this.trailingday) {
				return this.parent.on_find_CurrentStyle_trailingdayfont(pseudo);
			}
			if (this.parent._isSelectedDay(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_dayfont(pseudo);
				}
				return this.parent.on_find_CurrentStyle_dayfont("selected");
			}
			if (this.parent._isToday(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_dayfont(pseudo);
				}
				return this.parent.on_find_CurrentStyle_todayfont(pseudo);
			}
			if (this._daysofweek == 6) {
				return this.parent.on_find_CurrentStyle_saturdayfont(pseudo);
			}
			if (this._daysofweek == 0) {
				return this.parent.on_find_CurrentStyle_sundayfont(pseudo);
			}
		}
		return this.parent.on_find_CurrentStyle_dayfont(pseudo) || 
			this._find_inherit_pseudo_obj("font", pseudo) || 
			nexacro.Component._default_font;
	};

	_pDayStaticCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		var text = this.text;
		if (text && text.length > 0) {
			if (this.trailingday) {
				return this.parent.on_find_CurrentStyle_trailingdaygradation(pseudo);
			}
			if (this.parent._isSelectedDay(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daygradation(pseudo);
				}
				return this.parent.on_find_CurrentStyle_daygradation("selected");
			}
			if (this.parent._isToday(text)) {
				if (pseudo == "mouseover") {
					return this.parent.on_find_CurrentStyle_daygradation(pseudo);
				}
				return this.parent.on_find_CurrentStyle_todaygradation(pseudo);
			}
			if (this._daysofweek == 6) {
				return this.parent.on_find_CurrentStyle_saturdaygradation(pseudo);
			}
			if (this._daysofweek == 0) {
				return this.parent.on_find_CurrentStyle_sundaygradation(pseudo);
			}
		}
		return this.parent.on_find_CurrentStyle_daygradation(pseudo);
	};


	_pDayStaticCtrl.on_apply_style_border = function (border) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBorder(border, this.on_find_CurrentStyle_bordertype("normal"));
			control_elem.setElementBackground(this.on_find_CurrentStyle_background("normal"), this.on_find_CurrentStyle_gradation("normal"));
			this._updateClientSize(control_elem);
		}
		;
	};

	_pDayStaticCtrl.on_apply_style_bordertype = function (bordertype) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBorder(this.on_find_CurrentStyle_border("normal"), bordertype);
			control_elem.setElementBackground(this.on_find_CurrentStyle_background("normal"), this.on_find_CurrentStyle_gradation("normal"));
			this._updateClientSize(control_elem);
		}
	};

	_pDayStaticCtrl.on_apply_style_background = function (background) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBackground(background, this.on_find_CurrentStyle_gradation("normal"));
		}
	};

	_pDayStaticCtrl.on_apply_style_gradation = function (gradation) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBackground(this.on_find_CurrentStyle_background("normal"), gradation);
		}
	};

	_pDayStaticCtrl.on_apply_style_font = function (font) {
		if (this.currentstyle.font != font) {
			this.currentstyle.font = font;
			if (this._text_elem && font) {
				this._text_elem.setElementFont(font);
			}
		}
	};

	_pDayStaticCtrl._setDaysOfWeek = function (daysofweek) {
		if (this._daysofweek != daysofweek) {
			this._daysofweek = daysofweek;
			this.on_apply_daysofweek();
		}
	};
	_pDayStaticCtrl.on_apply_daysofweek = function () {
		var v = this._daysofweek;
		var color = this.on_find_CurrentStyle_color(v);
		this.on_apply_style_color(color);
	};

	delete _pDayStaticCtrl;

	nexacro.WeekStaticCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;

		this._refObj = parent.parent;
	};

	var _pWeekCtrl = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.WeekStaticCtrl);
	nexacro.WeekStaticCtrl.prototype = _pWeekCtrl;

	_pWeekCtrl._daysofweek = -1;

	_pWeekCtrl.on_find_CurrentStyle_color = function (pseudo) {
		if (this._daysofweek == 0) {
			return this.parent.on_find_CurrentStyle_sundaycolor(pseudo);
		}
		else if (this._daysofweek == 6) {
			return this.parent.on_find_CurrentStyle_saturdaycolor(pseudo);
		}
		return this.parent.on_find_CurrentStyle_weekcolor(pseudo);
	};

	_pWeekCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekbackground(pseudo);
	};

	_pWeekCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekgradation(pseudo);
	};

	_pWeekCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_weekfont(pseudo);
	};

	_pWeekCtrl._setDaysOfWeek = function (daysofweek) {
		if (this._daysofweek != daysofweek) {
			this._daysofweek = daysofweek;
			this.on_apply_daysofweek();
		}
	};
	_pWeekCtrl.on_apply_daysofweek = function () {
		var v = this._daysofweek;
		var color = this.on_find_CurrentStyle_color(v);
		this.on_apply_style_color(color);
	};

	delete _pWeekCtrl;

	nexacro.DatePickerCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.DatePicker.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pDatePickerCtrl = nexacro.DatePickerCtrl.prototype = nexacro._createPrototype(nexacro.DatePicker, nexacro.DatePickerCtrl);
	_pDatePickerCtrl._type_name = "DatePickerControl";
	nexacro._setForControlStyleFinder(_pDatePickerCtrl);
	delete _pDatePickerCtrl;
}
