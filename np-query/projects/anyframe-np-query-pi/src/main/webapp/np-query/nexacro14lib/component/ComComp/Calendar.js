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

if (!nexacro.Calendar) {
	nexacro.CalendarCloseUpEventInfo = function (obj, id, pretext, posttext, prevalue, postvalue, isselect) {
		this.id = this.eventid = id || "oncloseup";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = pretext;
		this.posttext = posttext;
		this.prevalue = prevalue;
		this.postvalue = postvalue;
	};
	var _pCalendarCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarCloseUpEventInfo);
	nexacro.CalendarCloseUpEventInfo.prototype = _pCalendarCloseUpEventInfo;
	_pCalendarCloseUpEventInfo._type_name = "CalendarCloseUpEventInfo";

	delete _pCalendarCloseUpEventInfo;
	_pCalendarCloseUpEventInfo = null;
	nexacro.CalendarDayClickEventInfo = function (obj, id, date) {
		this.id = this.eventid = id || "ondayclick";
		this.fromobject = this.fromreferenceobject = obj;

		this.date = date;
	};
	var _pCalendarDayClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarDayClickEventInfo);
	nexacro.CalendarDayClickEventInfo.prototype = _pCalendarDayClickEventInfo;
	_pCalendarDayClickEventInfo._type_name = "CalendarDayClickEventInfo";

	delete _pCalendarDayClickEventInfo;
	_pCalendarDayClickEventInfo = null;

	nexacro.CalendarSpinEventInfo = function (obj, id, beforeText, afterText, beforeValue, afterValue, isUp, fromobject, fromreferenceobject) {
		nexacro.Event.call(this, obj, id || "oncalendarspin");
		this.id = this.eventid = id || "oncalendarspin";

		this.fromobject = fromobject || obj;
		this.fromreferenceobject = fromreferenceobject || obj;

		this.pretext = beforeText;
		this.posttext = afterText;
		this.prevalue = beforeValue;
		this.postvalue = afterValue;
		this.up = isUp;
	};
	var _pCalendarSpinEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarSpinEventInfo);
	nexacro.CalendarSpinEventInfo.prototype = _pCalendarSpinEventInfo;
	_pCalendarSpinEventInfo._type_name = "CalendarSpinEventInfo";

	delete _pCalendarSpinEventInfo;
	_pCalendarSpinEventInfo = null;

	nexacro.Calendar_Style = function (target) {
		nexacro.Style.call(this, target);

		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;

		this.popupsize = null;
		this.popupbackground = null;
		this.popupgradation = null;
		this.popupborder = null;
		this.popupbordertype = null;
		this.popupalign = null;

		this.buttonsize = null;
		this.usetrailingday = null;
		this.trailingdaycolor = null;
		this.viewyearspin = null;
		this.viewmonthspin = null;

		this.popuptype = null;
		this.displaynulltextcolor = null;
	};

	var _pCalendarStyle = nexacro._createPrototype(nexacro.Style, nexacro.Calendar_Style);
	nexacro.Calendar_Style.prototype = _pCalendarStyle;

	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "daysize"));
	eval(nexacro._createColorAttributeEvalStr("_pCalendarStyle", "daycolor"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "popupsize"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "usetrailingday"));
	eval(nexacro._createColorAttributeEvalStr("_pCalendarStyle", "trailingdaycolor"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "buttonsize"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "viewyearspin"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "viewmonthspin"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pCalendarStyle", "daybackground"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pCalendarStyle", "popupbackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pCalendarStyle", "dayborder"));
	eval(nexacro._createBorderAttributeEvalStr("_pCalendarStyle", "popupborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pCalendarStyle", "daybordertype"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pCalendarStyle", "popupbordertype"));
	eval(nexacro._createGradationAttributeEvalStr("_pCalendarStyle", "daygradation"));
	eval(nexacro._createGradationAttributeEvalStr("_pCalendarStyle", "popupgradation"));
	eval(nexacro._createFontAttributeEvalStr("_pCalendarStyle", "dayfont"));
	eval(nexacro._createFontAttributeEvalStr("_pCalendarStyle", "popupfont"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pCalendarStyle", "itemaccessibility"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "popuptype"));
	eval(nexacro._createValueAttributeEvalStr("_pCalendarStyle", "popupalign"));
	eval(nexacro._createColorAttributeEvalStr("_pCalendarStyle", "displaynulltextcolor"));

	_pCalendarStyle.__custom_emptyObject = function () {
		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;

		this.popupsize = null;
		this.popupbackground = null;
		this.popupgradation = null;
		this.popupborder = null;
		this.popupbordertype = null;
		this.popupalign = null;

		this.buttonsize = null;
		this.usetrailingday = null;
		this.trailingdaycolor = null;
		this.viewyearspin = null;
		this.viewmonthspin = null;
		this.popuptype = null;
		this.displaynulltextcolor = null;
	};

	_pCalendarStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.daysize && this.daysize._is_empty) {
			val += "daysize:" + this.daysize._value + "; ";
		}
		if (this.daycolor && this.daycolor._is_empty) {
			val += "daycolor:" + this.daycolor._value + "; ";
		}
		if (this.daybackground && this.daybackground._is_empty) {
			val += "daybackground:" + this.daybackground._value + "; ";
		}
		if (this.dayborder && this.dayborder._is_empty) {
			val += "dayborder:" + this.dayborder._value + "; ";
		}
		if (this.daybordertype && this.daybordertype._is_empty) {
			val += "daybordertype:" + this.daybordertype._value + "; ";
		}
		if (this.daygradation && this.daygradation._is_empty) {
			val += "daygradation:" + this.daygradation._value + "; ";
		}
		if (this.dayfont && this.dayfont._is_empty) {
			val += "dayfont:" + this.dayfont._value + "; ";
		}
		if (this.popupsize && this.popupsize._is_empty) {
			val += "popupsize:" + this.popupsize._value + "; ";
		}
		if (this.popupbackground && this.popupbackground._is_empty) {
			val += "popupbackground:" + this.popupbackground._value + "; ";
		}
		if (this.popupborder && this.popupborder._is_empty) {
			val += "popupborder:" + this.popupborder._value + "; ";
		}
		if (this.popupbordertype && this.popupbordertype._is_empty) {
			val += "popupbordertype:" + this.popupbordertype._value + "; ";
		}
		if (this.popupgradation && this.popupgradation._is_empty) {
			val += "popupgradation:" + this.popupgradation._value + "; ";
		}
		if (this.popupalign && this.popupalign._is_empty) {
			val += "popupalign:" + this.popupalign._value + "; ";
		}
		if (this.buttonsize && this.buttonsize._is_empty) {
			val += "buttonsize:" + this.buttonsize._value + "; ";
		}
		if (this.usetrailingday && this.usetrailingday._is_empty) {
			val += "usetrailingday:" + this.usetrailingday._value + "; ";
		}
		if (this.trailingdaycolor && this.trailingdaycolor._is_empty) {
			val += "trailingdaycolor:" + this.trailingdaycolor._value + "; ";
		}
		if (this.viewyearspin && this.viewyearspin._is_empty) {
			val += "viewyearspin:" + this.viewyearspin._value + "; ";
		}
		if (this.viewmonthspin && this.viewmonthspin._is_empty) {
			val += "viewmonthspin:" + this.viewmonthspin._value + "; ";
		}
		if (this.popuptype && this.popuptype._is_empty) {
			val += "popuptype:" + this.popuptype._value + "; ";
		}
		if (this.displaynulltextcolor && this.displaynulltextcolor._is_empty) {
			val += "displaynulltextcolor:" + this.displaynulltextcolor._value + "; ";
		}

		return val;
	};

	nexacro.Calendar_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.daysize = null;
		this.daycolor = null;
		this.daybackground = null;
		this.daygradation = null;
		this.dayborder = null;
		this.daybordertype = null;
		this.dayfont = null;

		this.popupsize = null;
		this.popupbackground = null;
		this.popupgradation = null;
		this.popupborder = null;
		this.popupbordertype = null;
		this.popupalign = null;

		this.buttonsize = null;
		this.usetrailingday = null;
		this.trailingdaycolor = null;
		this.viewyearspin = null;
		this.viewmonthspin = null;
		this.popuptype = null;
		this.displaynulltextcolor = null;
	};

	var _pCalendarCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Calendar_CurrentStyle);
	nexacro.Calendar_CurrentStyle.prototype = _pCalendarCurrentStyle;

	_pCalendarCurrentStyle.__custom_emptyObject = _pCalendarStyle.__custom_emptyObject;
	_pCalendarCurrentStyle.__get_custom_style_value = _pCalendarStyle.__get_custom_style_value;

	delete _pCalendarStyle;
	delete _pCalendarCurrentStyle;


	nexacro.Calendar = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.calendaredit = null;
		this.dropbutton = null;
		this.popupcalendar = null;
		this.popupwindow = null;
		this.spindownbutton = null;
		this.spinupbutton = null;

		this.text = "";
		this.displaynulltext = "";
		this.value = null;
		this.innerdataset = null;
		this.datecolumn = "";
		this.backgroundcolumn = "";
		this.bordercolumn = "";
		this.textcolorcolumn = "";
		this.type = "normal";
		this.autoselect = false;
		this.autoskip = false;
		this.dateformat = "yyyy-MM-dd ddd";
		this.editformat = "yyyy-MM-dd";
		this.useinputpanel = true;
		this.usecontextmenu = true;
		this.imemode = "none";
		this.useime = "global";
		this.viewmonthspin = false;
		this.viewyearspin = false;
		this.readonly = false;
		this.locale = "";


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
			"ondragend" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"oncloseup" : 1, 
			"ondayclick" : 1, 
			"ondropdown" : 1, 
			"oneditclick" : 1, 
			"canchange" : 1, 
			"cancharchange" : 1, 
			"onchanged" : 1, 
			"onchar" : 1, 
			"ongesture" : 1, 
			"onmonthchange" : 1, 
			"onspin" : 1, 
			"ontextchange" : 1, 
			"ontextchanged" : 1, 
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
			"onslideend" : 1, 
			"oncontextmenu" : 1
		};


		this._mask = "";
		this._currentformat = "dateformat";
		this._innerdataset = null;
		this._init_popupsize = null;
		this._caret_pos = {
		};
		this._caret_pos.begin = 0;
		this._caret_pos.end = 0;
		this._editformat_info = this._makeFormatInfo(this.editformat, true);
		this._dateformat_info = this._makeFormatInfo(this.dateformat);
		this._prevalue = null;
		this._postvalue = null;
		this._pretext = "";
		this._posttext = "";
		this._primitivevalue = null;
		this._is_primitivevalue = false;
		this._defaultLocale = "ko_KR";
		this._datelistL = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
		this._datelistS = ["일", "월", "화", "수", "목", "금", "토"];
		this._monthlistL = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
		this._monthlistS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

		this._localeListL = 
			{
			"ko_KR" : ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], 
			"ja_JP" : ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], 
			"en_US" : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		};
		this._localeListS = 
			{
			"ko_KR" : ["일", "월", "화", "수", "목", "금", "토"], 
			"ja_JP" : ["日", "月", "火", "水", "木", "金", "土"], 
			"en_US" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		};
		this._accessibility_role = "calendar";
		this._day_click = false;
		this._flag_update2dataset = false;
		this._bindsource = false;
		this._pretype = this.type;
		this._want_arrows = false;
		this._has_inputElement = true;
		this._locale = "";
		this._is_dropbutton = false;
	};

	var _pCalendar = nexacro._createPrototype(nexacro.Component, nexacro.Calendar);
	nexacro.Calendar.prototype = _pCalendar;
	_pCalendar._type_name = "Calendar";

	nexacro.Calendar._defaultDaysize = nexacro._getCachedStyleObj("daysize", "26 26");
	nexacro.Calendar._defaultPopupsize = nexacro._getCachedStyleObj("popupsize", "192 192");
	nexacro.Calendar._defaultPopupalign = nexacro._getCachedStyleObj("align", "left bottom");
	nexacro.Calendar._defaultUseTrailngday = nexacro._getCachedStyleObj("usetrailingday", "false");
	nexacro.Calendar._defaultButtonsize = nexacro._getCachedStyleObj("buttonsize", -1);
	nexacro.Calendar._defaultViewyearspin = nexacro._getCachedStyleObj("viewyearspin", "false");
	nexacro.Calendar._defaultViewmonthspin = nexacro._getCachedStyleObj("viewmonthspin", "false");

	_pCalendar.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var align = this.on_find_CurrentStyle_align(pseudo);
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}
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
		var padding = this.on_find_CurrentStyle_padding(pseudo);
		if (curstyle.padding != padding) {
			curstyle.padding = padding;
			this.on_apply_style_padding(padding);
		}

		var popupalign = this.on_find_CurrentStyle_popupalign(pseudo);
		if (curstyle.popupalign != popupalign) {
			curstyle.popupalign = popupalign;
			this.on_apply_style_popupalign(popupalign);
		}
		var popupbackground = this.on_find_CurrentStyle_popupbackground(pseudo);
		if (curstyle.popupbackground != popupbackground) {
			curstyle.popupbackground = popupbackground;
			this.on_apply_style_popupbackground(popupbackground);
		}
		var popupborder = this.on_find_CurrentStyle_popupborder(pseudo);
		if (curstyle.popupborder != popupborder) {
			curstyle.popupborder = popupborder;
			this.on_apply_style_popupborder(popupborder);
		}
		var popupbordertype = this.on_find_CurrentStyle_popupbordertype(pseudo);
		if (curstyle.popupbordertype != popupbordertype) {
			curstyle.popupbordertype = popupbordertype;
			this.on_apply_style_popupbordertype(popupbordertype);
		}
		var popupgradation = this.on_find_CurrentStyle_popupgradation(pseudo);
		if (curstyle.popupgradation != popupgradation) {
			curstyle.popupgradation = popupgradation;
			this.on_apply_style_popupgradation(popupgradation);
		}
		var popupsize = this.on_find_CurrentStyle_popupsize(pseudo);
		if (curstyle.popupsize != popupsize) {
			curstyle.popupsize = popupsize;
			this.on_apply_style_popupsize(popupsize);
		}

		var usetrailingday = this.on_find_CurrentStyle_usetrailingday(pseudo);
		if (curstyle.usetrailingday != usetrailingday) {
			curstyle.usetrailingday = usetrailingday;
		}
		var trailingdaycolor = this.on_find_CurrentStyle_trailingdaycolor(pseudo);
		if (curstyle.trailingdaycolor != trailingdaycolor) {
			curstyle.trailingdaycolor = trailingdaycolor;
		}
		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);
		if (curstyle.buttonsize != buttonsize) {
			curstyle.buttonsize = buttonsize;
		}
		var viewyearspin = this.on_find_CurrentStyle_viewyearspin(pseudo);
		if (curstyle.viewyearspin != viewyearspin) {
			curstyle.viewyearspin = viewyearspin;
		}
		var viewmonthspin = this.on_find_CurrentStyle_viewmonthspin(pseudo);
		if (curstyle.viewmonthspin != viewmonthspin) {
			curstyle.viewmonthspin = viewmonthspin;
		}
		var popuptype = this.on_find_CurrentStyle_popuptype(pseudo);
		if (curstyle.popuptype != popuptype) {
			curstyle.popuptype = popuptype;
		}
		var displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(pseudo);
		if (curstyle.displaynulltextcolor != displaynulltextcolor) {
			curstyle.displaynulltextcolor = displaynulltextcolor;
			this.on_apply_style_displaynulltextcolor(displaynulltextcolor);
		}
	};

	_pCalendar.on_apply_custom_class = function () {
		if (this.calendaredit) {
			this.calendaredit.on_apply_prop_class();
		}
		if (this.dropbutton) {
			this.dropbutton.on_apply_prop_class();
		}
		if (this.spinupbutton) {
			this.spinupbutton.on_apply_prop_class();
		}
		if (this.spindownbutton) {
			this.spindownbutton.on_apply_prop_class();
		}
	};

	_pCalendar.on_create_custom_style = function () {
		return new nexacro.Calendar_Style(this);
	};

	_pCalendar.on_create_custom_currentStyles = function () {
		return new nexacro.Calendar_CurrentStyle();
	};


	_pCalendar.on_find_CurrentStyle_daycolor = function (pseudo) {
		return this._find_pseudo_obj("daycolor", pseudo, "color");
	};

	_pCalendar.on_find_CurrentStyle_daybackground = function (pseudo) {
		return this._find_pseudo_obj("daybackground", pseudo, "background");
	};

	_pCalendar.on_find_CurrentStyle_dayborder = function (pseudo) {
		return this._find_pseudo_obj("dayborder", pseudo, "border");
	};

	_pCalendar.on_find_CurrentStyle_daybordertype = function (pseudo) {
		return this._find_pseudo_obj("daybordertype", pseudo, "bordertype");
	};

	_pCalendar.on_find_CurrentStyle_dayfont = function (pseudo) {
		return this._find_pseudo_obj("dayfont", pseudo, "font");
	};

	_pCalendar.on_find_CurrentStyle_daygradation = function (pseudo) {
		return this._find_pseudo_obj("daygradation", pseudo, "gradation");
	};

	_pCalendar.on_find_CurrentStyle_daysize = function (pseudo) {
		return this._find_pseudo_obj("daysize", pseudo);
	};

	_pCalendar.on_find_CurrentStyle_popupalign = function (pseudo) {
		return this._find_pseudo_obj("popupalign", pseudo, "align");
	};

	_pCalendar.on_find_CurrentStyle_popupbackground = function (pseudo) {
		return this._find_pseudo_obj("popupbackground", pseudo, "background");
	};

	_pCalendar.on_find_CurrentStyle_popupborder = function (pseudo) {
		return this._find_pseudo_obj("popupborder", pseudo, "border");
	};

	_pCalendar.on_find_CurrentStyle_popupbordertype = function (pseudo) {
		return this._find_pseudo_obj("popupbordertype", pseudo, "bordertype");
	};

	_pCalendar.on_find_CurrentStyle_popupgradation = function (pseudo) {
		return this._find_pseudo_obj("popupgradation", pseudo, "gradation");
	};

	_pCalendar.on_find_CurrentStyle_popupsize = function (pseudo) {
		return this._find_pseudo_obj("popupsize", pseudo) || nexacro.Calendar._defaultPopupsize;
	};

	_pCalendar.on_find_CurrentStyle_usetrailingday = function (pseudo) {
		return this._find_pseudo_obj("usetrailingday", pseudo);
	};

	_pCalendar.on_find_CurrentStyle_trailingdaycolor = function (pseudo) {
		return this._find_pseudo_obj("trailingdaycolor", pseudo, "color");
	};

	_pCalendar.on_find_CurrentStyle_buttonsize = function (pseudo) {
		return this._find_pseudo_obj("buttonsize", pseudo) || nexacro.Calendar._defaultButtonsize;
	};

	_pCalendar.on_find_CurrentStyle_viewyearspin = function (pseudo) {
		return this._find_pseudo_obj("viewyearspin", pseudo) || nexacro.Calendar._defaultViewyearspin;
	};

	_pCalendar.on_find_CurrentStyle_viewmonthspin = function (pseudo) {
		return this._find_pseudo_obj("viewmonthspin", pseudo) || nexacro.Calendar._defaultViewmonthspin;
	};

	_pCalendar.on_find_CurrentStyle_align = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("align", pseudo, "align") || this._find_pseudo_obj("align", pseudo, "align");
		}
		return this._find_pseudo_obj("align", pseudo, "align");
	};

	_pCalendar.on_find_CurrentStyle_background = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("background", pseudo, "background") || this._find_pseudo_obj("background", pseudo, "background");
		}
		return this._find_pseudo_obj("background", pseudo, "background");
	};

	_pCalendar.on_find_CurrentStyle_border = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("border", pseudo, "border") || this._find_pseudo_obj("border", pseudo, "border");
		}
		return this._find_pseudo_obj("border", pseudo, "border");
	};

	_pCalendar.on_find_CurrentStyle_bordertype = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("bordertype", pseudo, "bordertype") || this._find_pseudo_obj("bordertype", pseudo, "bordertype");
		}
		return this._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pCalendar.on_find_CurrentStyle_color = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("color", pseudo, "color") || this._find_pseudo_obj("color", pseudo, "color");
		}
		return this._find_pseudo_obj("color", pseudo, "color");
	};

	_pCalendar.on_find_CurrentStyle_font = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("font", pseudo, "font") || this._find_pseudo_obj("font", pseudo, "font");
		}
		return this._find_pseudo_obj("font", pseudo, "font");
	};

	_pCalendar.on_find_CurrentStyle_gradation = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("gradation", pseudo, "gradation") || this._find_pseudo_obj("gradation", pseudo, "gradation");
		}
		return this._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pCalendar.on_find_CurrentStyle_accessibility = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("accessibility", pseudo, "accessibility") || this._find_pseudo_obj("accessibility", pseudo, "accessibility");
		}
		return this._find_pseudo_obj("accessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pCalendar.on_find_CurrentStyle_popuptype = function (pseudo) {
		return this._find_pseudo_obj("popuptype", pseudo);
	};

	_pCalendar.on_find_CurrentStyle_displaynulltextcolor = function (pseudo) {
		var displaynulltextcolor = this._find_pseudo_obj("displaynulltextcolor", pseudo, "color");
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_pseudo_obj("color", pseudo, "color");
		}
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_inherit_pseudo_obj("color", pseudo, "color");
		}

		return (displaynulltextcolor) ? displaynulltextcolor : nexacro.Component._default_color;
	};


	_pCalendar.on_update_style_daycolor = function () {
		this.on_apply_style_daycolor(this.currentstyle.daycolor = this.on_find_CurrentStyle_daycolor(this._pseudo));
	};

	_pCalendar.on_update_style_daybackground = function () {
		this.on_apply_style_daybackground(this.currentstyle.daybackground = this.on_find_CurrentStyle_daybackground(this._pseudo));
	};

	_pCalendar.on_update_style_dayborder = function () {
		this.on_apply_style_dayborder(this.currentstyle.dayborder = this.on_find_CurrentStyle_dayborder(this._pseudo));
	};

	_pCalendar.on_update_style_daybordertype = function () {
		this.on_apply_style_daybordertype(this.currentstyle.daybordertype = this.on_find_CurrentStyle_daybordertype(this._pseudo));
	};

	_pCalendar.on_update_style_dayfont = function () {
		this.on_apply_style_dayfont(this.currentstyle.dayfont = this.on_find_CurrentStyle_dayfont(this._pseudo));
	};

	_pCalendar.on_update_style_daygradation = function () {
		this.on_apply_style_daygradation(this.currentstyle.daygradation = this.on_find_CurrentStyle_daygradation(this._pseudo));
	};

	_pCalendar.on_update_style_daysize = function () {
		this.on_apply_style_daysize(this.currentstyle.daysize = this.on_find_CurrentStyle_daysize(this._pseudo));
	};

	_pCalendar.on_update_style_popupalign = function () {
		this.on_apply_style_popupalign(this.currentstyle.popupalign = this.on_find_CurrentStyle_popupalign(this._pseudo));
	};

	_pCalendar.on_update_style_popupbackground = function () {
		this.on_apply_style_popupbackground(this.currentstyle.popupbackground = this.on_find_CurrentStyle_popupbackground(this._pseudo));
	};

	_pCalendar.on_update_style_popupborder = function () {
		this.on_apply_style_popupborder(this.currentstyle.popupborder = this.on_find_CurrentStyle_popupborder(this._pseudo));
	};

	_pCalendar.on_update_style_popupbordertype = function () {
		this.on_apply_style_popupbordertype(this.currentstyle.popupbordertype = this.on_find_CurrentStyle_popupbordertype(this._pseudo));
	};

	_pCalendar.on_update_style_popupgradation = function () {
		this.on_apply_style_popupgradation(this.currentstyle.popupgradation = this.on_find_CurrentStyle_popupgradation(this._pseudo));
	};

	_pCalendar.on_update_style_popupsize = function () {
		if (!this._init_popupsize) {
			this._init_popupsize = this.currentstyle.popupsize;
		}

		this.on_apply_style_popupsize(this.currentstyle.popupsize = this.on_find_CurrentStyle_popupsize(this._pseudo));
	};

	_pCalendar.on_update_style_usetrailingday = function () {
		this.on_apply_style_usetrailingday(this.currentstyle.usetrailingday = this.on_find_CurrentStyle_usetrailingday(this._pseudo));
	};

	_pCalendar.on_update_style_trailingdaycolor = function () {
		this.on_apply_style_trailingdaycolor(this.currentstyle.trailingdaycolor = this.on_find_CurrentStyle_trailingdaycolor(this._pseudo));
	};

	_pCalendar.on_update_style_buttonsize = function () {
		this.on_apply_style_buttonsize(this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo));
	};

	_pCalendar.on_update_style_viewyearspin = function () {
		this.on_apply_style_viewyearspin(this.currentstyle.viewyearspin = this.on_find_CurrentStyle_viewyearspin(this._pseudo));
	};

	_pCalendar.on_update_style_viewmonthspin = function () {
		this.on_apply_style_viewmonthspin(this.currentstyle.viewmonthspin = this.on_find_CurrentStyle_viewmonthspin(this._pseudo));
	};

	_pCalendar.on_update_style_popuptype = function () {
		this.currentstyle.popuptype = this.on_find_CurrentStyle_popuptype(this._pseudo);

		if (this._getPopupType() == "system") {
			if ((nexacro._isMobile && nexacro._isMobile()) || (nexacro._isHybrid && nexacro._isHybrid()) || (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Runtime")) {
				this.type = "system";
				this.on_apply_type();
				return;
			}
		}
	};

	_pCalendar.on_update_style_displaynulltextcolor = function () {
		this.on_apply_style_displaynulltextcolor(this.currentstyle.displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(this._pseudo));
	};


	_pCalendar.on_apply_style_align = function (v) {
		var edit = this.calendaredit;
		if (edit) {
			edit.style.set_align(v);
		}
	};

	_pCalendar.on_apply_style_popupalign = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_align(v);
		}
	};

	_pCalendar.on_apply_style_color = function (v) {
		var edit = this.calendaredit;
		if (edit) {
			edit.on_apply_style_color(v);
		}
	};

	_pCalendar.on_apply_style_popupcolor = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_color(v);
		}
	};

	_pCalendar.on_apply_style_daycolor = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_daycolor(v);
		}
	};

	_pCalendar.on_apply_style_font = function (v) {
		var edit = this.calendaredit;
		if (edit) {
			edit.on_apply_style_font(v);
		}
	};

	_pCalendar.on_apply_style_popupfont = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_font(v);
		}
	};

	_pCalendar.on_apply_style_dayfont = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_dayfont(v);
		}
	};

	_pCalendar.on_apply_style_popupbackground = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_background(v);
		}
	};

	_pCalendar.on_apply_style_daybackground = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_daybackground(v);
		}
	};

	_pCalendar.on_apply_style_popupborder = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_border(v);
		}
	};

	_pCalendar.on_apply_style_dayborder = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_dayborder(v);
		}
	};

	_pCalendar.on_apply_style_popupbordertype = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_bordertype(v);
		}
	};

	_pCalendar.on_apply_style_daybordertype = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_daybordertype(v);
		}
	};

	_pCalendar.on_apply_style_popupgradation = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_gradation(v);
		}
	};

	_pCalendar.on_apply_style_daygradation = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_daygradation(v);
		}
	};

	_pCalendar.on_apply_style_popupsize = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			if (v) {
				var arr = v.value.split(/\s+/);
				var w, h;
				if (arr.length == 2) {
					w = parseInt(arr[0], 10);
					h = parseInt(arr[1], 10);
				}
				else {
					w = parseInt(arr[0], 10);
					h = parseInt(arr[0], 10);
				}

				var pop_control_elem = popupcalendar._control_element;
				if (this.type == "normal" && pop_control_elem) {
					pop_control_elem.setElementSize(w, h);
					popupcalendar._updateClientSize(pop_control_elem);
				}
			}
		}
	};

	_pCalendar.on_apply_style_daysize = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_daysize(v);
		}
	};

	_pCalendar.on_apply_style_usetrailingday = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_usetrailingday(v);
		}
	};

	_pCalendar.on_apply_style_trailingdaycolor = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_trailingdaycolor(v);
		}
	};

	_pCalendar.on_apply_style_buttonsize = function (v) {
		this._resizeCalendar();
	};

	_pCalendar.on_apply_style_viewyearspin = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_viewyearspin(v);
		}
	};

	_pCalendar.on_apply_style_viewmonthspin = function (v) {
		var popupcalendar = this.popupcalendar;
		if (popupcalendar) {
			popupcalendar.on_apply_style_viewmonthspin(v);
		}
	};

	_pCalendar.on_apply_style_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_style_accessibility.call(this, accessibility);
		if (this.calendaredit) {
			this.calendaredit.on_apply_style_accessibility(accessibility);
		}
	};

	_pCalendar.on_apply_style_displaynulltextcolor = function (v) {
		if (this.calendaredit) {
			this.calendaredit.on_apply_style_displaynulltextcolor(v);
		}
	};

	_pCalendar.on_apply_style_letterspace = function (letterspace) {
		if (this.calendaredit) {
			this.calendaredit.on_apply_style_letterspace(letterspace);
		}
	};

	_pCalendar.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._getPopupType() == "system") {
				if ((nexacro._isMobile && nexacro._isMobile()) || (nexacro._isHybrid && nexacro._isHybrid()) || (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Runtime")) {
					this.type = "system";
				}
			}

			switch (this.type) {
				case "normal":
					this._createCalendaredit();
					this._createDropbutton();
					break;
				case "spin":
					this._createCalendaredit();
					this._createSpinbutton();
					break;
				case "monthonly":
					this._createPopupcalendar();
					break;
				case "system":
					this._createSystemCalendar();
					break;
			}
		}
	};

	_pCalendar.on_created_contents = function () {
		this._currentformat = "dateformat";
		this.on_apply_autoskip();
		this.on_apply_autoselect();
		this.on_apply_locale();
		this.on_apply_displaynulltext();
		this.on_apply_editformat();
		this.on_apply_usecontextmenu();
		this.on_apply_style_displaynulltextcolor(this.currentstyle.displaynulltextcolor);

		this._currentformat = "dateformat";

		if (this.expr) {
			this.on_apply_expr();
		}
		else {
			if (!this.value && this._primitivevalue) {
				this._setValue(this._primitivevalue);
			}
		}

		this.on_apply_dateformat();

		switch (this.type) {
			case "spin":
				this._setEventHandlerToCalendarEdit();
				this._setEventHandlerToSpinButton();

				this.calendaredit.on_created();
				this.spinupbutton.on_created();
				this.spindownbutton.on_created();
				this.calendaredit.style.set_align(this.currentstyle.align);
				break;
			case "monthonly":
				this._setEventHandlerToPopupCalendar();
				this.popupcalendar.on_created();
				if (nexacro._enableaccessibility) {
					this._want_arrows = true;
				}
				break;
			case "system":
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
					var control_elem = this.getElement();
					if (control_elem) {
						control_elem.setElementAccessibilityHidden(false);
					}
				}
				this._setEventHandlerToCalendarEdit();
				this.calendaredit.on_created();
				this._setAccessibilityActiveDescendant(this.calendaredit);
				this.calendaredit.style.set_align(this.currentstyle.align);
				break;
			case "normal":
			default:
				this._setEventHandlerToCalendarEdit();
				this._setEventHandlerToDropButton();

				this.calendaredit.on_created();
				this.dropbutton.on_created();
				this._setAccessibilityActiveDescendant(this.calendaredit);
				this.calendaredit.style.set_align(this.currentstyle.align);
				this.on_apply_style_popupborder(this.currentstyle.popupborder);
				this.dropbutton._control_element.setElementAccessibilityHidden(true);
		}

		if (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Runtime") {
			if (this.calendaredit && this.calendaredit._input_element) {
				this.calendaredit._input_element.setElementInputType("date");
			}
		}

		this.on_apply_innerdataset();
		this.on_apply_style_letterspace(this.currentstyle.letterspace);
		this.on_apply_prop_rtldirection();

		if (nexacro._enableaccessibility && this.calendaredit && this.calendaredit._input_element) {
			var input_elem = this.calendaredit._input_element;
			input_elem._setElementInputRole();
			input_elem._setElementInputLabel();
		}
	};

	_pCalendar.on_destroy_contents = function () {
		this._destroyControl();
		this._destroyInnerdataset();

		this._editformat_info = null;
		this._dateformat_info = null;
		this._currentformat = "";
		this._mask = "";
		this._caret_pos = null;
		this._prevalue = null;
		this._postvalue = null;
		this._datelistL = null;
		this._datelistS = null;
		this._localeListL = null;
		this._localeListS = null;
	};

	_pCalendar.on_change_containerRect = function (width, height) {
		this._resizeCalendar();
	};

	_pCalendar.on_getBindableProperties = function () {
		return "value";
	};

	_pCalendar.on_apply_custom_setfocus = function (evt_name) {
		var edit = this.calendaredit;
		var popupcalendar = this.popupcalendar;
		if (edit) {
			var edit_api = edit._edit_base_api;
			if (edit_api && !this._re_focus) {
				this._currentformat = "editformat";

				var val = this.value;
				var v_str = this._toValueStr(val);
				var date = "";

				this._setMask(this._currentformat, false, this.value);

				if (nexacro._isNull(val)) {
					date = val;
				}
				else {
					date = this._makeMaskValue(v_str);
				}

				edit_api._setValue(date);

				if (!edit._input_element._is_mousedown) {
					edit.setSelect(this._caret_pos.begin, this._caret_pos.end);
				}
			}

			if (!this._is_dropbutton) {
				edit.on_apply_custom_setfocus(evt_name);
			}
			else {
				this._is_dropbutton = false;
				edit_api._changeFocusText(edit._input_element);
				nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
			}

			edit._stat_change("focus", "focused");
		}
		else if (popupcalendar) {
			popupcalendar.on_apply_custom_setfocus(evt_name);
		}
	};

	_pCalendar.on_apply_prop_enable = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.calendaredit) {
				this.calendaredit._setEnable(v);
			}
			if (this.dropbutton) {
				this.dropbutton._setEnable(v);
			}
			if (this.spinupbutton) {
				this.spinupbutton._setEnable(v);
			}
			if (this.spindownbutton) {
				this.spindownbutton._setEnable(v);
			}
			if (this.popupcalendar) {
				this.popupcalendar._setEnable(v);
			}
		}
	};

	_pCalendar.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			this._bindsource = false;
			this._setValue(undefined);
			return true;
		}
	};

	_pCalendar.on_change_bindSource = function (propid, ds, row, col, index) {
		if (propid == "value") {
			this._bindsource = true;
			this._currentformat = "editformat";
			var col_val = ds.getColumn(row, col);
			var str_val = this._toValueStr(col_val);
			var v = this._makeDateObj(str_val);

			if (col_val) {
				this._setEnable(this.enable);
			}

			if (this._is_primitivevalue && !this._is_created) {
				this._primitivevalue = v;
			}
			this._currentformat = "dateformat";
			this._setValue(v);
			return true;
		}

		return false;
	};

	_pCalendar.on_get_style_accessibility_label = function () {
		if (this.type == "monthonly") {
			return this.text ? this.text : this._getCurrentDate();
		}
		else {
			return "";
		}
	};

	_pCalendar._on_getAccessibilityAdditionalLabel = function () {
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		if (accessibility) {
			var edit = this.calendaredit;
			if (edit) {
				return edit._edit_base_api._on_getAccessibilityAdditionalLabel();
			}
		}
		return "";
	};

	_pCalendar.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);
		if (this._isPopupVisible()) {
			if (resize_flag || move_flag) {
				this._closePopup();
				return;
			}

			this._update_popupwindow_position();

			if (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Runtime") {
				var pThis = this;

				var _observer = this._popupwindow_position_observer;
				if (_observer) {
					if (_observer._interval_timer) {
						_observer._interval_timer.stop();
						delete _observer._interval_timer;
						_observer._interval_timer = null;
					}
					this._popupwindow_position_observer = null;
				}

				var control_elem = this._control_element;
				_observer = this._popupwindow_position_observer = {
				};
				_observer._observed_count = 0;
				_observer._elem_pos = nexacro._getElementPositionInFrame(control_elem);
				_observer._interval_timer = new nexacro.CallbackTimer(this, function () {
					if (++_observer._observed_count >= 50) {
						_observer._interval_timer.destroy();
						delete _observer._interval_timer;
						_observer._interval_timer = null;
						return;
					}

					var cur_elem_pos = nexacro._getElementPositionInFrame(control_elem);
					if (_observer._elem_pos.x != cur_elem_pos.x || _observer._elem_pos.y != cur_elem_pos.y) {
						pThis._update_popupwindow_position();
						_observer._observed_count = 50;
					}
				}, 100);
				_observer._interval_timer.start();
			}
		}
	};

	_pCalendar._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	_pCalendar._getAccessibilityReadLabel = function (bwholeread) {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (bwholeread && this.calendaredit._input_element && this._status != "focus") {
			if (!this.calendaredit._input_element._wantAccessibilityAdditionalLabel
				 || !this.calendaredit._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}
		return _readlabel;
	};

	_pCalendar._setAccessibilityStatFocus = function (evt_name) {
		var calendaredit = this.calendaredit;
		if (calendaredit && calendaredit._input_element) {
			var role = this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo));
			if (this._getDescLevel() == "none") {
				role = "none";
			}
			calendaredit._input_element.setElementAccessibilityRole(role);
		}
		return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pCalendar._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
		if (nexacro._accessibilitytype == 4 && this._getPopupType() == "system") {
			role = "none";
		}
		return role;
	};

	_pCalendar.set_text = nexacro._emptyFn;

	_pCalendar.set_autoselect = function (v) {
		if (v != this.autoselect) {
			this.autoselect = v;
			this.on_apply_autoselect();
		}
	};

	_pCalendar.on_apply_autoselect = function () {
		var edit = this.calendaredit;
		if (edit) {
			edit.set_autoselect(this.autoselect);
		}
	};

	_pCalendar.set_autoskip = function (v) {
		if (v != this.autoskip) {
			this.autoskip = v;
			this.on_apply_autoskip();
		}
	};

	_pCalendar.on_apply_autoskip = function () {
		var edit = this.calendaredit;
		if (edit) {
			edit.set_autoskip(this.autoskip);
		}
	};

	_pCalendar.set_displaynulltext = function (v) {
		if (v === undefined) {
			return;
		}

		v = nexacro._toString(v);
		v = v.replace(/&quot;/g, "\"");
		if (v != this.displaynulltext) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext();
		}
	};

	_pCalendar.on_apply_displaynulltext = function () {
		if (this.calendaredit) {
			this.calendaredit.set_displaynulltext(this.displaynulltext);
		}
	};

	_pCalendar.on_apply_expr = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var v = this.expr;
			var expr = v.substring(0, 4);
			var parser, conv_expr, exprfn;
			var use_jsdate_fn = false;

			if (expr == "expr") {
				expr = v.substr(4).trim();

				if (/^expr(\s*):/.test(v)) {
					expr = expr.substr(1);
				}
				else {
					expr = expr.substring(1, expr.length - 1);
				}
			}
			else {
				expr = v;
			}

			parser = new nexacro.ExprParser();
			conv_expr = parser.makeExpr(this, expr);

			if (conv_expr.substring(0, 4) == "Date") {
				conv_expr = "new " + conv_expr;
				use_jsdate_fn = true;
			}

			parser = null;
			exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);
			if (exprfn) {
				var val = exprfn.call(null, this);
				if (use_jsdate_fn) {
					this._setValue_JSDate(val);
				}
				else {
					this._setValue(val);
				}
			}
		}
	};

	_pCalendar.set_type = function (v) {
		if (this._getPopupType() == "system") {
			if ((nexacro._isMobile && nexacro._isMobile()) || (nexacro._isHybrid && nexacro._isHybrid()) || (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Runtime")) {
				this.type = "system";
				this.on_apply_type();
				return;
			}
		}

		if (v != this.type) {
			this._pretype = this.type;
			if (v === "spin" || v === "monthonly") {
				this.type = v;
			}
			else {
				this.type = "normal";
			}
			this.on_apply_type();
		}
	};

	_pCalendar.on_apply_type = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var is_change = true;
			var client_width = this._client_width;
			var normal_height = Math.round(client_width / 5);
			if (this._pretype != "monthonly" || this.type == "monthonly") {
				is_change = false;
			}

			this._destroyControl();

			switch (this.type) {
				case "normal":
					this._createNormaltypeControl();
					break;
				case "spin":
					this._createSpintypeControl();
					break;
				case "monthonly":
					var popupsize = this._getPopupSizeArr();
					this._createMonthlytypeControl();
					this.resize(popupsize.width, popupsize.height);
					break;
				case "system":
					if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
						control_elem.setElementAccessibilityHidden(false);
					}
					this._createSystemtypeControl();
			}

			if (is_change) {
				this.resize(client_width, normal_height);
			}

			this._resizeCalendar();

			if (nexacro._enableaccessibility && this.calendaredit && this.calendaredit._input_element) {
				var input_elem = this.calendaredit._input_element;
				input_elem._setElementInputRole();
				input_elem._setElementInputLabel();
			}
		}
	};

	_pCalendar.set_value = function (v) {
		if (v && ((typeof v) == "object") && !(v instanceof nexacro.Date)) {
			return;
		}

		this._setUserValue(v);
	};

	_pCalendar.on_apply_value = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var v = this.value;

			if (this.calendaredit) {
				if (v == "" && this._currentformat == "dateformat") {
					var status = true;
				}
				else {
					var status = false;
				}

				this._setMask(this._currentformat, status, this.value);

				if (v == null) {
					this.calendaredit.set_value(undefined);
				}
				else {
					var v_str = this._toValueStr(v);
					var date = (this._isEmptyStr(v)) ? "" : this._makeMaskValue(v_str);
					var edit_api = this.calendaredit._edit_base_api;
					this.calendaredit.value = edit_api._getValue();
					this.calendaredit.set_value(date);
				}
			}

			if (this.popupcalendar) {
				var date = this._getPickerValue(v);

				this.popupcalendar.set_value(date);
			}
		}
		this.on_apply_text();
	};

	_pCalendar.on_apply_fake_value = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.calendaredit) {
				var value = v;
				var val_str = this._toValueStr(value);
				var date = this._makeMaskValue(val_str);
				this._setMask(this._currentformat, true, value);
				this.calendaredit.set_value(date);
			}

			if (this.popupcalendar) {
				var value = this._makeDateObj(v);
				var date = this._getPickerValue(value);

				this.popupcalendar.set_value(date);
			}
		}
	};

	_pCalendar.on_apply_text = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var value = this.value;
			if (!value) {
				this.text = "";
			}
			else {
				this.displaytext = this.text = this._makeCalendarText(value);
			}

			this._refreshAccessibilityValue();
		}
	};

	_pCalendar.setInnerDataset = function (obj) {
		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset();
		}
		else if (obj instanceof nexacro.Dataset) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset();
		}
	};

	_pCalendar._setInnerDatasetStr = function (str) {
		if (!str) {
			this._innerdataset = null;
			this.innerdataset = "";
		}
		else {
			str = str.replace("@", "");
			this._innerdataset = this._findDataset(str);
			this.innerdataset = str;
		}
	};

	_pCalendar.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pCalendar.set_innerdataset = function (str) {
		if (typeof str != "string") {
			this.setInnerDataset(str);
			return;
		}
		if (str != this.innerdataset) {
			if (!str) {
				this._innerdataset = null;
				this.innerdataset = "";
			}
			else {
				str = str.replace("@", "");
				this._innerdataset = this._findDataset(str);
				this.innerdataset = str;
			}
			this.on_apply_innerdataset();
		}
		else if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset();
		}
		return this.innerdataset;
	};

	_pCalendar.on_apply_innerdataset = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var innerdataset = this._innerdataset;
			if (innerdataset && this.popupcalendar) {
				innerdataset._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
				innerdataset._setEventHandler("onrowsetchanged", this._callback_rowsetchanged, this);

				this.popupcalendar.on_apply_innerdataset(this._innerdataset);
			}
		}
	};

	_pCalendar.set_backgroundcolumn = function (v) {
		if (v != this.backgroundcolumn) {
			this.backgroundcolumn = v;
			this.on_apply_backgroundcolumn();
		}
	};

	_pCalendar.on_apply_backgroundcolumn = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.popupcalendar) {
				this.popupcalendar.on_apply_backgroundcolumn(this.backgroundcolumn);
			}
		}
	};

	_pCalendar.set_bordercolumn = function (v) {
		if (v != this.bordercolumn) {
			this.bordercolumn = v;
			this.on_apply_bordercolumn();
		}
	};

	_pCalendar.on_apply_bordercolumn = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.popupcalendar) {
				this.popupcalendar.on_apply_bordercolumn(this.bordercolumn);
			}
		}
	};

	_pCalendar.set_datecolumn = function (v) {
		if (v != this.datecolumn) {
			this.datecolumn = v;
			this.on_apply_datecolumn();
		}
	};

	_pCalendar.on_apply_datecolumn = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.popupcalendar) {
				this.popupcalendar.on_apply_datecolumn(this.datecolumn);
			}
		}
	};

	_pCalendar.set_textcolorcolumn = function (v) {
		if (v != this.textcolorcolumn) {
			this.textcolorcolumn = v;
			this.on_apply_textcolorcolumn();
		}
	};

	_pCalendar.on_apply_textcolorcolumn = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.popupcalendar) {
				this.popupcalendar.on_apply_textcolorcolumn(this.textcolorcolumn);
			}
		}
	};

	_pCalendar.set_dateformat = function (v) {
		if (v != this.dateformat) {
			this.dateformat = v;
			this.on_apply_dateformat();
		}
	};

	_pCalendar.on_apply_dateformat = function () {
		if (this.type == "system") {
			this._dateformat_info = this._makeFormatInfo("yyyy-MM-dd");
		}
		else {
			this._dateformat_info = this._makeFormatInfo(this.dateformat);
		}

		var control_elem = this.getElement();
		if (control_elem) {
			this.on_apply_value();
		}
	};

	_pCalendar.set_editformat = function (v) {
		if (v != this.editformat) {
			this.editformat = v;
			this.on_apply_editformat();
		}
	};

	_pCalendar.on_apply_editformat = function () {
		if (this.type == "system") {
			this._editformat_info = this._makeFormatInfo("yyyy-MM-dd");
		}
		else {
			this._editformat_info = this._makeFormatInfo(this.editformat, true);
		}
	};

	_pCalendar.set_imemode = function (v) {
		if (v != this.imemode) {
			this.imemode = v;
		}
	};

	_pCalendar.set_locale = function (v) {
		if (v != this.locale) {
			this.locale = v;
			if (this._locale != v) {
				this._locale = v;
				this.on_apply_locale();

				this.on_apply_dateformat();
				this.on_apply_editformat();
			}
		}
	};

	_pCalendar.on_apply_locale = function () {
		var edit = this.calendaredit;
		var locale = this._getLocale();
		if (edit) {
			edit._setLocale(locale);
		}

		var datepicker = this.popupcalendar;
		if (datepicker) {
			datepicker._setLocale(locale);
		}

		var control_elem = this.getElement();
		if (control_elem) {
			var popup = this.popupcalendar;
			var locale_info = nexacro.Locale.getLocaleInfo(locale);

			this._datelistL = locale_info.weekday_names_long;
			this._datelistS = locale_info.weekday_names_short;

			this._monthlistL = locale_info.month_names_long;
			this._monthlistS = locale_info.month_names_short;
			this._locale_direction = locale_info.direction;

			var localeStr = this._datelistS.join(" ");

			this.on_apply_value();

			if (popup) {
				var weekformat = popup.on_find_CurrentStyle_weekformat(this._pseudo);
				if (weekformat) {
					popup.on_apply_style_weekformat(weekformat);
				}
				else {
					popup.on_apply_style_weekformat(localeStr);
				}
			}
		}
	};

	_pCalendar.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		v = nexacro._toBoolean(v);
		if (this.visible != v) {
			nexacro.Component.prototype.set_visible.call(this, v);
			if (!v && this._is_created) {
				this.closeDropdown();
			}
		}
	};

	_pCalendar.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pCalendar.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		if (this.calendaredit) {
			this.calendaredit.set_readonly(v);
		}
		if (this.popupcalendar) {
			this.popupcalendar.set_readonly(v);
		}
	};

	_pCalendar.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);

		if (v != this.usecontextmenu) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu();
		}
	};

	_pCalendar.on_apply_usecontextmenu = function () {
		var calendaredit = this.calendaredit;
		if (calendaredit) {
			calendaredit.set_usecontextmenu(this.usecontextmenu);
		}
	};

	_pCalendar.set_useime = function (v) {
		if (v != this.useime) {
			this.useime = v;
		}
	};

	_pCalendar.set_useinputpanel = function (v) {
		if (v != this.useinputpanel) {
			this.useinputpanel = v;
		}
	};

	_pCalendar.closeDropdown = function () {
		if (this.type == "normal") {
			this._closePopup();
		}
	};

	_pCalendar.dropdown = function () {
		if (this.enable != true || this.readonly == true || this.visible == false || this.type != "normal") {
			return false;
		}

		this._currentformat = "editformat";
		var calendaredit = this.calendaredit;
		var value = this._makeNormalValue1(calendaredit.text);
		var pre_value = this._makeDateObj(this.value);
		var post_value = this._makeDateObj(value);
		var str_preval = pre_value ? pre_value.toString() : pre_value;
		var str_postval = post_value ? post_value.toString() : post_value;

		if (str_preval != str_postval) {
			if (!((str_preval === undefined || str_preval === null) && str_postval === "")) {
				this._setPreValueAndText(pre_value);
				this._setPostValueAndText(post_value);

				var ret = this.on_fire_canchange(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
				if (ret || ret === undefined) {
					var val_ret = this._setValue(this._postvalue);
					if (val_ret === false) {
						this._setValue(this._prevalue);
					}
					else {
						this._fireOnchangedEvent(pre_value, this.value);
					}
				}
				else {
					this._setValue(this._prevalue);
					this.setCaretPos(0);
				}
			}
		}

		if (this.isDropdown()) {
			return false;
		}

		var ret = this.on_fire_ondropdown(this);

		if (this._getPopupType() == "none" || this.type == "system") {
			return;
		}

		if (ret || ret === undefined) {
			this._setFocus(false);

			this._showPopup();
			this._resizeDatePicker(true);
			this._currentformat = "editformat";

			var date = this._makeMaskValue(this._toValueStr(this.value));

			var calendaredit = this.calendaredit;
			if (calendaredit) {
				this._setMask(this._currentformat, true, this.value);
				calendaredit.set_value(date);

				var input_elem = this.calendaredit._input_element;
				if (input_elem) {
					if (this.autoselect) {
						input_elem.setElementSetSelect(0, this.text.length);
					}
					else {
						this._setDefaultCaret();
					}
				}
			}

			var popupcalendar = this.popupcalendar;
			if (popupcalendar) {
				this.on_apply_style_popupborder(this.currentstyle.popupborder);

				date = this._getPickerValue(this._makeDateObj(this.value));

				popupcalendar.set_value(date);
				popupcalendar._hide_spindate();
			}

			if (nexacro._enableaccessibility) {
				this._want_arrows = true;
			}
		}
	};

	_pCalendar.isDropdown = function () {
		return this._isPopupVisible();
	};

	_pCalendar.getCaretPos = function () {
		var ret = -1;
		if (this.calendaredit && this.readonly == false) {
			ret = this.calendaredit.getCaretPos();
		}
		return ret;
	};

	_pCalendar.getDay = function () {
		var ret = 1;
		if (this.value) {
			ret = this.value.getDate();
		}
		return ret;
	};

	_pCalendar.getDayOfWeek = function () {
		var ret = 4;
		if (this.value) {
			ret = this.value.getDay();
		}
		return ret;
	};

	_pCalendar.getMonth = function () {
		var ret = 1;
		if (this.value) {
			ret = this.value.getMonth() + 1;
		}
		return ret;
	};

	_pCalendar.getSelect = function () {
		var ret = [0, 0];
		if (this.calendaredit) {
			ret = this.calendaredit.getSelect();
		}
		return ret;
	};

	_pCalendar.getSelectedText = function () {
		var ret = "";
		if (this.calendaredit) {
			ret = this.calendaredit.getSelectedText();
		}
		return ret;
	};

	_pCalendar.getYear = function () {
		var ret = 1970;
		if (this.value) {
			ret = this.value.getFullYear();
		}
		return ret;
	};

	_pCalendar.isAboveSelected = function () {
	};

	_pCalendar.setCaretPos = function (v) {
		this._caret_pos.begin = v;
		this._caret_pos.end = v;

		if (this.calendaredit) {
			return this.calendaredit.setCaretPos(v);
		}
	};

	_pCalendar.setSelect = function (begin, end) {
		var ret = false;

		this._caret_pos.begin = begin;
		this._caret_pos.end = end;

		if (this.calendaredit) {
			ret = this.calendaredit.setSelect(begin, end);
		}
		return ret;
	};

	_pCalendar.updateToDataset = function () {
		this._bindsource = false;
		var ret = this.applyto_bindSource("value", this.value);
		if (this._flag_update2dataset) {
			return true;
		}

		return ret;
	};

	_pCalendar._getDragData = function () {
		return this.calendaredit ? this.calendaredit._getDragData() : "";
	};

	_pCalendar.on_notify_ondayclick = function (obj, e) {
		if (this.readonly) {
			return;
		}

		var edit = this.calendaredit;

		if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
			this.on_apply_custom_setfocus();
		}

		this.on_fire_ondayclick(this, e.date);

		this._currentformat = "editformat";

		var pre_value = this._makeDateObj(this.value);
		if (e.date instanceof nexacro.Date) {
			var post_value = e.date;
		}
		else {
			var post_value = this._makeDateObj(e.date);
		}
		var str_preval = pre_value ? pre_value.toString() : pre_value;
		var str_postval = post_value ? post_value.toString() : post_value;

		if (str_preval != str_postval) {
			this._day_click = true;

			this._setPreValueAndText(pre_value);
			this._setPostValueAndText(post_value);

			var ret = this.on_fire_canchange(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
			if (ret || ret === undefined) {
				var val_ret = this._setValue(this._postvalue);
				if (val_ret === false) {
					this._setValue(this._prevalue);

					this.closeDropdown();
				}
				else {
					this.closeDropdown();
					this._fireOnchangedEvent(pre_value, post_value);
				}

				this._setDefaultCaret();
			}
			else {
				this._setValue(this._prevalue);
			}
		}
		else {
			this.closeDropdown();
			this._setDefaultCaret();
		}

		if (this.autoskip && edit) {
			edit.on_apply_autoskip();
		}

		this._day_click = false;
		this._currentformat = "editformat";

		return ret;
	};

	_pCalendar.on_notify_mobile_ondropdown = function (obj, e) {
		if (this.readonly == true || this.enable == false) {
			return false;
		}

		if (this._isPopupVisible()) {
			this.closeDropdown();
		}
		else {
			this.dropdown();
		}

		return false;
	};

	_pCalendar.on_notify_ondropdown = function (obj, e) {
		if (this.readonly == true || this.enable == false) {
			return false;
		}

		if (this._isPopupVisible()) {
			this.closeDropdown();

			if (this.calendaredit) {
				var input_elem = this.calendaredit._input_element;
				if (input_elem) {
					if (this.autoselect) {
						var text = this.text;
						input_elem.setElementSetSelect(0, text.length);
					}
					else {
						this._setDefaultCaret();
					}
				}
			}
		}
		else {
			this.dropdown();
		}

		return false;
	};

	_pCalendar.on_notify_oneditclick = function (obj, e) {
		if (this.type == "system") {
			var control_element = this.getElement();
			if (control_element) {
				nexacro._openSystemCalendar(this, this.value);
			}
			return true;
		}

		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altKey, e.ctrlKey, e.shiftKey, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, e.fromobject, e.fromreferenceobject);
	};

	_pCalendar.on_notify_onlbuttonup = function (obj, e) {
		nexacro.OnceCallbackTimer.callonce(this, function () {
			var edit = this.calendaredit;
			var input_elem = edit._input_element;
			var pos = input_elem.getElementCaretPos();

			if (pos && pos != -1) {
				this._caret_pos = pos;
				if (nexacro._isDesktop() && nexacro.Browser == "Runtime") {
					if (pos.begin == pos.end) {
						this.setCaretPos(pos.begin);
					}
				}
			}
			else {
				this._caret_pos.begin = 0;
				this._caret_pos.end = 0;
			}
		});
	};

	_pCalendar.on_notify_onlbuttondown = function (obj, e) {
		if (this.readonly == true) {
			return false;
		}

		var edit = this.calendaredit;
		var edit_api = edit._edit_base_api;
		var input_elem = edit._input_element;
		var pos = input_elem.getElementCaretPos();

		if (pos && pos != -1) {
			this._caret_pos = pos;
		}
		else {
			this._caret_pos.begin = 0;
			this._caret_pos.end = 0;
		}

		if (this._isPopupVisible()) {
			this.closeDropdown();
		}

		if (edit && this._currentformat != "editformat") {
			var status = (this._currentformat == "dateformat" && this.value === "") ? true : false;
			this._currentformat = "editformat";
			this._setMask(this._currentformat, status, this.value);
			var v_str = this._toValueStr(this.value);
			var date = this._makeMaskValue(v_str);
			edit_api._setValue(date);
		}
	};

	_pCalendar.on_notify_mobile_onlbuttondown = function (obj, e) {
		if (this.readonly == true) {
			return false;
		}

		var edit = this.calendaredit;
		var edit_api = edit._edit_base_api;

		if (this._isPopupVisible()) {
			this.closeDropdown();
		}

		if (edit && this._currentformat != "editformat") {
			this._currentformat = "editformat";
			this._setMask(this._currentformat, false, this.value);

			var v_str = this._toValueStr(this.value);
			var date = this._makeMaskValue(v_str);
			edit_api._setValue(date);
		}
	};

	_pCalendar.on_notify_ontextchange = function (obj, e) {
		if (!this._isValidDate(e.chartext)) {
			return false;
		}

		return this.on_fire_ontextchange(obj, e.chartext, e.pretext, e.posttext, e.preimetext, e.postimetext);
	};

	_pCalendar.on_notify_ontextchanged = function (obj, e) {
		var cur_text = e.posttext;
		var text = this._makeNormalValue(cur_text);
		var value = this._makeDateObj(text);
		var date = this._getPickerValue(value);

		if (this.popupcalendar && this.isDropdown()) {
			this.popupcalendar.set_value(date);
		}

		return this.on_fire_ontextchanged(obj, e.pretext, e.posttext);
	};

	_pCalendar.on_notify_onchanged = function (obj, e) {
	};

	_pCalendar.on_notify_onchar = function (obj, e) {
		return this.on_fire_onchar(obj, e.chartext, e.pretext, e.posttext);
	};

	_pCalendar.on_notify_cancharchange = function (obj, e) {
		return this.on_fire_cancharchange(obj, e.chartext, e.pretext, e.posttext);
	};

	_pCalendar.on_notify_canchange = function (obj, e) {
		return this.on_fire_canchange(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
	};

	_pCalendar.on_notify_oneditkillfocus = function (obj, e) {
		if (this.readonly == true) {
			return;
		}

		if (this.type == "spin" && e) {
			if (e.newreferencecomponent == this.spinupbutton || e.newreferencecomponent == this.spindownbutton) {
				return;
			}
		}

		this._currentformat = "editformat";
		var calendaredit = this.calendaredit;
		var value = this._makeNormalValue1(calendaredit.text);
		var pre_value = this._makeDateObj(this.value);
		var post_value = this._makeDateObj(value);
		var str_preval = pre_value ? pre_value.toString() : pre_value;
		var str_postval = post_value ? post_value.toString() : post_value;

		if (str_preval != str_postval) {
			if ((str_preval === undefined || str_preval === null) && str_postval === "") {
				return;
			}

			this._setPreValueAndText(pre_value);
			this._setPostValueAndText(post_value);

			var ret = this.on_fire_canchange(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
			if (ret || ret === undefined) {
				var val_ret = this._setValue(this._postvalue);
				if (val_ret === false) {
					this._setValue(this._prevalue);
					return;
				}
			}
			else {
				this._setValue(this._prevalue);
				this.setCaretPos(0);
				return;
			}

			this._fireOnchangedEvent(pre_value, this.value);
		}
	};

	_pCalendar.on_notify_oncloseup = function (obj, e) {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		if (this._day_click) {
			this.on_fire_oncloseup(this, this._pretext, this._posttext, this._prevalue, this._postvalue);
		}
		else {
			var text = this._changeYearValue();
			var value = this._makeNormalValue(text);
			this._currentformat = "dateformat";
			var pre_value = this._makeDateObj(this.value);
			var post_value = this._makeDateObj(value);
			var str_preval = pre_value ? pre_value.toString() : pre_value;
			var str_postval = post_value ? post_value.toString() : post_value;

			if (value) {
				this.on_fire_oncloseup(this, str_preval, str_postval, pre_value, post_value);
			}
			else {
				pre_value = this._makeNormalValue(this._primitivevalue);
				pre_value = this._makeDateObj(pre_value);
				this.on_fire_oncloseup(this, this._primitivevalue, str_postval, pre_value, post_value);
			}
		}
	};

	_pCalendar.on_notify_onkeydown = function (obj, e) {
		var E = nexacro.Event;

		switch (this.type) {
			case "normal":
				if (e.keycode == E.KEY_ESC) {
					this.closeDropdown();
					this._setDefaultCaret();
				}
				else if (e.keycode == E.KEY_ENTER) {
					this._fireKeydownEvent();
					if (this.isDropdown()) {
						this.popupcalendar.on_fire_sys_onkeydown(e.keycode, e.altKey, e.ctrlKey, e.shiftKey, e.fromobject, e.fromreferenceobject);
					}
					this.closeDropdown();
					this._setDefaultCaret();
				}
				else if (e.keycode == E.KEY_SPACE) {
					return false;
				}
				else if (e.altKey == true && e.keycode == E.KEY_DOWN) {
					this.dropdown();
				}
				else {
					if (this.isDropdown() && (e.keycode >= E.KEY_LEFT && e.keycode <= E.KEY_DOWN)) {
						this.popupcalendar.on_fire_sys_onkeydown(e.keycode, e.altKey, e.ctrlKey, e.shiftKey, e.fromobject, e.fromreferenceobject);
					}
				}
				break;
			case "spin":
				var edit = this.calendaredit;
				var input_elem = edit._input_element;
				var pos = input_elem.getElementCaretPos();

				if (pos && pos != -1) {
					this._caret_pos = pos;
				}
				else {
					this._caret_pos = 0;
				}

				if (e.keycode == E.KEY_ENTER) {
					this._fireKeydownEvent();
					this._setDefaultCaret();
				}
				else if (e.keycode == E.KEY_UP) {
					if (!nexacro._enableaccessibility || e.ctrlKey) {
						this.on_notify_onspinup(obj, e);
					}
				}
				else if (e.keycode == E.KEY_DOWN) {
					if (!nexacro._enableaccessibility || e.ctrlKey) {
						this.on_notify_onspindown(obj, e);
					}
				}

				break;
			case "monthonly":
			default:
				break;
		}

		return false;
	};

	_pCalendar.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		if (nexacro._enableaccessibility && !ctrl_key && !alt_key && (this.type == "monthonly" || this.isDropdown())) {
			var datepicker = this.popupcalendar;
			var header = datepicker._header;
			var body = datepicker._body;
			var year = body._year | 0;
			var month = body._month | 0;
			var day = body._day | 0;

			switch (keycode) {
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

								day = this._getEndDay(year, month) + day;
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
							var endday = this._getEndDay(year, month);
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
					}
					break;
			}
			if (keycode == 38 || keycode == 40) {
				year = body._makeDateText(year, "year");
				month = body._makeDateText(month, "month");
				day = body._makeDateText(day, "day");

				var date = new nexacro.Date(year, month - 1, day);
				datepicker._hide_spindate();


				if (this.type == "monthonly") {
					datepicker.on_fire_ondayclick(datepicker, date);
				}
				else {
					datepicker.set_value(year + month + day);
				}

				date = null;
			}
		}
	};

	_pCalendar.on_notify_onspinup = function (obj, e) {
		if (this.readonly == true) {
			return false;
		}

		this._currentformat = "editformat";
		var edit = this.calendaredit;
		var input_elem = edit._input_element;
		var value = edit.value;
		var caret_pos = this._caret_pos;

		if (!value) {
			var curr_date = new nexacro.Date();
			var str_date = this._toValueStr(curr_date);

			var week = curr_date.getDay();
			var week_str = this._datelistL[week];
			str_date += week_str;

			this.on_apply_fake_value(curr_date);
			this.setCaretPos(0);
			curr_date = null;
			return;
		}

		var text = input_elem.text;
		var date = this._makeSpinValue(text, 1, caret_pos.begin);

		this._setPreValueAndText(this._makeDateObj(value));
		this._setPostValueAndText(this._makeDateObj(date));

		var ret = this.on_fire_onspin(this, this._pretext, this._posttext, this._prevalue, this._postvalue, true);
		if (ret || ret === undefined) {
			this.on_apply_fake_value(this._postvalue);
		}


		var adjust_caret = 0;
		if (text.length != input_elem.text.length) {
			adjust_caret = input_elem.text.length - text.length;
		}
		this.setCaretPos(caret_pos.begin + adjust_caret);
		obj._stat_change("notselect", "normal");
	};

	_pCalendar.on_notify_mobile_onspinup = function (obj, e) {
		if (this.readonly == true) {
			return false;
		}

		this._currentformat = "editformat";
		var edit = this.calendaredit;
		var input_elem = edit._input_element;
		var value = edit.value;
		var caret_pos = this._caret_pos = {
			begin : edit._edit_base_api._begin_pos, 
			end : edit._edit_base_api._end_pos
		};

		if (!value) {
			var curr_date = new nexacro.Date();
			var str_date = this._toValueStr(curr_date);

			var week = curr_date.getDay();
			var week_str = this._datelistL[week];
			str_date += week_str;

			this.on_apply_fake_value(curr_date);
			curr_date = null;
			return;
		}

		var text = input_elem.text;
		var date = this._makeSpinValue(text, 1, caret_pos.begin);

		this._setPreValueAndText(this._makeDateObj(value));
		this._setPostValueAndText(this._makeDateObj(date));

		var ret = this.on_fire_onspin(this, this._pretext, this._posttext, this._prevalue, this._postvalue, true);
		if (ret || ret == undefined) {
			this.on_apply_fake_value(this._postvalue);
		}

		obj._stat_change("notselect", "normal");
	};

	_pCalendar.on_notify_onspindown = function (obj, e) {
		if (this.readonly == true) {
			return false;
		}

		this._currentformat = "editformat";
		var edit = this.calendaredit;
		var input_elem = edit._input_element;
		var value = edit.value;
		var caret_pos = this._caret_pos;

		if (!value) {
			var curr_date = new nexacro.Date();
			var str_date = this._toValueStr(curr_date);

			var week = curr_date.getDay();
			var week_str = this._datelistL[week];
			str_date += week_str;

			this.on_apply_fake_value(curr_date);
			this.setCaretPos(0);
			curr_date = null;
			return;
		}

		var text = input_elem.text;
		var date = this._makeSpinValue(text, -1, caret_pos.begin);
		this._setPreValueAndText(this._makeDateObj(value));
		this._setPostValueAndText(this._makeDateObj(date));

		var ret = this.on_fire_onspin(this, this._pretext, this._posttext, this._prevalue, this._postvalue, false);
		if (ret || ret == undefined) {
			this.on_apply_fake_value(this._postvalue);
		}


		var adjust_caret = 0;
		if (text.length != input_elem.text.length) {
			adjust_caret = input_elem.text.length - text.length;
		}
		this.setCaretPos(caret_pos.begin + adjust_caret);
		obj._stat_change("notselect", "normal");
	};

	_pCalendar.on_notify_mobile_onspindown = function (obj, e) {
		if (this.readonly == true) {
			return false;
		}

		this._currentformat = "editformat";
		var edit = this.calendaredit;
		var input_elem = edit._input_element;
		var value = edit.value;
		var caret_pos = this._caret_pos = {
			begin : edit._edit_base_api._begin_pos, 
			end : edit._edit_base_api._end_pos
		};

		if (!value) {
			var curr_date = new nexacro.Date();
			var str_date = this._toValueStr(curr_date);

			var week = curr_date.getDay();
			var week_str = this._datelistL[week];
			str_date += week_str;

			this.on_apply_fake_value(curr_date);
			curr_date = null;
			return;
		}

		var text = input_elem.text;
		var date = this._makeSpinValue(text, -1, caret_pos.begin);
		this._setPreValueAndText(this._makeDateObj(value));
		this._setPostValueAndText(this._makeDateObj(date));

		var ret = this.on_fire_onspin(this, this._pretext, this._posttext, this._prevalue, this._postvalue, false);
		if (ret || ret == undefined) {
			this.on_apply_fake_value(this._postvalue);
		}

		obj._stat_change("notselect", "normal");
	};

	_pCalendar._callback_onvaluechanged = function (obj, e) {
		this.on_apply_backgroundcolumn();
		this.on_apply_bordercolumn();
		this.on_apply_datecolumn();
		this.on_apply_textcolorcolumn();
	};

	_pCalendar._callback_rowsetchanged = function (obj, e) {
		this.on_apply_backgroundcolumn();
		this.on_apply_bordercolumn();
		this.on_apply_datecolumn();
		this.on_apply_textcolorcolumn();
	};

	_pCalendar._on_activate = function () {
		if (!this._is_alive) {
			return;
		}

		var edit = this.calendaredit;
		if (edit) {
			var edit_api = edit._edit_base_api;
			if (edit_api) {
				this._currentformat = "editformat";

				var val = this.value;
				var v_str = this._toValueStr(val);
				var date = "";

				this._setMask(this._currentformat, false, this.value);

				if (nexacro._isNull(val)) {
					date = val;
				}
				else {
					date = this._makeMaskValue(v_str, this.value);
				}

				edit_api._setValue(date);

				if (nexacro._enableaccessibility) {
					this._setAccessibilityStatFocus();
				}
			}
		}

		if (!this._isSelected()) {
			this._stat_change("focus", "normal");
		}
	};

	_pCalendar._getEditformat2DateformatValue = function (pre_value) {
		var date_y_idx = -1;
		var dateformat_format_list = this._dateformat_info.format_list;
		for (var i = 0; i < dateformat_format_list.length; i++) {
			if (dateformat_format_list[i] && dateformat_format_list[i].mask.charAt(i) == "y") {
				date_y_idx = i;
				break;
			}
		}

		var edit_y_idx = -1;
		var editformat_format_list = this._editformat_info.format_list;
		for (var i = 0; i < editformat_format_list.length; i++) {
			if (editformat_format_list[i] && editformat_format_list[i].mask.charAt(i) == "y") {
				edit_y_idx = i;
				break;
			}
		}

		var year_same = true;
		var d_f_y_len = 0;
		var e_f_y_len = 0;
		if (date_y_idx >= 0 && edit_y_idx >= 0) {
			d_f_y_len = dateformat_format_list[date_y_idx].length;
			e_f_y_len = editformat_format_list[edit_y_idx].length;
			if (d_f_y_len != e_f_y_len) {
				year_same = false;
			}
		}

		if (d_f_y_len <= e_f_y_len) {
			return null;
		}

		var add_val = "";
		var pre_value_str = pre_value.toString();
		if (!year_same) {
			add_val = pre_value_str.substr(date_y_idx, d_f_y_len - e_f_y_len);
		}

		return {
			year_same : year_same, 
			d_y_idx : date_y_idx, 
			d_y_len : d_f_y_len, 
			e_y_idx : edit_y_idx, 
			e_y_len : e_f_y_len, 
			diff_len : (d_f_y_len - e_f_y_len), 
			add_val : add_val
		};
	};

	_pCalendar._convEditformat2DateformatValue = function (info_ret, value) {
		var new_value = "";
		var strFront = "";
		if (info_ret.e_y_idx == 0) {
			strFront = value.substr(0, info_ret.e_y_len);
			new_value = info_ret.add_val + strFront;
		}
		else {
			strFront = value.substr(0, info_ret.e_y_idx + 1);
			new_value = strFront + conv_ret.add_val;
		}

		var strRear = "";
		if (info_ret.e_y_idx == 0) {
			strRear = value.substr(info_ret.e_y_len, value.length - info_ret.e_y_len);
		}
		else {
			strRear = value.substr(info_ret.e_y_idx + info_ret.e_y_len, value.length - (info_ret.e_y_idx + info_ret.e_y_len));
		}

		new_value += strRear;

		return new_value;
	};

	_pCalendar._on_killfocus = function (new_focus, new_ref_focus) {
		if (!this._is_alive || application._is_on_alert) {
			return;
		}

		if (this.type != "monthonly") {
			var pre_value = this._makeDateObj(this.value);

			var text = this._changeYearValue(true);
			if (this.popupcalendar) {
				this._currentformat = "editformat";
			}

			var value = this._makeNormalValue1(text);

			var info_ret = this._getEditformat2DateformatValue(pre_value);

			var post_value = this._makeDateObj(value);
			this._currentformat = "dateformat";

			if (info_ret && !info_ret.year_same) {
				var new_value = this._convEditformat2DateformatValue(info_ret, value);

				post_value = this._makeDateObj(new_value);
			}

			var str_preval = pre_value ? pre_value.toString() : pre_value;
			var str_postval = post_value ? post_value.toString() : post_value;

			if (str_preval != str_postval) {
				if ((str_preval === undefined || str_preval === null) && str_postval === "") {
					this.closeDropdown();
					return;
				}

				this._setPreValueAndText(pre_value);
				this._setPostValueAndText(post_value);

				var ret = this.on_fire_canchange(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
				if (ret || ret == undefined) {
					ret = this.applyto_bindSource("value", this._postvalue);
					if (ret === false) {
						this.on_apply_value();
					}
					else {
						this._setValue(this._postvalue);
					}
				}
				else {
					ret = this.applyto_bindSource("value", this._prevalue);
					if (ret === false) {
						this.on_apply_value();
					}
					else {
						this._setValue(this._prevalue);
					}
					return;
				}

				this._fireOnchangedEvent(this._prevalue, this.value);
			}
			else {
				this.on_apply_value();
			}

			this.closeDropdown();
		}
		else {
			if (this.popupcalendar) {
				var datepicker = this.popupcalendar;
				datepicker._hide_spindate();
			}

			this.on_apply_value();
		}

		if (this.calendaredit) {
			this.calendaredit._stat_change("notfocus", "normal");

			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				this.calendaredit._is_focusing = false;
			}
		}
	};


	_pCalendar.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(this, "canchange", pretext, prevalue, posttext, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_cancharchange = function (obj, chartext, pretext, posttext) {
		if (this.cancharchange && this.cancharchange._has_handlers) {
			var evt = new nexacro.CanCharEventInfo(obj, "cancharchange", chartext, pretext, posttext);
			return this.cancharchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangedEventInfo(this, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
		return false;
	};

	_pCalendar.on_fire_onchar = function (obj, chartext, pretext, posttext) {
		if (this.onchar && this.onchar._has_handlers) {
			var evt = new nexacro.CharEventInfo(this, "onchar", chartext, pretext, posttext);
			return this.onchar._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = new nexacro.CalendarCloseUpEventInfo(this, "oncloseup", pretext, posttext, prevalue, postvalue);
			return this.oncloseup._fireEvent(this, evt);
		}
		return false;
	};

	_pCalendar.on_fire_ondayclick = function (obj, date) {
		if (this.ondayclick && this.ondayclick._has_handlers) {
			var evt = new nexacro.CalendarDayClickEventInfo(this, "ondayclick", date);
			return this.ondayclick._fireEvent(this, evt);
		}
		return false;
	};

	_pCalendar.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var evt = new nexacro.Event(this, "ondropdown");
			return this.ondropdown._fireEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.visible && this._isEnable() && this.enableevent) {
			if (this.oneditclick && this.oneditclick._has_handlers) {
				var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
				return this.oneditclick._fireEvent(this, evt);
			}
		}
		return false;
	};

	_pCalendar.on_fire_onspin = function (obj, pretext, posttext, prevalue, postvalue, isUp) {
		if (this.onspin && this.onspin._has_handlers) {
			var evt = new nexacro.CalendarSpinEventInfo(this, "onspin", pretext, posttext, prevalue, postvalue, isUp);
			return this.onspin._fireEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_ontextchange = function (obj, chartext, pretext, posttext, preimetext, postimetext) {
		if (this.ontextchange && this.ontextchange._has_handlers) {
			var evt = new nexacro.TextChangeEventInfo(this, "ontextchange", chartext, pretext, posttext, preimetext, postimetext);
			return this.ontextchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_ontextchanged = function (obj, pretext, posttext) {
		if (this.ontextchanged && this.ontextchanged._has_handlers) {
			var evt = new nexacro.TextChangedEventInfo(this, "ontextchanged", pretext, posttext);
			return this.ontextchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pCalendar.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		this._update_popupwindow_position();

		return (this.popupwindow && this.popupwindow._is_popup()) ? true : false;
	};

	_pCalendar.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

		this._update_popupwindow_position();

		return ret;
	};

	_pCalendar.on_fire_user_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_user_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		return (this.popupwindow && this.popupwindow._is_popup()) ? true : false;
	};

	_pCalendar._applyZoomPopup = function () {
		if (this.popupwindow && this.popupwindow._is_popup()) {
			this.dropdown();
		}
	};

	_pCalendar._createCalendaredit = function () {
		var calendaredit = new nexacro.CalendarEditCtrl("calendaredit", "absolute", 0, 0, 0, 0, null, null, this);
		calendaredit.set_readonly(this.readonly);
		calendaredit.set_type("string");
		calendaredit.set_maskchar(" ");
		calendaredit.set_displaynulltext(this.displaynulltext);

		calendaredit.createComponent(true);
		this.calendaredit = calendaredit;

		calendaredit = null;
		this._setMask("dateformat", true, this.value);
	};

	_pCalendar._createDropbutton = function () {
		var dropbutton = this.dropbutton = new nexacro.CalendarDropButtonCtrl("dropbutton", "absolute", 0, 0, 0, 0, null, null, this);
		dropbutton.createComponent(true);
	};

	_pCalendar._createSpinbutton = function () {
		var spinupbutton = new nexacro.CalendarSpinButtonCtrl("spinupbutton", "absolute", 0, 0, 0, 0, null, null, this);
		var spindownbutton = new nexacro.CalendarSpinButtonCtrl("spindownbutton", "absolute", 0, 0, 0, 0, null, null, this);
		spinupbutton.createComponent(true);
		spindownbutton.createComponent(true);
		this.spinupbutton = spinupbutton;
		this.spindownbutton = spindownbutton;
		spinupbutton = spindownbutton = null;
	};

	_pCalendar._createPopupcalendar = function () {
		var popupcalendar = new nexacro.DatePickerCtrl("popupcalendar", "absolute", 0, 0, 0, 0, null, null, this);
		popupcalendar.createComponent(true);
		popupcalendar._setEnable(true);

		if (this.type == "monthonly") {
			popupcalendar._is_focus_accept = true;
		}
		else {
			popupcalendar._is_focus_accept = false;
		}

		this.popupcalendar = popupcalendar;
		popupcalendar = null;
	};

	_pCalendar._createPopupwindow = function () {
		var popupwindow = new nexacro.CalendarPopupWindow("calendarpopup", "absolute", 0, 0, 0, 0, null, null, this);
		popupwindow._track_capture = false;
		popupwindow.createComponent(true);
		this.popupwindow = popupwindow;
		popupwindow = null;
	};

	_pCalendar._createSystemCalendar = function () {
		var calendaredit = new nexacro.CalendarEditCtrl("calendaredit", "absolute", 0, 0, 0, 0, null, null, this);
		calendaredit.set_readonly(this.readonly);
		calendaredit.set_type("date");
		calendaredit.set_displaynulltext(this.displaynulltext);

		calendaredit.createComponent(true);
		this.calendaredit = calendaredit;
		this.calendaredit.setCaretPos(0);

		calendaredit = null;
	};

	_pCalendar._applyAllProps = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this.on_apply_editformat();
			this.on_apply_value();
			this.on_apply_dateformat();

			this.on_apply_innerdataset();
			this.on_apply_locale();
			this.on_apply_readonly();
		}
	};

	_pCalendar._applyDatepickerProps = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var popupcalendar = this.popupcalendar;
			if (popupcalendar) {
				popupcalendar._setEnable(true);
				popupcalendar.set_readonly(this.readonly);

				var date = this._getPickerValue(this.value);
				popupcalendar.set_value(date);

				this.on_apply_style_viewmonthspin(this.on_find_CurrentStyle_viewmonthspin(this._pseudo));
				this.on_apply_style_viewyearspin(this.on_find_CurrentStyle_viewyearspin(this._pseudo));

				this.on_apply_innerdataset();
			}
		}
	};

	_pCalendar._createNormaltypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createCalendaredit();
			this._createDropbutton();
			this._createPopupcalendar();
			this._createPopupwindow();
			this._setEventHandlerToCalendarEdit();
			this._setEventHandlerToDropButton();
			this._setEventHandlerToPopupCalendar();
			this._applyAllProps();

			if (this._is_created) {
				var popupwindow = this.popupwindow;
				var popupcalendar = this.popupcalendar;
				var calendaredit = this.calendaredit;
				var dropbutton = this.dropbutton;

				if (calendaredit) {
					calendaredit.on_created();
					calendaredit.style.set_align(this.currentstyle.align);
				}
				if (dropbutton) {
					dropbutton.on_created();
				}
			}
		}
	};

	_pCalendar._createSpintypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createCalendaredit();
			this._createSpinbutton();
			this._setEventHandlerToCalendarEdit();
			this._setEventHandlerToSpinButton();
			this._applyAllProps();

			if (this._is_created) {
				var calendaredit = this.calendaredit;
				var spinupbutton = this.spinupbutton;
				var spindownbutton = this.spindownbutton;

				if (calendaredit) {
					calendaredit.on_created();
					calendaredit.style.set_align(this.currentstyle.align);
				}
				if (spinupbutton) {
					spinupbutton.on_created();
				}
				if (spindownbutton) {
					spindownbutton.on_created();
				}
			}
		}
	};
	_pCalendar._createMonthlytypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createPopupcalendar();
			this._setEventHandlerToPopupCalendar();
			this._applyDatepickerProps();

			if (this._is_created) {
				var popupcalendar = this.popupcalendar;
				if (popupcalendar) {
					popupcalendar.on_created();
				}
			}
		}
	};

	_pCalendar._createSystemtypeControl = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createSystemCalendar();
			this._setEventHandlerToCalendarEdit();
			this._applyAllProps();

			if (this._is_created) {
				var calendaredit = this.calendaredit;

				if (calendaredit) {
					calendaredit.on_created();
					calendaredit.style.set_align(this.currentstyle.align);
				}
			}
		}
	};

	_pCalendar._setEventHandlerToCalendarEdit = function () {
		var calendaredit = this.calendaredit;
		calendaredit._setEventHandler("oneditclick", this.on_notify_oneditclick, this);
		calendaredit._setEventHandler("onkeydown", this.on_notify_onkeydown, this);
		calendaredit._setEventHandler("onlbuttondown", this.on_notify_onlbuttondown, this);
		calendaredit._setEventHandler("onlbuttonup", this.on_notify_onlbuttonup, this);
		calendaredit._setEventHandler("ontouchstart", this.on_notify_mobile_onlbuttondown, this);
		calendaredit._setEventHandler("ontextchange", this.on_notify_ontextchange, this);
		calendaredit._setEventHandler("ontextchanged", this.on_notify_ontextchanged, this);
		calendaredit._setEventHandler("cancharchange", this.on_notify_cancharchange, this);
		calendaredit._setEventHandler("onchar", this.on_notify_onchar, this);
	};

	_pCalendar._setEventHandlerToDropButton = function () {
		if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
			this.dropbutton._setEventHandler("onlbuttondown", this.on_notify_ondropdown, this);
		}
		this.dropbutton._setEventHandler("ontap", this.on_notify_mobile_ondropdown, this);
	};

	_pCalendar._setEventHandlerToSpinButton = function () {
		var spinupbutton = this.spinupbutton;
		var spindownbutton = this.spindownbutton;

		if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
			spinupbutton._setEventHandler("onlbuttondown", this.on_notify_onlbuttondown, this);
			spinupbutton._setEventHandler("onclick", this.on_notify_onspinup, this);

			spindownbutton._setEventHandler("onlbuttondown", this.on_notify_onlbuttondown, this);
			spindownbutton._setEventHandler("onclick", this.on_notify_onspindown, this);
		}
		else {
			spinupbutton._setEventHandler("onlbuttondown", this.on_notify_mobile_onlbuttondown, this);
			spinupbutton._setEventHandler("onclick", this.on_notify_mobile_onspinup, this);

			spindownbutton._setEventHandler("onlbuttondown", this.on_notify_mobile_onlbuttondown, this);
			spindownbutton._setEventHandler("onclick", this.on_notify_mobile_onspindown, this);
		}
	};

	_pCalendar._setEventHandlerToPopupCalendar = function () {
		var popupcalendar = this.popupcalendar;
		popupcalendar._setEventHandler("ondayclick", this.on_notify_ondayclick, this);
		popupcalendar._setEventHandler("oncloseup", this.on_notify_oncloseup, this);
	};

	_pCalendar._setEventHandlerToPopupWindow = function () {
	};

	_pCalendar._destroyControl = function () {
		if (this.calendaredit) {
			this.calendaredit.destroy();
			this.calendaredit = null;
		}
		if (this.dropbutton) {
			this.dropbutton.destroy();
			this.dropbutton = null;
		}
		if (this.spinupbutton) {
			this.spinupbutton.destroy();
			this.spinupbutton = null;
		}
		if (this.spindownbutton) {
			this.spindownbutton.destroy();
			this.spindownbutton = null;
		}
		if (this.popupcalendar) {
			this.popupcalendar.destroy();
			this.popupcalendar = null;
		}
		if (this.popupwindow) {
			this.popupwindow.destroy();
			this.popupwindow = null;
		}
	};

	_pCalendar._destroyInnerdataset = function () {
		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_rowsetchanged, this);
			this._innerdataset = null;
		}
	};

	_pCalendar.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;

		if (this.calendaredit) {
			this.calendaredit._setRtlDirection(_rtldirection);
		}

		if (this.dropbutton) {
			this.dropbutton._setRtlDirection(_rtldirection);
		}

		if (this.spinupbutton) {
			this.spinupbutton._setRtlDirection(_rtldirection);
		}

		if (this.spindownbutton) {
			this.spindownbutton._setRtlDirection(_rtldirection);
		}

		if (this.popupcalendar) {
			this.popupcalendar._setRtlDirection(_rtldirection);
		}

		if (this.popupwindow) {
			this.popupwindow._setRtlDirection(_rtldirection);
		}
	};

	_pCalendar._resizeCalendar = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var edit = this.calendaredit;
			var dropbutton = this.dropbutton;
			var spinupbutton = this.spinupbutton;
			var spindownbutton = this.spindownbutton;

			var client_width = this._client_width;
			var client_height = this._client_height;
			var client_left = 0;

			var padding = this.on_find_CurrentStyle_padding(this._pseudo);
			var buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);

			var buttonsize_h = client_height;
			if (buttonsize < 0) {
				var buttonsize_w = client_height;
			}
			else {
				var buttonsize_w = buttonsize;
			}

			switch (this.type) {
				case "normal":
					var dropbutton_margin = dropbutton.on_find_CurrentStyle_margin(this._pseudo);
					var edit_margin = edit.on_find_CurrentStyle_margin(this._pseudo);

					buttonsize_w = buttonsize_w - dropbutton_margin.left - dropbutton_margin.right;

					var button_l = client_width - dropbutton_margin.right - buttonsize_w;
					var button_t = dropbutton_margin.top;
					var button_w = buttonsize_w;
					var button_h = buttonsize_h - dropbutton_margin.top - dropbutton_margin.bottom;

					var edit_l = edit_margin.left;
					var edit_t = edit_margin.top;
					var edit_w = button_l - dropbutton_margin.left - edit_margin.right - 1;
					var edit_h = client_height - edit_margin.top - edit_margin.bottom;

					this.dropbutton.move(button_l, button_t, button_w, button_h, null, null);
					this.calendaredit.move(client_left, edit_t, edit_w, edit_h, null, null);

					this.calendaredit.set_visible(true);
					this.dropbutton.set_visible(true);

					break;
				case "spin":
					var edit_margin = edit.on_find_CurrentStyle_margin(this._pseudo);
					var spinupbutton_margin = spinupbutton.on_find_CurrentStyle_margin(this._pseudo);
					var spindownbutton_margin = spindownbutton.on_find_CurrentStyle_margin(this._pseudo);

					var upbuttonsize_w = buttonsize_w - spinupbutton_margin.left - spinupbutton_margin.right;
					var downbuttonsize_w = buttonsize_w - spindownbutton_margin.left - spindownbutton_margin.right;

					if (upbuttonsize_w >= downbuttonsize_w) {
						buttonsize_w = upbuttonsize_w;
					}
					else {
						buttonsize_w = downbuttonsize_w;
					}

					var upbutton_l = client_width - spinupbutton_margin.right - upbuttonsize_w;
					var upbutton_t = spinupbutton_margin.top;
					var upbutton_w = upbuttonsize_w;
					var upbutton_h = (buttonsize_h / 2) - 1;

					var downbutton_l = client_width - spindownbutton_margin.right - downbuttonsize_w;
					var downbutton_t = upbutton_t + upbutton_h + spindownbutton_margin.top + 1;
					var downbutton_w = downbuttonsize_w;
					var downbutton_h = upbutton_h - spindownbutton_margin.bottom;

					var edit_l = edit_margin.left;
					var edit_t = edit_margin.top;
					var edit_w = client_width - buttonsize_w - 1;
					var edit_h = client_height - edit_margin.top - edit_margin.bottom;

					this.spinupbutton.move(upbutton_l, upbutton_t, upbutton_w, upbutton_h, null, null);
					this.spindownbutton.move(downbutton_l, downbutton_t, downbutton_w, downbutton_h, null, null);
					this.calendaredit.move(client_left, edit_t, edit_w, edit_h, null, null);

					this.calendaredit.set_visible(true);
					this.spinupbutton.set_visible(true);
					this.spindownbutton.set_visible(true);
					break;
				case "monthonly":
					this._applyDatepickerProps();
					this._resizeDatePicker(false);
					this.popupcalendar.set_visible(true);
					break;
				case "system":
					var edit_margin = edit.on_find_CurrentStyle_margin(this._pseudo);
					var edit_l = edit_margin.left;
					var edit_t = edit_margin.top;
					var edit_w = client_width - edit_margin.left - edit_margin.right;
					var edit_h = client_height - edit_margin.top - edit_margin.bottom;

					this.calendaredit.move(client_left, edit_t, edit_w, edit_h, null, null);
					this.calendaredit.set_visible(true);
					break;
			}
		}
	};

	_pCalendar._resizeDatePicker = function (_is_popup) {
		var popupcalendar = this.popupcalendar;
		var pseudo = this._pseudo;
		var padding = this.on_find_CurrentStyle_padding(pseudo);

		var client_width = this._client_width;
		var client_height = this._client_height;

		if (_is_popup) {
			var popupsize = this._getPopupSizeArr();

			popupcalendar.resize(popupsize.width, popupsize.height);
		}
		else {
			var picker_l = padding.left;
			var picker_t = padding.top;
			var picker_w = client_width - padding.right;
			var picker_h = client_height + padding.bottom;

			popupcalendar.move(picker_l, picker_t, picker_w, picker_h, null, null);
		}
	};

	_pCalendar._update_popupwindow_position = function () {
		var popupwindow = this.popupwindow;
		if (popupwindow) {
			var _window = this._getWindow();
			var popupsize = this._getPopupSizeArr();
			var popup_control_elem = popupwindow._control_element;

			var pos = nexacro._getElementPositionInFrame(this._control_element);
			var scale = this._getCumulativeZoomFactor() / 100.0;

			var cal_winpos_left = pos.x;
			var cal_winpos_top = pos.y;
			var cal_height = this._adjust_height * scale;

			var popup_left = cal_winpos_left;
			var popup_top = cal_winpos_top + cal_height;
			var popup_width = popupsize.width;
			var popup_height = popupsize.height * scale;

			var popup_winpos_right = cal_winpos_left + popup_width;
			var popup_winpos_bottom = cal_winpos_top + cal_height + popup_height;

			var win_width = _window.clientWidth;
			var win_height = _window.clientHeight;

			var width_gap = popup_winpos_right - win_width;

			if (this._getPopupType() == "center") {
				var rootframe = this._getOwnerFrame();
				if (!rootframe) {
					return;
				}

				var rootwindow = rootframe._getWindow();
				rootframe = rootwindow ? rootwindow.frame : null;
				if (!rootframe) {
					return;
				}

				popup_left = ((rootframe.width / 2) - (popup_control_elem.width / 2));
				popup_top = ((rootframe.height / 2) - (popup_control_elem.height / 2));

				popup_top = popup_top < 0 ? 0 : popup_top;
			}

			if (popup_winpos_right > win_width && cal_winpos_left > width_gap) {
				popup_left = popup_left - width_gap;
			}

			if (cal_winpos_left < 0) {
				popup_left = -cal_winpos_left;
			}

			if (cal_winpos_top > popup_height && cal_winpos_top + cal_height + popup_height > win_height) {
				popup_top = popup_top - popup_height - cal_height;
			}

			popup_control_elem.setElementPosition(popup_left, popup_top);
		}
	};

	_pCalendar._showPopup = function () {
		if (this.type != "normal") {
			return;
		}

		var popupcalendar = this.popupcalendar;
		var popupwindow = this.popupwindow;

		if (popupwindow == null) {
			this._createPopupwindow();
			popupwindow = this.popupwindow;
		}
		if (popupcalendar == null) {
			this._createPopupcalendar();
			this._setEventHandlerToPopupCalendar();
			this._applyDatepickerProps();
			popupcalendar = this.popupcalendar;
		}

		if (!popupwindow._is_created) {
			popupwindow.on_created();
		}
		if (!popupcalendar._is_created) {
			popupwindow._attach(popupcalendar);
			popupcalendar.on_created();
		}

		this.on_apply_prop_rtldirection();

		var popupsize = this._getPopupSizeArr();

		var pos = nexacro._getElementPositionInFrame(this._control_element);
		var scale = this._getCumulativeZoomFactor() / 100.0;

		var cal_winpos_left = pos.x;
		var cal_winpos_top = pos.y;
		var cal_height = this._adjust_height * scale;

		var popup_left = 0;
		var popup_top = cal_height;
		var popup_width = popupsize.width;
		var popup_height = popupsize.height;

		var popup_winpos_right = cal_winpos_left + popup_width;
		var popup_winpos_bottom = cal_winpos_top + cal_height + popup_height;

		var _window = this._getWindow();
		var win_width = _window.clientWidth;
		var win_height = _window.clientHeight;

		var width_gap = popup_winpos_right - win_width;
		if (popup_winpos_right > win_width && cal_winpos_left > width_gap) {
			popup_left = popup_left - width_gap;
		}

		if (cal_winpos_left < 0) {
			popup_left = -cal_winpos_left;
		}

		if (cal_winpos_top > popup_height && popup_winpos_bottom > win_height) {
			popup_top = -(popup_height * scale);
		}

		var elem = popupwindow.getElement();
		if (elem.setZoom) {
			elem.setZoom(scale * 100);
		}
		else if (nexacro.ScrollableContainerElement.prototype.setZoom) {
			nexacro.ScrollableContainerElement.prototype.setZoom.call(elem, scale * 100);
		}

		if (this._getPopupType() == "center") {
			this._centerPopup(popupwindow, popup_width, popup_height);
		}
		else {
			popup_left = this._convertLeftForRtlLayout(popup_left, popup_width);

			popupwindow._popupBy(this, popup_left, popup_top, popup_width, popup_height);
		}

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._setCaptureLock(this, true, false);
		}
	};

	_pCalendar._setMask = function (v, bApply, value) {
		if (this._getPopupType() != "system" && nexacro._enableaccessibility && nexacro._accessibilitytype == 4
			 && (value == null || value == undefined || value == "")) {
			return;
		}

		var mask = this._makeMask(v, value);
		if (v == "dateformat" && value == "" && this.displaynulltext != "") {
			this._mask = this.displaynulltext;
		}
		else {
			if ((v == "dateformat" && this.dateformat == "LONGDATE") || (v == "editformat" && this.editformat == "LONGDATE")) {
				mask = mask.replace(/\'/g, "\\'");
				mask = mask.replace(/a/g, "\\a");
			}

			this._mask = mask;
		}

		this._on_apply_mask(this._mask, bApply);
	};

	_pCalendar._on_apply_mask = function (mask, bApply) {
		var control_elem = this.getElement();
		if (control_elem) {
			var edit = this.calendaredit;
			if (edit) {
				edit.set_mask(mask, bApply);
			}
		}
	};

	_pCalendar._isDateMaskChar = function (ch) {
		if (ch == "y" || ch == "M" || ch == "d" || ch == "H" || ch == "h" || ch == "m" || ch == "s") {
			return true;
		}
		return false;
	};

	_pCalendar._isDateMaskString = function (str) {
		if (str === "yyyy" || str === "yy" || str === "MMMM" || str === "MMM" || str === "MM" || str === "M" || str === "dddd" || str === "ddd" || str === "dd" || str === "d") {
			return true;
		}
		return false;
	};

	_pCalendar._isTimeMaskString = function (str) {
		if (str === "HH" || str === "H" || str === "hh" || str === "h" || str === "mm" || str === "m" || str === "s" || str === "ss" || str === "sss") {
			return true;
		}
		return false;
	};

	_pCalendar._isEmptyStr = function (v) {
		var str_val = v.toString();
		if (str_val === "" || str_val.trim() === "") {
			return true;
		}
		return false;
	};

	_pCalendar._isNullDate = function (v) {
		if (v === null || v === "null") {
			return true;
		}
		var str_val = v.toString();
		if (str_val == "NaN") {
			return true;
		}
		return false;
	};

	_pCalendar._isUndefinedDate = function (v) {
		if (v === undefined || v === "undefined") {
			return true;
		}
		return false;
	};

	_pCalendar._isPopupVisible = function () {
		var ret = false;
		if (this.type != "monthonly") {
			if (this.popupwindow) {
				ret = this.popupwindow.visible;
			}
		}
		return ret;
	};

	_pCalendar._validationDateStr = function (v, type) {
		if (v !== null || v !== undefined) {
			v = parseInt(v, 10);
			if (type == "year") {
				return (v / 10 < 1 ? "000" : v / 100 < 1 ? "00" : v / 1000 < 1 ? "0" : "") + v;
			}
			else if (type == "millisec") {
				return (v / 10 < 1 ? "00" : v / 100 < 1 ? "0" : "") + v;
			}
			else {
				return (v / 10 < 1 ? "0" : "") + v;
			}
		}
		else {
			return v;
		}
	};

	_pCalendar._isValidDate = function (ch) {
		if (ch === "") {
			return true;
		}

		var edit = this.calendaredit;
		var edit_api = edit._edit_base_api;
		var _info = this._editformat_info;

		var format_len = _info.format.length;
		var e_v = edit_api._getText();

		var y = "";
		var m = "";
		var d = "";
		var h = "";
		var mm = "";
		var s = "";

		var y_f = false;
		var m_f = false;
		var d_f = false;
		var h_f = false;
		var mm_f = false;
		var s_f = false;

		for (var i = 0; i < format_len; i++) {
			var mc = _info.format_info[i].ch;
			if (mc == "y") {
				y += e_v.charAt(i);
			}
			else if (mc == "M") {
				m += e_v.charAt(i);
			}
			else if (mc == "d") {
				d += e_v.charAt(i);
			}
			else if (mc == "h" || mc == "H") {
				h += e_v.charAt(i);
			}
			else if (mc == "m") {
				mm += e_v.charAt(i);
			}
			else if (mc == "s") {
				s += e_v.charAt(i);
			}
		}
		y = parseInt(y, 10);
		m = parseInt(m, 10);
		d = parseInt(d, 10);
		h = parseInt(h, 10);
		mm = parseInt(mm, 10);
		s = parseInt(s, 10);

		if (y >= 0) {
			y_f = true;
		}
		if (m >= 0) {
			m_f = true;
		}
		if (d >= 0) {
			d_f = true;
		}
		if (h >= 0) {
			h_f = true;
		}
		if (mm >= 0) {
			mm_f = true;
		}
		if (s >= 0) {
			s_f = true;
		}

		var end_day = 31;
		if (y && m) {
			end_day = this._getEndDay(y, m);
		}
		else if (!y && m) {
			var currentDate = new Date();
			end_day = this._getEndDay(currentDate.getFullYear(), m);
			currentDate = null;
		}

		if ((m_f && m > 12) || (d_f && d > end_day) || (h_f && h >= 24) || (mm_f && mm >= 60) || (s_f && s >= 60)) {
			return false;
		}
		return true;
	};

	_pCalendar._makeMask = function (v, datevalue) {
		if (v == "dateformat") {
			var format = this.dateformat;
			var _info = this._dateformat_info;
		}
		else {
			var format = this.editformat;
			var _info = this._editformat_info;
		}

		var idx = 0;
		var mask = "";
		var week = 0;
		var week_str = "";
		var week_str_len = 0;

		var month = 0;
		var month_str = "";
		var month_str_len = 0;

		var is_rtl_month = false;
		var is_rtl_date = false;

		if (datevalue) {
			week = datevalue.getDay();
			month = datevalue.getMonth();
		}

		while (idx < _info.format.length) {
			var mask_str = "";
			var str_len = 0;
			if (_info._year && _info._year.index == idx) {
				if (v == "dateformat") {
					if (is_rtl_month) {
						if (_info._mon && (_info._year.index > _info._mon.index)) {
							mask += "~";
						}
					}
					else if (is_rtl_date) {
						if (_info._date && (_info._year.index > _info._date.index)) {
							mask += "~";
						}
					}
				}

				mask += this._makeMaskString(_info._year, "year", datevalue);
				idx += _info._year.length;
			}
			else if (_info._mon && _info._mon.index == idx) {
				str_len = _info._mon.mask.length;
				if (str_len == 4) {
					if (datevalue && v == "dateformat") {
						month_str = this._monthlistL[month];

						if (!this._isRtl() && this._locale_direction == "rtl") {
							is_rtl_month = true;
						}
					}
					else {
						month_str = "MMMM";
					}

					if (month_str && month_str.length) {
						month_str_len = month_str.length;
					}

					for (var i = 0; i < month_str_len; i++) {
						mask_str += "^";
					}
				}
				else {
					mask_str += this._makeMaskString(_info._mon, "month", datevalue);
				}

				mask += mask_str;
				idx += _info._mon.length;
			}
			else if (_info._day && _info._day.index == idx) {
				mask += this._makeMaskString(_info._day, "day", datevalue);
				idx += _info._day.length;
			}
			else if (_info._date && _info._date.index == idx) {
				str_len = _info._date.mask.length;
				if (str_len == 3) {
					if (datevalue) {
						week_str = this._datelistS[week];
					}
					else {
						week_str = "ddd";
					}

					if (week_str && week_str.length) {
						week_str_len = week_str.length;
					}

					for (var i = 0; i < week_str_len; i++) {
						mask_str += "~";
					}
				}
				else if (str_len == 4) {
					if (datevalue && v == "dateformat") {
						week_str = this._datelistL[week];
						if (!this._isRtl() && this._locale_direction == "rtl") {
							is_rtl_date = true;
						}
					}
					else {
						week_str = "dddd";
					}
					week_str_len = week_str.length;
					for (var i = 0; i < week_str_len; i++) {
						if (week_str.charAt(i) == "-") {
							mask_str += week_str.charAt(i);
						}
						else {
							mask_str += "^";
						}
					}
				}
				mask += mask_str;
				idx += _info._date.length;
			}
			else if (_info._hour && _info._hour.index == idx) {
				mask += this._makeMaskString(_info._hour, "hour", datevalue);
				idx += _info._hour.length;
			}
			else if (_info._min && _info._min.index == idx) {
				mask += this._makeMaskString(_info._min, "min", datevalue);
				idx += _info._min.length;
			}
			else if (_info._sec && _info._sec.index == idx) {
				mask += this._makeMaskString(_info._sec, "sec", datevalue);
				idx += _info._sec.length;
			}
			else if (_info._millisec && _info._millisec.index == idx) {
				mask += this._makeMaskString(_info._millisec, "millisec", datevalue);
				idx += _info._millisec.length;
			}
			else {
				var charadd = _info.format_info[idx].ch;
				mask += charadd;
				idx++;
			}
		}
		return mask;
	};

	_pCalendar._makeMaskString = function (section, sectionName, datevalue) {
		var val = datevalue;
		var tmp_val = null;
		var str_len = section.length;
		var maskStr_len = 0;
		var newStr = "";

		if (sectionName == "year") {
			maskStr_len = str_len;
		}
		else if (sectionName == "month" || sectionName == "day" || sectionName == "min" || sectionName == "sec") {
			if (val) {
				if (sectionName == "month") {
					tmp_val = val.getMonth();
					tmp_val += 1;
				}
				else if (sectionName == "day") {
					tmp_val = val.getDate();
				}
				else if (sectionName == "min") {
					tmp_val = val.getMinutes();
				}
				else if (sectionName == "Sec") {
					tmp_val = val.getSeconds();
				}

				if ((str_len == 1) && (tmp_val < 10)) {
					maskStr_len = 1;
				}
				else {
					maskStr_len = 2;
				}
			}
			else {
				maskStr_len = str_len;
			}
		}
		else if (sectionName == "hour") {
			if (val) {
				tmp_val = val.getHours();
				if (section.Mask === "h") {
					if (tmp_val > 12 && tmp_val < 24) {
						tmp_val -= 12;
						if (tmp_val < 10) {
							maskStr_len = 1;
						}
						else {
							maskStr_len = 2;
						}
					}
				}
				else if (section.Mask === "H") {
					if (tmp_val < 10) {
						maskStr_len = 1;
					}
				}
				else {
					maskStr_len = 2;
				}
			}
			else {
				maskStr_len = str_len;
			}
		}
		else if (sectionName == "millisec") {
			maskStr_len = 3;
		}

		for (var i = 0; i < maskStr_len; i++) {
			newStr += "!";
		}

		return newStr;
	};
	_pCalendar._makeMaskValue_normal = function (v, format_info, bValueType) {
		var year = "", month = "", day = "", hour = "", min = "", sec = "", millisec = "";
		var mask_value = "";
		var _info = null;
		var is_rtl_month = false;
		var is_rtl_date = false;


		if (!nexacro._isNull(format_info) && nexacro._isNull(format_info._year) && nexacro._isNull(format_info._mon)) {
			day = v.substr(0, 2);
			hour = v.length >= 3 ? v.substr(2, 2) : "00";
			min = v.length >= 5 ? v.substr(4, 2) : "00";
			sec = v.length >= 7 ? v.substr(6, 2) : "00";
			millisec = v.length >= 10 ? v.substr(9, 3) : "000";
		}
		else if (!nexacro._isNull(format_info) && nexacro._isNull(format_info._year)) {
			month = v.substr(0, 2);
			day = v.substr(2, 2);
			hour = v.length >= 5 ? v.substr(4, 2) : "00";
			min = v.length >= 7 ? v.substr(6, 2) : "00";
			sec = v.length >= 9 ? v.substr(8, 2) : "00";
			millisec = v.length >= 11 ? v.substr(10, 3) : "000";
		}
		else {
			year = v.substr(0, 4);
			month = v.substr(4, 2);
			day = v.substr(6, 2);
			hour = v.length >= 9 ? v.substr(8, 2) : "00";
			min = v.length >= 11 ? v.substr(10, 2) : "00";
			sec = v.length >= 13 ? v.substr(12, 2) : "00";
			millisec = v.length >= 15 ? v.substr(14, 3) : "000";
		}

		if (format_info) {
			_info = format_info;
		}
		else {
			if (this._currentformat == "dateformat") {
				_info = this._dateformat_info;
			}
			else {
				_info = this._editformat_info;
			}
		}

		for (var i = 0; i < _info.format.length; i++) {
			if (_info._year && _info._year.index == i) {
				if (_info._year.mask === "yy") {
					year = year.substr(2, 2);
				}

				if (this._currentformat == "dateformat") {
					if (is_rtl_month) {
						if (_info._mon && (_info._year.index > _info._mon.index)) {
							year = "\u200e" + year;
						}
					}
					else if (is_rtl_date) {
						if (_info._date && (_info._year.index > _info._date.index)) {
							year = "\u200e" + year;
						}
					}
				}

				mask_value += year;
			}
			if (_info._mon && _info._mon.index == i) {
				if (_info._mon.mask === "M") {
					if (month.charAt(0) === "0") {
						month = month.substr(1, 1);
						_info._mon.single_digit = true;
					}
					else {
						_info._mon.single_digit = false;
					}
				}
				else if (_info._mon.mask === "MMMM") {
					if (this._currentformat == "editformat") {
						if (!bValueType) {
							month = "MMMM";
						}
						else {
							var dateObj = this._getDateObj(v);
							var m = dateObj.getMonth() + 1;
							month = nexacro._toString(m).padLeft(4, "0");
						}
					}
					else {
						var dateObj = this._getDateObj(v);
						var m = dateObj.getMonth();
						month = this._monthlistL[m];

						if (!this._isRtl() && this._locale_direction == "rtl") {
							is_rtl_month = true;
						}
					}
				}

				mask_value += month;
			}
			if (_info._day && _info._day.index == i) {
				if (_info._day.mask === "d") {
					if (day.charAt(0) === "0") {
						day = day.substr(1, 1);
						_info._day.single_digit = true;
					}
					else {
						_info._day.single_digit = false;
					}
				}
				mask_value += day;
			}
			if (_info._date && _info._date.index == i) {
				var dateObj = this._getDateObj(v);
				var dateofweek = dateObj.getDay();
				var date = this._datelistS[dateofweek];
				if (_info._date.mask === "dddd") {
					if (this._currentformat == "editformat") {
						date = "dddd";
					}
					else {
						date = this._datelistL[dateofweek];
						if (!this._isRtl() && this._locale_direction == "rtl") {
							is_rtl_date = true;
						}
					}
				}
				mask_value += date ? date : "";
			}
			if (_info._hour && _info._hour.index == i) {
				if (_info._hour.mask === "h" || _info._hour.mask === "hh") {
					var hh = parseInt(hour);
					if (hh > 12 && hh < 24) {
						hh -= 12;
						hour = nexacro._toString(hh);
					}
				}
				if (!((_info._hour.mask === "h" || _info._hour.mask === "H") && hour.length > 0)) {
					hour = hour.padLeft(2, "0");
				}

				mask_value += hour;
			}
			if (_info._min && _info._min.index == i) {
				if (_info._min.mask === "m" && min.charAt(0) === "0") {
					min = min.substr(1, 1);
				}
				else {
					min = min.padLeft(_info._min.length, "0");
				}
				mask_value += min;
			}
			if (_info._sec && _info._sec.index == i) {
				if (_info._sec.mask === "s" && sec.charAt(0) === "0") {
					sec = sec.substr(1, 1);
				}
				else {
					sec = sec.padLeft(_info._sec.length, "0");
				}
				mask_value += sec;
			}
			if (_info._millisec && _info._millisec.index == i) {
				mask_value += millisec;
			}
		}

		return mask_value;
	};

	_pCalendar._makeMaskValue_timeOnly = function (v, format_info) {
		var year = month = day = hour = min = sec = millisec = "";
		var idx = 0;
		var mask_value = "";
		var _info = null;

		if (format_info) {
			_info = format_info;
		}
		else {
			if (this._currentformat == "dateformat") {
				_info = this._dateformat_info;
			}
			else {
				_info = this._editformat_info;
			}
		}

		for (var i = 0; i < _info.format.length; i++) {
			if (_info._year && _info._year.index == i) {
				year = v.substr(idx, _info._year.length);
				mask_value += year;
				idx += _info._year.length;
			}
			if (_info._mon && _info._mon.index == i) {
				month = v.substr(idx, _info._mon.length);
				mask_value += month;
				idx += _info._mon.length;
			}
			if (_info._day && _info._day.index == i) {
				day = v.substr(idx, _info._day.length);
				mask_value += day;
				idx += _info._day.length;
			}
			if (_info._date && _info._date.index == i) {
				var dateObj = this._getDateObj(v);
				var dateofweek = dateObj.getDay();
				var date = this._datelistS[dateofweek];
				if (_info._date.mask === "dddd") {
					date = this._datelistL[dateofweek];
				}
				mask_value += date ? date : "";
				idx += _info._date.length;
			}
			if (_info._hour && _info._hour.index == i) {
				hour = v.substr(idx, _info._hour.length).padLeft(_info._hour.length, "0");

				if (_info._hour.mask === "h" || _info._hour.mask === "hh") {
					var hh = parseInt(hour);
					if (hh > 12 && hh < 24) {
						hh -= 12;
						hour = nexacro._toString(hh);
					}
				}
				if (!((_info._hour.mask === "h" || _info._hour.mask === "H") && hour.length > 0)) {
					hour = hour.padLeft(2, "0");
				}
				mask_value += hour;
				idx += _info._hour.length;
			}
			if (_info._min && _info._min.index == i) {
				min = v.substr(idx, _info._min.length);
				if (_info._min.mask === "m" && min.charAt(0) === "0") {
					min = min.substr(1, 1);
				}
				else {
					min = min.padLeft(_info._min.length, "0");
				}
				mask_value += min;
				idx += _info._min.length;
			}
			if (_info._sec && _info._sec.index == i) {
				sec = v.substr(idx, _info._sec.length).padLeft(_info._sec.length, "0");
				if (_info._sec.mask === "s" && sec.charAt(0) === "0") {
					sec = sec.substr(1, 1);
				}
				else {
					sec = sec.padLeft(_info._sec.length, "0");
				}
				mask_value += sec;
				idx += _info._sec.length;
			}
			if (_info._millisec && _info._millisec.index == i) {
				millisec = v.substr(idx, _info._millisec.length).padLeft(_info._millisec.length, "0");

				mask_value += millisec;
				idx += _info._millisec.length;
			}
		}

		return mask_value;
	};

	_pCalendar._makeMaskValue = function (v, bValueType) {
		if (this._isUndefinedDate(v)) {
			return;
		}
		if (this._isNullDate(v)) {
			return "";
		}

		if (this._currentformat == "dateformat") {
			var _info = this._dateformat_info;
		}
		else {
			var _info = this._editformat_info;
		}

		if (_info._year || _info._mon || _info._day) {
			return this._makeMaskValue_normal(v, _info, bValueType);
		}
		else {
			return this._makeMaskValue_timeOnly(v, _info);
		}
	};

	_pCalendar._makeSpinValue = function (v, op, pos) {
		v = this._makeNormalValue(v);
		var mask = this.editformat;
		var date = this._getSplitDate(v);

		if (mask == "SHORTDATE" || mask == "LONGDATE") {
			var locale = this._getLocale();
			if (!locale) {
				locale = nexacro.BrowserLang;
			}

			mask = nexacro.Locale._makeDateMaskString(locale, mask);

			var mon_index = mask.indexOf("M");
			var day_index = mask.indexOf("d");

			if (mask.slice(mon_index, mon_index + 2) != "MM") {
				mask = mask.replace("M", "MM");
			}

			if (mask.slice(day_index, day_index + 2) != "dd") {
				mask = mask.replace("d", "dd");
			}

			if (date.mon == "MM") {
				date.mon = nexacro._toString(this.value.getMonth() + 1).padLeft(2, "0");
			}
		}

		if (pos >= 0) {
			var val1 = mask.substring(pos, pos + 1);
			var val2 = this._mask.substring(pos, pos + 1);
			var val3 = this._mask.substring(pos - 1, pos);

			if (!this._isDateMaskChar(val1) && (val2 == "!" || val3 == "!")) {
				while (!this._isDateMaskChar(val1)) {
					pos--;
					val1 = mask.substring(pos, pos + 1);
				}

				val = val1;
			}
			else {
				val = val1;
			}


			if (val == "d") {
				var dddd_pos = mask.indexOf("dddd");
				var ddd_pos = mask.indexOf("ddd");

				if (dddd_pos >= 0 && pos >= dddd_pos && pos <= (dddd_pos + 3)) {
					val = "";
				}

				if (ddd_pos >= 0 && pos >= ddd_pos && pos <= (ddd_pos + 2)) {
					val = "";
				}
			}

			if (val == "y") {
				var y = parseInt(date.year, 10) + op;

				if (y < 0) {
					y = 9999;
				}
				else if (y > 9999) {
					y = 0;
				}
				date.year = this._validationDateStr(y, "year");
				var d = "" + this._getEndDay(date.year, date.mon);
				if (parseInt(date.day, 10) > d) {
					date.day = "" + d;
				}
			}
			else if (val == "M") {
				var m = parseInt(date.mon, 10) + op;
				if (m < 1) {
					m = 12;
				}
				else if (m > 12) {
					m = 1;
				}
				date.mon = this._validationDateStr(m);
				var d = "" + this._getEndDay(date.year, date.mon);

				if (parseInt(date.day, 10) > d) {
					date.day = "" + d;
				}
			}
			else if (val == "d") {
				var d = parseInt(date.day, 10) + op;
				var val = parseInt(this._getEndDay(date.year, date.mon), 10);
				if (d < 1) {
					date.day = "" + val;
				}
				else {
					if (d > val) {
						d = 1;
					}
					date.day = this._validationDateStr(d);
				}
			}
			else if (val == "H" || val == "h") {
				var h = parseInt(date.hour, 10) + op;
				if (h < 0) {
					h = 23;
				}
				else if (h > 23) {
					h = 0;
				}
				date.hour = this._validationDateStr(h);
			}
			else if (val == "m") {
				var m = parseInt(date.min, 10) + op;
				if (m < 0) {
					m = 59;
				}
				else if (m > 59) {
					m = 0;
				}
				date.min = this._validationDateStr(m);
			}
			else if (val == "s") {
				var s = parseInt(date.sec, 10) + op;
				if (s < 0) {
					s = 59;
				}
				else if (s > 59) {
					s = 0;
				}
				date.sec = this._validationDateStr(s);
			}
		}

		var _info = this._editformat_info;

		var return_val = "";
		if (_info._year) {
			date.year ? return_val += this._validationDateStr(date.year, "year") : "";
		}

		if (_info._mon) {
			date.mon ? return_val += this._validationDateStr(date.mon) : "";
		}

		if (_info._day) {
			date.day ? return_val += this._validationDateStr(date.day) : "";
		}

		if (_info._hour) {
			date.hour ? return_val += this._validationDateStr(date.hour) : "";
		}

		if (_info._min) {
			date.min ? return_val += this._validationDateStr(date.min) : "";
		}

		if (_info._sec) {
			date.sec ? return_val += this._validationDateStr(date.sec) : "";
		}

		if (_info._millisec) {
			date.millisec ? return_val += this._validationDateStr(date.millisec, "millisec") : "";
		}

		return return_val;
	};

	_pCalendar._makeNormalValue = function (edit_value) {
		var _info = this._editformat_info;
		var adjust_index = 0;

		var year, mon, day;

		if (_info._year) {
			adjust_index = 0;

			if (_info._mon && _info._year.index > _info._mon.index) {
				if (_info._mon.length == 1 && !_info._mon.single_digit) {
					adjust_index++;
				}
			}
			if (_info._day && _info._year.index > _info._day.index) {
				if (_info._day.length == 1 && !_info._day.single_digit) {
					adjust_index++;
				}
			}

			year = edit_value.substr(_info._year.index + adjust_index, _info._year.length);
		}
		else {
			year = "0000";
		}


		if (_info._mon) {
			adjust_index = 0;

			if (_info._day && _info._mon.index > _info._day.index) {
				if (_info._day.length == 1 && !_info._day.single_digit) {
					adjust_index++;
				}
			}

			if (_info._mon.length == 1 && !_info._mon.single_digit) {
				mon = edit_value.substr(_info._mon.index + adjust_index, 2);
			}
			else {
				mon = edit_value.substr(_info._mon.index + adjust_index, _info._mon.length);
			}

			if (_info._mon.length == 4) {
				mon = mon.substr(2, 2);

				if (mon == "MM") {
					var v = this.value;
					v = v ? (v.getMonth() + 1) : "";
					mon = nexacro._toString(v).padLeft(2, "0");
				}
			}

			else {
				mon = mon.padLeft(2, "0");
			}
		}
		else {
			mon = "01";
		}

		if (_info._day) {
			adjust_index = 0;

			if (_info._mon && _info._day.index > _info._mon.index) {
				if (_info._mon.length == 1 && !_info._mon.single_digit) {
					adjust_index++;
				}
			}

			if (_info._day.length == 1 && !_info._day.single_digit) {
				day = edit_value.substr(_info._day.index + adjust_index, 2);
			}
			else {
				day = edit_value.substr(_info._day.index + adjust_index, _info._day.length);
			}

			day = day.padLeft(2, "0");
		}
		else {
			day = "01";
		}


		var hour = _info._hour ? edit_value.substr(_info._hour.index, _info._hour.length).padLeft(2, "0") : "00";
		var min = _info._min ? edit_value.substr(_info._min.index, _info._min.length).padLeft(2, "0") : "00";
		var sec = _info._sec ? edit_value.substr(_info._sec.index, _info._sec.length).padLeft(2, "0") : "00";
		var millisec = _info._millisec ? edit_value.substr(_info._millisec.index, _info._millisec.length).padLeft(3, "0") : "00";

		var normal_value = year + mon + day + hour + min + sec + millisec;
		return normal_value;
	};
	_pCalendar._makeNormalValue1 = function (edit_value) {
		var _info = this._editformat_info;
		var adjust_index = 0;

		var year, mon, day;

		if (_info._year) {
			adjust_index = 0;

			if (_info._mon && _info._year.index > _info._mon.index) {
				if (_info._mon.length == 1 && !_info._mon.single_digit) {
					adjust_index++;
				}
			}
			if (_info._day && _info._year.index > _info._day.index) {
				if (_info._day.length == 1 && !_info._day.single_digit) {
					adjust_index++;
				}
			}

			year = edit_value.substr(_info._year.index + adjust_index, _info._year.length);
		}
		else {
			year = "";
		}


		if (_info._mon) {
			adjust_index = 0;

			if (_info._day && _info._mon.index > _info._day.index) {
				if (_info._day.length == 1 && !_info._day.single_digit) {
					adjust_index++;
				}
			}

			if (_info._mon.length == 1 && !_info._mon.single_digit) {
				mon = edit_value.substr(_info._mon.index + adjust_index, 2);
			}
			else {
				mon = edit_value.substr(_info._mon.index + adjust_index, _info._mon.length);
			}

			if (_info._mon.length == 4) {
				mon = mon.substr(2, 2);

				if (mon == "MM") {
					var v = this.value;
					v = v ? (v.getMonth() + 1) : "";
					mon = nexacro._toString(v).padLeft(2, "0");
				}
			}

			else {
				mon = mon.padLeft(2, "0");
			}
		}
		else {
			mon = "";
		}

		if (_info._day) {
			adjust_index = 0;

			if (_info._mon && _info._day.index > _info._mon.index) {
				if (_info._mon.length == 1 && !_info._mon.single_digit) {
					adjust_index++;
				}
			}

			if (_info._day.length == 1 && !_info._day.single_digit) {
				day = edit_value.substr(_info._day.index + adjust_index, 2);
			}
			else {
				day = edit_value.substr(_info._day.index + adjust_index, _info._day.length);
			}

			day = day.padLeft(2, "0");
		}
		else {
			day = "";
		}

		var hour = _info._hour ? edit_value.substr(_info._hour.index, _info._hour.length).padLeft(2, "0") : "";
		var min = _info._min ? edit_value.substr(_info._min.index, _info._min.length).padLeft(2, "0") : "";
		var sec = _info._sec ? edit_value.substr(_info._sec.index, _info._sec.length).padLeft(2, "0") : "";
		var millisec = _info._millisec ? edit_value.substr(_info._millisec.index, _info._millisec.length).padLeft(3, "0") : "";

		var normal_value = year + mon + day + hour + min + sec + millisec;
		return (normal_value === "" && this.displaynulltext !== "") ? "" : normal_value;
	};

	_pCalendar._makeCalendarText = function (value) {
		if (!value) {
			return "";
		}

		var val_str = value.toString();
		var oldformat = this._currentformat;
		this._currentformat = "dateformat";

		var date = this._makeMaskValue(val_str);
		var mask = this._makeMask("dateformat", this._makeDateObj(value));
		var txt_idx = 0;
		var return_txt = "";


		this._currentformat = oldformat;

		for (var i = 0; i < mask.length; i++) {
			var mask_ch = mask.charAt(i);
			if (mask_ch === "!") {
				return_txt += date.charAt(txt_idx);
				txt_idx++;
			}
			else {
				if (mask_ch === "~" || mask_ch === "^") {
					return_txt += date.charAt(txt_idx);
					txt_idx++;
				}
				else {
					return_txt += mask_ch;
				}
			}
		}
		return return_txt;
	};

	_pCalendar._makeDateObj = function (v) {
		if (this._isUndefinedDate(v)) {
			return;
		}
		if (this._isNullDate(v)) {
			return null;
		}
		if (this._isEmptyStr(v)) {
			return "";
		}
		if (v instanceof nexacro.Date) {
			return v;
		}

		if (this._currentformat == "dateformat") {
			var _info = this._dateformat_info;
		}
		else {
			var _info = this._editformat_info;
		}

		var ret = new Object();
		var year = mon = day = hour = min = sec = millisec = "";
		var idx = 0;
		var mask_value = "";
		var date = null;

		var v = this._makeMaskValue(v, true);

		var len = 0;

		for (var i = 0; i < _info.format.length; i++) {
			if (_info._year && _info._year.index == i) {
				year = v.substr(idx, _info._year.length);
				idx += _info._year.length;
			}
			if (_info._mon && _info._mon.index == i) {
				len = _info._mon.length;

				if (_info._mon.length == 1 && !_info._mon.single_digit) {
					mon = v.substr(idx, 2);
					len = 2;
				}
				else {
					mon = v.substr(idx, _info._mon.length);
				}

				idx += len;
			}
			if (_info._day && _info._day.index == i) {
				len = _info._day.length;
				if (_info._day.length == 1 && !_info._day.single_digit) {
					day = v.substr(idx, 2);
					len = 2;
				}
				else {
					day = v.substr(idx, _info._day.length);
				}

				idx += len;
			}
			if (_info._date && _info._date.index == i) {
				var dateObj = this._getDateObj(v);
				var dateofweek = dateObj.getDay();

				date = this._datelistS[dateofweek];
				if (_info._date.mask === "dddd") {
					date = this._datelistL[dateofweek];
				}
				idx += _info._date.length;
			}
			if (_info._hour && _info._hour.index == i) {
				hour = v.substr(idx, _info._hour.length).padLeft(_info._hour.length, "0");

				if (_info._hour.mask === "hh") {
					var hh = parseInt(hour);
					if (hh > 12 && hh < 24) {
						hh -= 12;
						hour = nexacro._toString(hh);
						hour = hour.padLeft(2, "0");
					}
				}
				idx += _info._hour.length;
			}
			if (_info._min && _info._min.index == i) {
				min = v.substr(idx, _info._min.length).padLeft(_info._min.length, "0");

				idx += _info._min.length;
			}
			if (_info._sec && _info._sec.index == i) {
				sec = v.substr(idx, _info._sec.length).padLeft(_info._sec.length, "0");

				idx += _info._sec.length;
			}
			if (_info._millisec && _info._millisec.index == i) {
				millisec = v.substr(idx, _info._millisec.length).padLeft(_info._millisec.length, "0");

				idx += _info._millisec.length;
			}
		}

		ret.year = parseInt(year, 10);
		ret.mon = parseInt(mon, 10);
		ret.day = parseInt(day, 10);
		ret.hour = parseInt(hour, 10);
		ret.min = parseInt(min, 10);
		ret.sec = parseInt(sec, 10);
		ret.millisec = parseInt(millisec, 10);

		if ((ret.year != undefined || ret.year > 0) && (ret.mon > 0 && ret.mon <= 12)) {
			ret.mon -= 1;
		}
		else {
			ret.mon = 0;
		}

		if (!(ret.day >= 1 && ret.day <= 31)) {
			ret.day = 1;
		}

		if (!(_info._hour || _info._min || _info._sec || _info._millisec)) {
			if (ret.day) {
				date = new nexacro.Date(ret.year, ret.mon, ret.day);
			}
			else {
				date = new nexacro.Date(ret.year, ret.mon);
			}
			date._timecheck = false;
		}
		else {
			date = new nexacro.Date(ret.year, ret.mon, ret.day, ret.hour, ret.min, ret.sec, ret.millisec);
			date._timecheck = true;
		}
		ret = null;

		try {
			return date;
		}
		finally {
			date = null;
		}
	};

	_pCalendar._isTimeMask = function () {
		var _info;
		if (this._currentformat == "dateformat") {
			_info = this._dateformat_info;
		}
		else {
			_info = this._editformat_info;
		}

		if (_info._year || _info._mon || _info._day) {
			return false;
		}

		if (_info._hour || _info._min || _info._sec || _info._millisec) {
			return true;
		}

		return false;
	};
	_pCalendar._toValueStr = function (v) {
		var str_v = "";
		if (this._isUndefinedDate(v)) {
			return;
		}
		if (this._isNullDate(v)) {
			return null;
		}
		else if (this._isEmptyStr(v)) {
			return "";
		}
		else if (typeof v != "object") {
			str_v = v;
		}
		else {
			str_v = v.toString();
		}

		if (this._currentformat == "dateformat") {
			var _info = this._dateformat_info;
		}
		else {
			var _info = this._editformat_info;
		}

		var year = "";
		var month = "";
		var day = "";
		var hour = "";
		var min = "";
		var sec = "";
		var millisec = "";

		var idx = 0;

		var mask_value = "";

		if (_info._year) {
			year = str_v.substr(idx, 4);
			mask_value += year;
		}

		idx += 4;

		if (_info._mon) {
			month = str_v.substr(idx, 2);
			mask_value += month;
		}

		idx += 2;

		if (_info._day) {
			day = str_v.substr(idx, 2);
			mask_value += day;
		}

		idx += 2;

		if (_info._hour) {
			hour = str_v.substr(idx, 2);
			mask_value += hour;
		}

		idx += 2;

		if (_info._min) {
			min = str_v.substr(idx, 2);
			mask_value += min;
		}

		idx += 2;

		if (_info._sec) {
			sec = str_v.substr(idx, 2);
			mask_value += sec;
		}

		idx += 2;

		if (_info._millisec) {
			millisec = str_v.substr(idx, 3);
			mask_value += millisec;
		}

		return mask_value;
	};

	_pCalendar._makeFormatInfo = function (format, is_editformat) {
		var pass_char = null;
		if (format == "SHORTDATE" || format == "LONGDATE") {
			var locale = this._getLocale();
			if (!locale) {
				locale = nexacro.BrowserLang;
			}

			format = nexacro.Locale._makeDateMaskString(locale, format);

			if (locale.indexOf("lt") == 0 || locale.indexOf("lv") == 0 || locale.indexOf("sv") == 0) {
				pass_char = [];
				pass_char[0] = {
					c : "\\m", 
					r : "m"
				};
				pass_char[1] = {
					c : "\\d", 
					r : "d"
				};
				pass_char[2] = {
					c : "\\a", 
					r : "a"
				};
			}

			if (is_editformat) {
				var mon_index = format.indexOf("M");
				var day_index = format.indexOf("d");

				if (format.slice(mon_index, mon_index + 2) != "MM") {
					format = format.replace("M", "MM");
				}

				if (format.slice(day_index, day_index + 2) != "dd") {
					format = format.replace("d", "dd");
				}

				mon_index = day_index = null;
			}
		}

		var format_real = format;
		var format_len = format_real.length;
		var char_info = [];
		var format_info = [];

		if (pass_char) {
			for (var i = 0; i < pass_char.length; i++) {
				format_real = format_real.replace(pass_char[i].c, pass_char[i].r);
			}
		}

		for (var i = 0; i < format_len; i++) {
			char_info = {
				ch : format_real.charAt(i), 
				idx : i
			};
			format_info[i] = char_info;
		}

		if (pass_char) {
			for (var i = 0; i < pass_char.length; i++) {
				format = format.replace(pass_char[i].c, "x");
			}
		}

		var y_exp = /y{2,4}/g;
		var M_exp = /M{4}|M{1,2}/g;
		var d_exp = /d{1,2}/g;
		var date_exp = /d{3,4}/g;
		var h_exp = /H{1,2}|h{1,2}/g;
		var m_exp = /m{1,2}/g;
		var s_exp = /s{1,2}/g;
		var ms_exp = /s{3}/g;

		var year_format = y_exp.exec(format);
		var mon_format = M_exp.exec(format);
		var date_format = date_exp.exec(format);
		if (date_format) {
			if (date_format[0].length == 3) {
				var replace_str = "   ";
			}
			else if (date_format[0].length == 4) {
				var replace_str = "    ";
			}
			format = format.replace(/d{3,4}/g, replace_str);
		}

		var day_format = d_exp.exec(format);
		var hour_format = h_exp.exec(format);
		var min_format = m_exp.exec(format);
		var sec_format = s_exp.exec(format);
		var millisec_format = ms_exp.exec(format);



		var year = null;
		var mon = null;
		var day = null;
		var date = null;
		var hour = null;
		var min = null;
		var sec = null;
		var millisec = null;

		var list = [];

		if (year_format) {
			year = {
				mask : year_format[0], 
				index : year_format.index, 
				length : year_format[0].length
			};
			list.push(year);
		}
		if (mon_format) {
			mon = {
				mask : mon_format[0], 
				index : mon_format.index, 
				length : mon_format[0].length, 
				single_digit : true
			};
			list.push(mon);
		}
		if (day_format) {
			day = {
				mask : day_format[0], 
				index : day_format.index, 
				length : day_format[0].length, 
				single_digit : true
			};
			list.push(day);
		}
		if (date_format) {
			date = {
				mask : date_format[0], 
				index : date_format.index, 
				length : date_format[0].length
			};
		}
		if (hour_format) {
			hour = {
				mask : hour_format[0], 
				index : hour_format.index, 
				length : hour_format[0].length
			};
			list.push(hour);
		}
		if (min_format) {
			min = {
				mask : min_format[0], 
				index : min_format.index, 
				length : min_format[0].length
			};
			list.push(min);
		}
		if (sec_format) {
			sec = {
				mask : sec_format[0], 
				index : sec_format.index, 
				length : sec_format[0].length
			};
			list.push(sec);
		}
		if (millisec_format) {
			millisec = {
				mask : millisec_format[0], 
				index : millisec_format.index, 
				length : millisec_format[0].length
			};
			list.push(millisec);
		}

		list.sort(function (a, b) {
			return a.index - b.index;
		});

		return {
			format : format_real, 
			format_info : format_info, 
			format_list : list, 
			_year : year, 
			_mon : mon, 
			_day : day, 
			_date : date, 
			_hour : hour, 
			_min : min, 
			_sec : sec, 
			_millisec : millisec
		};
	};

	_pCalendar._getEndDay = function (y, m) {
		var endDayN = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var endDayL = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

		var ret = "";
		var year = parseInt(y);
		var month = parseInt(m);

		if (year == 0) {
			ret = endDayN[month - 1];
			return ret;
		}

		if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
			ret = endDayL[month - 1];
		}
		else {
			ret = endDayN[month - 1];
		}
		endDayN = endDayL = null;
		return ret;
	};

	_pCalendar._getDateObj = function (v) {
		if (!v) {
			return new nexacro.Date();
		}

		v = v.replace(/-/g, "");
		var year = parseInt(v.substr(0, 4), 10);
		var month = parseInt(v.substr(4, 2), 10) - 1;
		var day = parseInt(v.substr(6, 2), 10);
		return new nexacro.Date(year, month, day);
	};

	_pCalendar._getPopupSizeArr = function () {
		var popupsize;
		if (this.type == "normal") {
			popupsize = this.on_find_CurrentStyle_popupsize(this._pseudo);
		}
		else {
			popupsize = this._init_popupsize;
			if (!popupsize) {
				popupsize = this.on_find_CurrentStyle_popupsize(this._pseudo);
			}
		}

		var str = popupsize.value;
		var arr = str.split(/\s+/);

		if (arr.length == 2) {
			return {
				width : parseInt(arr[0], 10), 
				height : parseInt(arr[1], 10)
			};
		}
		else {
			return {
				width : parseInt(arr[0], 10), 
				height : parseInt(arr[0], 10)
			};
		}
	};

	_pCalendar._getPickerValue = function (v) {
		var date = v ? v : new Date();
		var year = date.getFullYear() + "";
		year = this._validationDateStr(year, "year");
		var month = date.getMonth() + 1;
		month = this._validationDateStr(month);
		var day = date.getDate();
		day = this._validationDateStr(day);


		return year + month + day;
	};



	_pCalendar._getSplitDate = function (v) {
		var year = v.substr(0, 4);
		year = year ? year : null;
		var mon = v.substr(4, 2);
		mon = mon ? mon : null;
		var day = v.substr(6, 2);
		day = day ? day : null;
		var hour = v.substr(8, 2);
		hour = hour ? hour : null;
		var min = v.substr(10, 2);
		min = min ? min : null;
		var sec = v.substr(12, 2);
		sec = sec ? sec : null;
		var millisec = v.substr(14, 3);
		millisec = millisec ? millisec : null;

		return {
			year : year, 
			mon : mon, 
			day : day, 
			hour : hour, 
			min : min, 
			sec : sec, 
			millisec : millisec
		};
	};

	_pCalendar._changeYearValue = function (origin_year) {
		var _info = this._editformat_info;
		var edit = this.calendaredit;
		var edit_api = edit._edit_base_api;
		var text = edit_api._getText();

		if (_info._year) {
			var adjust_index = 0;
			if ((_info._mon && _info._year.index > _info._mon.index) || (_info._day && _info._year.index > _info._day.index)) {
				if (_info._mon && _info._mon.length == 1 && !_info._mon.single_digit) {
					adjust_index++;
				}
				if (_info._day && _info._day.length == 1 && !_info._day.single_digit) {
					adjust_index++;
				}
			}

			var year_str = text.substr(_info._year.index + adjust_index, _info._year.length);
			var year_trim = year_str.trim();
			var year = parseInt(year_trim, 10);
			var year_len = year_trim.length;

			var value = edit_api._getValue();
			var val_trim = value ? value.trim() : "";
			if (val_trim) {
				if (year_trim === "") {
					if (this._prevalue) {
						var fullyear = this._prevalue.getFullYear();
						text = text.replace(year_str, fullyear);
					}
					else {
						text = text.replace(year_str, "0000");
					}
				}
				else if (year_trim.length != 4) {
					if (!origin_year) {
						if (year_len === 1) {
							year = "000" + year;
						}
						else if (year_len === 2) {
							year = "00" + year;
						}
						else if (year_len === 3) {
							year = "0" + year;
						}
						text = text.replace(year_str, year);
					}
				}
				;
			}
		}

		if (_info._mon) {
			if (_info._mon.mask == "MMMM" && this.value) {
				var m = this.value.getMonth() + 1;
				m = nexacro._toString(m).padLeft(4, "0");
				text = text.replace(_info._mon.mask, m);
			}
		}

		return text;
	};

	_pCalendar._setDefaultCaret = function () {
		var edit = this.calendaredit;
		if (edit && nexacro._checkActiveElement(edit._input_element)) {
			this.setCaretPos(0);
		}
	};

	_pCalendar._setPreValueAndText = function (pre_value) {
		var pre_str = "";
		if (pre_value) {
			pre_str = pre_value.toString();
		}
		this._prevalue = pre_value;
		this._pretext = this._makeCalendarText(pre_str);
	};

	_pCalendar._setPostValueAndText = function (post_value) {
		var post_str = "";
		if (post_value) {
			post_str = post_value.toString();
		}
		this._postvalue = post_value;
		this._posttext = this._makeCalendarText(post_str);
	};

	_pCalendar._setValue = function (v, user_set) {
		if (!this._is_created && !this._is_primitivevalue) {
			this._primitivevalue = v;
			this._is_primitivevalue = true;
			return;
		}

		if (this._bindsource) {
			this.value = v;
			this._bindsource = false;

			this.on_apply_value();
		}
		else {
			var date_obj;
			var currentformat = this._currentformat;

			if (this._isUndefinedDate(v)) {
				date_obj = v;
			}
			else if (this._isNullDate(v)) {
				date_obj = null;
			}
			else if (this._isEmptyStr(v)) {
				date_obj = "";
			}
			else {
				if (this._is_primitivevalue) {
					this._is_primitivevalue = false;
				}
				else {
					this._currentformat = "editformat";
				}
				date_obj = this._makeDateObj(v);
			}

			this._currentformat = currentformat;
			this._bindsource = false;

			var ret = this.applyto_bindSource("value", date_obj);
			if (ret == false) {
				currentformat = this._currentformat;
				this._currentformat = "dateformat";
				this.on_apply_fake_value(this.value);
				this._currentformat = currentformat;
				return false;
			}

			this.value = date_obj;
			this._currentformat = currentformat;

			this.on_apply_value();

			return ret;
		}
	};

	_pCalendar._setUserValue = function (v) {
		if (!this._is_created && !this._is_primitivevalue) {
			this._primitivevalue = v;
			this._is_primitivevalue = true;
			return;
		}

		var date_obj;
		var format_temp = this.editformat;
		var currentformat = this._currentformat;

		if (this._isUndefinedDate(v)) {
			date_obj = v;
		}
		else if (this._isNullDate(v)) {
			date_obj = null;
		}
		else if (this._isEmptyStr(v)) {
			date_obj = "";
		}
		else {
			this._currentformat = "editformat";

			var _info = this._editformat_info;
			if (_info._year || _info._mon || _info._day) {
				if (_info._hour || _info._min || _info._sec || _info._millisec) {
					this.set_editformat("yyyy-MM-dd HH:mm:ss sss");
				}
				else {
					this.set_editformat("yyyy-MM-dd");
				}
			}
			else {
				this.set_editformat("HH:mm:ss sss");
			}

			date_obj = this._makeDateObj(v);
		}

		this._currentformat = currentformat;
		this._bindsource = false;

		var ret = this.applyto_bindSource("value", date_obj);

		if (ret === false) {
			currentformat = this._currentformat;
			this._currentformat = "dateformat";
			this.on_apply_fake_value(this.value);
			this._currentformat = currentformat;
			return false;
		}

		this.value = date_obj;
		this._currentformat = currentformat;

		this.set_editformat(format_temp);

		this.on_apply_value();
	};

	_pCalendar._setValue_JSDate = function (date_obj) {
		var date_str = date_obj.toString();
		var newDate = new nexacro.Date(date_str);

		this._setValue(newDate);
	};

	_pCalendar._setValue_JSDate = function (date_obj) {
		var date_str = date_obj.toString();
		var newDate = new nexacro.Date(date_str);

		this._setValue(newDate);
	};

	_pCalendar._closePopup = function () {
		if (this.type == "system") {
			nexacro._closeSystemCalendar();
			return;
		}


		var popupcalendar = this.popupcalendar;
		var popupwindow = this.popupwindow;

		if (popupwindow) {
			popupwindow._closePopup();
		}
		if (nexacro._enableaccessibility && this.type != "monthonly") {
			this._want_arrows = false;
		}
	};

	_pCalendar._fireKeydownEvent = function () {
		var edit = this.calendaredit;
		var edit_ctrl = edit._edit_base_api;

		if (edit && edit.value != undefined) {
			var focus_value = edit_ctrl._getFocusText();
			var current_value = edit_ctrl._getText();

			if (focus_value != current_value && focus_value != current_value.trim()) {
				var text = this._changeYearValue();
				var value = this._makeNormalValue1(text);
				var prevalue = this._makeNormalValue1(focus_value);

				this._currentformat = "editformat";
				this._setPreValueAndText(this._makeDateObj(prevalue));
				this._setPostValueAndText(this._makeDateObj(value));

				var ret = this.on_fire_canchange(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
				if (ret || ret == undefined) {
					this._setValue(this._postvalue);
				}
				else {
					this._setValue(this._prevalue);
					return;
				}

				this._fireOnchangedEvent(this._prevalue, this.value);
			}
		}
	};

	_pCalendar._fireOnchangedEvent = function (prevalue, postvalue) {
		prevalue = prevalue ? prevalue.toString() : prevalue;
		postvalue = postvalue ? postvalue.toString() : postvalue;

		if (prevalue != postvalue) {
			this._flag_update2dataset = true;
			this.on_fire_onchanged(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
			this._flag_update2dataset = false;

			var edit = this.calendaredit;
			if (edit) {
				var edit_api = edit._edit_base_api;
				edit_api._setFocusValue();
			}
		}
	};

	_pCalendar._getCurrentDate = function () {
		var currentDate = new Date();
		year = currentDate.getFullYear();
		month = currentDate.getMonth() + 1;
		day = currentDate.getDate();
		currentDate = null;
		return year + " " + month + " " + day;
	};

	_pCalendar._getRange = function (pos, formatinfo) {
		var ret = "";
		var list_len = formatinfo.format_list.length;
		var tmp_idx = 0;

		for (var i = 0; i < list_len; i++) {
			var format_obj = formatinfo.format_list[i];
			var start = format_obj.index;
			var end = format_obj.index + format_obj.length;

			if (start <= pos && end >= pos) {
				ret = format_obj;

				break;
			}
		}

		return ret;
	};

	delete _pCalendar;
	_pCalendar = null;

	nexacro.CalendarDropButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};
	var _pCalendarDropButtonCtrl = nexacro.CalendarDropButtonCtrl.prototype = nexacro._createPrototype(nexacro.ImageButtonCtrl, nexacro.CalendarDropButtonCtrl);

	_pCalendarDropButtonCtrl.on_apply_custom_setfocus = function (evt_name) {
		var parent = this.parent;
		if (parent) {
			var edit = parent.calendaredit;
			if (edit) {
				if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
					edit.on_apply_custom_setfocus(evt_name);
				}
				else {
					nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
				}
			}
		}
	};

	_pCalendarDropButtonCtrl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!nexacro._enableaccessibility) {
			this.parent._is_dropbutton = true;
		}
		return nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pCalendarDropButtonCtrl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!nexacro._enableaccessibility) {
			this.parent._is_dropbutton = true;
		}
		return nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pCalendarDropButtonCtrl._on_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
	};

	_pCalendarDropButtonCtrl.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (nexacro.isTouchInteraction && nexacro.SupportTouch && !application.enabletouchevent) {
			var evt = new nexacro.EventInfo(this, "ondropdown");
			this.parent.on_notify_mobile_ondropdown(this, evt);
		}

		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pCalendarDropButtonCtrl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this.parent, from_refer_comp);
	};

	delete _pCalendarDropButtonCtrl;

	nexacro.CalendarSpinButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};
	var _pCalendarSpinButtonCtrl = nexacro.CalendarSpinButtonCtrl.prototype = nexacro._createPrototype(nexacro.ImageButtonCtrl, nexacro.CalendarSpinButtonCtrl);

	_pCalendarSpinButtonCtrl.on_apply_custom_setfocus = function (evt_name) {
		var parent = this.parent;
		if (parent) {
			var edit = parent.calendaredit;
			if (edit) {
				if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
					edit.on_apply_custom_setfocus(evt_name);
				}
				else {
					nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
				}
			}
		}
	};

	_pCalendarSpinButtonCtrl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!nexacro._enableaccessibility) {
			this.parent._is_dropbutton = true;
		}
		return nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pCalendarSpinButtonCtrl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!nexacro._enableaccessibility) {
			this.parent._is_dropbutton = true;
		}
		return nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pCalendarSpinButtonCtrl._on_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
	};

	_pCalendarSpinButtonCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_cursor(pseudo) || this._find_inherit_pseudo_obj("cursor", pseudo) || nexacro.Component._default_cursor;
	};

	delete _pCalendarSpinButtonCtrl;

	nexacro.CalendarEditCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.MaskEditCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._event_list["oneditclick"] = 1;
		this._accessibility_role = "calendar";
	};

	var _pCalendarEditCtrl = nexacro._createPrototype(nexacro.MaskEditCtrl, nexacro.CalendarEditCtrl);
	nexacro.CalendarEditCtrl.prototype = _pCalendarEditCtrl;

	_pCalendarEditCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent.on_find_CurrentStyle_align(pseudo, this) || nexacro.Component._default_align;
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_font(pseudo, this) || nexacro.Component._default_font;
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent.on_find_CurrentStyle_color(pseudo, this) || nexacro.Component._default_color;
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.on_find_CurrentStyle_accessibility(pseudo, this) || nexacro.Component._default_accessibility;
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_background(pseudo, this);
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_border(pseudo, this);
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bordertype(pseudo, this);
	};

	_pCalendarEditCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_gradation(pseudo, this);
	};

	_pCalendarEditCtrl._getFormChildById = function (id) {
		return this.parent._getFormChildById(id);
	};

	_pCalendarEditCtrl._getFromComponent = function (comp) {
		var parent = comp.parent;
		if (parent && parent._isPopupVisible()) {
			return parent;
		}
		else {
			return nexacro.Component.prototype._getFromComponent.call(this, comp);
		}
	};

	_pCalendarEditCtrl._getAccessibilityRole = function (accessibility) {
		var calendar = this.parent;
		if (calendar) {
			var accessibility = calendar.on_find_CurrentStyle_accessibility(calendar._pseudo);
			return calendar._getAccessibilityRole(accessibility);
		}
		return nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
	};

	_pCalendarEditCtrl._getAccessibilityLabel = function (accessibility) {
		var calendar = this.parent;
		if (calendar) {
			var accessibility = calendar.on_find_CurrentStyle_accessibility(calendar._pseudo);
			return calendar._getAccessibilityLabel(accessibility);
		}
		return nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
	};

	_pCalendarEditCtrl._getAccessibilityDescription = function (accessibility) {
		var calendar = this.parent;
		if (calendar) {
			var accessibility = calendar.on_find_CurrentStyle_accessibility(calendar._pseudo);
			return calendar._getAccessibilityDescription(accessibility);
		}
		return nexacro.Component.prototype._getAccessibilityDescription.call(this, accessibility);
	};

	_pCalendarEditCtrl._getAccessibilityAction = function (accessibility) {
		var calendar = this.parent;
		if (calendar) {
			var accessibility = calendar.on_find_CurrentStyle_accessibility(calendar._pseudo);
			return calendar._getAccessibilityAction(accessibility);
		}
		return nexacro.Component.prototype._getAccessibilityAction.call(this, accessibility);
	};

	_pCalendarEditCtrl._on_getAccessibilityAdditionalLabel = function () {
		if (nexacro.OS == "iOS" && nexacro.OSVersion >= 8) {
			return this.value ? this.text : "";
		}
	};

	_pCalendarEditCtrl.set_value = function (v) {
		nexacro.MaskEdit.prototype.set_value.call(this, v);
		this._setAccessibilityValue(this.value);
		if (this._is_created && nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			var input_elem = this._input_element;
			input_elem._setElementInputLabel();
		}
	};

	_pCalendarEditCtrl._accept_keydown_event = function (keyCode) {
		var pThis = this.parent;

		if (pThis && (keyCode >= 37 && keyCode <= 40)) {
			if (pThis.isDropdown()) {
				return false;
			}
			else {
				if (nexacro.Browser == "Chrome") {
					if (keyCode == 38 || keyCode == 40) {
						return false;
					}
				}
			}
		}

		return true;
	};

	_pCalendarEditCtrl._on_input_keyinput = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				if (api._is_selected()) {
					api._on_input_keyinput(elem);
					api._on_input_keyinput_after();
				}
			}
			api._on_input_keyinput(elem);
			api._on_input_keyinput_after();

			var calendar = this.parent;
			if (calendar && calendar._getPopupType() == "system") {
				calendar._setValue(api._getValue());
			}
		}
	};

	delete _pCalendarEditCtrl;

	nexacro.CalendarPopupWindow = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.PopupComponent.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pCalendarPopupWindow = nexacro._createPrototype(nexacro.PopupComponent, nexacro.CalendarPopupWindow);
	nexacro.CalendarPopupWindow.prototype = _pCalendarPopupWindow;
	_pCalendarPopupWindow._type_name = "CalendarPopupWindow";

	_pCalendarPopupWindow._getMainFrame = function () {
		var form = this;
		while (form && form instanceof nexacro.MainFrame) {
			form = form.parent;
		}
		return form;
	};

	delete _pCalendarPopupWindow;

	nexacro.CalendarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Calendar.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;

		this._value;
	};

	var _pCalendarCtrl = nexacro._createPrototype(nexacro.Calendar, nexacro.CalendarCtrl);
	nexacro.CalendarCtrl.prototype = _pCalendarCtrl;
	_pCalendarCtrl._type_name = "CalendarControl";

	nexacro._setForControlStyleFinder(_pCalendarCtrl);

	_pCalendarCtrl._setValueCtrl = function (fire_event) {
		this._currentformat = "editformat";
		var edit = this.calendaredit;
		var edit_ctrl = edit._edit_base_api;

		if (edit && edit.value != undefined) {
			var focus_value = edit_ctrl._getFocusText();
			var current_value = edit_ctrl._getText();

			if (focus_value != current_value.trim()) {
				var text = this._changeYearValue();
				var value = this._makeNormalValue(text);
				value = this._toValueStr(value);
				this._setPreValueAndText(this._makeDateObj(focus_value));
				this._setPostValueAndText(this._makeDateObj(value));

				if (fire_event) {
					var ret = this.on_fire_canchange(this, this._pretext, this._prevalue, this._posttext, this._postvalue);
					if (ret || ret == undefined) {
						this._setValue(this._postvalue);
					}
					else {
						this._setValue(this._prevalue);
						return;
					}

					this._fireOnchangedEvent(this._prevalue, this.value);
				}
				else {
					this._setValue(this._postvalue);
				}
			}
		}
	};

	_pCalendarCtrl.on_created_contents = function () {
		nexacro.Calendar.prototype.on_created_contents.call(this);

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			this._control_element.setElementAccessibilityHidden(true);
		}
	};

	delete _pCalendarCtrl;
}
;