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

if (!nexacro.Dataset) {
	nexacro._getXMLTagData = function (xmlStr, parse_pos, startTag, endTag) {
		var start_pos = xmlStr.indexOf(startTag, parse_pos);
		if (start_pos > -1) {
			var data_pos = start_pos + startTag.length;
			var end_pos = xmlStr.indexOf(endTag, data_pos);
			if (end_pos > -1) {
				var str = xmlStr.substring(data_pos, end_pos);
				return [str, "", start_pos, end_pos + endTag.length];
			}
			else {
				var str = xmlStr.substring(data_pos);
				return [str, "", start_pos, xmlStr.length];
			}
		}
		return null;
	};

	nexacro._getXMLTagData2 = function (xmlStr, parse_pos, startTag, endTag) {
		var start_pos = xmlStr.indexOf(startTag, parse_pos);
		if (start_pos > -1) {
			var attr;
			var attr_pos = start_pos + startTag.length;
			var data_pos = xmlStr.indexOf(">", attr_pos);
			if (data_pos < 0) {
				return null;
			}
			else if (data_pos > 0 && xmlStr.charAt(data_pos - 1) == '/') {
				attr = xmlStr.substring(attr_pos, data_pos - 1).trim();
				return ["", attr, start_pos, data_pos];
			}
			else {
				attr = xmlStr.substring(attr_pos, data_pos).trim();
			}

			data_pos++;
			var end_pos = xmlStr.indexOf(endTag, data_pos);
			if (end_pos > -1) {
				var str = xmlStr.substring(data_pos, end_pos);
				return [str, attr, start_pos, end_pos + endTag.length];
			}
			else {
				var str = xmlStr.substring(data_pos);
				return [str, attr, start_pos, xmlStr.length];
			}
		}
		return null;
	};

	nexacro._getXMLTagData3 = function (xmlStr, parse_pos, startTag, endTag) {
		var start_pos = xmlStr.indexOf(startTag, parse_pos);
		if (start_pos > -1) {
			var start_pos2 = start_pos + startTag.length;
			if (xmlStr.charAt(start_pos2) == " ") {
				var attr;
				var attr_pos = start_pos2 + 1;
				var data_pos = xmlStr.indexOf(">", attr_pos);
				if (data_pos < 0) {
					return null;
				}
				else if (data_pos > 0 && xmlStr.charAt(data_pos - 1) == '/') {
					attr = xmlStr.substring(attr_pos, data_pos - 1).trim();
					return ["", attr, start_pos, data_pos];
				}
				else {
					attr = xmlStr.substring(attr_pos, data_pos).trim();
				}

				data_pos++;
				var end_pos = xmlStr.indexOf(endTag, data_pos);
				if (end_pos > -1) {
					var str = xmlStr.substring(data_pos, end_pos);
					return [str, attr, start_pos, end_pos + endTag.length];
				}
				else {
					var str = xmlStr.substring(data_pos);
					return [str, attr, start_pos, xmlStr.length];
				}
			}
			else if (xmlStr.charAt(start_pos2) == "/") {
				start_pos2 = start_pos2 + 1;
				if (xmlStr.charAt(start_pos2) == ">") {
					return ["", "", start_pos, start_pos2];
				}
			}
			else {
				if (xmlStr.charAt(start_pos + 1) == ">") {
					start_pos = start_pos + 1;
				}

				var data_pos = start_pos + startTag.length;
				var end_pos = xmlStr.indexOf(endTag, data_pos);
				if (end_pos > -1) {
					var str = xmlStr.substring(data_pos, end_pos);
					return [str, "", start_pos, end_pos + endTag.length];
				}
				else {
					var str = xmlStr.substring(data_pos);
					return [str, "", start_pos, xmlStr.length];
				}
			}
		}
		return null;
	};

	nexacro._getXMLTagData4 = function (xmlStr, parse_pos, startTag) {
		var start_pos = xmlStr.indexOf(startTag, parse_pos);
		if (start_pos > -1) {
			var attr_pos = start_pos + startTag.length;
			var end_pos = xmlStr.indexOf("/>", attr_pos);
			if (end_pos > -1) {
				var attr = xmlStr.substring(attr_pos, end_pos).trim();
				return ["", attr, attr_pos, end_pos + 2];
			}
			else {
				var attr = xmlStr.substring(attr_pos).trim();
				return ["", attr, attr_pos, xmlStr.length];
			}
		}
		return null;
	};

	nexacro._getXMLAttributeID = function (attrStr) {
		var attr_pos = attrStr.indexOf("id=\"");
		if (attr_pos > -1) {
			var data_pos = attr_pos + 4;
			var end_pos = attrStr.indexOf("\"", data_pos);
			if (end_pos > -1) {
				return attrStr.substring(data_pos, end_pos);
			}
			return "";
		}
		return null;
	};

	nexacro._getXMLAttributeType = function (attrStr) {
		var attr_pos = attrStr.indexOf("type=\"");
		if (attr_pos > -1) {
			var data_pos = attr_pos + 6;
			var end_pos = attrStr.indexOf("\"", data_pos);
			if (end_pos > -1) {
				return attrStr.substring(data_pos, end_pos);
			}
			return "";
		}
		return null;
	};

	nexacro._getXMLAttributeData = function (attrStr, attrid) {
		var attr_pos = attrStr.indexOf(attrid + "=\"");
		if (attr_pos > -1) {
			var data_pos = attr_pos + attrid.length + 2;
			var end_pos = attrStr.indexOf("\"", data_pos);
			if (end_pos > -1) {
				return attrStr.substring(data_pos, end_pos);
			}
			return "";
		}
		return null;
	};

	nexacro.Date = function (year, month, day, hours, minutes, seconds, milliseconds) {
		if (year == null) {
			this._timecheck = true;
			this.date = new Date();
		}
		else if (month == null && typeof year == "string") {
			this._timecheck = true;
			this.date = new Date(year);
		}
		else if (day == null) {
			year = (parseInt(year, 10) | 0);
			month = (parseInt(month, 10) | 0);
			this.date = new Date(year, month);
			if (year <= 99 && year >= 0) {
				this.date.setFullYear(year);
			}
		}
		else if (hours == null) {
			year = (parseInt(year, 10) | 0);
			month = (parseInt(month, 10) | 0);
			day = (parseInt(day, 10) | 0);
			this.date = new Date(year, month, day);
			if (year <= 99 && year >= 0) {
				this.date.setFullYear(year);
			}
		}
		else if (minutes == null) {
			this._timecheck = true;
			year = (parseInt(year, 10) | 0);
			month = (parseInt(month, 10) | 0);
			day = (parseInt(day, 10) | 0);
			hours = (parseInt(hours, 10) | 0);
			this.date = new Date(year, month, day, hours);
			if (year <= 99 && year >= 0) {
				this.date.setFullYear(year);
			}
		}
		else if (seconds == null) {
			this._timecheck = true;
			year = (parseInt(year, 10) | 0);
			month = (parseInt(month, 10) | 0);
			day = (parseInt(day, 10) | 0);
			hours = (parseInt(hours, 10) | 0);
			minutes = (parseInt(minutes, 10) | 0);
			this.date = new Date(year, month, day, hours, minutes);
			if (year <= 99 && year >= 0) {
				this.date.setFullYear(year);
			}
		}
		else if (milliseconds == null) {
			this._timecheck = true;
			year = (parseInt(year, 10) | 0);
			month = (parseInt(month, 10) | 0);
			day = (parseInt(day, 10) | 0);
			hours = (parseInt(hours, 10) | 0);
			minutes = (parseInt(minutes, 10) | 0);
			seconds = (parseInt(seconds, 10) | 0);
			this.date = new Date(year, month, day, hours, minutes, seconds);
			if (year <= 99 && year >= 0) {
				this.date.setFullYear(year);
			}
		}
		else {
			this._timecheck = true;
			year = (parseInt(year, 10) | 0);
			month = (parseInt(month, 10) | 0);
			day = (parseInt(day, 10) | 0);
			hours = (parseInt(hours, 10) | 0);
			minutes = (parseInt(minutes, 10) | 0);
			seconds = (parseInt(seconds, 10) | 0);
			milliseconds = (parseInt(milliseconds, 10) | 0);
			this.date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
			if (year <= 99 && year >= 0) {
				this.date.setFullYear(year);
			}
		}
		return;
	};

	var _pDate = nexacro._createPrototype(nexacro.Object, nexacro.Date);
	nexacro.Date.prototype = _pDate;

	_pDate._type_name = "Date";

	_pDate.getFullYear = function () {
		return this.date.getFullYear();
	};

	_pDate.setFullYear = function (year, month, day) {
		if (day != null) {
			this.date.setFullYear(year, month, day);
		}
		else if (month != null) {
			this.date.setFullYear(year, month);
		}
		else {
			this.date.setFullYear(year);
		}
	};

	_pDate.getYear = function () {
		return this.date.getYear();
	};

	_pDate.setYear = function (year, month, day) {
		if (day != null) {
			this.date.setYear(year, month, day);
		}
		else if (month != null) {
			this.date.setYear(year, month);
		}
		else {
			this.date.setYear(year);
		}
	};

	_pDate.getMonth = function () {
		return this.date.getMonth();
	};

	_pDate.setMonth = function (month, day) {
		if (day == null) {
			this.date.setMonth(month);
		}
		else {
			this.date.setMonth(month, day);
		}
	};

	_pDate.getDate = function () {
		return this.date.getDate();
	};

	_pDate.setDate = function (day) {
		this.date.setDate(day);
	};

	_pDate.getDay = function () {
		return this.date.getDay();
	};

	_pDate.getHours = function () {
		return this.date.getHours();
	};

	_pDate.setHours = function (hour, min, sec, millisec) {
		if (millisec != null) {
			this.date.setHours(hour, min, sec, millisec);
		}
		else if (sec != null) {
			this.date.setHours(hour, min, sec);
		}
		else if (min != null) {
			this.date.setHours(hour, min);
		}
		else {
			this.date.setHours(hour);
		}
	};

	_pDate.getMinutes = function () {
		return this.date.getMinutes();
	};

	_pDate.setMinutes = function (min, sec, millisec) {
		if (millisec != null) {
			this.date.setMinutes(min, sec, millisec);
		}
		else if (sec != null) {
			this.date.setMinutes(min, sec);
		}
		else {
			this.date.setMinutes(min);
		}
	};

	_pDate.getSeconds = function () {
		return this.date.getSeconds();
	};

	_pDate.setSeconds = function (sec, millisec) {
		if (millisec != null) {
			this.date.setSeconds(sec, millisec);
		}
		else {
			this.date.setSeconds(sec);
		}
	};

	_pDate.getMilliseconds = function () {
		return this.date.getMilliseconds();
	};

	_pDate.setMilliseconds = function (millisec) {
		this.date.setMilliseconds(millisec);
	};

	_pDate.getTime = function () {
		return this.date.getTime();
	};

	_pDate.setTime = function (millisec) {
		this.date.setTime(millisec);
	};

	_pDate.getTimezoneOffset = function () {
		return this.date.getTimezoneOffset();
	};

	_pDate.getUTCFullYear = function () {
		return this.date.getUTCFullYear();
	};

	_pDate.setUTCFullYear = function (year, month, day) {
		if (day != null) {
			this.date.setUTCFullYear(year, month, day);
		}
		else if (month != null) {
			this.date.setUTCFullYear(year, month);
		}
		else {
			this.date.setUTCFullYear(year);
		}
	};

	_pDate.getUTCMonth = function () {
		return this.date.getUTCMonth();
	};

	_pDate.setUTCMonth = function (month, day) {
		if (day == null) {
			this.date.setUTCMonth(month);
		}
		else {
			this.date.setUTCMonth(month, day);
		}
	};

	_pDate.getUTCDate = function () {
		return this.date.getUTCDate();
	};

	_pDate.setUTCDate = function (day) {
		this.date.setUTCDate(day);
	};

	_pDate.getUTCDay = function () {
		return this.date.getUTCDay();
	};

	_pDate.getUTCHours = function () {
		return this.date.getUTCHours();
	};

	_pDate.setUTCHours = function (hour, min, sec, millisec) {
		if (millisec != null) {
			this.date.setUTCHours(hour, min, sec, millisec);
		}
		else if (sec != null) {
			this.date.setUTCHours(hour, min, sec);
		}
		else if (min != null) {
			this.date.setUTCHours(hour, min);
		}
		else {
			this.date.setUTCHours(hour);
		}
	};

	_pDate.getUTCMinutes = function () {
		return this.date.getUTCMinutes();
	};

	_pDate.setUTCMinutes = function (min, sec, millisec) {
		if (millisec != null) {
			this.date.setUTCMinutes(min, sec, millisec);
		}
		else if (sec != null) {
			this.date.setUTCMinutes(min, sec);
		}
		else {
			this.date.setUTCMinutes(min);
		}
	};

	_pDate.getUTCSeconds = function () {
		return this.date.getUTCSeconds();
	};

	_pDate.setUTCSeconds = function (sec, millisec) {
		if (millisec == null) {
			this.date.setUTCSeconds(sec);
		}
		else {
			this.date.setUTCSeconds(sec, millisec);
		}
	};

	_pDate.getUTCMilliseconds = function () {
		return this.date.getUTCMilliseconds();
	};

	_pDate.setUTCMilliseconds = function (millisec) {
		this.date.setUTCMilliseconds(millisec);
	};

	_pDate.parse = function (datestring) {
		return this.date.parse(datestring);
	};

	_pDate.UTC = function (year, month, day, hours, minutes, seconds, ms) {
		return this.date.UTC(year, month, day, hours, minutes, seconds, ms);
	};

	_pDate.valueOf = function () {
		return this.toString();
	};

	_pDate.toGMTString = function () {
		return this.date.toGMTString();
	};

	_pDate.toDateString = function () {
		return this.date.toDateString();
	};

	_pDate.toTimeString = function () {
		return this.date.toTimeString();
	};

	_pDate.toLocaleDateString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var format_string = this.getLocaleFormatString(locale, locale_info.date_format);



		return format_string;
	};

	_pDate.toLocaleTimeString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var format_string = this.getLocaleFormatString(locale, locale_info.time_format);

		return format_string;
	};

	_pDate.toString = function () {
		var y = this.getFullYear();
		var m = this.getMonth() + 1;
		var d = this.getDate();
		var h = this.getHours();
		var min = this.getMinutes();
		var sec = this.getSeconds();
		var millisec = this.getMilliseconds();

		y = y !== null ? this.toZeroDigitString(y, 4) : "0000";
		m = m !== null ? this.toZeroDigitString(m, 2) : m;
		d = d !== null ? this.toZeroDigitString(d, 2) : d;
		h = h !== null ? this.toZeroDigitString(h, 2) : h;
		min = min !== null ? this.toZeroDigitString(min, 2) : min;
		sec = sec !== null ? this.toZeroDigitString(sec, 2) : sec;
		millisec = millisec !== null ? this.toZeroDigitString(millisec, 3) : millisec;

		if (this._timecheck) {
			return "" + y + m + d + h + min + sec + millisec;
		}
		else {
			return "" + y + m + d;
		}
	};

	_pDate.toLocaleString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);

		var format_string = this.getLocaleFormatString(locale, locale_info.date_time_format);

		return format_string;
	};

	_pDate.toUTCString = function () {
		return this.date.toUTCString();
	};

	_pDate.toZeroDigitString = function (v, d) {
		var zero = "";
		v = v.toString();

		if (v.length < d) {
			for (var i = 0; i < d - v.length; i++) {
				zero += "0";
			}
		}
		return zero + v;
	};

	_pDate.getLocaleFormatString = function (locale, format, bLTRMark) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var format_string = format;

		format_string = format_string.replace(/%r/g, locale_info.time_format_ampm);
		format_string = format_string.replace(/%x/g, locale_info.date_format);
		format_string = format_string.replace(/%X/g, locale_info.time_format);
		format_string = format_string.replace(/%T/g, "%H:%M:%S");

		if (bLTRMark === true) {
			format_string = format_string.replace(/%Y/g, "\u200E%Y");
			format_string = format_string.replace(/%y/g, "\u200E%y");
			format_string = format_string.replace(/%d/g, "\u200E%d");
			format_string = format_string.replace(/%e/g, "\u200E%e");
		}

		format_string = format_string.replace(/%a/g, this.toLocaleWeekDayString(locale, "short"));
		format_string = format_string.replace(/%A/g, this.toLocaleWeekDayString(locale, "long"));
		format_string = format_string.replace(/%b/g, this.toLocaleMonthString(locale, "short"));
		format_string = format_string.replace(/%B/g, this.toLocaleMonthString(locale, "long"));
		format_string = format_string.replace(/%p/g, this.toLocaleAMPMString(locale));

		format_string = format_string.replace(/%y/g, this.getYear());
		format_string = format_string.replace(/%Y/g, this.getFullYear());
		format_string = format_string.replace(/%n/g, this.getMonth() + 1);
		format_string = format_string.replace(/%m/g, nexacro._toString(this.getMonth() + 1).padLeft(2, "0"));
		format_string = format_string.replace(/%d/g, nexacro._toString(this.getDate()).padLeft(2, "0"));
		format_string = format_string.replace(/%e/g, this.getDate());

		format_string = format_string.replace(/%H/g, this.getHours());
		format_string = format_string.replace(/%l/g, this.getHours());
		format_string = format_string.replace(/%I/g, this.getHours());
		format_string = format_string.replace(/%M/g, this.getMinutes());
		format_string = format_string.replace(/%S/g, this.getSeconds());

		format_string = format_string.replace(/\\a/g, "a");
		format_string = format_string.replace(/\\m/g, "m");
		format_string = format_string.replace(/\\d/g, "d");
		return format_string;
	};

	_pDate.toLocaleWeekDayString = function (locale, option) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var day = this.getDay();
		var weekday_string = "";

		switch (option) {
			case "short":
				{

					weekday_string = locale_info.weekday_names_short[day];
				}
				break;
			case "narrow":
				{

					weekday_string = locale_info.weekday_names_narrow[day];
				}
				break;
			case "long":
			default:
				{

					weekday_string = locale_info.weekday_names_long[day];
				}
				break;
		}
		return weekday_string;
	};

	_pDate.toLocaleMonthString = function (locale, option) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var month = this.getMonth();
		var month_string = "";

		switch (option) {
			case "short":
				{

					month_string = locale_info.month_names_short[month];
				}
				break;
			case "narrow":
				{

					month_string = locale_info.month_names_narrow[month];
				}
				break;
			case "long":
			default:
				{

					month_string = locale_info.month_names_long[month];
				}
				break;
		}
		return month_string;
	};

	_pDate.toLocaleAMPMString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var hours = this.getHours();
		var ampm_string = "";

		if ((hours % 12) % 2) {
			ampm_string = locale_info.ampm[1];
			if (!ampm_string) {
				ampm_string = "PM";
			}
		}
		else {
			ampm_string = locale_info.ampm[0];
			if (!ampm_string) {
				ampm_string = "AM";
			}
		}

		return ampm_string;
	};

	delete _pDate;

	nexacro.DataUtils = 
		{
		_undefined_type : 0, 
		_string_type : 1, 
		_int_type : 2, 
		_float_type : 3, 
		_bicdecimal_type : 4, 
		_dete_type : 5, 
		_time_type : 6, 
		_datetime_type : 7, 
		_bolb_type : 8, 
		_variant_type : 9, 

		_typecodes : 
			{
			"1" : 1, 
			"2" : 2, 
			"3" : 3, 
			"4" : 4, 
			"5" : 5, 
			"6" : 6, 
			"7" : 7, 
			"8" : 8, 
			"9" : 9, 
			"string" : 1, 
			"int" : 2, 
			"float" : 3, 
			"double" : 3, 
			"decimal" : 3, 
			"bigdecimal" : 4, 
			"date" : 5, 
			"time" : 6, 
			"datetime" : 7, 
			"blob" : 8, 
			"variant" : 9
		}, 
		_typeint : 
			{
			"string" : 1, 
			"int" : 2, 
			"float" : 3, 
			"double" : 3, 
			"decimal" : 4, 
			"bigdecimal" : 4, 
			"date" : 5, 
			"time" : 6, 
			"datetime" : 7, 
			"blob" : 8, 
			"variant" : 9
		}, 

		_typenames : ["undefined", "STRING", "INT", "DOUBLE", "BIGDECIMAL", "DATE", "TIME", "DATETIME", "BLOB", "VARIANT"
		], 
		_default_sizes : [8, 32, 4, 8, 16, 6, 9, 17, 256, 0
		], 
		_default_values : [undefined, "", 0, 0.0, 0.0, null, null, null, null, null
		], 

		_boolean_values : 
			{
			"false" : false, 
			"False" : false, 
			"FALSE" : false, 
			"no" : false, 
			"No" : false, 
			"NO" : false, 
			"n" : false, 
			"N" : false, 
			"off" : false, 
			"Off" : false, 
			"OFF" : false, 
			"0" : false, 
			"true" : true, 
			"True" : true, 
			"TRUE" : true, 
			"yes" : true, 
			"Yes" : true, 
			"YES" : true, 
			"y" : true, 
			"Y" : true, 
			"on" : true, 
			"On" : true, 
			"ON" : true, 
			"1" : true
		}, 

		_init_date : new Date(0), 
		_max_milliseconds : 100000000 * 24 * 60 * 60 * 1000, 
		_min_milliseconds : -100000000 * 24 * 60 * 60 * 1000, 

		getDefaultValue : function (type) {
			return nexacro.DataUtils._default_values[type.toLowerCase()];
		}, 

		getDefaultSize : function (type) {
			return nexacro.DataUtils._default_sizes[type.toLowerCase()];
		}, 

		toTypeCode : function (type) {
			var n = nexacro.DataUtils._typeint[type.toLowerCase()];
			return (n == null) ? 0 : n;
		}, 

		toTypeName : function (type) {
			var n = nexacro.DataUtils._typenames[type];
			return (n == null) ? "undefined" : n;
		}, 

		findDataType : function (value) {
			if ((typeof value) == "object") {
				return (value instanceof Date) ? 7 : 0;
			}
			var n = nexacro.DataUtils._typenames[value];
			return (n == null) ? 0 : n;
		}, 

		isBinary : function (type) {
			return (type == 12);
		}, 

		toString : function (value) {
			if (value == null) {
				return value;
			}
			if (value instanceof Date) {
				return this._formatDateTime(value);
			}
			return value.toString();
		}, 

		toStringFromText : function (value) {
			return value;
		}, 

		toStringFromXMLText : function (value) {
			return nexacro._decodeXml(value);
		}, 

		toTextFromString : function (value) {
			return value;
		}, 

		toXMLTextFromString : function (value) {
			return nexacro._encodeXml(value);
		}, 

		toInt : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else {
				return (value | 0);
			}
		}, 

		toIntFromText : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else {
				return (value | 0);
			}
		}, 
		toTextFromInt : function (value) {
			return (value == null) ? undefined : value + "";
		}, 

		toBoolean : function (value) {
			if (typeof value == "string") {
				value = this._boolean_values[value];
			}
			return (value ? true : false);
		}, 
		toBooleanFromText : function (value) {
			value = this._boolean_values[value];
			return (value ? true : false);
		}, 
		toTextFromBoolean : function (value) {
			return (value == null) ? value : value + "";
		}, 

		toFloat : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else {
				return (+value);
			}
		}, 
		toFloatFromText : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else {
				return (+value);
			}
		}, 
		toTextFromFloat : function (value) {
			return (value == null) ? undefined : (value + "");
		}, 

		toNumber : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else {
				return (+value);
			}
		}, 
		toNumberFromText : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else {
				return (+value);
			}
		}, 
		toTextFromNumber : function (value) {
			return (value == null) ? undefined : (value + "");
		}, 

		toDecimal : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return "";
			}
			else if (value instanceof Date) {
				return new nexacro.Decimal(value.getTime());
			}
			return (isFinite(value)) ? new nexacro.Decimal(value) : "";
		}, 
		toDecimalFromText : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "" || isNaN(+value)) {
				return undefined;
			}
			else {
				return new nexacro.Decimal(value);
			}
		}, 
		toTextFromDecimal : function (value) {
			return (value == null) ? undefined : value.toString();
		}, 

		toDate : function (value) {
			if (value == null) {
				return undefined;
			}
			else if (value === "") {
				return "";
			}
			if ((typeof value) == "string") {
				return nexacro.DataUtils._parseDateTime(value, "DATE");
			}
			if (value instanceof Date) {
				return nexacro.DataUtils._datetimeToDate(value);
			}
			if ((typeof value) == "number" && nexacro.DataUtils._isValidTime(value)) {
				return nexacro.DataUtils._datetimeToDate(new Date(value));
			}
			if (value instanceof nexacro.Date) {
				return value;
			}
			return null;
		}, 
		toDateFromText : function (value) {
			if (value === undefined) {
				return undefined;
			}

			return (value == "") ? null : nexacro.DataUtils._parseDateTime(value, "DATE");
		}, 
		toTextFromDate : function (value) {
			return (value == null) ? null : nexacro.DataUtils._formatDate(value);
		}, 

		toTime : function (value) {
			if (value == null || value == "") {
				return null;
			}
			if ((typeof value) == "string") {
				return nexacro.DataUtils._parseDateTime(value, "TIME");
			}
			if (value instanceof Date) {
				return nexacro.DataUtils._datetimeToTime(value);
			}
			if ((typeof value) == "number" && nexacro.DataUtils._isValidTime(value)) {
				return nexacro.DataUtils._datetimeToTime(new Date(value));
			}
			if (value instanceof nexacro.Date) {
				return value;
			}
			return null;
		}, 
		toTimeFromText : function (value) {
			if (value === undefined) {
				return undefined;
			}

			return (value == "") ? null : nexacro.DataUtils._parseDateTime(value, "TIME");
		}, 
		toTextFromTime : function (value) {
			if (value === null) {
				return null;
			}
			if (value === undefined) {
				return undefined;
			}
			if (value == "") {
				return "";
			}
			return nexacro.DataUtils._formatTime(value);
		}, 

		toDateTime : function (value) {
			if (value == null) {
				return undefined;
			}
			if (value === "") {
				return "";
			}
			if ((typeof value) == "string") {
				if (isNaN(+value)) {
					return "";
				}
				return nexacro.DataUtils._parseDateTime(value, "DATETIME");
			}
			if (value instanceof Date) {
				return nexacro.DataUtils._datetimeToTime(value);
			}
			if ((typeof value) == "number" && nexacro.DataUtils._isValidTime(value)) {
				return nexacro.DataUtils._datetimeToTime(new Date(value));
			}
			if (value instanceof nexacro.Date) {
				return value;
			}
			return null;
		}, 
		toDateTimeFromText : function (value) {
			if (value === undefined) {
				return undefined;
			}

			return (value == "") ? null : nexacro.DataUtils._parseDateTime(value, "DATETIME");
		}, 
		toTextFromDateTime : function (value) {
			if (value === null) {
				return null;
			}
			if (value === undefined) {
				return undefined;
			}
			if (value == "") {
				return "";
			}
			return nexacro.DataUtils._formatDateTime(value);
		}, 

		toBlob : function (value) {
			return value;
		}, 
		toBlobFromText : function (value) {
			return value;
		}, 
		toTextFromBlob : function (value) {
			return value;
		}, 

		toVariant : function (value) {
			return value;
		}, 
		toVariantFromText : function (value) {
			return value;
		}, 
		toTextFromVariant : function (value) {
			return (value == null) ? value : (value + "");
		}, 

		convert : function (value, type) {
			switch (type) {
				case 1:
					return this.toString(value);
				case 2:
					return this.toInt(value);
				case 3:
					return this.toFloat(value);
				case 4:
					return this.toDecimal(value);
				case 5:
					return this.toDate(value);
				case 6:
					return this.toTime(value);
				case 7:
					return this.toDateTime(value);
				case 8:
					return this.toBlob(value);
				default:
					return this.toVariant(value);
			}
			return "";
		}, 

		_datetimeToDate : function (datetime) {
			datetime.setHours(0);
			datetime.setMinutes(0);
			datetime.setSeconds(0);
			datetime.setMilliseconds(0);
			return datetime;
		}, 

		_datetimeToTime : function (datetime) {
			datetime.setFullYear(0);
			datetime.setMonth(0);
			datetime.setDate(1);
			return datetime;
		}, 

		_parseDateTime : function (str, cType) {
			str = str.trim();
			cType = cType.toUpperCase();
			switch (cType) {
				case "DATETIME":
					var year = str.substring(0, 4);
					var month = str.substring(4, 6);
					var date = str.substring(6, 8);
					var hour = str.substring(8, 10);
					var minute = str.substring(10, 12);
					var second = str.substring(12, 14);
					var millisecond = str.substring(14, 17);
					return nexacro.DataUtils._toDateTime(year, month, date, hour, minute, second, millisecond);
				case "DATE":
					var year = str.substring(0, 4);
					var month = str.substring(4, 6);
					var date = str.substring(6, 8);
					return nexacro.DataUtils._toDate(year, month, date);
				case "TIME":
					var hour = str.substring(0, 2);
					var minute = str.substring(2, 4);
					var second = str.substring(4, 6);
					var millisecond = str.substring(6, 9);
					return nexacro.DataUtils._toTime(hour, minute, second, millisecond);
			}
			return "";
		}, 

		_formatDate : function (datetime) {
			if (!datetime) {
				return undefined;
			}
			return this._leftPad(datetime.getFullYear() * 10000 + (datetime.getMonth() + 1) * 100 + datetime.getDate(), 8);
		}, 
		_formatTime : function (datetime) {
			if (!datetime) {
				return undefined;
			}
			var millsecond = "";
			var ms = datetime.getMilliseconds();
			millsecond = this._leftPad(ms, 3);
			return this._leftPad(datetime.getHours() * 10000 + datetime.getMinutes() * 100 + datetime.getSeconds(), 6) + millsecond;
		}, 
		_formatDateTime : function (datetime) {
			if (isNaN(datetime)) {
				return undefined;
			}
			var yyyymmdd = this._leftPad(datetime.getFullYear() * 10000 + (datetime.getMonth() + 1) * 100 + datetime.getDate(), 8);
			var millsecond = "";
			var ms = datetime.getMilliseconds();
			millsecond = this._leftPad(ms, 3);
			var hhmiss = this._leftPad(datetime.getHours() * 10000 + datetime.getMinutes() * 100 + datetime.getSeconds(), 6) + millsecond;
			return yyyymmdd + hhmiss;
		}, 

		_toDate : function (year, month, date) {
			var val = new nexacro.Date(year, month - 1, date);
			return ((+val) != (+val)) ? undefined : val;
		}, 

		_toTime : function (hour, minute, second, millisecond) {
			var val = new nexacro.Date(0, 0, 1, hour, minute, second, millisecond);
			return ((+val) != (+val)) ? undefined : val;
		}, 

		_toDateTime : function (year, month, date, hour, minute, second, millisecond) {
			var val = new nexacro.Date(year, month - 1, date, hour, minute, second, millisecond);
			return ((+val) != (+val)) ? undefined : val;
		}, 

		_isValidTime : function (time) {
			return (time <= this._MAX_MILLISECONDS && time >= this._MIN_MILLISECONDS);
		}, 

		_leftPad : function (value, count) {
			value = value + "";
			var padcnt = count - value.length;
			switch (padcnt) {
				case 0:
					return value;
				case 1:
					return "0" + value;
				case 2:
					return "00" + value;
				case 3:
					return "000" + value;
				case 4:
					return "0000" + value;
				case 5:
					return "00000" + value;
			}
			return value;
		}
	};

	nexacro.ExprParser = function () {
		this.output = [];
		this._itemidx = -1;
		this._itempos = 0;
		this._prevtype = -1;
	};
	_pExprParser = nexacro._createPrototype(nexacro.Object, nexacro.ExprParser);
	nexacro.ExprParser.prototype = _pExprParser;

	_pExprParser.whitespace = nexacro._gen_arrmap("\n\r\t ".split(''));
	_pExprParser.wordchars = nexacro._gen_arrmap("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split(''));
	_pExprParser.punct = nexacro._gen_arrmap("+ - * / % & ++ -- = += -= *= /= %= == === != <> !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::".split(' '));
	_pExprParser.line_starters = nexacro._gen_arrmap("continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(','));

	_pExprParser.regexp_hanja = /[\u2E80-\u2EFF]|[\u31C0-\u31EF]|[\u3200-\u32FF]|[\u3400-\u4DBF]|[\u4E00-\u9FBF]|[\uF900-\uFAFF]/;
	_pExprParser.regexp_nipon = /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u31F0-\u31FF]/;
	_pExprParser.regexp_hangul = /[ㄱ-ㅎ]|[ㅏ-ㅣ]|[가-힣]/;
	_pExprParser.regexp_num = /^[0-9]+[Ee]$/;


	_pExprParser.is_ternary_op = function () {
		var level = 0, colon_count = 0;
		var output = this.output;
		var i = output.length - 1;
		function is_ternary_op_loop () {
			if (i >= 0) {
				switch (output[i]) {
					case ':':
						if (level === 0) {
							colon_count++;
						}
						break;
					case '?':
						if (level === 0) {
							if (colon_count === 0) {
								return true;
							}
							else {
								colon_count--;
							}
						}
						break;
					case '{':
						if (level === 0) {
							return false;
						}
						level--;
						break;
					case '(':
					case '[':
						level--;
						break;
					case ')':
					case ']':
					case '}':
						level++;
						break;
				}
				i--;
				return false;
			}
			return true;
		}
		while (true) {
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
			if (is_ternary_op_loop()) {
				break;
			}
		}
	};

	_pExprParser.append = function (text, type) {
		var output = this.output;
		var cnt = output.length;
		if (type == 2 && this._prevtype == 2) {
			output[cnt - 1].tok += text;
			return;
		}
		if (type == 10) {
			if (this._prevtype == 2) {
				output[cnt - 1].tok += text;
				return;
			}
			else if (cnt == 0) {
				output[cnt] = {
					type : 2, 
					tok : text, 
					pos : -1
				};
				this._prevtype = 1;
				return;
			}
		}
		else if (type == 4) {
			this._itempos = 0;
		}
		else if (type == 5 && this._prevtype == 0) {
			output[cnt - 1].type = 1;
			this._itempos = 0;
		}

		var tok_item = {
			type : type, 
			tok : text, 
			pos : this._itempos
		};

		output[cnt] = tok_item;

		if (type == 10 && this._prevtype == 0) {
			if (this._itempos >= 0) {
				this._itempos++;
			}
		}
		else if (type == 5 || type == 7 || type == 9) {
			this._itempos = 0;
		}
		else if (type == 6 || type == 8) {
			this._itempos = -1;
		}
		this._prevtype = type;
	};

	_pExprParser.tokenizeExpr = function (expr_str) {
		this.input = expr_str;
		var output = this.output;

		var last_word = "";
		var last_text = "";
		var prev_last_text = "";
		var last_type = -1;

		var src = expr_str + "";
		var src_len = src.length;
		var cur_pos = 0;
		if (cur_pos >= src_len) {
			return 0;
		}

		while (true) {
			if (cur_pos >= src_len) {
				return output.length;
			}

			var c;
			var tok = src.charAt(cur_pos);
			cur_pos++;

			while (tok in this.whitespace) {
				if (cur_pos >= src_len) {
					return output.length;
					;
				}
				tok = src.charAt(cur_pos);
				cur_pos++;
			}


			if (tok in this.wordchars || this.regexp_hangul.test(tok) || this.regexp_hanja.test(tok) || this.regexp_nipon.test(tok)) {
				if (cur_pos < src_len) {
					c = src.charAt(cur_pos);
					while (c in this.wordchars || this.regexp_hangul.test(c) || this.regexp_hanja.test(c) || this.regexp_nipon.test(c)) {
						tok += c;
						cur_pos++;
						if (cur_pos >= src_len) {
							break;
						}
						c = src.charAt(cur_pos);
					}
				}

				if (cur_pos < src_len && this.regexp_num.test(tok) && (c === '-' || c === '+')) {
					var sign = src.charAt(cur_pos);
					cur_pos += 1;
					this.parse_pos = cur_pos;
					c = src.charAt(cur_pos);

					while (c in this.wordchars || this.regexp_hangul.test(c) || this.regexp_hanja.test(c) || this.regexp_nipon.test(c)) {
						tok += c;
						cur_pos++;
						if (cur_pos >= src_len) {
							break;
						}
						c = src.charAt(cur_pos);
					}
					this.append(tok, 3);
					continue;
				}

				if (tok == 'in') {
					this.append(tok, 4);
				}
				else {
					var fval = parseFloat(tok);
					if (isFinite(fval)) {
						this.append(tok, 2);
					}
					else {
						this.append(tok, 0);
					}
				}
				continue;
			}
			if (tok == '(') {
				this.append(tok, 5);
				continue;
			}
			if (tok == ')') {
				this.append(tok, 6);
				continue;
			}
			if (tok == '[') {
				this.append(tok, 7);
				continue;
			}
			if (tok == ']') {
				this.append(tok, 8);
				continue;
			}
			if (tok == ',') {
				this.append(tok, 9);
				continue;
			}
			if (tok == '{') {
				this.append(tok, 10);
				continue;
			}
			if (tok == '}') {
				this.append(tok, 11);
				continue;
			}
			if (tok == ';') {
				this.append(tok, 12);
				continue;
			}

			if (tok == "'" || tok == '"') {
				while (cur_pos < src_len) {
					var sep = tok;
					var esc = false;
					c = src.charAt(cur_pos);
					tok += c;
					cur_pos++;
					while (esc || c != sep) {
						if (!esc) {
							esc = (c == '\\');
						}
						else {
							esc = false;
						}
						c = src.charAt(cur_pos);
						tok += c;
						cur_pos++;
						if (cur_pos >= src_len) {
							break;
						}
					}
					if (c == sep) {
						this.append(tok, 3);
						break;
					}
					return -1;
				}
				continue;
			}
			if (tok == '/') {
				c = src.charAt(cur_pos);
				if (c == '*') {
					tok += c;
					cur_pos++;
					while (cur_pos < src_len) {
						c = src.charAt(cur_pos);
						tok += c;
						cur_pos++;
						if (c == '*') {
							if (cur_pos >= src_len) {
								break;
							}
							c = src.charAt(cur_pos);
							tok += c;
							cur_pos++;
							if (c == '/') {
								continue;
							}
						}
					}
					return -1;
				}

				if (c == '/') {
					tok += c;
					cur_pos++;
					c = src.charAt(cur_pos);
					while (cur_pos < src_len) {
						c = src.charAt(cur_pos);
						if (c == "\r" || c == "\n") {
							cur_pos += 1;
							continue;
							;
						}
						tok += c;
						cur_pos++;
					}
					continue;
				}
				if (nexacro._indexOf([-1, 4, 5, 7, 9], output._prevtype) >= 0) {
					while (cur_pos < src_len) {
						var esc = false;
						var in_char_class = false;
						c = src.charAt(cur_pos);
						tok += c;
						cur_pos++;
						while (esc || in_char_class || c != '/') {
							if (!esc) {
								esc = (c == '\\');
								if (c == '[') {
									in_char_class = true;
								}
								else if (c == ']') {
									in_char_class = false;
								}
							}
							else {
								esc = false;
							}
							c = src.charAt(cur_pos);
							tok += c;
							cur_pos++;
						}
						if (c != '/') {
							return -1;
						}
						c = src.charAt(cur_pos);

						while (cur_pos < src_len && (c in this.wordchars || this.regexp_hangul.test(tok) || this.regexp_hanja.test(tok) || this.regexp_nipon.test(tok))) {
							tok += c;
							cur_pos++;
							c = src.charAt(cur_pos);
						}
						this.append(tok, 3);
						break;
					}
					continue;
				}
			}

			if (tok in this.punct) {
				while (cur_pos < src_len) {
					c = src.charAt(cur_pos);
					if ((tok + c) in this.punct) {
						tok += c;
						cur_pos++;
					}
					else {
						break;
					}
				}
				if (tok.charAt(0) == '=') {
					if (tok != '==' && tok != '===') {
						if (cur_pos >= src_len) {
							return -1;
						}
					}
				}
				this.append(tok, 4);
				continue;
			}

			if (tok == '.') {
				this.append(tok, 10);
				continue;
			}

			return -1;
		}
	};

	_pExprParser.makeSubExpr = function (ds, from, to) {
		var str = "";
		var output = this.output;
		var len = output.length;
		var colinfos = ds.colinfos;
		var constinfos = ds._constVars;

		var id;
		var i = from;
		function makeSubExpr_loop (pthis) {
			if (i < to) {
				var item = output[i];
				if (i != 0 && item.type == 4) {
					str += ' ';
					str += item.tok;
					str += ' ';
				}
				else {
					var new_name = "";
					if (item.type == 0 && item.pos == 0) {
						var id = item.tok;

						if ((colinfos != undefined && id in colinfos) || (constinfos != undefined && id in constinfos)) {
							if (i < (to - 1) && output[i + 1].type == 7) {
								var bcnt = 0;
								var j;
								for (j = i + 2; j < to; j++) {
									if (output[j].type == 7) {
										bcbt++;
									}
									if (output[j].type == 8) {
										if (bcnt == 0) {
											break;
										}
										else {
											bcnt--;
										}
									}
								}
								if (j < to && j > (i + 2)) {
									var substr = pthis.makeSubExpr(ds, i + 2, j);
									if (substr != null) {
										str += "dataset.getColumn(" + substr + ", '" + id + "')";
										i = j;
									}
									else {
										return undefined;
									}
								}
								else {
									return undefined;
								}
							}
							else {
								str += "dataset.getColumn(rowidx, '" + id + "')";
							}
						}
						else if (id == "new") {
							str += id + " ";
						}
						else {
							str += id;
						}
					}
					else {
						str += item.tok;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
			if (makeSubExpr_loop(this)) {
				break;
			}
		}
		return str;
	};


	_pExprParser.makeExpr = function (ds, expr_str) {
		var ret = this.tokenizeExpr(expr_str);
		var str = this.makeSubExpr(ds, 0, this.output.length);
		return str;
	};

	_pExprParser.makeSubEval = function (ds, from, to) {
		var str = "";
		var output = this.output;
		var len = output.length;
		var id;
		var i = from;

		function makeSubEval_loop () {
			if (i < to) {
				var item = output[i];
				if (i != 0 && item.type == 4) {
					str += ' ';
					str += item.tok;
					str += ' ';
				}
				else {
					var new_name = "";
					if (item.type == 0 && item.pos == 0) {
						var id = item.tok;

						if (id == "var") {
						}
						else {
							str += id;
						}
					}
					else if (item.type == 1 && item.pos == 0) {
						var id = item.tok;
						str += id;
					}
					else {
						str += item.tok;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
			if (makeSubEval_loop()) {
				break;
			}
		}

		return str;
	};

	_pExprParser.makeEval = function (ds, expr_str) {
		var ret = this.tokenizeExpr(expr_str);
		var str = this.makeSubEval(ds, 0, this.output.length);
		return str;
	};
	delete _pExprParser;


	nexacro.VariableList = function () {
		nexacro.Collection.call(this);
	};
	var _pVariableList = nexacro._createPrototype(nexacro.Collection, nexacro.VariableList);
	nexacro.VariableList.prototype = _pVariableList;
	_pVariableList._type_name = "VariableList";

	_pVariableList._updateID = function (idx, newID) {
		var colinfo = this[idx];
		if (colinfo != newID) {
			colinfo = newID;
			this[idx] = colinfo;
		}
		return this.update_id(idx, newID);
	};

	_pVariableList.deleteItem = function (id) {
		return this.delete_item(id);
	};

	delete _pVariableList;

	nexacro.DSColumnInfo = function (id, strtype, type, size, prop, sumtext, idx) {
		this.id = id;
		this.name = id;
		this.type = strtype;
		this.ntype = type;
		this.size = size;
		this.prop = prop;
		this.sumtext = sumtext;
		this._index = idx;

		switch (type) {
			case 1:
				this._toText = nexacro.DataUtils.toTextFromString;
				this._fromText = nexacro.DataUtils.toStringFromText;
				this._fromVal = nexacro.DataUtils.toString;
				this._toXMLText = nexacro.DataUtils.toXMLTextFromString;
				this._fromXMLText = nexacro.DataUtils.toStringFromXMLText;
				break;
			case 2:
				this._toText = nexacro.DataUtils.toTextFromInt;
				this._fromText = nexacro.DataUtils.toIntFromText;
				this._fromVal = nexacro.DataUtils.toInt;
				this._toXMLText = nexacro.DataUtils.toTextFromInt;
				this._fromXMLText = nexacro.DataUtils.toIntFromText;
				break;
			case 3:
				this._toText = nexacro.DataUtils.toTextFromFloat;
				this._fromText = nexacro.DataUtils.toFloatFromText;
				this._fromVal = nexacro.DataUtils.toFloat;
				this._toXMLText = nexacro.DataUtils.toTextFromFloat;
				this._fromXMLText = nexacro.DataUtils.toFloatFromText;
				break;
			case 4:
				this._toText = nexacro.DataUtils.toTextFromDecimal;
				this._fromText = nexacro.DataUtils.toDecimalFromText;
				this._fromVal = nexacro.DataUtils.toDecimal;
				this._toXMLText = nexacro.DataUtils.toTextFromDecimal;
				this._fromXMLText = nexacro.DataUtils.toDecimalFromText;
				break;
			case 5:
				this._toText = nexacro.DataUtils.toTextFromDate;
				this._fromText = nexacro.DataUtils.toDateFromText;
				this._fromVal = nexacro.DataUtils.toDate;
				this._toXMLText = nexacro.DataUtils.toTextFromDate;
				this._fromXMLText = nexacro.DataUtils.toDateFromText;
				break;
			case 6:
				this._toText = nexacro.DataUtils.toTextFromTime;
				this._fromText = nexacro.DataUtils.toTimeFromText;
				this._fromVal = nexacro.DataUtils.toTime;
				this._toXMLText = nexacro.DataUtils.toTextFromTime;
				this._fromXMLText = nexacro.DataUtils.toTimeFromText;
				break;
			case 7:
				this._toText = nexacro.DataUtils.toTextFromDateTime;
				this._fromText = nexacro.DataUtils.toDateTimeFromText;
				this._fromVal = nexacro.DataUtils.toDateTime;
				this._toXMLText = nexacro.DataUtils.toTextFromDateTime;
				this._fromXMLText = nexacro.DataUtils.toDateTimeFromText;
				break;
			case 8:
				this._toText = nexacro.DataUtils.toTextFromBlob;
				this._fromText = nexacro.DataUtils.toBlobFromText;
				this._fromVal = nexacro.DataUtils.toBlob;
				this._toXMLText = nexacro.DataUtils.toTextFromBlob;
				this._fromXMLText = nexacro.DataUtils.toBlobFromText;
				break;
			default:
				this._toText = nexacro.DataUtils.toTextFromvariant;
				this._fromText = nexacro.DataUtils.toVariantFromText;
				this._fromVal = nexacro.DataUtils.toVariant;
				this._toXMLText = nexacro.DataUtils.toTextFromvariant;
				this._fromXMLText = nexacro.DataUtils.toVariantFromText;
				break;
		}
	};

	var _pDSColumnInfo = nexacro._createPrototype(nexacro.Object, nexacro.DSColumnInfo);
	nexacro.DSColumnInfo.prototype = _pDSColumnInfo;
	_pDSColumnInfo._type_name = "DSColumnInfo";

	_pDSColumnInfo.set_size = function (v) {
		v = parseInt(v) | 0;
		if (this.size != v) {
			if (!((+v) != (+v))) {
				this.size = v;
			}
		}
	};

	_pDSColumnInfo.set_type = function (v) {
		v = nexacro._toString(v);
		if (this.type != v) {
			this.type = v;
			this.ntype = nexacro.DataUtils._typeint[v.toLowerCase()];
		}
	};

	_pDSColumnInfo.set_prop = function (v) {
		v = nexacro._toString(v);
		if (this.prop != v) {
			this.prop = v;
		}
	};

	_pDSColumnInfo.set_sumtext = function (v) {
		v = nexacro._toString(v);
		if (this.sumtext != v) {
			this.sumtext = v;
		}
	};

	delete _pDSColumnInfo;

	nexacro.DSColumnInfoList = function () {
		nexacro.Collection.apply(this);
	};
	var _pDSColumnInfoList = nexacro._createPrototype(nexacro.Collection, nexacro.DSColumnInfoList);
	nexacro.DSColumnInfoList.prototype = _pDSColumnInfoList;
	_pDSColumnInfoList._type_name = "DSColumnInfoList";

	_pDSColumnInfoList._updateID = function (idx, newID) {
		var colinfo = this[idx];
		if (colinfo.id != newID) {
			colinfo.set_id(newID);
			this[idx] = colinfo;
		}
		return this.update_id(idx, newID);
	};

	_pDSColumnInfoList.deleteItem = function (id) {
		return this.delete_item(id);
	};
	delete _pDSColumnInfoList;

	nexacro.DSColChangeEventInfo = function (obj, id, row, col, colidx, columnid, oldvalue, newvalue) {
		this.id = this.eventid = id || "oncolumnchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.row = row;
		this.col = col;
		this.colidx = colidx;
		this.columnid = columnid;
		this.oldvalue = oldvalue;
		this.newvalue = newvalue;
	};
	var _pDSColChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DSColChangeEventInfo);
	nexacro.DSColChangeEventInfo.prototype = _pDSColChangeEventInfo;
	_pDSColChangeEventInfo._type_name = "DSColChangeEventInfo";

	delete _pDSColChangeEventInfo;


	nexacro.DSLoadEventInfo = function (obj, id, errorcode, errormsg, reason) {
		this.id = this.eventid = id || "onload";
		this.fromobject = this.fromreferenceobject = obj;

		this.errorcode = errorcode;
		this.errormsg = errormsg;
		this.reason = reason;
	};
	var _pDSLoadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DSLoadEventInfo);
	nexacro.DSLoadEventInfo.prototype = _pDSLoadEventInfo;
	_pDSLoadEventInfo._type_name = "DSLoadEventInfo";

	delete _pDSLoadEventInfo;

	nexacro.DSRowPosChangeEventInfo = function (obj, id, oldRow, newRow, reason) {
		this.id = this.eventid = id || "onrowposchanged";
		this.fromobject = this.fromreferenceobject = obj;
		this.newrow = newRow;
		this.oldrow = oldRow;
		this.reason = reason;
	};
	var _pDSRowPosChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DSRowPosChangeEventInfo);
	nexacro.DSRowPosChangeEventInfo.prototype = _pDSRowPosChangeEventInfo;
	_pDSRowPosChangeEventInfo._type_name = "DSRowPosChangeEventInfo";

	delete _pDSRowPosChangeEventInfo;

	nexacro.DSRowsetChangeEventInfo = function (obj, id, row, count, reason) {
		this.id = this.eventid = id || "onrowsetchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.row = row;
		this.count = count;
		this.reason = reason;
	};
	var _pDSRowsetChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DSRowsetChangeEventInfo);
	nexacro.DSRowsetChangeEventInfo.prototype = _pDSRowsetChangeEventInfo;
	_pDSRowsetChangeEventInfo._type_name = "DSRowsetChangeEventInfo";

	delete _pDSRowsetChangeEventInfo;

	nexacro.Dataset = function (id, parent) {
		this.id = this.name = id;
		if (parent) {
			this.parent = parent;
		}

		this.colinfos = new nexacro.DSColumnInfoList();
		this.colcount = 0;
		this.constcount = 0;
		this.rowcount = 0;
		this.rowposition = -1;

		this.loadstatus = false;
		this.enableevent = true;

		this.updatecontrol = true;
		this.keystring = "";

		this.filterstr = "";

		this.loadkeymode = "keep";
		this.loadfiltermode = "keep";
		this.reversesubsum = false;
		this.arguments = "";

		this.firefirstcount = 0;
		this.firenextcount = 0;
		this.useclientlayout = false;

		this._event_list = {
			"onload" : 1, 
			"cancolumnchange" : 1, 
			"oncolumnchanged" : 1, 
			"onvaluechanged" : 1, 
			"canrowposchange" : 1, 
			"onrowposchanged" : 1, 
			"onrowsetchanged" : 1
		};


		this._constVars = new nexacro.VariableList();
		this._constVars2 = new nexacro.VariableList();
		this._rawRecords = [];
		this._viewRecords = this._rawRecords;
		this._deletedRecords = [];
		this._onworkcompleted = new nexacro.EventListener("onworkcompleted");

		this._keycols = [];
		this._keycols.max_keylevel = 0;

		this._exprFuncs = {
		};

		this._defaultKeyStr = "";
		this._defaultFilterStr = "";
		this._eventstat = true;
		this._deleteRows = [];
	};

	var _pDataset = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Dataset);
	nexacro.Dataset.prototype = _pDataset;
	_pDataset._type_name = "Dataset";
	_pDataset._isData = true;

	nexacro.Dataset.LOADMODE_KEEP = 0;
	nexacro.Dataset.LOADMODE_RESET = 1;

	nexacro.Dataset._LOADMODE_ENUM = 
		{
		"keep" : 0, 
		"reset" : 1
	};

	_pDataset.on_created = function () {
	};

	_pDataset.destroy = function () {
		if (this.colinfos) {
			this.colinfos.clear();
			delete this.colinfos;
			this.colinfos = null;
		}

		if (this._constVars) {
			this._constVars.clear();
			delete this._constVars;
			this._constVars = null;
		}

		if (this._constVars2) {
			this._constVars2.clear();
			delete this._constVars2;
			this._constVars2 = null;
		}

		if (this._onworkcompleted) {
			this._onworkcompleted._clearAll();
			delete this._onworkcompleted;
			this._onworkcompleted = null;
		}

		this._rawRecords = null;
		this._viewRecords = null;
		this._deletedRecords = null;
		this._keycols = null;
		this._deleteRows = null;

		this._event_list = null;
		this._exprFuncs = null;

		nexacro.EventSinkObject.prototype.destroy.call(this);
	};

	_pDataset.set_name = function (v) {
		this.id = this.name = v;
	};

	_pDataset.set_enableevent = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enableevent != v) {
			this.enableevent = v;
			this._eventstat = (v && !this.loadstatus);
			if (v) {
				this.on_fire_onrowsetchanged(-1, -1, 41);
				if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
					var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
					this.on_fire_onvaluechanged(evt);
				}
			}
		}
	};

	_pDataset.set_updatecontrol = function (v) {
		this.updatecontrol = nexacro._toBoolean(v);
	};

	_pDataset.set_rowposition = function (v) {
		v = parseInt(v, 10) | 0;
		if (isFinite(v)) {
			this._setRowPosition(v);
		}
		return this.rowposition;
	};

	_pDataset.colinfos = null;

	_pDataset.set_keystring = function (v) {
		v = v ? v.toString() : "";

		this.keystring = v;
		this.on_apply_keystring();

		return this.keystring;
	};

	_pDataset.on_apply_keystring = function () {
		this.updateSortGroup(this.keystring, true);
	};

	_pDataset.set_filterstr = function (v) {
		var str = v.toString();

		if (str != this.filterstr) {
			this.filter(str);
		}
		return this.filterstr;
	};

	_pDataset.set_loadkeymode = function (v) {
		if (this.loadkeymode != v) {
			this.loadkeymode = v;
		}
	};

	_pDataset.set_loadfiltermode = function (v) {
		if (this.loadfiltermode != v) {
			this.loadfiltermode = v;
		}
	};

	_pDataset.set_reversesubsum = function (v) {
		v = nexacro._toBoolean(v);
		if (this.reversesubsum != v) {
			this.reversesubsum = v;
			this.on_apply_reversesubsum();
		}
	};

	_pDataset.on_apply_reversesubsum = function () {
		if (this.keystring) {
			this.updateSortGroup(this.keystring);
		}
	};

	_pDataset.set_useclientlayout = function (v) {
		if (v == false || v == 0 || v == "false") {
			this.useclientlayout = false;
		}
		else {
			this.useclientlayout = true;
		}
	};

	_pDataset.on_fire_onload = function (errcode, errmsg, reason) {
		var event = this.onload;
		if (event && event._has_handlers) {
			var evt = new nexacro.DSLoadEventInfo(this, "onload", errcode, errmsg, reason);
			event._fireEvent(this, evt);
		}
	};

	_pDataset.on_fire_onrowsetchanged = function (row, count, reason) {
		var event = this.onrowsetchanged;
		if (event && event._has_handlers) {
			var evt = new nexacro.DSRowsetChangeEventInfo(this, "onrowsetchanged", row, count, reason);
			event._fireEvent(this, evt);
		}
	};

	_pDataset.on_fire_canrowposchange = function (evt) {
		var event = this.canrowposchange;
		if (event && event._has_handlers) {
			evt.eventid = "canrowposchange";
			var ret = event._fireCheckEvent(this, evt);
			if (ret === undefined) {
				ret = true;
			}

			ret = nexacro._toBoolean(ret);

			if (ret) {
				this.rowposition = evt.newrow;
			}
			return ret;
		}
		return true;
	};

	_pDataset.on_fire_onrowposchanged = function (evt) {
		var event = this.onrowposchanged;
		if (event && event._has_handlers) {
			evt.eventid = "onrowposchanged";
			event._fireEvent(this, evt);
		}
	};

	_pDataset.on_fire_cancolumnchange = function (evt) {
		var event = this.cancolumnchange;
		if (event && event._has_handlers) {
			if (!event._firestat) {
				evt.eventid = "cancolumnchange";
				event._firestat = true;
				var ret = event._fireCheckEvent(this, evt);
				event._firestat = false;
				return (ret == undefined) ? true : ret;
			}
			else if (event._firestat) {
			}
			else {
				return false;
			}
		}
		return true;
	};

	_pDataset.on_fire_oncolumnchanged = function (evt) {
		var event = this.oncolumnchanged;
		if (event && event._has_handlers) {
			if (!event._firestat) {
				event._firestat = true;
				evt.eventid = "oncolumnchanged";
				event._fireEvent(this, evt);
				event._firestat = false;
			}
			else {
				evt.eventid = "oncolumnchanged";
				event._fireEvent(this, evt, true);
			}
		}
	};

	_pDataset.on_fire_onvaluechanged = function (evt) {
		var event = this.onvaluechanged;
		if (event && event._has_handlers) {
			evt.eventid = "onvaluechanged";
			event._fireEvent(this, evt);
		}
	};

	_pDataset.clear = function () {
		var oldpos = this.rowposition;
		var _count = this.rowcount;
		this._clearAll();

		if (this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 24);
			if (oldpos >= 0 && oldpos == this.rowposition) {
				this._forcesetRowPosition(-1, 51);
			}
		}
		else {
			this.rowposition = -1;
		}
		return _count;
	};

	_pDataset.getColCount = function () {
		return this.colcount;
	};

	_pDataset.getConstCount = function () {
		return this._constVars.length;
	};

	_pDataset.getRowCount = function () {
		return this._viewRecords.length;
	};

	_pDataset.getDeletedRowCount = function () {
		return this._deletedRecords.length;
	};

	_pDataset.getDeletedRowset = function () {
		return this._deletedRecords;
	};

	_pDataset.addConstColumn = function (id, value) {
		var idx = this._addConstColumn(id, value);
		if (idx >= 0 && this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 34);
		}
		return idx;
	};

	_pDataset.addColumn = function (id, type, size) {
		var idx = this._addColumn(id, type, size);
		if (idx >= 0) {
			this._clearAllExprs();
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(-1, -1, 34);
			}
		}
		return idx;
	};

	_pDataset.addColumnInfo = function (id, colinfo) {
		var idx = this._addColumnInfo(id, colinfo);
		if (idx >= 0) {
			this._clearAllExprs();
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(-1, -1, 34);
			}
		}
		return idx;
	};

	_pDataset.appendColList = function (collist) {
		var cnt = this._appendColList(collist);
		if (cnt > 0) {
			this._clearAllExprs();
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(-1, -1, 34);
			}
		}
		return cnt;
	};

	_pDataset.deleteColumn = function (id) {
		var deleted = this._deleteColumn(id);
		if (deleted) {
			this._clearAllExprs();
			var ColCnt = this._constVars.length + this.colinfos.length;
			var oldRowPos = this.rowposition;
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(-1, -1, 34);
				if (ColCnt == 0 && oldRowPos >= 0) {
					this._forcesetRowPosition(-1, 51);
				}
			}
			else if (ColCnt == 0 && oldRowPos >= 0) {
				this.rowposition = -1;
			}
		}
		return deleted;
	};

	_pDataset.getColID = function (idx) {
		if ((+idx) != (+idx)) {
			idx = 0;
		}

		if (idx >= this.colinfos.length) {
			return this._constVars.get_id(idx - this.colinfos.length);
		}
		else {
			return this.colinfos.get_id(idx);
		}
	};

	_pDataset.getConstColID = function (idx) {
		if ((+idx) != (+idx)) {
			idx = 0;
		}
		return this._constVars.get_id(idx);
	};

	_pDataset.getColumnInfo = function (idx) {
		if (typeof (idx) == "string") {
			if (this.colinfos.indexOf(idx) > -1) {
				return this.colinfos[idx];
			}
		}
		else {
			if ((+idx) != (+idx) || idx == undefined) {
				idx = 0;
			}
			return (this.colinfos[idx] == undefined) ? null : this.colinfos[idx];
		}
		return null;
	};

	_pDataset.updateColID = function (idx, newID) {
		if (typeof (idx) == "string") {
			if (this.colinfos.indexOf(idx) > -1) {
				idx = this.colinfos.indexOf(idx);
			}
			else if (this._constVars.indexOf(idx) > -1) {
				return this.updateConstColID(idx, newID);
			}
			else {
				return -1;
			}
		}
		else {
			if ((+idx) != (+idx) || idx == undefined) {
				idx = 0;
			}
			if (!this.colinfos[idx]) {
				var constCol = idx - this.colinfos.length;
				if (this._constVars[constCol]) {
					return this.updateConstColID(constCol, newID);
				}
				else {
					return -1;
				}
			}
		}

		var updated = this.colinfos._updateID(idx, newID);
		if (updated && this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 34);
			var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
			this.on_fire_onvaluechanged(evt);
			return idx;
		}
		return -1;
	};

	_pDataset.updateConstColID = function (idx, newID) {
		if (typeof (idx) == "string") {
			if (this._constVars.indexOf(idx) > -1) {
				idx = this._constVars.indexOf(idx);
			}
			else {
				return -1;
			}
		}
		else {
			if ((+idx) != (+idx) || idx == undefined) {
				idx = 0;
			}
			if (!this._constVars[idx]) {
				return -1;
			}
		}

		var updated = this._constVars._updateID(idx, newID);
		if (updated && this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 34);
			var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
			this.on_fire_onvaluechanged(evt);
			return idx;
		}
		return -1;
	};

	_pDataset.addRow = function () {
		if (this.colinfos.length <= 0) {
			return -1;
		}
		var rtype = this.updatecontrol ? 2 : 1;
		var idx = this._appendRow(rtype);
		if (idx >= 0) {
			var oldpos = this.rowposition;
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(idx, 1, 12);
			}

			if (oldpos == this.rowposition) {
				this._setRowPosition(idx, undefined, 51);
			}
		}
		return idx;
	};

	_pDataset.insertRow = function (row) {
		if (row < 0) {
			return row;
		}
		var rtype = this.updatecontrol ? 2 : 1;
		var idx = this._insertRow(row, rtype);
		if (idx >= 0 && this._eventstat) {
			var oldpos = this.rowposition;
			this.on_fire_onrowsetchanged(idx, 1, 12);

			if (oldpos == this.rowposition) {
				this._setRowPosition(idx, undefined, 51, true);
			}
		}
		return idx;
	};

	_pDataset.deleteRow = function (row) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return false;
			}
		}

		var idx = this._deleteRow(row);
		if (idx >= 0) {
			if (this._eventstat) {
				var oldpos = this.rowposition;

				this.on_fire_onrowsetchanged(idx, 1, 20);
				var setpos = this.rowposition;

				if (oldpos == setpos) {
					if (setpos > idx) {
						this._setRowPosition(setpos - 1, undefined, 52);
					}
					else if (setpos == idx) {
						if (this.rowcount == 0) {
							this._forcesetRowPosition(-1, 51);
						}
						else {
							if (setpos == this.rowcount) {
								this._forcesetRowPosition(this.rowcount - 1, 51);
							}
							else {
								this._setRowPosition(setpos, undefined, 53, true);
							}
						}
					}
				}
			}
			else {
				var oldpos = this.rowposition;
				var setpos = this.rowposition;

				if (setpos > idx) {
					this.rowposition = setpos - 1;
				}
				else if (setpos == idx) {
					if (this.rowcount == 0) {
						this.rowposition = -1;
					}
					else {
						if (setpos == this.rowcount) {
							this.rowposition = this.rowcount - 1;
						}
					}
				}
			}
		}

		return idx >= 0 ? true : false;
	};

	_pDataset.moveRow = function (oldrow, newrow) {
		if ((+oldrow) != (+oldrow)) {
			oldrow = 0;
		}
		else {
			if (oldrow < 0 || oldrow >= this.rowcount) {
				return -1;
			}
		}

		if ((+newrow) != (+newrow)) {
			newrow = 0;
		}
		else {
			if (newrow < 0) {
				return -1;
			}
		}

		var idx = this._moveRow(oldrow, newrow);
		if (idx >= 0 && this._eventstat) {
			var oldpos = this.rowposition;
			var from, cnt;
			if (oldrow > newrow) {
				from = newrow;
				cnt = (oldrow - newrow + 1);
			}
			else {
				from = oldrow;
				cnt = (newrow - oldrow + 1);
			}
			this.on_fire_onrowsetchanged(from, cnt, 32);

			if (oldpos == this.rowposition) {
				if (oldpos == oldrow) {
					this._setRowPosition(newrow, undefined, 52);
				}
				else if (oldrow > newrow && oldpos >= newrow && oldpos < oldrow) {
					this._setRowPosition(oldpos + 1, undefined, 52);
				}
				else if (oldrow < newrow && oldpos > oldrow && oldpos < newrow) {
					this._setRowPosition(oldpos - 1, undefined, 52);
				}
			}
		}
		return idx;
	};

	_pDataset.exchangeRow = function (row1, row2) {
		if ((+row1) != (+row1)) {
			row1 = 0;
		}
		else {
			if (row1 < 0 || row1 >= this.rowcount) {
				return false;
			}
		}

		if ((+row2) != (+row2)) {
			row2 = 0;
		}
		else {
			if (row2 < 0 || row2 >= this.rowcount) {
				return false;
			}
		}

		if (this._exchangeRow(row1, row2) && this._eventstat) {
			var oldpos = this.rowposition;
			this.on_fire_onrowsetchanged(row1, 1, 33);
			this.on_fire_onrowsetchanged(row2, 1, 33);

			if (oldpos == this.rowposition) {
				if (oldpos == row1) {
					this._setRowPosition(row2, undefined, 52);
				}
				else if (oldpos == row2) {
					this._setRowPosition(row1, undefined, 52);
				}
			}
			return true;
		}
		return false;
	};

	_pDataset.deleteAll = function () {
		var oldpos = this.rowposition;
		var cnt = this._deleteAll();
		if (cnt > 0 && this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 22);

			if (oldpos == this.rowposition) {
				this._forcesetRowPosition(-1, 51);
			}
		}
		return cnt;
	};

	_pDataset.clearData = function () {
		var oldpos = this.rowposition;
		var cnt = this._clearData();
		if (cnt > 0 && this._eventstat) {
			this.on_fire_onrowsetchanged(-1, -1, 23);

			if (oldpos >= 0 && oldpos == this.rowposition) {
				this._forcesetRowPosition(-1, 51);
			}
		}
		else {
			this.rowposition = -1;
		}
		return cnt;
	};

	_pDataset.deleteMultiRows = function (del_rows) {
		if (typeof (del_rows) != "object") {
			return 0;
		}

		var oldpos = this.rowposition;
		var newrowData = this._viewRecords[oldpos];
		del_rows.sort(function (l, r) {
			return l - r;
		});

		var cnt = this._deleteMultiRows(del_rows);
		if (cnt > 0) {
			this.rowcount -= cnt;
			var oldIdx = -1;
			if (newrowData != null) {
				oldIdx = nexacro._indexOf(this._viewRecords, newrowData);
			}
			if (this._eventstat) {
				this._deleteRows = del_rows;
				this.on_fire_onrowsetchanged(-1, cnt, 20);

				if (oldpos == this.rowposition) {
					if (oldpos > oldIdx) {
						if (this.rowcount <= 0) {
							this._forcesetRowPosition(-1, 51);
						}
						else if (oldIdx == -1) {
							if (oldpos < this.rowcount) {
								this._setRowPosition(oldpos, undefined, 53);
								if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
									var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
									this.on_fire_onvaluechanged(evt);
								}
							}
							else {
								this._forcesetRowPosition(-1, 51);
							}
						}
						else {
							this._setRowPosition(oldIdx, undefined, 52);
						}
					}
				}
			}
			else {
				this.rowposition = oldIdx;
			}
		}
		return cnt;
	};

	_pDataset.filterRow = function (row) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return;
			}
		}
		var oldpos = this.rowposition;
		var flag = this._filterRow(row);
		if (flag) {
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(row, 1, 31);

				if (oldpos == this.rowposition) {
					if (oldpos > row) {
						this._setRowPosition(oldpos - 1, undefined, 52);
					}
					else if (oldpos == row) {
						if (this.rowcount == 0) {
							this._forcesetRowPosition(-1, 51);
						}
						else {
							if (oldpos == this.rowcount) {
								this._forcesetRowPosition(this.rowcount - 1, 51);
							}
							else {
								this._setRowPosition(oldpos, undefined, 53);
							}
						}
					}
				}
			}
			else {
				if (oldpos > row) {
					this.rowposition = (oldpos - 1);
				}
				else if (oldpos == row) {
					if (oldpos > this.rowcount) {
						oldpos = this.rowcount - 1;
					}
					this.rowposition = oldpos;
				}
			}
		}
	};

	_pDataset.getRowType = function (row) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return 0;
			}
		}

		var view = this._viewRecords;
		return view[row]._rtype;
	};

	_pDataset.getRowLevel = function (row) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return 0;
			}
		}
		var view = this._viewRecords;
		return view[row]._level;
	};

	_pDataset.getGroupRangeStart = function (row) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return -1;
			}
		}
		var view = this._viewRecords;
		if (view[row]._rtype == 16) {
			return view[row]._grpstart;
		}
		else {
			return row;
		}
	};

	_pDataset.getGroupRangeCount = function (row) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return 0;
			}
		}
		var view = this._viewRecords;
		if (view[row]._rtype == 16) {
			return view[row]._grpend - view[row]._grpstart;
		}
		else {
			return 1;
		}
	};

	_pDataset.setRowType = function (row, type) {
		if ((+row) != (+row)) {
			row = 0;
		}
		else {
			if (row < 0 || row >= this.rowcount) {
				return false;
			}
		}

		var view = this._viewRecords;
		if (type == null || this.updatecontrol == true) {
			return false;
		}

		var newtype = -1;
		switch (type) {
			case 0:
			case 1:
			case 2:
			case 4:
			case 8:
			case 16:
				newtype = type;
				break;
			default:
				switch (type.toString().toUpperCase()) {
					case 'E':
						newtype = 0;
						break;
					case 'I':
						newtype = 2;
						break;
					case 'U':
						newtype = 4;
						break;
					case 'D':
						newtype = 8;
						break;
					case 'G':
						newtype = 16;
						break;
					default:
						newtype = 1;
						break;
				}
		}

		if (newtype == -1) {
			return false;
		}

		if (view[row]._rtype != newtype) {
			if (view[row]._rtype == 4) {
				if (view[row]._orgrow) {
					delete view[row]["_orgrow"];
				}
			}

			if (newtype == 4) {
				var orgrowData = [];
				var cnt = view[row].length;
				for (var i = 0; i < cnt; i++) {
					orgrowData[i] = view[row][i];
				}
				view[row]._orgrow = orgrowData;
			}
		}

		view[row]._rtype = newtype;
		if (this.enableevent) {
			this.on_fire_onrowsetchanged(row, 1, 40);
		}
		return true;
	};

	_pDataset.getConstColumn = function (id) {
		if (typeof (id) == "string") {
			if (this._constVars.indexOf(id) > -1) {
				return this._constVars.get_item(id);
			}
		}
		else {
			if ((+id) != (+id) || id == undefined) {
				id = 0;
			}
			return this._constVars.get_item(id);
		}
	};

	_pDataset.getColumn = function (row, col) {
		if ((+row) != (+row)) {
			row = 0;
		}

		var nrow = row;
		var colinfo;

		if (typeof (col) != "string") {
			if ((+col) != (+col) || col == undefined) {
				col = 0;
			}
			colinfo = this.colinfos[col];
			if (colinfo == null) {
				if (typeof (col) == "number") {
					col -= this.colinfos.length;
				}
				return this._constVars[col];
			}
		}
		else {
			if (this.colinfos.indexOf(col) > -1) {
				colinfo = this.colinfos[col];
			}
			else if (this._constVars.indexOf(col) > -1) {
				return this._constVars[col];
			}
			else {
				return;
			}
		}

		var rowData = this._viewRecords[nrow];
		if (rowData == null) {
			return undefined;
		}

		var rtnVal = rowData[colinfo._index];
		if ((colinfo.type == "datetime" || colinfo.type == "DATETIME") && rtnVal) {
			return rtnVal;
		}

		return rowData[colinfo._index];
	};

	_pDataset.getColumnSet = function (row, col, pivotidx) {
		return null;
	};

	_pDataset.getOrgColumn = function (row, col) {
		if ((+row) != (+row)) {
			row = 0;
		}

		if (typeof (col) == "string") {
			if (this.colinfos.indexOf(col) > -1) {
			}
			else if (this._constVars.indexOf(col) > -1) {
				return this._constVars[col];
			}
			else {
				return;
			}
		}
		else {
			if ((+col) != (+col) || col == undefined) {
				col = 0;
			}
		}
		var colinfo = this.colinfos[col];

		if (colinfo == undefined) {
			return;
		}

		var rowData = this._viewRecords[row];
		if (rowData == null) {
			return undefined;
		}
		return rowData._orgrow ? rowData._orgrow[colinfo._index] : rowData[colinfo._index];
	};

	_pDataset.getDeletedColumn = function (row, col) {
		row = parseInt(row, 10) | 0;
		if ((+row) != (+row)) {
			row = 0;
		}

		if (row < 0 || row >= this._deletedRecords.length) {
			return undefined;
		}

		row += 1;
		var i;
		var len = this._rawRecords.length;
		var rowData;
		for (i = 0; i < len && row > 0; i++) {
			if (this._rawRecords[i]._rtype == 8) {
				rowData = this._rawRecords[i];
				row--;
			}
		}

		if (typeof (col) == "string") {
			if (this.colinfos.indexOf(col) > -1) {
				col = this.colinfos.indexOf(col);
			}
			else {
				return;
			}
		}
		else {
			if ((+col) != (+col) || col == undefined) {
				col = 0;
			}
		}

		if (rowData == null) {
			return undefined;
		}
		return rowData[col];
	};

	_pDataset.setConstColumn = function (id, value) {
		var varList = this._constVars;
		var idx;
		var conidx = varList.indexOf(id);
		if (typeof (id) == "string") {
			if (conidx < 0 || conidx == undefined) {
				return false;
			}
			else {
				idx = conidx;
			}
		}
		else {
			if ((+id) != (+id) || id == undefined) {
				id = 0;
			}
			if (id < 0 || id >= varList.length) {
				return false;
			}
			else {
				idx = id;
			}
		}

		if (this._eventstat && ((this.cancolumnchange && this.cancolumnchange._has_handlers) || (this.oncolumnchanged && this.oncolumnchanged._has_handlers) || (this.onvaluechanged && this.onvaluechanged._has_handlers))) {
			var oldVal = varList[idx];
			if (value == oldVal) {
				return false;
			}
			var colid = varList.get_id(idx);
			var evt = new nexacro.DSColChangeEventInfo(this, "cancolumnchange", -1, idx + this.colinfos.length, -1, colid, oldVal, value);

			if (this.on_fire_cancolumnchange(evt)) {
				value = evt.newvalue;
				if (value != oldVal) {
					varList.set_item(idx, value);
					this.on_fire_oncolumnchanged(evt);
					this.on_fire_onvaluechanged(evt);
					return true;
				}
			}
			return false;
		}
		else {
			varList.set_item(idx, value);
			return true;
		}
	};

	_pDataset.setColumn = function (row, col, value) {
		return this._setColumn(row, col, value, null);
	};

	_pDataset._setColumn = function (row, col, value, fail) {
		var nrow = row;
		if ((+nrow) != (+nrow)) {
			nrow = 0;
		}
		else {
			if (nrow < 0 || nrow >= this.rowcount) {
				return false;
			}
		}

		if (typeof (col) == "string") {
			if (this.colinfos.indexOf(col) > -1) {
				col = this.colinfos.indexOf(col);
			}
			else if (this._constVars.indexOf(col) > -1) {
				return this.setConstColumn(col, value);
			}
			else {
				return false;
			}
		}
		else {
			if ((+col) != (+col) || col == undefined) {
				col = 0;
			}
			if (!this.colinfos[col]) {
				var constCol = col - this.colinfos.length;
				if (this._constVars[constCol]) {
					return this.setConstColumn(constCol, value);
				}
				else {
					return false;
				}
			}
		}
		var colinfo = this.colinfos[col];
		colinfo._index = col;
		var rowData = this._viewRecords[nrow];
		if (rowData != null) {
			if (this._eventstat && ((this.cancolumnchange && this.cancolumnchange._has_handlers) || (this.oncolumnchanged && this.oncolumnchanged._has_handlers) || (this.onvaluechanged && this.onvaluechanged._has_handlers))) {
				var oldVal = rowData[colinfo._index];
				var fromval = colinfo._fromVal(value);
				var coltype = this._getColumnType(col);

				if (oldVal === fromval) {
					return false;
				}

				if (coltype >= 4 && coltype <= 7) {
					if (coltype == 4) {
						if (fromval && oldVal && oldVal.hi == fromval.hi && oldVal.lo == fromval.lo) {
							return false;
						}
					}
					else {
						if (fromval && oldVal && oldVal.getTime() == fromval.getTime()) {
							return false;
						}
					}
				}

				var evt = new nexacro.DSColChangeEventInfo(this, "cancolumnchange", nrow, colinfo._index, -1, colinfo.id, oldVal, fromval);

				if (this.on_fire_cancolumnchange(evt)) {
					fromval = colinfo._fromVal(evt.newvalue);
					if (this._updateColumn(nrow, rowData, colinfo._index, fromval)) {
						evt.newvalue = fromval;
						this.on_fire_oncolumnchanged(evt);
						this.on_fire_onvaluechanged(evt);
						return true;
					}
				}
				else {
					if (fail) {
						fail.status = "cancolumnchange";
					}
				}
			}
			else {
				fromval = colinfo._fromVal(value);
				this._updateColumn(nrow, rowData, colinfo._index, fromval);
				return true;
			}
		}
		return false;
	};

	_pDataset.copyRow = function (torow, srcds, fromrow, strcolinfo) {
		if (srcds == null) {
			return false;
		}

		if ((+torow) != (+torow)) {
			torow = 0;
		}
		if ((+fromrow) != (+fromrow)) {
			fromrow = 0;
		}

		if (torow < 0 || torow >= this.rowcount) {
			return false;
		}
		if (srcds._type_name != "Dataset") {
			return false;
		}
		if (fromrow < 0 || fromrow >= srcds.rowcount) {
			return false;
		}

		var srcinfos = srcds.colinfos;
		var destinfos = this.colinfos;
		var destData = this._viewRecords[torow];
		if (strcolinfo != null && strcolinfo.length > 0) {
			var cols = strcolinfo == "" ? destinfos : strcolinfo.split(',');
			var len = cols.length;
			var i = 0;
			function copyRow_loop (pthis) {
				if (i < len) {
					var colids = cols[i].split('=');
					var cLen = colids.length;
					for (var j = 0; j < cLen; j++) {
						colids[j] = colids[j].trim();
					}

					var src_colId, dst_colId;
					if (cLen == 2) {
						src_colId = colids[1];
						dst_colId = colids[0];

						var src_idx = srcinfos.indexOf(src_colId);
						var dst_idx = destinfos.indexOf(dst_colId);
						if (src_idx >= 0 && dst_idx >= 0) {
							var value = destinfos[dst_idx]._fromVal(srcds.getColumn(fromrow, src_idx));
							pthis._updateColumn(torow, destData, dst_idx, value);
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
				if (copyRow_loop(this)) {
					break;
				}
			}
		}
		else {
			var srcData = srcds._viewRecords[fromrow];
			var len = srcinfos.length;
			var i = 0;
			function copyRow_loop2 (pthis) {
				if (i < len) {
					var srcinfo = srcinfos[i];
					var idx = destinfos.indexOf(srcinfo.id);
					if (idx != null) {
						var value = destinfos[idx]._fromVal(srcData[srcinfo._index]);
						pthis._updateColumn(torow, destData, idx, value);
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
				if (copyRow_loop2(this)) {
					break;
				}
			}
		}

		if (this._eventstat && ((this.oncolumnchanged && this.oncolumnchanged._has_handlers) || (this.onvaluechanged && this.onvaluechanged._has_handlers))) {
			var evt = new nexacro.DSColChangeEventInfo(this, "oncolumnchanged", torow, -1, -1, "", undefined, "");
			this.on_fire_oncolumnchanged(evt);
			this.on_fire_onvaluechanged(evt);
		}
		return true;
	};

	_pDataset.filter = function (strkey) {
		if (strkey != null) {
			var str = strkey.toString();
			this.filterstr = str;
			this._filterFn = null;
			if (!this.loadstatus && this._rawRecords.length > 0) {
				var view = this._viewRecords;
				var oldpos = this.rowposition;
				var oldrowdata = view[oldpos];

				this._reFilter();
				this._resetSortGroup();
				var newpos = nexacro._indexOf(this._viewRecords, oldrowdata);

				if (this._eventstat) {
					this.on_fire_onrowsetchanged(-1, -1, 31);
					if (oldpos == this.rowposition) {
						if (this.rowcount) {
							if (newpos == -1) {
								this._forcesetRowPosition(-1, 51);
							}
							else if (oldpos >= 0 && oldpos != newpos) {
								this._setRowPosition(newpos, undefined, 52);
							}
							else {
								this._forcesetRowPosition(newpos, 51);
							}
						}
						else {
							this._forcesetRowPosition(-1, 51);
						}
					}
				}
				else {
					this.rowposition = newpos;
				}
			}
			else if (!this.loadstatus) {
				this._defaultFilterStr = str;
			}
			return true;
		}
		return false;
	};

	_pDataset.updateSortGroup = function (strkey, apply_method) {
		var retn = true;
		if (arguments.length < 2) {
			if (strkey) {
				strkey = strkey.toString();
				this.keystring = strkey;
			}
			else {
				if (!this.keystring) {
					retn = false;
				}
			}
		}
		else {
			if (!apply_method) {
				retn = false;
			}
		}

		if (retn) {
			var isReset = false;
			if (this.keystring == "" || this.keystring == "S:" || this.keystring == "G:") {
				isReset = true;
			}

			if (this.keystring && !isReset) {
				var view = this._viewRecords;
				var oldpos = this.rowposition;
				var oldrowdata = view[oldpos];

				this._clearKeyCols();

				if (!this.loadstatus && this._rawRecords.length > 0) {
					this._resetSortGroup();
				}
			}
			else {
				this._deleteAllGroupData();

				var view = this._viewRecords;
				var oldpos = this.rowposition;
				var oldrowdata = view[oldpos];

				this._clearKeyCols();
				if (!this.loadstatus && this._rawRecords.length > 0) {
					this._viewRecords = this._rawRecords;
					this._reFilter();
				}
			}

			var newpos = nexacro._indexOf(this._viewRecords, oldrowdata);
			if (this.enableevent) {
				this.on_fire_onrowsetchanged(-1, -1, 30);
				if (oldpos == this.rowposition) {
					if (oldpos >= 0 && oldpos != newpos) {
						this._setRowPosition(newpos, undefined, 52);
					}
				}
			}
			else {
				this.rowposition = newpos;
			}
		}
		return retn;
	};

	_pDataset.copyData = function (srcds, isFiltered) {
		if (!srcds || srcds._type_name != "Dataset") {
			return -1;
		}

		isFiltered = nexacro._toBoolean(isFiltered);

		var oldpos = this.rowposition;

		var bFilter = (this.filterstr != null && this.filterstr != "") ? true : false;
		var bResetSort = (this.keystring == "" || this.keystring == "S:" || this.keystring == "G:") ? true : false;


		this._clearAll();
		this._copyData(srcds, isFiltered);

		var bFireSort = !this.loadstatus && this._rawRecords.length > 0;
		var bFireFilter = !this.loadstatus && this._rawRecords.length > 0;
		this._eventstat = !this.loadstatus && this.enableevent;

		if (bFilter) {
			var str = this.filterstr.toString();
			this.filterstr = str;
			this._filterFn = null;
		}

		if (bResetSort) {
			this._deleteAllGroupData();
			this._clearKeyCols();

			if (bFireFilter && bFireSort) {
				this._viewRecords = this._rawRecords;
			}
		}

		if (bFireFilter && bFireSort) {
			this._reFilter();
			this._resetSortGroup();
		}

		if (this._eventstat) {
			this.on_fire_onrowsetchanged(-1, this.rowcount, 11);
		}

		if (oldpos == this.rowposition) {
			if (this.rowcount > 0) {
				if (oldpos != 0) {
					this._setRowPosition(0, undefined, 51);
				}
				else if (this.id != srcds.id) {
					this.rowposition = -1;
					this._setRowPosition(oldpos, undefined, 53);
				}
				else {
					if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
						var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", 0, -1, -1, "", undefined, undefined);
						this.on_fire_onvaluechanged(evt);
					}
				}
			}
			else if (oldpos > -1) {
				this._forcesetRowPosition(-1, 51);
			}
		}
		this.loadstatus = false;
		this._eventstat = this.enableevent;

		return this.rowcount;
	};

	_pDataset.mergeData = function (srcds) {
		if (!srcds || srcds._type_name != "Dataset") {
			return -1;
		}

		var cnt = 0;

		if (srcds._rawRecords.length > 0) {
			var oldloadstatus = this.loadstatus;
			this.loadstatus = true;
			this._eventstat = !this.loadstatus && this.enableevent;

			cnt = this._mergeData(srcds);

			this.loadstatus = oldloadstatus;
			this._eventstat = !this.loadstatus && this.enableevent;
			var oldpos = this.rowposition;
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(-1, cnt, 13);
			}

			if (oldpos == this.rowposition && oldpos == -1 && cnt > 0) {
				this._setRowPosition(0, undefined, 51);
			}
			this.loadstatus = false;
			this._eventstat = this.enableevent;
		}

		return this.rowcount;
	};

	_pDataset.appendData = function (srcds, chkcol, bupdateconst) {
		if (!srcds || srcds._type_name != "Dataset") {
			return -1;
		}

		if (srcds._viewRecords.length > 0) {
			var oldloadstatus = this.loadstatus;
			this.loadstatus = true;
			this._eventstat = !this.loadstatus && this.enableevent;

			this._appendData(srcds, chkcol, bupdateconst);

			this.loadstatus = oldloadstatus;
			this._eventstat = !this.loadstatus && this.enableevent;
			var oldpos = this.rowposition;
			if (this._eventstat) {
				this.on_fire_onrowsetchanged(-1, this.rowcount, 12);
			}

			if (oldpos == this.rowposition && oldpos == -1 && this.rowcount > 0) {
				this._setRowPosition(0, undefined, 51);
			}

			this.loadstatus = false;
			this._eventstat = this.enableevent;

			return this.rowcount;
		}

		return 0;
	};

	_pDataset.loadFromDOM = function (doc, bClear) {
		if (bClear == null) {
			bClear = true;
		}
		bClear = nexacro._toBoolean(bClear);

		if (doc != null) {
			this._bWorkingstatus = true;

			var dsDOM;
			if (doc.nodeName == "Dataset") {
				dsDOM = doc;
			}
			else {
				var datasets = doc.getElementsByTagName("Dataset");
				dsDOM = datasets[0];
			}

			var curIdx = 0;
			if (bClear && this.firefirstcount > 0) {
				curIdx = this._loadFromDOM(dsDOM, curIdx, this.firefirstcount, this.useclientlayout, bClear);
				if (this.firefirstcount == this.rowcount) {
					this._reFilter();
					this._resetSortGroup();
					this.on_fire_onload(0, "", 1);
					this._forcesetRowPosition(0, 51);
					this.rowposition = 0;

					curIdx = this._loadFromDOM(dsDOM, curIdx, -1, this.useclientlayout, false);
				}
			}
			else {
				curIdx = this._loadFromDOM(dsDOM, curIdx, -1, this.useclientlayout, bClear);
			}

			if (this.colinfos) {
				this._reFilter();
				this._resetSortGroup();
			}

			if (this._eventstat) {
				this.on_fire_onload(0, "", bClear ? 0 : 12);
				if (this._viewRecords && this._viewRecords.length > 0) {
					this._forcesetRowPosition(0, 51);
				}
				else {
					this._forcesetRowPosition(-1, 51);
				}
			}
			else if (this._viewRecords && this._viewRecords.length > 0) {
				this.rowposition = 0;
			}

			this._bWorkingstatus = false;

			return this.rowcount;
		}
	};

	_pDataset.loadFromXMLStr = function (xmlStr, bClear) {
		if (bClear == null) {
			bClear = true;
		}
		bClear = nexacro._toBoolean(bClear);
		this._bWorkingstatus = true;

		if (xmlStr) {
			this._bWorkingstatus = true;

			if (bClear && this.firefirstcount > 0) {
				var xml_parse_pos = this._loadFromXMLStr(xmlStr, 0, this.firefirstcount, this.useclientlayout, bClear);
				if (this.firefirstcount == this.rowcount) {
					this._reFilter();
					this._resetSortGroup();
					this.on_fire_onload(0, "", 1);
					this._forcesetRowPosition(0, 51);
					this.rowposition = 0;

					xml_parse_pos = this._loadFromXMLStr(xmlStr, xml_parse_pos, -1, this.useclientlayout, false);
				}
			}
			else {
				xml_parse_pos = this._loadFromXMLStr(xmlStr, 0, -1, this.useclientlayout, bClear);
			}

			if (this.colinfos) {
				this._reFilter();
				this._resetSortGroup();
			}

			if (this._eventstat) {
				this.on_fire_onload(0, "", bClear ? 0 : 12);
				if (this._viewRecords && this._viewRecords.length > 0) {
					this._forcesetRowPosition(0, 51);
				}
				else {
					this._forcesetRowPosition(-1, 51);
				}
			}
			else if (this._viewRecords && this._viewRecords.length > 0) {
				this.rowposition = 0;
			}

			this._bWorkingstatus = false;

			return this.rowcount;
		}
	};

	_pDataset.loadXML = function (strxml, bClear) {
		return this.loadFromXMLStr(strxml, bClear);
	};

	_pDataset.loadFromPPXArray = function (ppxLine, lineCnt, curIdx, bClear) {
		if (bClear == null) {
			bClear = true;
		}
		bClear = nexacro._toBoolean(bClear);

		if (ppxLine) {
			this._bWorkingstatus = true;

			while (ppxLine[curIdx].charAt(0) != "D") {
				curIdx++;
			}

			if (curIdx < lineCnt) {
				curIdx++;
				var ppxColLines = this._getColLinesFromPPXLines(ppxLine, curIdx);
				curIdx += ppxColLines.length;
				if (bClear && this.firefirstcount > 0) {
					curIdx = this._loadFromPPXArray(ppxColLines, ppxLine, curIdx, this.firefirstcount, this.useclientlayout, bClear);
					if (this.firefirstcount == this.rowcount) {
						this._reFilter();
						this._resetSortGroup();
						this.on_fire_onload(0, "", 1);
						this._forcesetRowPosition(0, 51);
						this.rowposition = 0;

						curIdx = this._loadFromPPXArray(ppxColLines, ppxLine, curIdx, -1, this.useclientlayout, false);
					}
				}
				else {
					curIdx = this._loadFromPPXArray(ppxColLines, ppxLine, curIdx, -1, this.useclientlayout, bClear);
				}

				if (this.colinfos) {
					this._reFilter();
					this._resetSortGroup();
				}

				if (this._eventstat) {
					this.on_fire_onload(0, "", bClear ? 0 : 12);
					if (this._viewRecords && this._viewRecords.length > 0) {
						this._forcesetRowPosition(0, 51);
					}
					else {
						this._forcesetRowPosition(-1, 51);
					}
				}
				else if (this._viewRecords && this._viewRecords.length > 0) {
					this.rowposition = 0;
				}
			}

			this._bWorkingstatus = false;

			return curIdx;
		}
	};


	_pDataset._saveXML = function (id, type, depth, bUseOrgColStrings) {
		if (!depth) {
			depth = 0;
		}
		var saveId = (id ? id : this.id);

		var saveType = "N";
		switch (type) {
			case "A":
			case "a":
			case "all":
			case "All":
				saveType = "A";
				break;
			case "U":
			case "u":
			case "update":
			case "Update":
				saveType = "U";
				break;
			case "N":
			case "n":
			case "normal":
			case "Normal":
				saveType = "N";
				break;
			case "V":
			case "v":
			case "view":
			case "View":
				saveType = "V";
				break;
		}

		var i;
		var n;
		var list = [];

		this.__writeXMLData(list, "<Dataset id=\"" + saveId + "\">", depth++);

		if (this._constVars.length + this.colinfos.length) {
			this.__writeXMLData(list, "<ColumnInfo>", depth++);
			n = this._constVars.length;
			i = 0;
			function saveXML_constcol_loop (pthis) {
				if (i < n) {
					var colId = pthis._constVars.get_id(i);
					var colVal = pthis._constVars[i];
					var tempVal = pthis._constVars2[i];
					if (colVal) {
						pthis.__writeXMLData(list, "<ConstColumn id=\"" + colId + "\"" + (tempVal ? tempVal : "") + " value=\"" + colVal + "\" />", depth);
					}
					else {
						pthis.__writeXMLData(list, "<ConstColumn id=\"" + colId + "\"" + (tempVal ? tempVal : "") + " />", depth);
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
				if (saveXML_constcol_loop(this)) {
					break;
				}
			}

			n = this.colinfos.length;
			i = 0;
			function saveXML_colinfo_loop (pthis) {
				if (i < n) {
					var colinfo = pthis.colinfos[i];
					var colId = colinfo.id;
					var colType = colinfo.type ? colinfo.type : nexacro.DataUtils.toTypeName(colinfo.ntype);
					var colSize = colinfo.size;
					var colProp = colinfo.prop;

					if (colProp == "NONE" || colProp == null || (typeof colProp) == "number" || colProp == "") {
						pthis.__writeXMLData(list, "<Column id=\"" + colId + "\" type=\"" + colType + "\" size=\"" + colSize + "\"  />", depth);
					}
					else {
						pthis.__writeXMLData(list, "<Column id=\"" + colId + "\" type=\"" + colType + "\" size=\"" + colSize + "\" prop=\"" + colProp.toLowerCase() + "\" />", depth);
					}

					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
				if (saveXML_colinfo_loop(this)) {
					break;
				}
			}
			this.__writeXMLData(list, "</ColumnInfo>", --depth);
		}
		else {
			this.__writeXMLData(list, "<ColumnInfo />", depth);
		}

		n = 0;
		var rawRecords = this._rawRecords;
		if (rawRecords) {
			n = rawRecords.length;
		}
		var viewRec = this._viewRecords;
		var viewcount = viewRec ? viewRec.length : 0;
		if (n) {
			this.__writeXMLData(list, "<Rows>", depth++);
			var rowData;
			if (saveType == "A") {
				i = 0;
				function saveXML_row_loop1 (pthis) {
					if (i < n) {
						rowData = rawRecords[i];
						if (rowData._rtype == 1 || rowData._rtype == 2 || rowData._rtype == 4 || rowData._rtype == 8) {
							pthis.__writeXMLCrudRow(list, rowData, depth, bUseOrgColStrings);
						}
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
					if (saveXML_row_loop1(this)) {
						break;
					}
				}
			}
			else if (saveType == "U") {
				i = 0;
				function saveXML_row_loop2 (pthis) {
					if (i < n) {
						rowData = rawRecords[i];
						if (rowData._rtype == 2 || rowData._rtype == 4 || rowData._rtype == 8) {
							pthis.__writeXMLCrudRow(list, rowData, depth, bUseOrgColStrings);
						}
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
					if (saveXML_row_loop2(this)) {
						break;
					}
				}
			}
			else if (saveType == "V") {
				i = 0;
				function saveXML_row_loop4 (pthis) {
					if (i < viewcount) {
						rowData = viewRec[i];
						pthis.__writeXMLNormalRow(list, rowData, depth, bUseOrgColStrings);
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
					if (saveXML_row_loop4(this)) {
						break;
					}
				}
			}
			else {
				i = 0;
				function saveXML_row_loop3 (pthis) {
					if (i < n) {
						rowData = rawRecords[i];
						if (rowData._rtype == 1 || rowData._rtype == 2 || rowData._rtype == 4) {
							pthis.__writeXMLNormalRow(list, rowData, depth, bUseOrgColStrings);
						}
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
					if (saveXML_row_loop3(this)) {
						break;
					}
				}
			}
			this.__writeXMLData(list, "</Rows>", --depth);
		}
		else {
			this.__writeXMLData(list, "<Rows>", depth);
			this.__writeXMLData(list, "</Rows>", depth);
		}

		this.__writeXMLData(list, "</Dataset>", --depth);

		return list.join("\n");
	};

	_pDataset.saveXML = function (id, type, depth) {
		return this._saveXML(id, type, depth, true);
	};

	_pDataset.loadFromSSVArray = function (ssvLine, lineCnt, curIdx, bClear) {
		if (bClear == null) {
			bClear = true;
		}
		bClear = nexacro._toBoolean(bClear);

		if (ssvLine) {
			this._bWorkingstatus = true;

			while (ssvLine[curIdx].substring(0, 7) != "Dataset") {
				curIdx++;
			}

			if (curIdx < lineCnt) {
				curIdx++;
				var ssvColLines = this._getColLinesFromSSVLines(ssvLine, curIdx);
				curIdx += ssvColLines.length;
				if (bClear && this.firefirstcount > 0) {
					curIdx = this._loadFromSSVArray(ssvColLines, ssvLine, curIdx, this.firefirstcount, this.useclientlayout, bClear);
					if (this.firefirstcount == this.rowcount) {
						this._reFilter();
						this._resetSortGroup();
						this.on_fire_onload(0, "", 1);
						this._forcesetRowPosition(0, 51);
						this.rowposition = 0;

						curIdx = this._loadFromSSVArray(ssvColLines, ssvLine, curIdx, -1, this.useclientlayout, false);
					}
				}
				else {
					curIdx = this._loadFromSSVArray(ssvColLines, ssvLine, curIdx, -1, this.useclientlayout, bClear);
				}

				if (this.colinfos) {
					this._reFilter();
					this._resetSortGroup();
				}

				if (this._eventstat) {
					this.on_fire_onload(0, "", bClear ? 0 : 12);
					if (this._viewRecords && this._viewRecords.length > 0) {
						this._forcesetRowPosition(0, 51);
					}
				}
				else if (this._viewRecords && this._viewRecords.length > 0) {
					this.rowposition = 0;
				}
			}

			this._bWorkingstatus = false;

			return curIdx;
		}
	};

	_pDataset.loadSSV = function (strssv, bClear) {
		var _rs_ = String.fromCharCode(30);
		if (strssv) {
			var ssvLine = strssv.split(_rs_);
			if (ssvLine.length) {
				this.loadFromSSVArray(ssvLine, ssvLine.length, 0, bClear);
			}
		}
		return this.rowcount;
	};

	_pDataset.saveSSV = function (id, type) {
		var _rs_ = String.fromCharCode(30);
		var _cs_ = String.fromCharCode(31);

		var saveId = this.id;
		if (id && id.length > 0) {
			saveId = id;
		}

		var saveType = "N";
		switch (type) {
			case "A":
			case "a":
			case "all":
			case "All":
				saveType = "A";
				break;
			case "U":
			case "u":
			case "update":
			case "Update":
				saveType = "U";
				break;
		}

		var i;
		var n;
		var list = [];

		this.__writeData(list, "Dataset:" + saveId + _rs_);

		n = this._constVars.length;
		if (n > 0) {
			i = 0;
			this.__writeData(list, "_Const_" + _cs_);
			function saveSSV_constcol_loop (pthis) {
				if (i < n) {
					var colId = pthis._constVars.get_id(i);
					var colVal = pthis._constVars[i];
					if (colVal) {
						if (i == (n - 1)) {
							pthis.__writeData(list, _cs_ + colId + "=" + colVal + _rs_);
						}
						else {
							pthis.__writeData(list, _cs_ + colId + "=" + colVal + _cs_);
						}
					}
					else {
						if (i == (n - 1)) {
							pthis.__writeData(list, _cs_ + colId + "=" + _rs_);
						}
						else {
							pthis.__writeData(list, _cs_ + colId + "=" + _cs_);
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
				if (saveSSV_constcol_loop(this)) {
					break;
				}
			}
		}

		n = this.colinfos.length;
		if (n > 0) {
			this.__writeData(list, "_RowType_" + _cs_);
			i = 0;
			function saveSSV_colinfo_loop (pthis) {
				if (i < n) {
					var colinfo = pthis.colinfos[i];
					var colId = colinfo.id;
					var colType = colinfo.type ? colinfo.type : nexacro.DataUtils.toTypeName(colinfo.ntype);
					var colSize = colinfo.size;

					if (colSize) {
						if (i == (n - 1)) {
							pthis.__writeData(list, colId + ":" + colType + "(" + colSize + ")" + _rs_);
						}
						else {
							pthis.__writeData(list, colId + ":" + colType + "(" + colSize + ")" + _cs_);
						}
					}
					else {
						if (i == (n - 1)) {
							pthis.__writeData(list, colId + ":" + colType + _rs_);
						}
						else {
							pthis.__writeData(list, colId + ":" + colType + _cs_);
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
			}
		}
		else {
			this.__writeData(list, "_RowType_" + _rs_);
		}

		n = 0;
		var rawRecords = this._rawRecords;
		if (rawRecords) {
			n = rawRecords.length;
		}

		if (n) {
			var rowData;
			if (saveType == "A") {
				i = 0;
				function saveSSV_row_loop1 (pthis) {
					if (i < n) {
						rowData = rawRecords[i];
						if (rowData._rtype == 1 || rowData._rtype == 2 || rowData._rtype == 4 || rowData._rtype == 8) {
							pthis.__writeSSVCrudRow(list, rowData);
						}
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
					if (saveSSV_row_loop1(this)) {
						break;
					}
				}
			}
			else if (saveType == "U") {
				i = 0;
				function saveSSV_row_loop2 (pthis) {
					if (i < n) {
						rowData = rawRecords[i];
						if (rowData._rtype == 2 || rowData._rtype == 4 || rowData._rtype == 8) {
							pthis.__writeSSVCrudRow(list, rowData);
						}
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
					if (saveSSV_row_loop2(this)) {
						break;
					}
				}
			}
			else {
				i = 0;
				function saveSSV_row_loop3 (pthis) {
					if (i < n) {
						rowData = rawRecords[i];
						if (rowData._rtype == 1 || rowData._rtype == 2 || rowData._rtype == 4) {
							pthis.__writeSSVNormalRow(list, rowData);
						}
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
					if (saveSSV_row_loop3(this)) {
						break;
					}
				}
			}
		}
		list.push(_rs_);
		return list.join("");
	};

	_pDataset.loadFromCSVArray = function (csvLine, lineCnt, curIdx, bClear) {
		if (bClear == null) {
			bClear = true;
		}
		bClear = nexacro._toBoolean(bClear);

		if (csvLine) {
			this._bWorkingstatus = true;

			while (csvLine[curIdx].substring(0, 7) != "Dataset") {
				curIdx++;
			}

			if (curIdx < lineCnt) {
				curIdx++;
				var csvColLine = csvLine[curIdx++];
				if (bClear && this.firefirstcount > 0) {
					curIdx = this._loadFromCSVArray(csvColLine, csvLine, curIdx, this.firefirstcount, this.useclientlayout, bClear);

					if (this.firefirstcount == this.rowcount) {
						this._reFilter();
						this._resetSortGroup();
						this.on_fire_onload(0, "", 1);
						this._forcesetRowPosition(0, 51);
						this.rowposition = 0;

						curIdx = this._loadFromCSVArray(csvColLine, csvLine, curIdx, -1, this.useclientlayout, false);
					}
				}
				else {
					curIdx = this._loadFromCSVArray(csvColLine, csvLine, curIdx, -1, this.useclientlayout, bClear);
				}

				if (this.colinfos) {
					this._reFilter();
					this._resetSortGroup();
				}

				if (this._eventstat) {
					this.on_fire_onload(0, "", bClear ? 0 : 12);
					if (this._viewRecords && this._viewRecords.length > 0) {
						this._forcesetRowPosition(0, 51);
					}
				}
				else if (this._viewRecords && this._viewRecords.length > 0) {
					this.rowposition = 0;
				}
			}

			this._bWorkingstatus = false;

			return curIdx;
		}
	};

	_pDataset.loadCSV = function (strcsv, bClear) {
		if (strcsv) {
			var csvLine = strcsv.split(/\r\n|\n/);
			if (csvLine.length) {
				this.loadFromCSVArray(csvLine, csvLine.length, 0, bClear);
			}
		}
		return this.rowcount;
	};

	_pDataset.saveCSV = function (id) {
		var saveId = this.id;
		if (id && id.length > 0) {
			saveId = id;
		}

		var i;
		var n;
		var list = [];

		this.__writeData(list, "Dataset:" + saveId + "\r\n");

		n = this.colinfos.length;
		if (n > 0) {
			i = 0;
			function saveSSV_colinfo_loop (pthis) {
				if (i < n) {
					var colinfo = pthis.colinfos[i];
					var colId = colinfo.id;
					var colType = colinfo.type ? colinfo.type : nexacro.DataUtils.toTypeName(colinfo.ntype);
					var colSize = colinfo.size;

					if (colSize) {
						if (i == (n - 1)) {
							pthis.__writeData(list, colId + ":" + colType + "(" + colSize + ")\r\n");
						}
						else {
							pthis.__writeData(list, colId + ":" + colType + "(" + colSize + "),");
						}
					}
					else {
						if (i == (n - 1)) {
							pthis.__writeData(list, colId + ":" + colType + "\r\n");
						}
						else {
							pthis.__writeData(list, colId + ":" + colType + ",");
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
				if (saveSSV_colinfo_loop(this)) {
					break;
				}
			}
		}
		else {
			this.__writeData(list, "\r\n");
		}

		n = 0;
		var rawRecords = this._rawRecords;
		if (rawRecords) {
			n = rawRecords.length;
		}

		if (n) {
			var rowData;
			i = 0;
			function saveCSV_row_loop (pthis) {
				if (i < n) {
					rowData = rawRecords[i];
					if (rowData._rtype == 1 || rowData._rtype == 2 || rowData._rtype == 4) {
						pthis.__writeCSVRowData(list, rowData);
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
				if (saveCSV_row_loop(this)) {
					break;
				}
			}
		}
		list.push("\r\n");
		return list.join("");
	};


	_pDataset.loadBIN = function (binData) {
		if (binData) {
			var ssvdata = nexacro._convertDatasetBINToSSV(binData);
			if (ssvdata) {
				return this.loadSSV(ssvdata);
			}
		}
		return this.rowcount;
	};

	_pDataset.saveBIN = function (id, strSaveType) {
		var ssvdata = this.saveSSV(id, strSaveType);
		if (ssvdata) {
			return nexacro._convertDatasetSSVToBIN(ssvdata);
		}
		return ssvdata;
	};

	_pDataset.applyChange = function () {
		var rawDatas = this._rawRecords;
		var len = rawDatas.length;
		var i = len - 1;
		function applyChange_loop () {
			if (i >= 0) {
				var rowData = rawDatas[i];
				if (rowData._rtype == 0 || rowData._rtype == 8) {
					rawDatas.splice(i, 1);
				}
				else {
					rowData._rtype = 1;
					if (rowData._orgrow) {
						delete rowData["_orgrow"];
					}
				}
				i--;
				return false;
			}
			return true;
		}
		while (true) {
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
			if (applyChange_loop()) {
				break;
			}
		}
		this._deletedRecords = [];

		if (this.enableevent) {
			this.on_fire_onrowsetchanged(-1, len, 40);
		}
	};

	_pDataset.reset = function () {
		this.loadstatus = true;
		this._eventstat = !this.loadstatus && this.enableevent;

		var oldpos = this.rowposition;

		var rawDatas = this._rawRecords;
		var len = rawDatas.length;
		var i = len - 1;
		function reset_loop () {
			if (i >= 0) {
				var rowData = rawDatas[i];
				if (rowData._rtype == 0 || rowData._rtype == 2) {
					rawDatas.splice(i, 1);
				}
				else if (rowData._rtype == 4) {
					rowData._rtype = 1;
					if (rowData._orgrow) {
						var cnt = rowData.length;
						for (var j = 0; j < cnt; j++) {
							rowData[j] = rowData._orgrow[j];
						}
						delete rowData["_orgrow"];
					}
				}
				else if (rowData._rtype == 8) {
					rowData._rtype = 1;
				}
				i--;
				return false;
			}
			return true;
		}
		while (true) {
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
			if (reset_loop()) {
				break;
			}
		}

		if (this._viewRecords != this._rawRecords) {
			this._viewRecords.splice(0, this._viewRecords.length);
		}
		this._viewRecords = this._rawRecords;
		this._reFilter();

		this._deletedRecords.splice(0, this._deletedRecords.length);

		this.loadstatus = false;
		this._eventstat = this.enableevent;

		this.rowcount = this._viewRecords.length;
		if (this._eventstat) {
			this._bWorkingstatus = true;
			this.on_fire_onload(0, "", 2);

			if (this.rowposition >= this.rowcount && this.rowcount > 0) {
				this._forcesetRowPosition(0, 51);
			}
			else {
				this._forcesetRowPosition(this.rowposition, 51);
			}
			this._bWorkingstatus = false;
		}
	};

	_pDataset.assign = function (srcds) {
		if (!srcds || srcds._type_name != "Dataset") {
			return -1;
		}

		this._eventstat = this.enableevent;
		var oldpos = this.rowposition;

		this._clearAll();
		this._assign(srcds);

		if (this.filterstr) {
			this.filter(this.filterstr);
		}
		if (this.keystring) {
			this.on_apply_keystring();
		}

		if (this._eventstat) {
			this.on_fire_onrowsetchanged(-1, this.rowcount, 10);
		}

		if (oldpos == this.rowposition) {
			if (this.rowcount > 0) {
				if (oldpos != 0) {
					this._setRowPosition(0, undefined, 51);
				}
				else if (this.id != srcds.id) {
					this.rowposition = -1;
					this._setRowPosition(oldpos, undefined, 53);
				}
				else {
					if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
						var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", 0, -1, -1, "", undefined, undefined);
						this.on_fire_onvaluechanged(evt);
					}
				}
			}
			else if (oldpos > -1) {
				this._forcesetRowPosition(-1, 51);
			}
		}
		return this.rowcount;
	};

	_pDataset.identifyExpr = function (expr) {
		if (typeof (expr) != "string") {
			return expr;
		}
		expr = expr + "";
		var ex = expr.substr(0, 4).toUpperCase();
		if (ex == "EXPR" || ex == "BIND") {
			var exp = expr.substr(4).trim();
			if (/^expr(\s*):|^bind(\s*):/.test(expr)) {
				expr = exp.substr(1);
			}
			else {
				expr = exp.substring(1, exp.length - 1);
			}
			var parser = new nexacro.ExprParser();
			var conv_expr = parser.makeExpr(this, expr);
			var exprfn = nexacro._createInlineFunc(conv_expr, ["currow", "rowidx", "comp", "dataset"]);
			if (exprfn) {
				expr = exprfn.call(null, this.rowposition, this.rowposition, this, this);
			}
		}
		return expr;
	};

	_pDataset.lookup = function (expr, cmpval, outcol) {
		var view = this._viewRecords;
		var start = 0;
		var end = view.length;
		expr = this.identifyExpr(expr);

		var row = this.findRow(expr, cmpval, start, end);

		return (row == -1) ? undefined : this.getColumn(row, outcol);
	};

	_pDataset.lookupAs = function (expr, cmpval, outcol) {
		var saveRec = this._viewRecords.slice(0, this._viewRecords.length);
		var view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		var start = 0;
		var end = view.length;

		expr = this.identifyExpr(expr);

		var row = this.findRowAs(expr, cmpval, start, end);
		var rtn = (row == -1) ? undefined : this.getColumn(row, outcol);
		this._viewRecords = saveRec.slice(0, this._rawRecords.length);
		return rtn;
	};

	_pDataset.findRow = function (expr, cmpval, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}

		end = this._endIdx(arguments.length, end, 4);

		var v;
		var constIdx = -1;
		var idx = -1;
		if (typeof (expr) == "string") {
			idx = this.colinfos.indexOf(expr);
			if (idx == undefined) {
				constIdx = this._constVars.indexOf(expr);
			}
			if (!((+expr) != (+expr))) {
				return -1;
			}
		}
		else {
			if ((+expr) != (+expr) || expr == undefined) {
				expr = 0;
			}
			if (expr > -1 && expr < this.colcount) {
				var infosLen = this.colinfos.length;
				if (expr < infosLen) {
					idx = expr;
				}
				else {
					constIdx = expr - infosLen;
				}
			}
			else {
				return -1;
			}
		}

		if (idx >= 0) {
			return this._findRow(idx, cmpval, start, end);
		}

		if (constIdx >= 0) {
			v = this._constVars[constIdx];

			if (v == cmpval && end > 0) {
				return start;
			}
			else {
				return -1;
			}
		}


		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return -1;
		}

		var i = start;
		function findRow_loop (pthis) {
			if (i < end) {
				var rowData = view[i];

				if (pthis._checkRowData(rowData)) {
					v = fn.call(this, i, i, null, pthis);

					if (v == cmpval) {
						return true;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
			if (findRow_loop(this)) {
				break;
			}
		}
		return (i < end) ? i : -1;
	};

	_pDataset.findRowExpr = function (expr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}

		end = this._endIdx(arguments.length, end);

		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return -1;
		}

		var i = start;
		function findRowExpr_loop (pthis) {
			if (i < end) {
				var rowData = view[i];

				if (pthis._checkRowData(rowData)) {
					var v = fn.call(pthis, i, i, null, pthis);
					if (v) {
						return true;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
			if (findRowExpr_loop(this)) {
				break;
			}
		}
		return (i < end) ? i : -1;
	};

	_pDataset.findRowAs = function (expr, cmpval, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}

		end = this._endIdx(arguments.length, end, 4);

		var v;
		var constIdx = -1;
		var idx = -1;

		if (typeof (expr) == "string") {
			idx = this.colinfos.indexOf(expr);
			if (idx == undefined || idx < 0) {
				constIdx = this._constVars.indexOf(expr);
			}
			if (!((+expr) != (+expr))) {
				return -1;
			}
		}
		else {
			if ((+expr) != (+expr) || expr == undefined) {
				expr = 0;
			}
			if (expr > -1 && expr < this.colcount) {
				var infosLen = this.colinfos.length;
				if (expr < infosLen) {
					idx = expr;
				}
				else {
					constIdx = expr - infosLen;
				}
			}
			else {
				return -1;
			}
		}

		if (idx >= 0) {
			return this._findRowAs(idx, cmpval, start, end);
		}

		if (constIdx >= 0) {
			v = this._constVars[constIdx];


			if (this._isLike(v, cmpval) && end > 0) {
				return 0;
			}
			else {
				return -1;
			}
		}

		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return -1;
		}

		var i = start;
		function findRowAs_loop (pthis) {
			if (i < end) {
				var rowData = view[i];

				if (pthis._checkRowData(rowData)) {
					v = fn.call(pthis, i, i, null, pthis);

					if (pthis._isLike(v, cmpval)) {
						return true;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
			if (findRowAs_loop(this)) {
				break;
			}
		}
		return (i < end) ? i : -1;
	};

	_pDataset.getSum = function (expr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}

		end = this._endIdx(arguments.length, end);
		var v = parseFloat(expr);
		if (isFinite(v)) {
			return v * this._getCount(start, end, -1);
		}

		var idx = this._constVars.indexOf(expr);
		if (idx >= 0) {
			v = this._constVars[idx];

			if ((typeof v) == "number") {
				return v * this._getCount(start, end, -1);
			}
			else if (v instanceof nexacro.Decimal) {
				var sum = new nexacro.Decimal(this._getCount(start, end, -1));
				sum.mulDecimal(v);
				return sum.isNaN() ? 0 : sum;
			}
			else {
				return 0;
			}
		}

		var idx = this.colinfos.indexOf(expr);
		if (idx >= 0) {
			return this._getSum(idx, start, end, -1, this._getColumnType(idx));
		}

		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return 0;
		}

		var sum = 0;
		var addsum;
		var i = start;

		function getSum_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					addsum = fn.call(pthis, i, i, null, pthis);
					if ((sum instanceof nexacro.Decimal) == false) {
						if ((addsum instanceof nexacro.Decimal) == false) {
							sum += (+addsum);
						}
						else {
							sum = new nexacro.Decimal(sum);
							sum.addDecimal(addsum);
						}
					}
					else {
						if ((addsum instanceof nexacro.Decimal) == false) {
							sum.addDouble(addsum);
						}
						else {
							sum.addDecimal(addsum);
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
			if (getSum_loop(this)) {
				break;
			}
		}

		if (sum instanceof nexacro.Decimal) {
			return sum.isNaN() ? 0 : sum;
		}
		return (+sum) != (+sum) ? 0 : sum;
	};

	_pDataset.getMin = function (expr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}

		if (!start || start < 0) {
			start = 0;
		}

		end = this._endIdx(arguments.length, end);
		var v = parseFloat(expr);
		if (isFinite(v)) {
			return v;
		}

		var idx = this._constVars.indexOf(expr);
		if (idx >= 0) {
			return this._constVars[idx];
		}

		var idx = this.colinfos.indexOf(expr);
		if (idx >= 0) {
			return this._getMin(idx, start, end, -1, this._getColumnType(idx));
		}

		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return undefined;
		}

		var min = undefined;
		var i = start;
		function getMin_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					v = fn.call(pthis, i, i, null, pthis);

					if (min == null) {
						min = v;
					}
					else if ((v instanceof nexacro.Decimal) == false) {
						if (v != null && v < min) {
							min = v;
						}
					}
					else if (v != null) {
						var minDec = new nexacro.Decimal(min);
						if ((v.hi < minDec.hi) || (v.hi == minDec.hi && v.lo < minDec.lo)) {
							min = v;
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
			if (getMin_loop(this)) {
				break;
			}
		}

		if (min instanceof nexacro.Decimal) {
			return min.isNaN() ? undefined : min;
		}
		return (+min) != (+min) ? undefined : min;
	};

	_pDataset.getMax = function (expr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		end = this._endIdx(arguments.length, end);

		var v = parseFloat(expr);
		if (isFinite(v)) {
			return v;
		}

		var idx = this._constVars.indexOf(expr);
		if (idx >= 0) {
			return this._constVars[idx];
		}

		var idx = this.colinfos.indexOf(expr);
		if (idx >= 0) {
			return this._getMax(idx, start, end, -1, this._getColumnType(idx));
		}

		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return undefined;
		}

		var max = undefined;
		var i = start;
		function getMax_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					v = fn.call(pthis, i, i, null, pthis);
					if (max == null) {
						max = v;
					}
					else if ((v instanceof nexacro.Decimal) == false) {
						if (v != null && v > max) {
							max = v;
						}
					}
					else if (v != null) {
						var maxDec = new nexacro.Decimal(max);
						if ((v.hi > maxDec.hi) || (v.hi == maxDec.hi && v.lo > maxDec.lo)) {
							max = v;
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
			if (getMax_loop(this)) {
				break;
			}
		}

		if (max instanceof nexacro.Decimal) {
			return max.isNaN() ? undefined : max;
		}
		return (+max) != (+max) ? undefined : max;
	};

	_pDataset.getAvg = function (expr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		end = this._endIdx(arguments.length, end);

		var v = parseFloat(expr);
		if (isFinite(v)) {
			return v;
		}

		var idx = this._constVars.indexOf(expr);
		if (idx >= 0) {
			v = this._constVars[idx];
			if (((typeof v) == "number") || (v instanceof nexacro.Decimal)) {
				return v;
			}
			else {
				return Infinity;
			}
		}

		var idx = this.colinfos.indexOf(expr);
		if (idx >= 0) {
			return this._getAvg(idx, start, end, -1, this._getColumnType(idx));
		}

		var fn = this._exprFuncs[expr];
		if (fn == null) {
			fn = this._exprFuncs[expr] = this._createExprFunc(expr);
		}
		if (typeof fn != "function") {
			return Infinity;
		}

		var cnt = 0;
		var sum = 0;
		var i = start;
		function getAvg_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					v = fn.call(pthis, i, i, null, pthis);
					if (v != null) {
						cnt++;
						if ((sum instanceof nexacro.Decimal) == false) {
							if ((v instanceof nexacro.Decimal) == false) {
								sum += (+v);
							}
							else {
								sum = new nexacro.Decimal(sum);
								sum.addDecimal(v);
							}
						}
						else {
							if ((v instanceof nexacro.Decimal) == false) {
								sum.addDouble(v);
							}
							else {
								sum.addDecimal(v);
							}
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
			if (getAvg_loop(this)) {
				break;
			}
		}

		if (cnt == 0) {
			return Infinity;
		}

		if (sum instanceof nexacro.Decimal) {
			sum.divDouble(cnt);
		}
		else {
			sum = sum / cnt;
		}
		return sum;
	};

	_pDataset.getCaseCount = function (cmpExpr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		if (!end || end < 0 || end > view.length) {
			end = view.length;
		}

		var v = parseFloat(cmpExpr);
		if (isFinite(v)) {
			return this._getCount(start, end, -1);
		}

		var idx = this._constVars.indexOf(cmpExpr);
		if (idx >= 0) {
			return this._getCount(start, end, -1);
		}

		var idx = this.colinfos.indexOf(cmpExpr);
		if (idx >= 0) {
			return this._getCount(start, end, -1);
		}

		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return 0;
		}

		var cnt = 0;
		var cmp = null;
		for (var i = start; i < end; i++) {
			if (this._checkRowData(view[i])) {
				cmp = cmpFn.call(this, i, i, null, this);
				if (cmp === true) {
					cnt++;
				}
			}
		}
		return cnt;
	};

	_pDataset.getCaseSum = function (cmpExpr, valExpr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		end = this._endIdx(arguments.length, end, 4);

		var v = parseFloat(valExpr);
		if (isFinite(v)) {
			return v * this.getCaseCount(cmpExpr, start, end);
		}

		var idx = this._constVars.indexOf(valExpr);
		if (idx >= 0) {
			v = this._constVars[idx];
			if ((typeof v) == "number") {
				return v * this.getCaseCount(cmpExpr, start, end);
			}
			else if (v instanceof nexacro.Decimal) {
				var sum = new nexacro.Decimal(this.getCaseCount(cmpExpr, start, end));
				sum.mulDecimal(v);
				return sum.isNaN() ? 0 : sum;
			}
			else {
				return 0;
			}
		}

		var idx = this.colinfos.indexOf(valExpr);
		if (idx >= 0) {
			return this._getCaseSum(cmpExpr, idx, start, end, -1, this._getColumnType(idx));
		}

		var valFn = this._exprFuncs[valExpr];
		if (valFn == null) {
			valFn = this._exprFuncs[valExpr] = this._createExprFunc(valExpr);
		}
		if (typeof valFn != "function") {
			return 0;
		}

		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return 0;
		}

		var sum = 0;
		var addsum;
		var cmp = null;
		var i = start;
		function getCaseSum_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					cmp = cmpFn.call(pthis, i, i, null, pthis);

					if (cmp === true) {
						addsum = valFn.call(pthis, i, i, null, pthis);
						if ((sum instanceof nexacro.Decimal) == false) {
							if ((addsum instanceof nexacro.Decimal) == false) {
								sum += (+addsum);
							}
							else {
								sum = new nexacro.Decimal(sum);
								sum.addDecimal(addsum);
							}
						}
						else {
							if ((addsum instanceof nexacro.Decimal) == false) {
								sum.addDouble(addsum);
							}
							else {
								sum.addDecimal(addsum);
							}
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
			if (getCaseSum_loop(this)) {
				break;
			}
		}

		if (sum instanceof nexacro.Decimal) {
			return sum.isNaN() ? 0 : sum;
		}
		return (+sum) != (+sum) ? 0 : sum;
	};

	_pDataset.getCaseMin = function (cmpExpr, valExpr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		end = this._endIdx(arguments.length, end, 4);

		var v = parseFloat(valExpr);
		if (isFinite(v)) {
			return v;
		}

		var idx = this._constVars.indexOf(valExpr);
		if (idx >= 0) {
			return this._constVars[idx];
		}

		var idx = this.colinfos.indexOf(valExpr);
		if (idx >= 0) {
			return this._getCaseMin(cmpExpr, idx, start, end, -1, this._getColumnType(idx));
		}

		var valFn = this._exprFuncs[valExpr];
		if (valFn == null) {
			valFn = this._exprFuncs[valExpr] = this._createExprFunc(valExpr);
		}
		if (typeof valFn != "function") {
			return undefined;
		}

		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return undefined;
		}

		var min = undefined;
		var cmp = null;
		var i = start;
		function getCaseMin_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					cmp = cmpFn.call(pthis, i, i, null, pthis);
					if (cmp === true) {
						v = valFn.call(pthis, i, i, null, pthis);
						if (min == null) {
							min = v;
						}
						else if ((v instanceof nexacro.Decimal) == false) {
							if (v != null && v < min) {
								min = v;
							}
						}
						else if (v != null) {
							var minDec = new nexacro.Decimal(min);
							if ((v.hi < minDec.hi) || (v.hi == minDec.hi && v.lo < minDec.lo)) {
								min = v;
							}
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
			if (getCaseMin_loop(this)) {
				break;
			}
		}

		if (min instanceof nexacro.Decimal) {
			return min.isNaN() ? undefined : min;
		}
		return (+min) != (+min) ? undefined : min;
	};

	_pDataset.getCaseMax = function (cmpExpr, valExpr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		end = this._endIdx(arguments.length, end, 4);

		var v = parseFloat(valExpr);
		if (isFinite(v)) {
			return v;
		}

		var idx = this._constVars.indexOf(valExpr);
		if (idx >= 0) {
			return this._constVars[idx];
		}

		var idx = this.colinfos.indexOf(valExpr);
		if (idx >= 0) {
			return this._getCaseMax(cmpExpr, idx, start, end, -1, this._getColumnType(idx));
		}

		var valFn = this._exprFuncs[valExpr];
		if (valFn == null) {
			valFn = this._exprFuncs[valExpr] = this._createExprFunc(valExpr);
		}
		if (typeof valFn != "function") {
			return undefined;
		}

		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return undefined;
		}

		var max = undefined;
		var cmp = null;
		var i = start;
		function getCaseMax_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					cmp = cmpFn.call(pthis, i, i, null, pthis);
					if (cmp === true) {
						v = valFn.call(pthis, i, i, null, pthis);

						if (max == null) {
							max = v;
						}
						else if ((v instanceof nexacro.Decimal) == false) {
							if (v != null && v > max) {
								max = v;
							}
						}
						else if (v != null) {
							var maxDec = new nexacro.Decimal(max);
							if ((v.hi > maxDec.hi) || (v.hi == maxDec.hi && v.lo > maxDec.lo)) {
								max = v;
							}
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
			if (getCaseMax_loop(this)) {
				break;
			}
		}

		if (max instanceof nexacro.Decimal) {
			return max.isNaN() ? undefined : max;
		}
		return (+max) != (+max) ? undefined : max;
	};

	_pDataset.getCaseAvg = function (cmpExpr, valExpr, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		end = this._endIdx(arguments.length, end, 4);

		var v = parseFloat(valExpr);
		if (isFinite(v)) {
			return v;
		}

		var idx = this._constVars.indexOf(valExpr);
		if (idx >= 0) {
			v = this._constVars[idx];
			if (((typeof v) == "number") || (v instanceof nexacro.Decimal)) {
				return v;
			}
			else {
				return Infinity;
			}
		}

		var idx = this.colinfos.indexOf(valExpr);
		if (idx >= 0) {
			return this._getCaseAvg(cmpExpr, idx, start, end, -1, this._getColumnType(idx));
		}

		var valFn = this._exprFuncs[valExpr];
		if (valFn == null) {
			valFn = this._exprFuncs[valExpr] = this._createExprFunc(valExpr);
		}
		if (typeof valFn != "function") {
			return Infinity;
		}

		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return Infinity;
		}

		var cnt = 0;
		var sum = 0;
		var cmp = null;

		var i = start;
		function getCaseAvg_loop (pthis) {
			if (i < end) {
				if (pthis._checkRowData(view[i])) {
					cmp = cmpFn.call(pthis, i, i, null, pthis);
					if (cmp === true) {
						v = valFn.call(pthis, i, i, null, pthis);
						if (v != null) {
							cnt++;

							if ((sum instanceof nexacro.Decimal) == false) {
								if ((v instanceof nexacro.Decimal) == false) {
									sum += (+v);
								}
								else {
									sum = new nexacro.Decimal(sum);
									sum.addDecimal(v);
								}
							}
							else {
								if ((v instanceof nexacro.Decimal) == false) {
									sum.addDouble(v);
								}
								else {
									sum.addDecimal(v);
								}
							}
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
			if (getCaseAvg_loop(this)) {
				break;
			}
		}

		if (cnt == 0) {
			return Infinity;
		}

		if (sum instanceof nexacro.Decimal) {
			sum.divDouble(cnt);
		}
		else {
			sum = sum / cnt;
		}
		return sum;
	};

	_pDataset.getCountNF = function (v) {
		var noDelRec = this._getNotDelRec();
		var colIdx = -1;
		var colId = "";

		if (v) {
			if (typeof (v) == "string") {
				colIdx = this.colinfos.indexOf(v);

				if (!(colIdx >= 0)) {
					return 0;
				}
			}
			else if (typeof (v) == "number") {
				colIdx = v;
				colId = this.colinfos.get_id(colIdx);
				if (!colId) {
					return 0;
				}
			}
			else {
				return 0;
			}

			var currentView = this._viewRecords;
			this._viewRecords = noDelRec;
			this._checkRowData = this._checkRawRowData;

			var start = 0;
			var end = this._rawRecords.length;

			var value = this._getCount(start, end, -1, colIdx, true);

			this._checkRowData = this._checkViewRowData;
			this._viewRecords = currentView;

			return value;
		}

		return noDelRec.length;
	};

	_pDataset.getSumNF = function (expr, start, end) {
		return this._calcNFData(this.getSum, expr, start, end);
	};

	_pDataset.getMinNF = function (expr, start, end) {
		return this._calcNFData(this.getMin, expr, start, end);
	};

	_pDataset.getMaxNF = function (expr, start, end) {
		return this._calcNFData(this.getMax, expr, start, end);
	};

	_pDataset.getAvgNF = function (expr, start, end) {
		return this._calcNFData(this.getAvg, expr, start, end);
	};

	_pDataset.findMaxLengthRow = function (colid, start, end) {
		var view = this._viewRecords;
		if ((+start) != (+start)) {
			start = 0;
		}
		if (!start || start < 0) {
			start = 0;
		}
		if (!end || end > view.length) {
			end = view.length;
		}

		var v = parseInt(colid) | 0;
		if (isFinite(v)) {
			if (v >= 0) {
				return this._findMaxLengthRow(v, start, end);
			}
			else {
				return -1;
			}
		}
		var idx = this._constVars.indexOf(colid);
		if (idx >= 0) {
			return (this._constVars[idx]) ? this._constVars[idx].toString().length : 0;
		}

		var idx = this.colinfos.indexOf(colid);
		if (idx >= 0) {
			return this._findMaxLengthRow(idx, start, end);
		}

		return -1;
	};
	_pDataset.findMaxLengthRowNF = function (colid, start, end) {
		return this._calcNFData(this.findMaxLengthRow, colid, start, end);
	};

	_pDataset._endIdx = function (arguLen, end, mode) {
		var len = this._viewRecords.length;

		if (mode) {
			switch (arguLen) {
				case 1:
					return 0;
				case 4:
					if (end < 0 || end >= len) {
						return len;
					}
					if ((+end) != (+end)) {
						return 0;
					}
					return end;
				default:
					return len;
			}
		}
		else {
			if (arguLen == 3) {
				if (end < 0 || end > len) {
					return len;
				}
				if ((+end) != (+end)) {
					return 0;
				}
				return end;
			}
			return len;
		}
	};

	_pDataset._clearAllExprs = function () {
		this._exprFuncs = null;
		this._exprFuncs = {
		};
	};

	_pDataset._clearAll = function () {
		this.colinfos = null;

		var cnt = this.rowcount;
		this.colinfos = new nexacro.DSColumnInfoList();
		this._constVars = new nexacro.VariableList();

		this._rawRecords.splice(0, this._rawRecords.length);
		if (this._viewRecords != this._rawRecords) {
			this._viewRecords.splice(0, this._viewRecords.length);
		}
		this._deletedRecords.splice(0, this._deletedRecords.length);

		this._viewRecords = null;
		this._rawRecords = null;
		this._deletedRecords = null;

		this._rawRecords = [];
		this._deletedRecords = [];

		this._viewRecords = this._rawRecords;

		this.colcount = 0;
		this.constcount = 0;
		this.rowcount = 0;

		this._keycols.splice(0, this._keycols.length);
		this._keycols.max_keylevel = 0;

		if (this.loadkeymode.toLowerCase() == "reset") {
			this.keystring = this._defaultKeyStr;
		}
		if (this.loadfiltermode.toLowerCase() == "reset") {
			this.filterstr = this._defaultFilterStr;
		}
		this._filterFn = null;

		this._clearAllExprs();

		return cnt;
	};

	_pDataset._clearData = function () {
		var cnt = this.rowcount;
		this._rawRecords.splice(0, this._rawRecords.length);
		if (this._viewRecords != this._rawRecords) {
			this._viewRecords.splice(0, this._viewRecords.length);
		}
		this._viewRecords = this._rawRecords;

		this._deletedRecords.splice(0, this._deletedRecords.length);
		this._deletedRecords = null;
		this._deletedRecords = [];

		this.rowcount = 0;
		return cnt;
	};

	_pDataset._forcesetRowPosition = function (newpos, reason) {
		if (newpos < 0 || newpos >= this.rowcount) {
			newpos = -1;
		}

		var oldpos = this.rowposition;
		if (newpos != oldpos && newpos < this.rowcount) {
			if (this.canrowposchange && this.canrowposchange._has_handlers && oldpos != -1) {
				var evt = new nexacro.DSRowPosChangeEventInfo(this, "canrowposchange", oldpos, newpos, reason);
				var ret = this.on_fire_canrowposchange(evt);
				if (ret == false) {
					return;
				}
			}
			if (this.onrowposchanged && this.onrowposchanged._has_handlers) {
				var evt = new nexacro.DSRowPosChangeEventInfo(this, "onrowposchanged", oldpos, newpos, reason);
				this.rowposition = newpos;
				this.on_fire_onrowposchanged(evt);
			}
			else {
				this.rowposition = newpos;
			}
		}
		if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
			var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", newpos, -1, -1, "", undefined, undefined);
			this.on_fire_onvaluechanged(evt);
		}
	};

	_pDataset._setRowPosition = function (newpos, v, reason, value_update) {
		if (newpos < 0 || newpos >= this.rowcount) {
			newpos = -1;
		}

		var oldpos = this.rowposition;
		if (newpos != oldpos || (reason == 53 && newpos == oldpos)) {
			if ((this.canrowposchange && this.canrowposchange._has_handlers) || (this.onrowposchanged && this.onrowposchanged._has_handlers)) {
				var evt = new nexacro.DSRowPosChangeEventInfo(this, "canrowposchange", oldpos, newpos, reason);

				if (this.canrowposchange && this.canrowposchange._has_handlers && this._eventstat && v === undefined
					 && (oldpos >= -1 && oldpos < this.rowcount)) {
					var ret = this.on_fire_canrowposchange(evt);
					if (ret == false) {
						return;
					}

					if (newpos != evt.newrow) {
						newpos = evt.newrow;
					}
					if (newpos >= 0 || newpos < this.rowcount) {
						this.rowposition = newpos;
						if (this.onrowposchanged && this.onrowposchanged._has_handlers) {
							this.on_fire_onrowposchanged(evt);
						}
						if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
							var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
							this.on_fire_onvaluechanged(evt);
						}
					}
				}
				else {
					if (newpos >= 0 || newpos < this.rowcount) {
						this.rowposition = newpos;
						if (this._eventstat) {
							if (this.onrowposchanged && this.onrowposchanged._has_handlers) {
								this.on_fire_onrowposchanged(evt);
							}
							if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
								var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
								this.on_fire_onvaluechanged(evt);
							}
						}
					}
				}
			}
			else {
				this.rowposition = newpos;
				if (this._eventstat && this.onvaluechanged && this.onvaluechanged._has_handlers) {
					var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
					this.on_fire_onvaluechanged(evt);
				}
			}
		}
		else if (value_update) {
			if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
				var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
				this.on_fire_onvaluechanged(evt);
			}
		}
		return this.rowposition;
	};

	_pDataset._splitKeyCols = function (str) {
		var arr = [];
		var plus, minus;
		if (str.charAt(0) != '+' && str.charAt(0) != '-') {
			str = '+' + str;
		}
		plus = str.indexOf('+');
		minus = str.indexOf('-');
		var pos = (plus >= 0 && minus >= 0) ? (minus < plus ? minus : plus) : (plus > minus ? plus : minus);
		var arrLength = 0;
		while (pos >= 0) {
			plus = str.indexOf('+', pos + 1);
			minus = str.indexOf('-', pos + 1);
			var nextpos = (plus >= 0 && minus >= 0) ? (minus < plus ? minus : plus) : (plus > minus ? plus : minus);
			if (nextpos < 0) {
				arr[arrLength] = str.substr(pos);
				arrLength++;
			}
			else {
				arr[arrLength] = str.substr(pos, nextpos - pos);
				arrLength++;
			}
			pos = nextpos;
		}
		delete arrLength;
		return arr;
	};

	_pDataset._clearKeyCols = function () {
		this._keycols.splice(0, this._keycols.length);
		this._keycols.max_keylevel = 0;
	};

	_pDataset._parseKeyCols = function () {
		var keyColLength = this._keycols.length;

		if (keyColLength > 0) {
			return keyColLength;
		}

		var str = this.keystring;
		if (str.length > 0) {
			var level = 0;
			var keys = str.split(',');
			var i = keys.length - 1;
			function _parseKeyCols_loop (pthis) {
				if (i >= 0) {
					var key = keys[i].trim();
					if (key.length == 0) {
						i--;
						return false;
					}
					var colonpos = key.indexOf(':');
					if (colonpos <= 0 || (key.charAt(0) != 'S' && key.charAt(0) != 's')) {
						level++;
					}

					var keys2;
					if (colonpos >= 0) {
						keys2 = pthis._splitKeyCols(key.substr(colonpos + 1));
					}
					else {
						keys2 = pthis._splitKeyCols(key);
					}

					var j = keys2.length - 1;
					function _parseKeyCols_loop2 () {
						if (j >= 0) {
							var key2 = keys2[j].trim();
							if (key2.length == 0) {
								j--;
								return false;
							}
							var colid;
							var colidx = -1;
							var descending = false;
							if (key2.charAt(0) == '-') {
								colid = key2.substr(1);
								colidx = pthis.colinfos.indexOf(colid);
								descending = true;
							}
							else if (key2.charAt(0) == '+') {
								colid = key2.substr(1);
								colidx = pthis.colinfos.indexOf(colid);
								descending = false;
							}
							else {
								colid = key2;
								colidx = pthis.colinfos.indexOf(colid);
								descending = false;
							}

							if (colidx >= 0) {
								pthis._keycols[keyColLength] = 
									{
									level : level, 
									colid : colid, 
									colidx : colidx, 
									descending : descending
								};
								keyColLength++;
							}
							j--;
							return false;
						}
						return true;
					}
					while (true) {
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
						if (_parseKeyCols_loop2()) {
							break;
						}
					}
					i--;
					return false;
				}
				return true;
			}
			while (true) {
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
				if (_parseKeyCols_loop(this)) {
					break;
				}
			}
		}
		this._keycols.max_keylevel = level;
		return keyColLength;
	};

	_pDataset._getLocale = function () {
		var locale = nexacro.System.locale;
		var _parent = this;

		while (_parent) {
			if (_parent._locale) {
				locale = _parent._locale;
				break;
			}
			_parent = _parent.parent;
		}

		if (locale.indexOf("_") > -1) {
			locale = locale.substr(0, 2);
		}

		return locale;
	};

	_pDataset._createSortFunc = function () {
		var _keys = this._keycols;
		var _keycnt = _keys.length;
		var _locale = this._getLocale();
		var pThis = this;

		return function (a, b) {
			for (var i = _keycnt - 1; i >= 0; i--) {
				var key = _keys[i];
				var value1 = a[key.colidx];
				var value2 = b[key.colidx];
				var cmp = 0;

				if ((value1 instanceof nexacro.Decimal) == false) {
					if (value1 != null) {
						if (value1 != value2) {
							if (value2 != null) {
								if ((value2 instanceof nexacro.Decimal) == false) {
									if (pThis.colinfos[key.colidx].type == "STRING") {
										cmp = value1.localeCompare(value2, _locale);
									}
									else {
										cmp = (value1 > value2 ? 1 : -1);
									}
								}
								else {
									cmp = ((value1.hi > value2.hi || (value1.hi >= value2.hi && value1.lo > value2.lo)) ? 1 : -1);
								}
							}
							else {
								cmp = 1;
							}
						}
						else {
							cmp = 0;
						}
					}
					else if (value1 != value2) {
						cmp = -1;
					}
					else {
						cmp = 0;
					}
				}
				else {
					if (value2 != null) {
						cmp = (value1.hi == value2.hi && value1.lo == value2.lo) ? 0 : ((value1.hi > value2.hi || (value1.hi >= value2.hi && value1.lo > value2.lo)) ? 1 : -1);
					}
					else {
						cmp = 1;
					}
				}

				if (cmp != 0) {
					return (key.descending) ? -cmp : cmp;
				}
			}
			return (a._rawidx > b._rawidx) ? 1 : -1;
		};
	};

	_pDataset._sortData = function () {
		var view = this._viewRecords;
		if (view.length > 0) {
			if (this._viewRecords == this._rawRecords) {
				view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
			}
			var cmpfn = this._createSortFunc();
			view.sort(cmpfn);
		}
	};
	_pDataset._deleteAllGroupData = function () {
		var view = this._viewRecords;
		var cnt = view.length;
		var i = cnt - 1;
		function _deleteAllGroupData_loop () {
			if (i >= 0) {
				if (view[i]._level > 0) {
					view.splice(i, 1);
				}
				i--;
				return false;
			}
			return true;
		}
		while (true) {
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
			if (_deleteAllGroupData_loop()) {
				break;
			}
		}
	};

	_pDataset._calcGroupData = function (grpData, col_levels) {
		var cols = this.colinfos;
		var colcnt = cols.length;
		var grpStart = grpData._grpstart;
		var grpEnd = grpData._grpend;
		var lvl = grpData._level;
		var keyData = this._viewRecords[grpStart];
		var col = 0;
		function _calcGroupData_loop (pthis) {
			if (col < colcnt) {
				var colprop = cols[col].prop;
				var ntype = cols[col].ntype;

				if (colprop && colprop.length > 0) {
					colprop = colprop.toLowerCase();
				}

				switch (colprop) {
					case "count":
						grpData[col] = pthis._getCount(grpStart, grpEnd, -1);
						break;
					case "sum":
						grpData[col] = pthis._getSum(col, grpStart, grpEnd, -1, ntype);
						break;
					case "max":
						grpData[col] = pthis._getMax(col, grpStart, grpEnd, -1, ntype);
						break;
					case "min":
						grpData[col] = pthis._getMin(col, grpStart, grpEnd, -1, ntype);
						break;
					case "avg":
						grpData[col] = pthis._getAvg(col, grpStart, grpEnd, -1, ntype);
						break;
					case "text":
						grpData[col] = cols[col].sumtext;
						break;
					case "key":
						grpData[col] = keyData[col];
						break;
					default:
						if (col_levels[col] >= lvl) {
							grpData[col] = keyData[col];
						}
						else {
							switch (ntype) {
								case 2:
								case 3:
								case 4:
									grpData[col] = pthis._getSum(col, grpStart, grpEnd, -1, ntype);
									break;
								default:
									grpData[col] = cols[col].sumtext;
									break;
							}
						}
						break;
				}
				col++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
			if (_calcGroupData_loop(this)) {
				break;
			}
		}
	};
	_pDataset._createGroupData = function () {
		var keys = this._keycols;
		var maxlevel = keys.max_keylevel;
		var view = this._viewRecords;
		if (maxlevel == 0 || this._viewRecords.length == 0) {
			return;
		}
		var level_idx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		var keycnt = keys.length;
		var col_levels = [];
		var j = 0;
		function _createGroupData_init_loop () {
			if (j < keycnt) {
				col_levels[keys[j].colidx] = keys[j].level;
				j++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
			if (_createGroupData_init_loop()) {
				break;
			}
		}

		var grpstart, grpend;

		var cnt = this._viewRecords.length;
		var prevData = this._viewRecords[0];
		var curData, grpData;
		var chklvl, iskey;

		var idx = 1;
		function _createGroupData_loop (pthis) {
			if (idx < cnt) {
				curData = pthis._viewRecords[idx];
				chklvl = 0;
				var k = keycnt - 1;
				function _createGroupData_chk_loop () {
					if (k >= 0) {
						if (keys[k].level == 0) {
							k--;
							return false;
						}
						if (curData[keys[k].colidx] instanceof nexacro.Decimal && prevData[keys[k].colidx] instanceof nexacro.Decimal) {
							if (!curData[keys[k].colidx].isEqual(prevData[keys[k].colidx])) {
								chklvl = keys[k].level;
								return true;
							}
						}
						else if (curData[keys[k].colidx] != prevData[keys[k].colidx]) {
							chklvl = keys[k].level;
							return true;
						}
						k--;
						return false;
					}
					return true;
				}
				while (true) {
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
					if (_createGroupData_chk_loop()) {
						break;
					}
				}

				if (chklvl != 0) {
					var lvl = 1;
					function _createGroupData_grp_loop () {
						if (lvl <= chklvl) {
							grpData = [];
							grpData._level = lvl;
							grpstart = level_idx[lvl];
							grpend = idx;
							grpData._grpstart = grpstart;
							grpData._grpend = grpend;
							grpData._rtype = 16;
							pthis._calcGroupData(grpData, col_levels);

							if (pthis.reversesubsum) {
								view.splice(grpstart, 0, grpData);
							}
							else {
								view.splice(grpend, 0, grpData);
							}

							grpData = null;
							cnt++;
							idx++;
							lvl++;
							return false;
						}
						return true;
					}
					while (true) {
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
						if (_createGroupData_grp_loop()) {
							break;
						}
					}

					prevData = curData;
					lvl = 1;
					function _createGroupData_lastgrp_loop () {
						if (lvl <= chklvl) {
							level_idx[lvl] = idx;
							lvl++;
							return false;
						}
						return true;
					}
					while (true) {
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
						if (_createGroupData_lastgrp_loop()) {
							break;
						}
					}
				}
				idx++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
			if (_createGroupData_loop(this)) {
				break;
			}
		}

		var lvl = 1;
		var viewLength = view.length;
		function _createGroupData_last_loop (pthis) {
			if (lvl <= maxlevel) {
				grpData = [];
				grpData._level = lvl;
				grpstart = level_idx[lvl];
				grpend = viewLength;
				grpData._grpstart = grpstart;
				grpData._grpend = grpend;
				grpData._rtype = 16;
				pthis._calcGroupData(grpData, col_levels);

				if (pthis.reversesubsum) {
					view.splice(grpstart, 0, grpData);
				}
				else {
					view[viewLength] = grpData;
				}

				viewLength++;
				lvl++;

				grpData = null;
				return false;
			}
			return true;
		}
		while (true) {
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
			if (_createGroupData_last_loop(this)) {
				break;
			}
		}
		delete viewLength;
	};

	_pDataset._resetSortGroup = function () {
		var oldpos = this.rowposition;
		if (this.rowposition == -1) {
			var oldpos = 0;
		}

		var oldrowdata = this._viewRecords[oldpos];
		if (this._parseKeyCols() > 0 && this._rawRecords.length > 0) {
			if (this._rawRecords != this._viewRecords) {
				if (this._viewRecords.length == 0) {
					oldrowdata = null;
					return false;
				}
				this._deleteAllGroupData();
			}
			else {
				this._viewRecords = null;
				this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
			}

			this._sortData();
			this._createGroupData();
			this.rowcount = this._viewRecords.length;
		}

		oldrowdata = null;
		return false;
	};

	_pDataset._adjustGroupRowData = function (row) {
		var keys = this._keycols;
		if (keys.max_keylevel == 0) {
			return false;
		}

		var keycnt = keys.length;
		var col_levels = [];
		var j = 0;
		function _adjustGroupRowData_init_loop () {
			if (j < keycnt) {
				col_levels[keys[j].colidx] = keys[j].level;
				j++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
			if (_adjustGroupRowData_init_loop()) {
				break;
			}
		}

		var view = this._viewRecords;
		var cnt = view.length;
		var grpData;
		var i = row;
		function _adjustGroupRowData_loop (pthis) {
			if (i < cnt) {
				grpData = view[i];
				if (grpData && grpData._rtype == 16 && grpData._grpend >= row) {
					grpData._grpend--;
					if (grpData._grpstart <= row) {
						if (grpData._grpend <= grpData._grpstart) {
							view.splice(i, 1);
							i--;
						}
						else {
							pthis._calcGroupData(grpData, col_levels);
						}
					}
					else {
						grpData._grpstart--;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
			if (_adjustGroupRowData_loop(this)) {
				break;
			}
		}

		col_levels = null;

		return true;
	};

	_pDataset._updateGroupRowData = function (row) {
		var keys = this._keycols;
		if (keys.max_keylevel == 0) {
			return false;
		}
		var keycnt = keys.length;
		var col_levels = [];
		var j = 0;
		function _updateGroupRowData_init_loop () {
			if (j < keycnt) {
				col_levels[keys[j].colidx] = keys[j].level;
				j++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
			if (_updateGroupRowData_init_loop()) {
				break;
			}
		}


		var view = this._viewRecords;
		var cnt = view.length;
		var grpData;
		var i = row;
		function _updateGroupRowData_loop (pthis) {
			if (i < cnt) {
				grpData = view[i];
				if (grpData._rtype == 16 && grpData._grpstart <= row && grpData._grpend >= row) {
					pthis._calcGroupData(grpData, col_levels);
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
			if (_updateGroupRowData_loop(this)) {
				break;
			}
		}
		col_levels = null;
		return true;
	};

	_pDataset._removeEmptyRows = function () {
		var raw = this._rawRecords;
		var cnt = raw.length;

		var i = cnt - 1;
		function _removeEmptyRows_rm_loop () {
			if (i >= 0) {
				if (raw[i]._rtype == 0) {
					raw.splice(i, 1);
				}
				i--;
				return false;
			}
			return true;
		}
		while (true) {
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
			if (_removeEmptyRows_rm_loop()) {
				break;
			}
		}

		cnt = raw.length;
		var i = 0;
		function _removeEmptyRows_adj_loop () {
			if (i < cnt) {
				raw[i]._rawidx = i;
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
			if (_removeEmptyRows_adj_loop()) {
				break;
			}
		}
	};

	_pDataset._reFilter = function () {
		var view;

		if (this.filterstr.length > 0) {
			view = this._viewRecords;
			if (view != this._rawRecords) {
				view.splice(0, view.length);
			}
			view = this._viewRecords = this._getNotDelRec();

			if (this._filterFn == null) {
				var filterFn = this._createExprFunc(this.filterstr);
				if (typeof filterFn == "function") {
					this._filterFn = filterFn;
				}
			}
			if (this._filterFn) {
				var exprfn = this._filterFn;
				var cnt = view.length;
				var flag;
				var i = cnt - 1;
				function _reFilter_loop (pthis) {
					if (i >= 0) {
						flag = exprfn.call(pthis, i, i, null, pthis);
						if (!flag || view[i]._rtype == 8) {
							view.splice(i, 1);
						}
						i--;
						return false;
					}
					return true;
				}
				while (true) {
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
					if (_reFilter_loop(this)) {
						break;
					}
				}
			}
		}
		else {
			view = this._viewRecords;
			if (view != this._rawRecords) {
				view.splice(0, view.length);
			}
			this._viewRecords = this._getNotDelRec();
		}

		view = null;
		this.rowcount = this._viewRecords.length;
	};

	_pDataset._getConstColIndex = function (id) {
		return this._constVars.indexOf(id);
	};

	_pDataset._getDataColIndex = function (id) {
		return this.colinfos.indexOf(id);
	};

	_pDataset._addConstColumn = function (id, value, type, size) {
		if (id in this.colinfos) {
			return -1;
		}

		if (id in this._constVars) {
			var preval = this._constVars.get_item(id);
			if (value != preval) {
				this._constVars.set_item(id, value);
				return this._constVars.indexOf(id);
			}
			else {
				return -1;
			}
		}

		if (type) {
			type = nexacro.DataUtils._typecodes[type.toLowerCase()];
			value = nexacro.DataUtils.convert(value, type);
		}

		var tempStr = "";
		if (type) {
			tempStr += " type=\"" + nexacro.DataUtils._typenames[type] + "\"";
		}
		if (size) {
			tempStr += " size=\"" + size + "\"";
		}

		if (tempStr) {
			this._constVars2.add(id, tempStr);
		}

		this.constcount++;
		this.colcount++;
		return this._constVars.add(id, value);
	};

	_pDataset._addColumn = function (id, strtype, size, prop, text) {
		if ((id in this.colinfos) || (id in this._constVars)) {
			return -1;
		}

		var type;
		if (strtype == undefined) {
			type = 1;
			strtype = "STRING";
		}
		else {
			type = nexacro.DataUtils._typeint[strtype.toLowerCase()];
		}

		if (type == null) {
			type = 1;
		}
		if ((+size) != (+size)) {
			size = 256;
		}

		var idx = this.colinfos.length;
		var newcolinfo = new nexacro.DSColumnInfo(id, strtype, type, size, prop, text, idx);
		this.colcount++;
		return this.colinfos.add(id, newcolinfo);
	};

	_pDataset._addColumnInfo = function (id, colinfo) {
		if ((id in this.colinfos) || (id in this._constVars)) {
			return -1;
		}

		var idx = this.colinfos.length;
		var newcolinfo = new nexacro.DSColumnInfo(id, colinfo.type, colinfo.ntype, colinfo.size, colinfo.prop, colinfo.sumtext, idx);
		this.colcount++;
		return this.colinfos.add(id, newcolinfo);
	};
	_pDataset._appendColList = function (collist) {
		if (collist._type_name == "DSColumnInfoList") {
			var len = collist.length;
			var cnt = 0;
			var idx = this.colinfos.length;
			if (len > 0) {
				var i = 0;
				function _appendColList_loop (pthis) {
					if (i < len) {
						var colinfo = collist[i];
						var id = colinfo.id;
						if ((id in pthis.colinfos) || (id in pthis._constVars)) {
							i++;
							return false;
						}

						var newcolinfo = new nexacro.DSColumnInfo(id, colinfo.type, colinfo.ntype, colinfo.size, colinfo.prop, colinfo.sumtext, idx);
						pthis.colinfos.add(id, newcolinfo);
						idx++;
						cnt++;
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
					if (_appendColList_loop(this)) {
						break;
					}
				}

				if (cnt > 0) {
					this.colcount += cnt;
				}
			}
			return cnt;
		}
		return 0;
	};

	_pDataset._deleteColumn = function (id) {
		if (this.updatecontrol) {
			return false;
		}

		var varList = this._constVars;
		var colList = this.colinfos;

		if (typeof (id) == "string") {
			var vv = varList.indexOf(id);

			if (colList.indexOf(id) > -1) {
				id = colList.indexOf(id);
			}
			else if (varList.indexOf(id) > -1) {
				id = varList.indexOf(id) + colList.length;
			}
			else {
				return false;
			}
		}
		else {
			if ((+id) != (+id) || id == undefined) {
				id = 0;
			}
		}

		if (this.colinfos.deleteItem(id) > -1) {
			this.colcount--;
			return true;
		}
		else {
			if (varList.deleteItem(id - this.colinfos.length) > -1) {
				this.constcount--;
				this.colcount--;
				return true;
			}
		}

		return false;
	};

	_pDataset._appendRow = function (rtype) {
		var rowData = [];
		rowData._rawidx = this._rawRecords.length;
		rowData._level = 0;
		rowData._rtype = rtype;

		this._rawRecords[rowData._rawidx] = rowData;
		var viewRecLength = this._viewRecords.length;
		if (this._rawRecords != this._viewRecords) {
			this._viewRecords[viewRecLength] = rowData;
			viewRecLength++;
		}
		this.rowcount = viewRecLength;

		rowData = null;
		delete viewRecLength;
		return this.rowcount - 1;
	};

	_pDataset._insertRow = function (row, rtype) {
		var view = this._viewRecords;
		if (row >= view.length) {
			return this._appendRow(rtype);
		}
		if (this._rawRecords == view) {
			view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		}
		var rowData = [];
		rowData._rawidx = this._rawRecords.length;
		rowData._rtype = rtype;
		rowData._level = 0;

		var rawRecords = this._rawRecords;
		var rawRecords_len = rawRecords.length;
		var deleted = 0;

		for (var i = 0; i < rawRecords_len; i++) {
			if (rawRecords[i]._rtype == 8) {
				deleted++;
			}

			if (i == row + deleted) {
				break;
			}
		}

		this._rawRecords.splice(row + deleted, 0, rowData);
		view.splice(row, 0, rowData);
		this._removeEmptyRows();

		this.rowcount = this._viewRecords.length;
		rowData = null;
		return row;
	};

	_pDataset._deleteRow = function (row) {
		if (!((+row) != (+row))) {
			row = parseInt(row) | 0;
		}
		if (row < 0) {
			return -1;
		}
		var view = this._viewRecords;
		if (row >= view.length) {
			return -1;
		}

		if (this._rawRecords == view) {
			view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		}

		var rowData = view[row];
		if (rowData) {
			var delRecLength = this._deletedRecords.length;

			if (this.updatecontrol) {
				if (rowData._rtype == 1) {
					rowData._rtype = 8;

					this._deletedRecords[delRecLength] = rowData;
					delRecLength++;
					view.splice(row, 1);
				}
				else if (rowData._rtype == 2) {
					rowData._rtype = 0;
					this._removeEmptyRows();
					view.splice(row, 1);
				}
				else if (rowData._rtype == 4) {
					var orgData = rowData._orgrow;
					var colcnt = this.colinfos.length;
					for (var col = 0; col < colcnt; col++) {
						rowData[col] = orgData[col];
					}
					delete rowData._orgrow;
					this._deletedRecords[delRecLength] = rowData;
					delRecLength++;
					view.splice(row, 1);
					rowData._rtype = 8;
				}
				else if (rowData._rtype == 16) {
					rowData._rtype = 0;
					this._removeEmptyRows();
					view.splice(row, 1);
				}
				else {
					return -1;
				}
			}
			else {
				rowData._rtype = 0;
				this._removeEmptyRows();
				view.splice(row, 1);
			}

			this.rowcount = this._viewRecords.length;
		}
		return row;
	};

	_pDataset._moveRow = function (oldrow, newrow) {
		var view = this._viewRecords;
		if (this._rawRecords.length <= 0) {
			return -1;
		}
		if (oldrow >= view.length || newrow >= view.length || oldrow == newrow) {
			return -1;
		}
		if (this._rawRecords == view) {
			view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		}

		var rowTmp = this._rawRecords[oldrow];
		this._rawRecords.splice(oldrow, 1);
		this._rawRecords.splice(newrow, 0, rowTmp);

		rowTmp = view[oldrow];
		view.splice(oldrow, 1);
		view.splice(newrow, 0, rowTmp);
		return newrow;
	};

	_pDataset._exchangeRow = function (row1, row2) {
		var view = this._viewRecords;
		if (this._rawRecords.length <= 0) {
			return -1;
		}
		if (row1 >= view.length || row2 >= view.length || row1 == row2) {
			return false;
		}
		if (this._rawRecords == view) {
			view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		}

		var rowTmp = this._rawRecords[row1];
		this._rawRecords[row1] = view[row2];
		this._rawRecords[row2] = rowTmp;

		rowTmp = view[row1];
		view[row1] = view[row2];
		view[row2] = rowTmp;
		return true;
	};

	_pDataset._deleteAll = function () {
		var view = this._viewRecords;
		var cnt = view.length;
		var emptycnt = 0;
		var row = 0;
		var delRecLength = this._deletedRecords.length;
		var updateCon = this.updatecontrol;
		var delRecords = this._deletedRecords;
		function _deleteAll_loop (pthis) {
			if (row < cnt) {
				var rowData = view[row];
				if (updateCon) {
					if (rowData._rtype == 1) {
						rowData._rtype = 8;
						delRecords[delRecLength] = rowData;
						delRecLength++;
					}
					else if (rowData._rtype == 2) {
						rowData._rtype = 0;
						emptycnt++;
					}
					else if (rowData._rtype == 4) {
						var orgData = rowData._orgrow;
						var colcnt = pthis.colinfos.length;
						for (var col = 0; col < colcnt; col++) {
							rowData[col] = orgData[col];
						}
						delete rowData._orgrow;
						rowData._rtype = 8;
						delRecords[delRecLength] = rowData;
						delRecLength++;
					}
				}
				else {
					rowData._rtype = 0;
					emptycnt++;
				}
				row++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
			if (_deleteAll_loop(this)) {
				break;
			}
		}

		if (this._rawRecords == this._viewRecords) {
			this._viewRecords = [];
		}
		else {
			this._viewRecords.splice(0, this._viewRecords.length);
		}

		if (emptycnt > 0) {
			this._removeEmptyRows();
		}
		this.rowcount = 0;
		return cnt;
	};

	_pDataset._deleteMultiRows = function (del_rows) {
		var view = this._viewRecords;
		if (this._rawRecords == view) {
			view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		}
		var deleted = this._deletedRecords;
		var cnt = view.length;
		var newView = [];
		var delcnt = 0;
		var rowData;
		var delRowData;
		var row = 0;
		var delRow = -1;
		var delRecLength = deleted.length;
		var nViewLength = 0;

		function _deleteMultiRows_loop (pthis) {
			if (row < cnt) {
				delRow = del_rows[delcnt];
				rowData = view[row];
				delRowData = view[delRow];
				if (rowData == delRowData) {
					if (pthis.updatecontrol) {
						if (rowData._rtype == 1) {
							rowData._rtype = 8;
							deleted[delRecLength] = rowData;
							delRecLength++;
							delcnt++;
						}
						else if (rowData._rtype == 2) {
							rowData._rtype = 0;
							pthis._removeEmptyRows();
							delcnt++;
						}
						else if (rowData._rtype == 4) {
							var orgData = rowData._orgrow;
							var colcnt = pthis.colinfos.length;
							for (var col = 0; col < colcnt; col++) {
								rowData[row] = orgData[col];
							}
							delete rowData._orgrow;
							rowData._rtype = 8;
							deleted[delRecLength] = rowData;
							delRecLength++;
							delcnt++;
						}
					}
					else {
						rowData._rtype = 0;
						pthis._removeEmptyRows();
						view.splice(row, 1);
						cnt--;
						row--;
						delcnt++;
					}
				}
				else {
					newView[nViewLength] = rowData;
					nViewLength++;
				}
				row++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
			if (_deleteMultiRows_loop(this)) {
				break;
			}
		}
		delete delRecLength;
		delete nViewLength;

		if (delcnt > 0) {
			if (this._rawRecords != this._viewRecords) {
				this._viewRecords.splice(0, this._viewRecords.length);
			}
			this._viewRecords = newView;
		}

		newView = null;
		return delcnt;
	};

	_pDataset._filterRow = function (row) {
		var view = this._viewRecords;
		if (row >= view.length) {
			return false;
		}

		if (this._rawRecords == view) {
			view = this._viewRecords = this._rawRecords.slice(0, this._rawRecords.length);
		}
		view.splice(row, 1);
		this._adjustGroupRowData(row);
		this.rowcount = this._viewRecords.length;
		return true;
	};

	_pDataset._updateColumn = function (row, rowData, idx, value) {
		var oldVal = rowData[idx];
		if (oldVal === value || rowData._rtype == 16) {
			return false;
		}

		if (rowData._rtype == 1 && this.updatecontrol) {
			var orgrowData = [];
			var len = rowData.length;
			var i = 0;
			function _updateColumn_loop () {
				if (i < len) {
					orgrowData[i] = rowData[i];
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
				if (_updateColumn_loop()) {
					break;
				}
			}
			rowData._orgrow = orgrowData;
			rowData._rtype = 4;

			orgrowData = null;
		}
		else if (rowData._rtype == 4 && this.updatecontrol) {
			if (rowData._orgrow) {
				var cnt = this.colinfos.length;
				rowData[idx] = value;
				if (rowData._orgcolstrings) {
					rowData._orgcolstrings[idx] = value;
				}

				var _rtypechange = true;
				for (var j = 0; j < cnt; j++) {
					if (!(rowData[j] == "" && rowData._orgrow[j] == undefined)) {
						if (rowData[j] instanceof nexacro.Decimal && rowData._orgrow[j] instanceof nexacro.Decimal) {
							if (rowData[j].isEqual(rowData._orgrow[j]) == false) {
								_rtypechange = false;
								break;
							}
						}
						else if (rowData[j] instanceof nexacro.Date && rowData._orgrow[j] instanceof nexacro.Date) {
							if (rowData[j].valueOf() != rowData._orgrow[j].valueOf()) {
								_rtypechange = false;
								break;
							}
						}
						else if (rowData[j] != rowData._orgrow[j]) {
							_rtypechange = false;
							break;
						}
					}
				}

				if (_rtypechange == true) {
					delete rowData["_orgrow"];
					rowData._rtype = 1;
				}
			}
		}

		rowData[idx] = value;
		if (rowData._orgcolstrings) {
			rowData._orgcolstrings[idx] = value;
		}
		this._updateGroupRowData(row);
		return true;
	};

	_pDataset._setLayout = function (ds) {
		this.colinfos = ds.colinfos;
		this._constVars = ds._constVars;
	};

	_pDataset._setRawData = function (rawData, deletedData) {
		this._rawRecords = rawData;
		this._viewRecords = this._rawRecords;
		this._deletedRecords = deletedData;
	};

	_pDataset._createExprFunc = function (expr_str) {
		var parser = new nexacro.ExprParser();
		var conv_expr = parser.makeExpr(this, expr_str);
		var exprfn = nexacro._createInlineFunc(conv_expr, ["currow", "rowidx", "comp", "dataset", "curcol"]);
		return exprfn;
	};

	_pDataset._getColumnSize = function (col) {
		if ((+col) != (+col)) {
			if (this.colinfos[col]) {
				return this.colinfos[col].size;
			}
			else if (this._conVars[col]) {
				return this._colVars[col].size;
			}
			else {
				return undefined;
			}
		}
		else {
			if (col < 0 || col >= this.colcount) {
				return undefined;
			}

			var cLen = this.colinfos.length;
			if (this.colinfos[col]) {
				return this.colinfos[col].size;
			}
			else {
				return this._colVars[col - cLen].size;
			}
		}
	};

	_pDataset._getColumnType = function (idx) {
		if (idx in this.colinfos) {
			return this.colinfos[idx].ntype;
		}

		if (idx in this._constVars) {
			var val = this._constVars[idx];
			var type = (typeof val);
			if (type == "number") {
				return 2;
			}
			return nexacro.DataUtils._typecodes[type];
		}
	};

	_pDataset._isConstColumn = function (col) {
		if ((+col) != (+col)) {
			if (this._constVars[col]) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			var cLen = this.colinfos.length;
			if (col < this.colcount && col >= cLen) {
				return true;
			}
			else {
				return false;
			}
		}
	};

	_pDataset._copyConstColList = function (constVars) {
		if (constVars._type_name == "VariableList") {
			var len = constVars.length;
			var cnt = 0;
			var idx = this._constVars.length;
			if (len > 0) {
				var i = 0;
				function _copyConstColList_loop (pthis) {
					if (i < len) {
						var id = constVars.get_id(i);
						if ((id in pthis.colinfos) || (id in pthis._constVars)) {
							i++;
							return false;
						}

						pthis._constVars.add(id, constVars[i]);

						idx++;
						cnt++;
						i++;
						return false;
					}
					return true;
				}
				while (true) {
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
					if (_copyConstColList_loop(this)) {
						break;
					}
				}
				if (cnt > 0) {
					this.count += cnt;
					this.constcount += cnt;
				}
			}
			return cnt;
		}
		return 0;
	};
	_pDataset._copyRowList = function (srcRecords) {
		var len = srcRecords.length;
		var cnt = 0;
		var idx = this._rawRecords.length;

		var viewRecLength = this._viewRecords.length;
		var rawRecLength = this._rawRecords.length;
		var i = 0;
		function _copyRowList_loop (pthis) {
			if (i < len) {
				var srcData = srcRecords[i];
				var level = srcData._level;
				var rtype = srcData._rtype;

				if ((level == 0) && (rtype == 1 || rtype == 2 || rtype == 4)) {
					var rowData = [];
					rowData._level = 0;
					rowData._rawidx = idx;
					rowData._rtype = 1;

					var count = srcData.length;
					for (var j = 0; j < count; j++) {
						rowData[j] = srcData[j];
					}

					if (pthis._rawRecords != pthis._viewRecords) {
						pthis._viewRecords[viewRecLength] = rowData;
						viewRecLength++;
					}

					pthis._rawRecords[rawRecLength] = rowData;
					rawRecLength++;
					rowData = null;
				}

				srcData = null;
				idx++;
				cnt++;
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
			if (_copyRowList_loop(this)) {
				break;
			}
		}
		delete rawRecLength;
		delete viewRecLength;

		return cnt;
	};
	_pDataset._copyData = function (srcds, isFiltered) {
		if (this.name == undefined) {
			this.id = this.name = srcds.id;
		}

		this._copyConstColList(srcds._constVars);
		this._appendColList(srcds.colinfos);

		if (isFiltered == true) {
			if (srcds._viewRecords.length > 0) {
				this._copyRowList(srcds._viewRecords);
			}
		}
		else {
			if (srcds._rawRecords.length > 0) {
				this._copyRowList(srcds._rawRecords);
			}
		}

		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = this._viewRecords.length;
	};

	_pDataset._mergeData = function (srcds) {
		var len = srcds._rawRecords.length;
		var cnt = 0;
		var start = this._rawRecords.length;
		var idx = start;
		var count = this.colinfos.length;

		var viewRecLength = this._viewRecords.length;
		var rawRecLength = this._rawRecords.length;

		var i = 0;
		function _mergeData_loop (pthis) {
			if (i < len) {
				var srcData = srcds._rawRecords[i];
				var level = srcData._level;
				var rtype = srcData._rtype;

				if ((level == 0) && (rtype == 1 || rtype == 2 || rtype == 4)) {
					var rowData = [];
					rowData._level = 0;
					rowData._rawidx = idx;
					rowData._rtype = 1;

					if (pthis._rawRecords != pthis._viewRecords) {
						pthis._viewRecords[viewRecLength] = rowData;
						viewRecLength++;
					}

					pthis._rawRecords[rawRecLength] = rowData;
					rawRecLength++;

					for (var j = 0; j < count; j++) {
						var id = pthis.colinfos.get_id(j);
						var srcidx = srcds.colinfos.indexOf(id);

						if (srcidx != null) {
							rowData[j] = pthis.colinfos[j]._fromVal(srcData[srcidx]);
						}
					}
					idx++;
					cnt++;
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
			if (_mergeData_loop(this)) {
				break;
			}
		}
		delete viewRecLength;
		delete rawRecLength;

		if (cnt > 0) {
			this.rowcount += cnt;
		}

		return cnt;
	};

	_pDataset._appendConstColList = function (constVars, chkcol) {
		if (constVars._type_name == "VariableList") {
			var len = this._constVars.length;
			var cnt = 0;
			var mincount = Math.min(len, constVars.length);

			if (len > 0) {
				if (chkcol) {
					var i = 0;
					function _appendConstColList_loop (pthis) {
						if (i < len) {
							var id = pthis._constVars.get_id(i);
							var srcidx = constVars.indexOf(id);

							if (srcidx != null) {
								pthis._constVars.set_item(i, constVars[srcidx]);
								cnt++;
							}
							i++;
							return false;
						}
						return true;
					}
					while (true) {
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
						if (_appendConstColList_loop(this)) {
							break;
						}
					}
				}
				else {
					var i = 0;
					function _appendConstColList_loop2 (pthis) {
						if (i < mincount) {
							pthis._constVars.set_item(i, constVars[i]);
							cnt++;
							i++;
							return false;
						}
						return true;
					}
					while (true) {
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
						if (_appendConstColList_loop2(this)) {
							break;
						}
					}
				}
			}
			return cnt;
		}
		return 0;
	};
	_pDataset._appendRowList = function (srcds, chkcol) {
		var len = srcds._viewRecords.length;

		var cnt = 0;
		var idx = this._rawRecords.length;
		var count = this.colinfos.length;
		var mincount = Math.min(count, srcds._rawRecords[0].length);

		var viewRecLength = this._viewRecords.length;
		var rawRecLength = this._rawRecords.length;

		var i = 0;
		function _appendRowList_loop (pthis) {
			if (i < len) {
				var srcData = srcds._viewRecords[i];
				var level = srcData._level;
				var rtype = srcData._rtype;

				if ((level == 0) && (rtype == 1 || rtype == 2 || rtype == 4)) {
					var rowData = [];
					rowData._level = 0;
					rowData._rawidx = idx;
					rowData._rtype = 1;

					if (chkcol == true || chkcol == "true") {
						var j = 0;
						function _appendRowList_loop2 () {
							if (j < count) {
								var id = pthis.colinfos.get_id(j);
								var srcidx = srcds.colinfos.indexOf(id);

								if (srcidx != null) {
									rowData[j] = nexacro.DataUtils.convert(srcData[srcidx], pthis.colinfos[j].ntype);
								}
								j++;
								return false;
							}
							return true;
						}
						while (true) {
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
							if (_appendRowList_loop2()) {
								break;
							}
						}
					}
					else {
						var j = 0;
						function _appendRowList_loop3 () {
							if (j < mincount) {
								rowData[j] = nexacro.DataUtils.convert(srcData[j], pthis.colinfos[j].ntype);
								j++;
								return false;
							}
							return true;
						}
						while (true) {
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
							if (_appendRowList_loop3()) {
								break;
							}
						}
					}

					if (pthis._rawRecords != pthis._viewRecords) {
						pthis._viewRecords[viewRecLength] = rowData;
						viewRecLength++;
					}

					pthis._rawRecords[rawRecLength] = rowData;
					rawRecLength++;
				}

				idx++;
				cnt++;
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
			if (_appendRowList_loop(this)) {
				break;
			}
		}
		delete viewRecLength;
		delete rawRecLength;

		return cnt;
	};
	_pDataset._appendData = function (srcds, chkcol, bupdateconst) {
		if (this.colcount == 0) {
			this._appendColList(srcds.colinfos);

			if (bupdateconst == true) {
				this._copyConstColList(srcds._constVars);
			}
		}
		else {
			if (bupdateconst == true && srcds._constVars.length > 0) {
				this._appendConstColList(srcds._constVars, chkcol);
			}
		}

		if (srcds._viewRecords.length > 0) {
			this._appendRowList(srcds, chkcol);
		}

		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = this._viewRecords.length;
	};

	_pDataset._bWorkingstatus = false;
	_pDataset._endLoad = function (errorcode, errormsg, reason) {
		this._bWorkingstatus = true;
		this._reFilter();
		this._resetSortGroup();
		if (this._eventstat) {
			this.on_fire_onload(errorcode, errormsg, reason);

			if (this._viewRecords && this._viewRecords.length > 0) {
				var newpos = 0;
				if (newpos >= this.rowcount) {
					newpos = -1;
				}
				var oldpos = this.rowposition;
				if (newpos != oldpos) {
					if (this.onrowposchanged && this.onrowposchanged._has_handlers) {
						var evt = new nexacro.DSRowPosChangeEventInfo(this, "onrowposchanged", oldpos, newpos, 51);
						if (newpos >= 0 || newpos < this.rowcount) {
							this.rowposition = newpos;
							if (newpos != oldpos) {
								this.on_fire_onrowposchanged(evt);
							}
						}
					}
					else {
						this.rowposition = newpos;
					}
				}
				if (this.onvaluechanged && this.onvaluechanged._has_handlers) {
					var evt = new nexacro.DSColChangeEventInfo(this, "onvaluechanged", this.rowposition, -1, -1, "", undefined, undefined);
					this.on_fire_onvaluechanged(evt);
				}
			}
		}
		else if (this._viewRecords.length > 0) {
			this.rowposition = 0;
		}

		this._bWorkingstatus = false;
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
		_pDataset._setContents = function (contents) {
			var strxml = "<Dataset id=\"" + this.id + "\">" + contents + "</Dataset>";
			if (strxml.length) {
				var doc = nexacro._parseXMLDocument(strxml);
				if (doc) {
					if (doc.nodeName == "Dataset") {
						this._loadFromDOM(doc);
					}
					else {
						var datasets = doc.getElementsByTagName("Dataset");
						this._loadFromDOM(datasets[0]);
					}
					this.rowposition = -1;
				}
				doc = null;
			}

			this.updateSortGroup();

			if (this.parent && (this.parent != application && this.parent._is_form == false)) {
				this.on_created();
			}
		};
	}
	else {
		_pDataset._setContents = function (contents) {
			if (contents.length) {
				this._loadFromXMLStr(contents);
				this.rowposition = -1;
			}

			this.updateSortGroup();

			if (this.parent && (this.parent != application && this.parent._is_form == false)) {
				this.on_created();
			}
		};
	}

	_pDataset._loadFromDOM = function (dsDOM, curIdx, loadCnt, bOrgLayout, bClear) {
		this.loadstatus = true;
		this._eventstat = !this.loadstatus && this.enableevent;

		if (bClear) {
			if (bOrgLayout) {
				this._clearData();
			}
			else {
				this._clearAll();
			}
		}

		if (dsDOM == null) {
			this.loadstatus = false;
			this._eventstat = this.enableevent;

			return 0;
		}
		if (!curIdx) {
			curIdx = 0;
		}
		if (!loadCnt) {
			loadCnt = -1;
		}

		this._setColInfoFromDOM(dsDOM, bOrgLayout);

		curIdx = this._loadRecordFromDOM(dsDOM, curIdx, loadCnt);

		var viewRecords = this._viewRecords;
		var delRecords = this._deletedRecords;
		var rawRecords = this._rawRecords;

		if (delRecords.length > 0) {
			viewRecords = this._viewRecords = [];
			var len = rawRecords.length;
			var viewRecLength = viewRecords.length;
			var i = 0;

			function _loadFromDOM_delrow_loop () {
				if (i < len) {
					_currowData = rawRecords[i];
					if (_currowData._rtype != 8) {
						viewRecords[viewRecLength] = _currowData;
						viewRecLength++;
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
				if (_loadFromDOM_delrow_loop()) {
					break;
				}
			}
		}
		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = viewRecords.length;

		this.loadstatus = false;
		this._eventstat = this.enableevent;

		viewRecords = null;
		delRecords = null;
		rawRecords = null;

		return curIdx;
	};

	_pDataset._setColInfoFromDOM = function (dsDOM, bOrgLayout) {
		var i, col, colIdx, len, cnt, orgcnt, _rowElems, _colElems, _rowElem, _orgrowElems, _orgrowElem, _colElem, _colMap, id, type;

		if (bOrgLayout) {
			;
		}
		else {
			_colElems = dsDOM.getElementsByTagName("ConstColumn");
			len = (_colElems ? _colElems.length : 0);
			i = 0;
			function _loadFromDOM_const_loop (pthis) {
				if (i < len) {
					_colElem = _colElems[i];
					id = _colElem.getAttribute("id");
					if (id.length) {
						pthis._addConstColumn(id, _colElem.getAttribute("value"), _colElem.getAttribute("type"));
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
				if (_loadFromDOM_const_loop(this)) {
					break;
				}
			}

			_colElems = dsDOM.getElementsByTagName("Column");
			len = (_colElems ? _colElems.length : 0);
			i = 0;
			function _loadFromDOM_col_loop (pthis) {
				if (i < len) {
					_colElem = _colElems[i];
					id = _colElem.getAttribute("id");
					if (id.length) {
						pthis._addColumn(id, _colElem.getAttribute("type"), _colElem.getAttribute("size"), _colElem.getAttribute("prop"), _colElem.getAttribute("sumtext"));
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
				if (_loadFromDOM_col_loop(this)) {
					break;
				}
			}
			_colElems = null;
		}
	};

	_pDataset._loadRecordFromDOM = function (dsDOM, curIdx, loadCnt) {
		var colList = this.colinfos;
		var curCol;

		var _rowElems, _colElems;

		_rowElems = dsDOM.getElementsByTagName("Row");
		var cnt = (_rowElems ? _rowElems.length : 0);

		var rawRecords = this._rawRecords;
		var delRecords = this._deletedRecords;
		var rawRecLength = rawRecords.length;
		var delRecLength = delRecords.length;
		var colCnt = colList.length;

		function _loadFromDOM_row_loop () {
			if (curIdx < cnt) {
				var _currowData = new Array(colCnt);
				_currowData._rawidx = curIdx;
				_currowData._level = 0;

				var _colInfo;
				for (var icheck = 0; icheck < colCnt; icheck++) {
					_colInfo = colList[icheck];
					if (_colInfo.ntype >= 4 && _colInfo.ntype <= 7) {
						_currowData[_colInfo._index] = null;
					}
				}

				_rowElem = _rowElems[curIdx];
				type = _rowElem.getAttribute("type");

				if (type == null) {
					_currowData._rtype = 1;
				}
				else if (type.charAt(0) == 'I' || type.charAt(0) == 'i') {
					_currowData._rtype = 2;
				}
				else if (type.charAt(0) == 'U' || type.charAt(0) == 'u') {
					_currowData._rtype = 4;
				}
				else if (type.charAt(0) == 'D' || type.charAt(0) == 'd') {
					_currowData._rtype = 8;
				}
				else {
					_currowData._rtype = 1;
				}
				_colElems = _rowElem.getElementsByTagName("Col");
				len = (_colElems ? _colElems.length : 0);

				var _textElem;
				for (j = 0; j < len; j++) {
					_colElem = _colElems[j];
					id = _colElem.getAttribute("id");

					curCol = colList[id];
					if (curCol) {
						_textElem = _colElem.firstChild;
						if (_textElem) {
							_currowData[curCol._index] = curCol._fromText(_textElem.nodeValue);
						}
						else {
							_currowData[curCol._index] = "";
						}
					}
				}
				_colElems = null;

				if (_currowData._rtype == 4) {
					_orgrowElems = _rowElem.getElementsByTagName("OrgRow");
					orgcnt = (_orgrowElems ? _orgrowElems.length : 0);
					if (orgcnt) {
						var _orgrowData = new Array(colCnt);
						for (var iicheck = 0; iicheck < colCnt; iicheck++) {
							if (colList[iicheck].ntype >= 4 && colList[iicheck].ntype <= 7) {
								_orgrowData[colList[iicheck]._index] = null;
							}
						}

						_colElems = _orgrowElems[0].getElementsByTagName("Col");
						len = (_colElems ? _colElems.length : 0);

						for (j = 0; j < len; j++) {
							_colElem = _colElems[j];
							id = _colElem.getAttribute("id");
							curCol = colList[id];
							if (curCol) {
								_textElem = _colElem.firstChild;
								if (_textElem) {
									_orgrowData[curCol._index] = curCol._fromText(_textElem.nodeValue);
								}
							}
						}
						_currowData._orgrow = _orgrowData;
					}
				}

				if (_currowData._rtype == 8) {
					delRecords[delRecLength] = _currowData;
					delRecLength++;
				}

				rawRecords[rawRecLength] = _currowData;
				rawRecords[rawRecLength]._orgcolstrings = _currowData;

				rawRecLength++;
				curIdx++;
				_currowData = null;

				if (loadCnt > 0 && (rawRecLength - delRecLength) == loadCnt) {
					return true;
				}

				return false;
			}
			return true;
		}
		while (true) {
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
			if (_loadFromDOM_row_loop()) {
				break;
			}
		}
		_rowElems = null;
		_colElems = null;
		rawRecords = null;
		delRecords = null;

		delete rawRecLength;
		delete delRecLength;

		return curIdx;
	};


	_pDataset._setColInfoFromXMLStr = function (xmlStr) {
		var xml_parse_pos = 0;
		var colInfo = nexacro._getXMLTagData(xmlStr, xml_parse_pos, "<ColumnInfo>", "</ColumnInfo>");
		if (colInfo) {
			xml_parse_pos = colInfo[3];
			var colinfoData = colInfo[0];

			var const_parse_pos = 0;
			function _loadFromXMLStr_const_loop (pthis) {
				var constVar = nexacro._getXMLTagData2(colinfoData, const_parse_pos, "<ConstColumn ", "</ConstColumn>");
				if (constVar == null) {
					return true;
				}
				const_parse_pos = constVar[3];
				var attrStr = constVar[1];
				var id = nexacro._getXMLAttributeID(attrStr);
				var value = nexacro._getXMLAttributeData(attrStr, "value");
				if (id.length) {
					var type = nexacro._getXMLAttributeType(attrStr);
					var size = nexacro._getXMLAttributeData(attrStr, "size");
					pthis._addConstColumn(id, nexacro._decodeXml(value), type, size);
				}
				return false;
			}
			while (true) {
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_const_loop(this)) {
					break;
				}
			}

			var colinfo_parse_pos = 0;
			function _loadFromXMLStr_col_loop (pthis) {
				var colInfo = nexacro._getXMLTagData4(colinfoData, colinfo_parse_pos, "<Column ");
				if (colInfo == null) {
					return true;
				}
				colinfo_parse_pos = colInfo[3];
				var attrStr = colInfo[1];
				var id = nexacro._getXMLAttributeID(attrStr);
				if (id && id.length) {
					var type = nexacro._getXMLAttributeType(attrStr);
					var size = nexacro._getXMLAttributeData(attrStr, "size");
					var prop = nexacro._getXMLAttributeData(attrStr, "prop");
					var sumtext = nexacro._getXMLAttributeData(attrStr, "sumtext");
					pthis._addColumn(id, type, size, prop, sumtext);
				}
				return false;
			}
			while (true) {
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
				if (_loadFromXMLStr_col_loop(this)) {
					break;
				}
			}
		}

		return xml_parse_pos;
	};

	_pDataset._loadRecordFromXMLStr = function (xmlStr, xml_parse_pos, loadCnt) {
		var colList = this.colinfos;
		var rawRecords = this._rawRecords;
		var delRecords = this._deletedRecords;
		var rawRecLength = rawRecords.length;
		var delRecLength = delRecords.length;
		var colCnt = colList.length;

		var rowidx = 0;

		if (xml_parse_pos > -1) {
			function _loadFromXMLStr_row_loop () {
				var rowData;
				var attrStr;
				var rowInfo = nexacro._getXMLTagData3(xmlStr, xml_parse_pos, "<Row", "</Row>");
				if (rowInfo == null) {
					return true;
				}
				xml_parse_pos = rowInfo[3];
				rowData = rowInfo[0];
				attrStr = rowInfo[1];

				var _currowData = new Array(colCnt);
				_currowData._rawidx = rowidx;
				_currowData._level = 0;
				_currowData._orgcolstrings = [];

				for (var i = 0; i < colCnt; i++) {
					if (colList[i].ntype >= 4 && colList[i].ntype <= 7) {
						_currowData[colList[i]._index] = undefined;
					}
				}

				rowidx++;

				if (attrStr) {
					var type = nexacro._getXMLAttributeType(attrStr);
					if (!type) {
						_currowData._rtype = 1;
					}
					else {
						var typeChar = type.charAt(0);
						if (typeChar == 'I' || typeChar == 'i') {
							_currowData._rtype = 2;
						}
						else if (typeChar == 'U' || typeChar == 'u') {
							_currowData._rtype = 4;
						}
						else if (typeChar == 'D' || typeChar == 'd') {
							_currowData._rtype = 8;
						}
						else {
							_currowData._rtype = 1;
						}
					}
				}
				else {
					_currowData._rtype = 1;
				}

				if (_currowData._rtype == 4) {
					var orgRowInfo = nexacro._getXMLTagData(rowData, 0, "<OrgRow>", "</OrgRow>");
					if (orgRowInfo) {
						rowData = rowData.substring(0, orgRowInfo[2]) + rowData.substring(orgRowInfo[3]);

						var orgData = orgRowInfo[0];

						var _orgrowData = new Array(colCnt);

						for (var ii = 0; ii < colCnt; ii++) {
							if (colList[ii].ntype >= 4 && colList[ii].ntype <= 7) {
								_orgrowData[colList[ii]._index] = null;
							}
						}

						var org_parse_pos = 0;
						function _loadFromXMLStr_colvalue_loop2 () {
							var colInfo = nexacro._getXMLTagData2(orgData, org_parse_pos, "<Col ", "</Col>");
							if (colInfo == null) {
								return true;
							}
							org_parse_pos = colInfo[3];
							var attrStr = colInfo[1];

							var id = nexacro._getXMLAttributeID(attrStr);
							var curCol = colList[id];
							if (curCol) {
								_orgrowData[curCol._index] = curCol._fromXMLText(colInfo[0]);
							}
							return false;
						}

						while (true) {
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
							if (_loadFromXMLStr_colvalue_loop2()) {
								break;
							}
						}
						_currowData._orgrow = _orgrowData;
					}
				}

				var row_parse_pos = 0;
				function _loadFromXMLStr_colvalue_loop () {
					if (rowData) {
						var colInfo = nexacro._getXMLTagData2(rowData, row_parse_pos, "<Col ", "</Col>");
						if (colInfo == null) {
							return true;
						}

						row_parse_pos = colInfo[3];
						var attrStr = colInfo[1];

						var id = nexacro._getXMLAttributeID(attrStr);
						var curCol = colList[id];
						if (curCol) {
							_currowData[curCol._index] = curCol._fromXMLText(colInfo[0]);
							_currowData._orgcolstrings[curCol._index] = _currowData[curCol._index];
						}
						return false;
					}
					return true;
				}

				while (true) {
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
					if (_loadFromXMLStr_colvalue_loop()) {
						break;
					}
				}

				if (_currowData._rtype == 8) {
					delRecords[delRecLength] = _currowData;
					delRecLength++;
				}
				rawRecords[rawRecLength] = _currowData;
				rawRecLength++;

				rowData = null;
				attrStr = null;
				rowInfo = null;
				_currowData = null;

				if (loadCnt > 0 && (rawRecLength - delRecLength) == loadCnt) {
					return true;
				}

				return false;
			}

			while (true) {
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
				if (_loadFromXMLStr_row_loop()) {
					break;
				}
			}
		}

		rawRecords = null;
		delRecords = null;

		return xml_parse_pos;
	};

	_pDataset._loadFromXMLStr = function (xmlStr, xml_parse_pos, loadCnt, bOrgLayout, bClear) {
		this.loadstatus = true;
		this._eventstat = !this.loadstatus && this.enableevent;

		if (!xml_parse_pos) {
			xml_parse_pos = 0;
		}

		if (!loadCnt) {
			loadCnt = -1;
		}

		if (bClear) {
			if (bOrgLayout) {
				this._clearData();
			}
			else {
				this._clearAll();
			}
		}

		if (!xmlStr) {
			this.loadstatus = false;
			this._eventstat = this.enableevent;

			return 0;
		}

		if (bOrgLayout) {
			if (xml_parse_pos <= 0) {
				xml_parse_pos = xmlStr.indexOf("<Rows>");
				if (xml_parse_pos > -1) {
					xml_parse_pos += 6;
				}
			}
		}
		else {
			if (xml_parse_pos <= 0) {
				xml_parse_pos = this._setColInfoFromXMLStr(xmlStr);
				xml_parse_pos = xmlStr.indexOf("<Rows>", xml_parse_pos);
				if (xml_parse_pos > -1) {
					xml_parse_pos += 6;
				}
			}
		}

		if (xml_parse_pos > -1) {
			xml_parse_pos = this._loadRecordFromXMLStr(xmlStr, xml_parse_pos, loadCnt);
		}

		var viewRecords = this._viewRecords;
		var rawRecords = this._rawRecords;
		var delRecords = this._deletedRecords;
		var colList = this.colinfos;

		if (delRecords.length > 0) {
			viewRecords = this._viewRecords = [];
			var rowCnt = rawRecords.length;
			var viewRecLength = viewRecords.length;
			var i = 0;

			function _loadFromXMLStr_delrow_loop () {
				if (i < rowCnt) {
					var _currowData = rawRecords[i];
					if (_currowData._rtype != 8) {
						viewRecords[viewRecLength] = _currowData;
						viewRecLength++;
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
				if (_loadFromXMLStr_delrow_loop()) {
					break;
				}
			}
		}
		else {
			this._viewRecords = this._rawRecords;
		}

		this.constcount = this._constVars.length;
		this.colcount = colList.length + this.constcount;
		this.rowcount = viewRecords.length;

		this.loadstatus = false;
		this._eventstat = this.enableevent;


		viewRecords = null;
		rawRecords = null;
		delRecords = null;
		colList = null;

		return xml_parse_pos;
	};


	_pDataset._loadFromPPXArray = function (ppxColLines, ppxLines, curIdx, loadCnt, bOrgLayout, bClear) {
		var _cs_ = String.fromCharCode(31);

		this.loadstatus = true;
		this._eventstat = !this.loadstatus && this.enableevent;

		if (bClear) {
			if (bOrgLayout) {
				this._clearData();
			}
			else {
				this._clearAll();
			}
		}

		if (!ppxColLines || ppxColLines.length == 0) {
			this.loadstatus = false;
			this._eventstat = this.enableevent;

			return curIdx;
		}
		this._setColInfoFromPPXLines(ppxColLines, bOrgLayout);

		curIdx = this._loadRecordFromPPXLines(ppxLines, curIdx, loadCnt);
		var delRecords_len = this._deletedRecords.length;

		if (delRecords_len) {
			var viewRecords = this._viewRecords = [];
			var rawRecords = this._rawRecords;
			len = rawRecords.length;
			var viewRecLength = viewRecords.length;
			var i = 0;
			function _loadFromPPXArray_delrow_loop () {
				if (i < len) {
					var _currowData = rawRecords[i];
					if (_currowData._rtype != 8) {
						viewRecords[viewRecLength] = _currowData;
						viewRecLength++;
					}

					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
				if (_loadFromPPXArray_delrow_loop()) {
					break;
				}
			}
		}
		else {
			this._viewRecords = this._rawRecords;
		}


		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = this._viewRecords.length;

		this.loadstatus = false;
		this._eventstat = this.enableevent;

		return curIdx;
	};

	_pDataset._getColLinesFromPPXLines = function (ppxLines, curIdx) {
		var lineCnt = ppxLines.length;
		var idx = curIdx;

		while (true) {
			var type = ppxLines[idx].charAt(0);
			if (idx < lineCnt && (type == "C" || type == "V")) {
				idx++;
			}
			else {
				break;
			}
		}

		return ppxLines.slice(curIdx, idx);
	};

	_pDataset._setColInfoFromPPXLines = function (colLines, bOrgLayout) {
		var _cs_ = String.fromCharCode(31);

		var _convertFn = null;
		var lineCnt = colLines.length;
		var idx = 0;

		if (!bOrgLayout) {
			function _setColInfoFromPPXLines_loop (pthis) {
				if (idx < lineCnt) {
					var curStr = colLines[idx];
					var curType = curStr.charAt(0);
					if (curType == 'V') {
						var valArr = curStr.split(_cs_);
						pthis._addConstColumn(valArr[1], valArr[3], valArr[2]);
						idx++;
						return false;
					}
					else if (curType == 'C') {
						var valArr = curStr.split(_cs_);
						pthis._addColumn(valArr[1], valArr[2], valArr[3], valArr[4], valArr[5]);
						idx++;
						return false;
					}
					return true;
				}
				return true;
			}
			while (true) {
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
				if (_setColInfoFromPPXLines_loop(this)) {
					break;
				}
			}
		}
	};

	_pDataset._loadRecordFromPPXLines = function (ppxLines, curIdx, loadCnt) {
		var _cs_ = String.fromCharCode(31);

		var colList = this.colinfos;
		var rawRecords = this._rawRecords;
		var delRecords = this._deletedRecords;
		var rawRecLength = rawRecords.length;
		var delRecLength = delRecords.length;
		var colCnt = colList.length;

		var lineCnt = ppxLines.length;

		var rowidx = 0;
		if (curIdx < lineCnt) {
			function _loadRecordFromPPXLines_row_loop () {
				if (curIdx < lineCnt) {
					var curStr = ppxLines[curIdx];
					var curType = curStr.charAt(0);

					if (curType == 'n' || curType == 'i' || curType == 'u' || curType == 'd') {
						var _currowData = new Array(colCnt);
						_currowData._rawidx = rowidx;
						_currowData._level = 0;
						rowidx++;

						if (curType == 'i') {
							_currowData._rtype = 2;
						}
						else if (curType == 'u') {
							_currowData._rtype = 4;
						}
						else if (curType == 'd') {
							_currowData._rtype = 8;
						}
						else {
							_currowData._rtype = 1;
						}
					}
					else if (curType == 'o') {
						curIdx++;
						return false;
					}
					else {
						return true;
					}

					var valArr = curStr.split(_cs_);
					var valCnt = valArr.length;
					var j = 1;

					for (var i = 0; i < valArr.length; i++) {
						if (valArr[i] == String.fromCharCode(3)) {
							valArr[i] = undefined;
						}
					}

					function _loadRecordFromPPXLines_colvalue_loop () {
						if (j < valCnt) {
							var id = valArr[j];
							var curCol = colList[id];
							if (curCol) {
								_currowData[curCol._index] = curCol._fromText(valArr[j + 1]);
							}
							j += 2;
							return false;
						}
						return true;
					}
					while (true) {
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
						if (_loadRecordFromPPXLines_colvalue_loop()) {
							break;
						}
					}

					if (_currowData._rtype == 8) {
						delRecords[delRecLength] = _currowData;
						delRecLength++;
					}

					rawRecords[rawRecLength] = _currowData;
					rawRecords[rawRecLength]._orgcolstrings = _currowData;
					rawRecLength++;
					curIdx++;

					if (loadCnt > 0 && (rawRecLength - delRecLength) == loadCnt) {
						return true;
					}
					return false;
				}

				return true;
			}
			while (true) {
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
				if (_loadRecordFromPPXLines_row_loop()) {
					break;
				}
			}
		}

		colList = null;
		rawRecords = null;
		delRecords = null;

		return curIdx;
	};

	_pDataset._TABS = ["", "\t", "\t\t", "\t\t\t", "\t\t\t\t", "\t\t\t\t\t", "\t\t\t\t\t\t", "\t\t\t\t\t\t\t"];
	_pDataset.__writeXMLData = function (list, str, depth) {
		list.push(this._TABS[depth] + str);
	};

	_pDataset.__writeXMLNormalRow = function (list, rowData, depth, bUseOrgColStrings) {
		this.__writeXMLData(list, "<Row>", depth++);
		this.__writeXMLRowData(list, rowData, depth, bUseOrgColStrings);
		this.__writeXMLData(list, "</Row>", --depth);
	};

	_pDataset.__writeXMLCrudRow = function (list, rowData, depth, bUseOrgColStrings) {
		var buffer = "<Row";
		switch (rowData._rtype) {
			case 1:
				break;
			case 2:
				buffer += " type=\"insert\"";
				break;
			case 4:
				buffer += " type=\"update\"";
				break;
			case 8:
				buffer += " type=\"delete\"";
				break;
		}
		buffer += ">";
		this.__writeXMLData(list, buffer, depth++);

		this.__writeXMLRowData(list, rowData, depth);

		if (rowData._rtype == 4 && rowData._orgrow) {
			this.__writeXMLData(list, "<OrgRow>", depth++);
			this.__writeXMLRowData(list, rowData._orgrow, depth, bUseOrgColStrings);
			this.__writeXMLData(list, "</OrgRow>", --depth);
		}

		this.__writeXMLData(list, "</Row>", --depth);
	};

	_pDataset.__writeXMLRowData = function (list, rowData, depth, bUseOrgColStrings) {
		var n = this.colinfos.length;
		var id;
		var value;
		var i = 0;
		function __writeColData_loop (pthis) {
			if (i < n) {
				id = pthis.colinfos[i].id;
				idx = pthis.colinfos[i]._index;

				if (rowData._orgcolstrings && !!bUseOrgColStrings) {
					value = rowData._orgcolstrings[idx];
				}
				else {
					value = pthis.colinfos[i]._toXMLText(rowData[idx]);
				}

				if (value != null) {
					if (value.length == 0) {
						pthis.__writeXMLData(list, "<Col id=\"" + id + "\" />", depth);
					}
					else {
						pthis.__writeXMLData(list, "<Col id=\"" + id + "\">" + value + "</Col>", depth);
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
			if (__writeColData_loop(this)) {
				break;
			}
		}
	};

	_pDataset.__MakeDataConvertFunc = function () {
		var colinfos = this.colinfos;
		var colLen = colinfos.length;
		var expr = "(function () { return function (arr) { ";
		for (var idx = 0; idx < colLen; idx++) {
			var colinfo = colinfos[idx];
			switch (colinfo.ntype) {
				case 1:
					break;
				case 2:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toIntFromText(arr[" + idx + "]); ";
					break;
				case 3:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toFloatFromText(arr[" + idx + "]); ";
					break;
				case 4:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toDecimalFromText(arr[" + idx + "]); ";
					break;
				case 5:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toDateFromText(arr[" + idx + "]); ";
					break;
				case 6:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toTimeFromText(arr[" + idx + "]); ";
					break;
				case 7:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toDateTimeFromText(arr[" + idx + "]); ";
					break;
				case 8:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toBlobFromText(arr[" + idx + "]); ";
					break;
				default:
					expr += "arr[" + idx + "] = nexacro.DataUtils.toTextFromvariant(arr[" + idx + "]); ";
					break;
			}
		}
		expr += "return arr; }; })();";
		return nexacro._executeEvalStr(expr);
	};

	_pDataset.__ssvMakeDataMappingFunc = function (strColInfo) {
		var _cs_ = String.fromCharCode(31);

		var idMap = {
		};
		var colArr = strColInfo.split(_cs_);
		var colCnt = colArr.length;
		for (var i = 1; i < colCnt; i++) {
			var colItem = colArr[i].split(":");
			var id = colItem[0];
			idMap[id] = i - 1;
		}

		var colinfos = this.colinfos;
		var colLen = colinfos.length;
		var expr = "(function () { return function (arr) { return [";
		for (var i = 0; i < colLen; i++) {
			var colinfo = colinfos[i];
			var idx = idMap[colinfo.id];
			if (idx != null) {
				switch (colinfo.ntype) {
					case 1:
						expr += "arr[" + idx + "]";
						break;
					case 2:
						expr += "nexacro.DataUtils.toIntFromText(arr[" + idx + "])";
						break;
					case 3:
						expr += "nexacro.DataUtils.toFloatFromText(arr[" + idx + "])";
						break;
					case 4:
						expr += "nexacro.DataUtils.toDecimalFromText(arr[" + idx + "])";
						break;
					case 5:
						expr += "nexacro.DataUtils.toDateFromText(arr[" + idx + "])";
						break;
					case 6:
						expr += "nexacro.DataUtils.toTimeFromText(arr[" + idx + "])";
						break;
					case 7:
						expr += "nexacro.DataUtils.toDateTimeFromText(arr[" + idx + "])";
						break;
					case 8:
						expr += "nexacro.DataUtils.toBlobFromText(arr[" + idx + "])";
						break;
					default:
						expr += "nexacro.DataUtils.toTextFromvariant(arr[" + idx + "])";
						break;
				}
			}
			if (i != (colLen - 1)) {
				expr += ",";
			}
		}
		idMap = null;
		expr += "]; }; })();";
		return nexacro._executeEvalStr(expr);
	};

	_pDataset.__ssvSetConstColInfo = function (strColInfo) {
		var _cs_ = String.fromCharCode(31);

		var colArr = strColInfo.split(_cs_);
		var colCnt = colArr.length;
		var i = 0;
		function __ssvSetConstColInfo_loop (pthis) {
			if (i < colCnt) {
				var colItem = colArr[i].split("=");
				var colInfo = colItem[0];
				if (colInfo && colInfo != "_Const_") {
					var value = colItem[1];
					var colInfoArr = colInfo.split(":");
					var id = colInfoArr[0];
					var type = colInfoArr[1];
					if (type) {
						var bSIdx = type.indexOf("(");
						if (bSIdx > -1) {
							type = type.substring(0, bSIdx);
						}
					}
					pthis._addConstColumn(id, value, type);
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
			if (__ssvSetConstColInfo_loop(this)) {
				break;
			}
		}
	};

	_pDataset.__ssvSetColInfo = function (strColInfo) {
		var _cs_ = String.fromCharCode(31);

		var colCnt = 0;
		var colArr = strColInfo.split(_cs_);
		var colCnt = colArr.length;
		var i = 0;
		function __ssvSetColInfo_loop (pthis) {
			if (i < colCnt) {
				var colItem = colArr[i].split(":");
				var id = colItem[0];
				var type, size;
				if (id && id != "_RowType_") {
					var colInfo = colItem[1];
					if (colInfo) {
						var sidx = colInfo.indexOf("(");
						if (sidx > -1) {
							type = colInfo.substring(0, sidx).toUpperCase();
							size = colInfo.substring(sidx + 1, colInfo.indexOf(")", sidx + 1)) | 0;
						}
						else {
							type = colInfo;
						}
					}
					else {
						type = "STRING";
						size = 256;
					}
					pthis._addColumn(id, type, size, colItem[2], colItem[3]);
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
			if (__ssvSetColInfo_loop(this)) {
				break;
			}
		}
		return colCnt;
	};

	_pDataset._loadFromSSVArray = function (ssvColLines, ssvLines, curIdx, loadCnt, bOrgLayout, bClear) {
		var _cs_ = String.fromCharCode(31);

		this.loadstatus = true;
		this._eventstat = !this.loadstatus && this.enableevent;

		if (bClear) {
			if (bOrgLayout) {
				this._clearData();
			}
			else {
				this._clearAll();
			}
		}

		var _convertFn = this._setColInfoFromSSVLines(ssvColLines, bOrgLayout);

		if (!_convertFn) {
			this.loadstatus = false;
			this._eventstat = this.enableevent;

			return curIdx;
		}

		curIdx = this._loadRecordFromSSVLines(ssvLines, curIdx, loadCnt, _convertFn);
		var delRecords_len = this._deletedRecords.length;

		if (delRecords_len) {
			var viewRecords = this._viewRecords = [];
			var rawRecords = this._rawRecords;
			len = rawRecords.length;
			var viewRecLength = viewRecords.length;
			var i = 0;
			function _loadFromSSVArray_viewRecords_loop () {
				if (i < len) {
					var _currowData = rawRecords[i];
					if (_currowData._rtype != 8) {
						viewRecords[viewRecLength] = _currowData;
						viewRecLength++;
					}

					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
				if (_loadFromSSVArray_viewRecords_loop()) {
					break;
				}
			}
		}
		else {
			this._viewRecords = this._rawRecords;
		}


		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = this._viewRecords.length;

		this.loadstatus = false;
		this._eventstat = this.enableevent;

		return curIdx;
	};

	_pDataset._getColLinesFromSSVLines = function (ssvLines, curIdx) {
		var lineCnt = ssvLines.length;
		var idx = curIdx;

		if (idx < lineCnt && ssvLines[idx].substring(0, 7) == "_Const_") {
			idx++;
		}
		if (idx < lineCnt && ssvLines[idx].substring(0, 9) == "_RowType_") {
			idx++;
		}

		return ssvLines.slice(curIdx, idx);
	};

	_pDataset._setColInfoFromSSVLines = function (colLines, bOrgLayout) {
		if (!colLines || colLines.length == 0) {
			return null;
		}

		var _convertFn = null;
		var lineCnt = colLines.length;
		var idx = 0;
		if (bOrgLayout) {
			while (idx < lineCnt && colLines[idx].substring(0, 9) != "_RowType_") {
				idx++;
			}
			if (idx >= lineCnt) {
				return null;
			}
			_convertFn = this.__ssvMakeDataMappingFunc(colLines[idx]);
		}
		else {
			if (idx < lineCnt && colLines[idx].substring(0, 7) == "_Const_") {
				this.__ssvSetConstColInfo(colLines[idx]);
				idx++;
			}
			if (idx > lineCnt) {
				return null;
			}
			if (idx < lineCnt && colLines[idx].substring(0, 9) == "_RowType_") {
				this.__ssvSetColInfo(colLines[idx]);
				idx++;
			}
			if (idx > lineCnt) {
				return null;
			}
			_convertFn = this.__MakeDataConvertFunc();
		}

		return _convertFn;
	};

	_pDataset._loadRecordFromSSVLines = function (ssvLines, curIdx, loadCnt, convertFn) {
		var _cs_ = String.fromCharCode(31);
		var _ud_ = String.fromCharCode(3);

		var rawRecords = this._rawRecords;
		var delRecords = this._deletedRecords;
		var rawRecLength = rawRecords.length;
		var delRecLength = delRecords.length;

		var lineCnt = ssvLines.length;

		function _loadRecordFromSSVLines_loop () {
			if (curIdx < lineCnt) {
				var curLine = ssvLines[curIdx];
				if (curLine == "") {
					curIdx++;
					return true;
				}
				var _currowData = curLine.split(_cs_);
				type = _currowData[0];
				_currowData.shift();

				for (var i = 0; i < _currowData.length; i++) {
					if (_currowData[i] == _ud_) {
						_currowData[i] = undefined;
					}
				}

				_currowData = convertFn(_currowData);



				_currowData._rawidx = rawRecLength;
				_currowData._level = 0;

				if (type == null) {
					_currowData._rtype = 1;
				}
				else {
					var typeChar = type.charAt(0);
					if (typeChar == 'I' || typeChar == 'i') {
						_currowData._rtype = 2;
					}
					else if (typeChar == 'U' || typeChar == 'u') {
						_currowData._rtype = 4;
					}
					else if (typeChar == 'D' || typeChar == 'd') {
						_currowData._rtype = 8;
					}
					else {
						_currowData._rtype = 1;
					}
				}

				if (_currowData._rtype == 4) {
					if (curIdx < (lineCnt - 1) && (ssvLines[curIdx + 1].charAt(0) == 'O' || ssvLines[curIdx + 1].charAt(0) == 'o')) {
						var _orgrowData = ssvLines[curIdx + 1].split(_cs_);
						_orgrowData.shift();
						_orgrowData = convertFn(_orgrowData);
						_currowData._orgrow = _orgrowData;
					}
				}
				else if (_currowData._rtype == 8) {
					delRecords[delRecLength] = _currowData;
					delRecLength++;
				}

				rawRecords[rawRecLength] = _currowData;
				rawRecords[rawRecLength]._orgcolstrings = _currowData;

				rawRecLength++;
				curIdx++;

				if (loadCnt > 0 && (rawRecLength - delRecLength) == loadCnt) {
					return true;
				}

				return false;
			}
			return true;
		}
		while (true) {
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
			if (_loadRecordFromSSVLines_loop()) {
				break;
			}
		}

		return curIdx;
	};

	_pDataset.__writeData = function (list, str) {
		list.push(str);
	};

	_pDataset.__getRowTypeChar = function (_rtype) {
		var rtnVal = null;
		switch (_rtype) {
			case 1:
				rtnVal = "N";
				break;
			case 2:
				rtnVal = "I";
				break;
			case 4:
				rtnVal = "U";
				break;
			case 8:
				rtnVal = "D";
				break;
			case -1:
				rtnVal = "O";
				break;
		}

		return rtnVal;
	};

	_pDataset.__writeSSVNormalRow = function (list, rowData) {
		this.__writeSSVRowData(list, "N", rowData);
	};

	_pDataset.__writeSSVCrudRow = function (list, rowData) {
		this.__writeSSVRowData(list, this.__getRowTypeChar(rowData._rtype), rowData);
		if (rowData._rtype == 4 && rowData._orgrow) {
			this.__writeSSVRowData(list, this.__getRowTypeChar(-1), rowData._orgrow);
		}
	};

	_pDataset.__writeSSVRowData = function (list, type, rowData) {
		var _rs_ = String.fromCharCode(30);
		var _cs_ = String.fromCharCode(31);

		this.__writeData(list, type + _cs_);

		var n = this.colinfos.length;
		var i = 0;
		function __writeSSVColData_loop (pthis) {
			if (i < n) {
				idx = pthis.colinfos[i]._index;
				var value = pthis.colinfos[i]._toText(rowData[idx]);

				if (value === undefined) {
					value = String.fromCharCode(3);
				}

				if (value != null) {
					if (i == (n - 1)) {
						pthis.__writeData(list, value + _rs_);
					}
					else {
						pthis.__writeData(list, value + _cs_);
					}
				}
				else {
					if (i == (n - 1)) {
						pthis.__writeData(list, _rs_);
					}
					else {
						pthis.__writeData(list, _cs_);
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
			if (__writeSSVColData_loop(this)) {
				break;
			}
		}
	};

	nexacro.__splitCSVRowData = function (strRow, base_colCnt) {
		var colArr = strRow.split(",");
		var colCnt = colArr.length;
		var i = 0;
		function __splitCSVRowData_loop1 () {
			if (i < colCnt) {
				var colStr = colArr[i];
				var ch = colStr.charAt(0);
				if (ch == "\"" || ch == "\'") {
					while (colStr[colStr.length - 1] != ch) {
						if (i <= colCnt) {
							colStr += "," + colArr.splice(i + 1, 1);
							colCnt--;
						}
						else {
							break;
						}
					}
					colArr[i] = nexacro._unQuoteStr(colStr);
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
			if (__splitCSVRowData_loop1()) {
				break;
			}
		}
		return colArr;
	};

	_pDataset.__csvMakeDataMappingFunc = function (colArr, colCnt) {
		var idMap = {
		};
		for (var i = 0; i < colCnt; i++) {
			var colItem = colArr[i].split(":");
			var id = colItem[0];
			idMap[id] = i;
		}

		var colinfos = this.colinfos;
		var colLen = colinfos.length;
		var expr = "(function () { return function (arr) { return [";
		for (var i = 0; i < colLen; i++) {
			var colinfo = colinfos[i];
			var idx = idMap[colinfo.id];
			if (idx != null) {
				switch (colinfo.ntype) {
					case 1:
						expr += "arr[" + idx + "]";
						break;
					case 2:
						expr += "nexacro.DataUtils.toIntFromText(arr[" + idx + "])";
						break;
					case 3:
						expr += "nexacro.DataUtils.toFloatFromText(arr[" + idx + "])";
						break;
					case 4:
						expr += "nexacro.DataUtils.toDecimalFromText(arr[" + idx + "])";
						break;
					case 5:
						expr += "nexacro.DataUtils.toDateFromText(arr[" + idx + "])";
						break;
					case 6:
						expr += "nexacro.DataUtils.toTimeFromText(arr[" + idx + "])";
						break;
					case 7:
						expr += "nexacro.DataUtils.toDateTimeFromText(arr[" + idx + "])";
						break;
					case 8:
						expr += "nexacro.DataUtils.toBlobFromText(arr[" + idx + "])";
						break;
					default:
						expr += "nexacro.DataUtils.toTextFromvariant(arr[" + idx + "])";
						break;
				}
			}
			if (i != (colLen - 1)) {
				expr += ",";
			}
		}
		expr += "]; }; })();";
		idMap = null;
		return nexacro._executeEvalStr(expr);
	};

	_pDataset.__csvSetColInfo = function (strColInfo) {
		var _cs_ = String.fromCharCode(31);

		var colArr = strColInfo.split(",");
		var colCnt = colArr.length;
		var i = 0;
		function __csvSetColInfo_loop (pthis) {
			if (i < colCnt) {
				var colItem = colArr[i].split(":");
				var id = colItem[0];
				var type, size;
				if (id) {
					var colInfo = colItem[1];
					if (colInfo) {
						var sidx = colInfo.indexOf("(");
						if (sidx > -1) {
							type = colInfo.substring(0, sidx).toUpperCase();
							size = colInfo.substring(sidx + 1, colInfo.indexOf(")", sidx + 1)) | 0;
						}
						else {
							type = colInfo.toUpperCase();
						}
					}
					else {
						type = "STRING";
						size = 256;
					}
					pthis._addColumn(id, type, size, colItem[2], colItem[3]);
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
			if (__csvSetColInfo_loop(this)) {
				break;
			}
		}
		return colCnt;
	};

	_pDataset._loadFromCSVArray = function (csvColLine, csvLines, curIdx, loadCnt, bOrgLayout, bClear) {
		this.loadstatus = true;
		this._eventstat = !this.loadstatus && this.enableevent;

		if (bClear) {
			if (bOrgLayout) {
				this._clearData();
			}
			else {
				this._clearAll();
			}
		}

		var _convertFn = this._setColInfoFromCSVLine(csvColLine, bOrgLayout);

		if (!_convertFn) {
			this.loadstatus = false;
			this._eventstat = this.enableevent;

			return curIdx;
		}

		var curIdx = this._loadRecordFromCSVLines(csvLines, curIdx, loadCnt, _convertFn);
		var delRecords_len = this._deletedRecords.length;

		if (delRecords_len) {
			var viewRecords = this._viewRecords = [];
			var rawRecords = this._rawRecords;
			len = rawRecords.length;
			var viewRecLength = viewRecords.length;
			var i = 0;
			function _loadFromCSVArray_delrow_loop () {
				if (i < len) {
					var _currowData = rawRecords[i];
					if (_currowData._rtype != 8) {
						viewRecords[viewRecLength] = _currowData;
						viewRecLength++;
					}

					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
				if (_loadFromCSVArray_delrow_loop()) {
					break;
				}
			}
		}
		else {
			this._viewRecords = this._rawRecords;
		}

		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = this._viewRecords.length;

		this.loadstatus = false;
		this._eventstat = this.enableevent;

		return curIdx;
	};

	_pDataset._setColInfoFromCSVLine = function (csvColLine, bOrgLayout) {
		if (!csvColLine || csvColLine.length == 0) {
			return null;
		}

		var _convertFn = null;
		if (bOrgLayout) {
			var colArr = csvColLine.split(",");
			csvColCnt = colArr.length;
			_convertFn = this.__csvMakeDataMappingFunc(colArr, csvColCnt);
		}
		else {
			csvColCnt = this.__csvSetColInfo(csvColLine);
			_convertFn = this.__MakeDataConvertFunc();
		}

		return _convertFn;
	};

	_pDataset._loadRecordFromCSVLines = function (csvLines, curIdx, loadCnt, convertFn) {
		var rawRecords = this._rawRecords;
		var delRecords = this._deletedRecords;
		var rawRecLength = rawRecords.length;
		var delRecLength = delRecords.length;

		var lineCnt = csvLines.length;

		function _loadRecordFromCSVLines_loop () {
			if (curIdx < lineCnt) {
				var curLine = csvLines[curIdx];
				if (curLine == "") {
					curIdx++;
					return true;
				}
				var _currowData = nexacro.__splitCSVRowData(curLine, csvColCnt);

				_currowData = convertFn(_currowData);

				_currowData._rawidx = rawRecLength;
				_currowData._level = 0;
				_currowData._rtype = 1;

				rawRecords[rawRecLength] = _currowData;
				rawRecords[rawRecLength]._orgcolstrings = _currowData;
				rawRecLength++;
				curIdx++;

				if (loadCnt > 0 && rawRecLength == loadCnt) {
					return true;
				}

				return false;
			}
			return true;
		}

		while (true) {
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
			if (_loadRecordFromCSVLines_loop()) {
				break;
			}
		}

		return curIdx;
	};

	_pDataset.__writeCSVRowData = function (list, rowData) {
		var n = this.colinfos.length;
		var i = 0;
		function __writeCSVColData_loop (pthis) {
			if (i < n) {
				var colinfo = pthis.colinfos[i];
				var value = colinfo._toText(rowData[i]);
				if (value != null) {
					if (colinfo.ntype == 1) {
						if (i == (n - 1)) {
							pthis.__writeData(list, nexacro._quoteStr(value) + "\r\n");
						}
						else {
							pthis.__writeData(list, nexacro._quoteStr(value) + ",");
						}
					}
					else {
						if (i == (n - 1)) {
							pthis.__writeData(list, value + "\r\n");
						}
						else {
							pthis.__writeData(list, value + ",");
						}
					}
				}
				else {
					if (i == (n - 1)) {
						pthis.__writeData(list, "\r\n");
					}
					else {
						pthis.__writeData(list, ",");
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
			if (__writeCSVColData_loop(this)) {
				break;
			}
		}
	};

	_pDataset._assignRowList = function (srcRecords) {
		var len = srcRecords.length;
		var idx = this._rawRecords.length;
		var cnt = 0;

		var delRecLength = this._deletedRecords.length;
		var viewRecLength = this._viewRecords.length;
		var rawRecLength = this._rawRecords.length;

		var i = 0;
		function _assignRowList_loop (pthis) {
			if (i < len) {
				var srcData = srcRecords[i];
				var level = srcData._level;
				var rtype = srcData._rtype;

				if (level == 0) {
					var rowData = [];
					rowData._level = level;
					rowData._rawidx = idx;
					rowData._rtype = rtype;

					var count = srcData.length;
					var j = 0;
					function _assignRowList_loop2 () {
						if (j < count) {
							rowData[j] = srcData[j];
							j++;
							return false;
						}
						return true;
					}
					while (true) {
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
						if (_assignRowList_loop2()) {
							break;
						}
					}

					if (srcData._orgrow) {
						var srcOrgData = srcData._orgrow;
						var rowOrgData = [];
						rowOrgData._level = srcOrgData._level;
						rowOrgData._rawidx = idx;
						rowOrgData._rtype = srcOrgData._rtype;

						var count = srcOrgData.length;
						var j = 0;
						function _assignRowList_loop3 () {
							if (j < count) {
								rowOrgData[j] = srcOrgData[j];
								j++;
								return false;
							}
							return true;
						}
						while (true) {
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
							if (_assignRowList_loop3()) {
								break;
							}
						}

						rowData._orgrow = rowOrgData;
					}

					if (rtype == 8) {
						pthis._deletedRecords[delRecLength] = rowData;
						delRecLength++;
					}

					if (rtype == 1 || rtype == 2 || rtype == 4) {
						if (pthis._rawRecords != pthis._viewRecords) {
							pthis._viewRecords[viewRecLength] = rowData;
							viewRecLength++;
						}
					}
					else {
						if (pthis._rawRecords == pthis._viewRecords) {
							pthis._viewRecords = pthis._rawRecords.slice(0, pthis._rawRecords.length);
							viewRecLength = pthis._viewRecords.length;
						}
					}
					pthis._rawRecords[rawRecLength] = rowData;
					rawRecLength++;

					idx++;
					cnt++;
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
			if (_assignRowList_loop(this)) {
				break;
			}
		}
		delete delRecLength;
		delete viewRecLength;
		delete rawRecLength;

		return cnt;
	};
	_pDataset._assign = function (srcds) {
		this._copyConstColList(srcds._constVars);
		this._appendColList(srcds.colinfos);
		this._assignRowList(srcds._rawRecords);

		this.constcount = this._constVars.length;
		this.colcount = this.colinfos.length + this.constcount;
		this.rowcount = this._viewRecords.length;
	};

	_pDataset._isLike = function (value, cmpval) {
		if (value == cmpval) {
			return true;
		}
		else if (value && nexacro._isString(cmpval)) {
			if (cmpval.length == 0) {
				return false;
			}

			if (value.slice(0, cmpval.length) == cmpval) {
				return true;
			}
		}

		return false;
	};

	_pDataset._findRow = function (colidx, cmpval, start, end) {
		var view = this._viewRecords;
		var rowData;

		var i = start;
		function _findRow_loop (pthis) {
			if (i < end) {
				rowData = view[i];

				if (pthis._checkRowData(rowData)) {
					if (rowData[colidx] == cmpval) {
						return true;
					}
					else if (rowData[colidx] instanceof nexacro.Decimal && cmpval instanceof nexacro.Decimal) {
						if (rowData[colidx].isEqual(cmpval)) {
							return true;
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
			if (_findRow_loop(this)) {
				break;
			}
		}
		return (i < end) ? i : -1;
	};

	_pDataset._findRowAs = function (colidx, cmpval, start, end) {
		var view = this._viewRecords;
		var rowData;

		var i = start;
		function _findRowAs_loop (pthis) {
			if (i < end) {
				rowData = view[i];

				if (pthis._checkRowData(rowData)) {
					if (pthis._isLike(rowData[colidx], cmpval)) {
						return true;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
			if (_findRowAs_loop(this)) {
				break;
			}
		}
		return (i < end) ? i : -1;
	};

	_pDataset._checkViewRowData = function (rowData) {
		return (rowData._level == 0);
	};

	_pDataset._checkRawRowData = function (rowData) {
		var level = rowData._level;
		var rtype = rowData._rtype;

		return ((level == 0) && (rtype == 1 || rtype == 2 || rtype == 4));
	};

	_pDataset._getNotDelRec = function () {
		var noDelRec = this._rawRecords.slice(0, this._rawRecords.length);
		var tLen = noDelRec.length - 1;
		for (var i = tLen; i > -1; i--) {
			if (noDelRec[i]._rtype == 8) {
				noDelRec.splice(i, 1);
			}
		}
		return noDelRec;
	};

	_pDataset._checkRowData = _pDataset._checkViewRowData;

	_pDataset._getCount = function (start, end, pivotidx, colIdx, bExcludeNull) {
		var view = this._viewRecords;
		var rowData, colData;
		var cnt = 0;

		var i = start;
		function _getCount_loop (pthis) {
			if (i < end) {
				if (i == view.length) {
					return true;
				}

				rowData = view[i];
				if (pthis._checkRowData(rowData)) {
					if (bExcludeNull == true) {
						colData = rowData[colIdx];
						if (colData) {
							cnt++;
						}
					}
					else {
						cnt++;
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
			if (_getCount_loop(this)) {
				break;
			}
		}

		return cnt;
	};

	_pDataset._getSum = function (colidx, start, end, pivotidx, coltype) {
		var view = this._viewRecords;
		var rowData;
		var sum = 0;
		var i = start;

		if (coltype == 1 || coltype == 8) {
			return 0;
		}

		if (coltype != 4) {
			function _getSum_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (rowData._rtype == 16) {
						i++;
						return false;
					}

					var v = rowData[colidx];
					if (!nexacro._isNumber(v)) {
						if (!v) {
							v = 0;
						}
						else {
							v = parseInt(v, 10);
						}
					}

					if (pthis._checkRowData(rowData)) {
						sum += (+v);
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
				if (_getSum_loop(this)) {
					break;
				}
			}
		}
		else {
			sum = new nexacro.Decimal;

			function _getSumDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if ((rowData[colidx] != null) && (rowData[colidx] != "") && (rowData[colidx] != undefined) && pthis._checkRowData(rowData)) {
						sum.addDecimal(rowData[colidx]);
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
				if (_getSumDecimal_loop(this)) {
					break;
				}
			}
		}
		if (sum instanceof nexacro.Decimal) {
			return sum.isNaN() ? 0 : sum;
		}

		return (+sum) != (+sum) ? 0 : sum;
	};

	_pDataset._getMin = function (colidx, start, end, pivotidx, coltype) {
		var view = this._viewRecords;
		var rowData;
		var min = undefined;

		var i = start;
		if (coltype != 4) {
			function _getMin_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						if (min == null || rowData[colidx] < min) {
							min = rowData[colidx];
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
				if (_getMin_loop(this)) {
					break;
				}
			}
		}
		else {
			var v;
			function _getMinDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData) && rowData[colidx] != null) {
						v = rowData[colidx];
						if (min == null || v.hi < min.hi || (v.hi == min.hi && v.lo < min.lo)) {
							min = v;
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
				if (_getMinDecimal_loop(this)) {
					break;
				}
			}
		}
		if (min instanceof nexacro.Decimal) {
			return min.isNaN() ? undefined : min;
		}
		else if (coltype == 1) {
			return (min != min) ? undefined : min;
		}
		return (+min) != (+min) ? undefined : min;
	};

	_pDataset._getMax = function (colidx, start, end, pivotidx, coltype) {
		var view = this._viewRecords;
		var rowData;
		var max = undefined;

		var i = start;
		if (coltype != 4) {
			function _getMax_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						if (max == null || rowData[colidx] > max) {
							max = rowData[colidx];
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
				if (_getMax_loop(this)) {
					break;
				}
			}
		}
		else {
			function _getMaxDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData) && rowData[colidx] != null) {
						var v = rowData[colidx];
						if (max == null || v.hi > max.hi || (v.hi == max.hi && v.lo > max.lo)) {
							max = v;
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
				if (_getMaxDecimal_loop(this)) {
					break;
				}
			}
		}
		if (max instanceof nexacro.Decimal) {
			return max.isNaN() ? undefined : max;
		}
		else if (coltype == 1) {
			return (max) != (max) ? undefined : max;
		}
		return (+max) != (+max) ? undefined : max;
	};

	_pDataset._getAvg = function (colidx, start, end, pivotidx, coltype) {
		var view = this._viewRecords;
		var rowData;
		var cnt = 0;
		var sum = 0;

		var i = start;
		if (coltype != 4) {
			function _getAvg_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (nexacro._isNumber(rowData[colidx]) && pthis._checkRowData(rowData)) {
						cnt++;
						sum += (+rowData[colidx]);
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
				if (_getAvg_loop(this)) {
					break;
				}
			}
		}
		else {
			sum = new nexacro.Decimal;
			function _getAvgDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						if ((rowData[colidx] instanceof nexacro.Decimal)) {
							cnt++;
							sum.addDecimal(rowData[colidx]);
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
				if (_getAvgDecimal_loop(this)) {
					break;
				}
			}
		}

		if (cnt == 0) {
			return Infinity;
		}

		if (sum instanceof nexacro.Decimal) {
			sum.divDouble(cnt);
		}
		else {
			sum = sum / cnt;
		}
		return sum;
	};

	_pDataset._getCaseSum = function (cmpExpr, colidx, start, end, pivotidx, coltype) {
		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return 0;
		}

		var view = this._viewRecords;
		var rowData;
		var sum = 0;
		var cmp = null;

		var i = start;

		if (coltype != 4) {
			function _getCaseSum_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						if ((rowData[colidx] != null) && (rowData[colidx] != "") && (rowData[colidx] != undefined)) {
							cmp = cmpFn.call(pthis, i, i, null, pthis);
							if (cmp === true) {
								sum += (+rowData[colidx]);
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
				if (_getCaseSum_loop(this)) {
					break;
				}
			}
		}
		else {
			sum = new nexacro.Decimal;

			function _getCaseSumDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						if ((rowData[colidx] != null) && (rowData[colidx] != "") && (rowData[colidx] != undefined)) {
							if (rowData[colidx] != null) {
								cmp = cmpFn.call(pthis, i, i, null, pthis);
								if (cmp === true) {
									sum.addDecimal(rowData[colidx]);
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
				if (_getCaseSumDecimal_loop(this)) {
					break;
				}
			}
		}
		if (sum instanceof nexacro.Decimal) {
			return sum.isNaN() ? 0 : sum;
		}
		return (+sum) != (+sum) ? 0 : sum;
	};

	_pDataset._getCaseMin = function (cmpExpr, colidx, start, end, pivotidx, coltype) {
		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return undefined;
		}

		var view = this._viewRecords;
		var rowData;
		var min = undefined;
		var cmp = null;

		var i = start;
		if (coltype != 4) {
			function _getCaseMin_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						cmp = cmpFn.call(pthis, i, i, null, pthis);
						if (cmp === true) {
							if (min == null || rowData[colidx] < min) {
								min = rowData[colidx];
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
				if (_getCaseMin_loop(this)) {
					break;
				}
			}
		}
		else {
			function _getCaseMinDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						cmp = cmpFn.call(pthis, i, i, null, pthis);
						if (cmp === true) {
							if (rowData[colidx] != null) {
								var v = rowData[colidx];
								if (min == null || v.hi < min.hi || (v.hi == min.hi && v.lo < min.lo)) {
									min = v;
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
				if (_getCaseMinDecimal_loop(this)) {
					break;
				}
			}
		}

		if (min instanceof nexacro.Decimal) {
			return min.isNaN() ? undefined : min;
		}
		return (+min) != (+min) ? undefined : min;
	};

	_pDataset._getCaseMax = function (cmpExpr, colidx, start, end, pivotidx, coltype) {
		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return undefined;
		}

		var view = this._viewRecords;
		var rowData;
		var max = undefined;
		var cmp = null;

		var i = start;
		if (coltype != 4) {
			function _getCaseMax_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						cmp = cmpFn.call(pthis, i, i, null, pthis);
						if (cmp === true) {
							if (max == null || rowData[colidx] > max) {
								max = rowData[colidx];
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
				if (_getCaseMax_loop(this)) {
					break;
				}
			}
		}
		else {
			function _getCaseMaxDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						cmp = cmpFn.call(pthis, i, i, null, pthis);
						if (cmp === true) {
							if (rowData[colidx] != null) {
								var v = rowData[colidx];
								if (max == null || v.hi > max.hi || (v.hi == max.hi && v.lo > max.lo)) {
									max = v;
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
				if (_getCaseMaxDecimal_loop(this)) {
					break;
				}
			}
		}

		if (max instanceof nexacro.Decimal) {
			return max.isNaN() ? undefined : max;
		}
		return (+max) != (+max) ? undefined : max;
	};

	_pDataset._getCaseAvg = function (cmpExpr, colidx, start, end, pivotidx, coltype) {
		var cmpFn = this._exprFuncs[cmpExpr];
		if (cmpFn == null) {
			cmpFn = this._exprFuncs[cmpExpr] = this._createExprFunc(cmpExpr);
		}
		if (typeof cmpFn != "function") {
			return Number.NaN;
		}

		var view = this._viewRecords;
		var rowData;
		var cnt = 0;
		var sum = 0;
		var addsum;
		var cmp = null;

		var i = start;
		if (coltype != 4) {
			function _getCaseAvg_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						cmp = cmpFn.call(pthis, i, i, null, pthis);
						if (cmp === true) {
							cnt++;
							if (rowData[colidx]) {
								sum += +rowData[colidx];
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
				if (_getCaseAvg_loop(this)) {
					break;
				}
			}
		}
		else {
			function _getCaseAvgDecimal_loop (pthis) {
				if (i < end) {
					rowData = view[i];
					if (pthis._checkRowData(rowData)) {
						cmp = cmpFn.call(pthis, i, i, null, pthis);
						if (cmp === true) {
							cnt++;
							if (rowData[colidx]) {
								addsum = rowData[colidx];
								if ((sum instanceof nexacro.Decimal) == false) {
									if ((addsum instanceof nexacro.Decimal) == false) {
										sum += (+addsum);
									}
									else {
										sum = new nexacro.Decimal(sum);
										sum.addDecimal(addsum);
									}
								}
								else {
									if ((addsum instanceof nexacro.Decimal) == false) {
										sum.addDouble(addsum);
									}
									else {
										sum.addDecimal(addsum);
									}
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
				if (_getCaseAvgDecimal_loop(this)) {
					break;
				}
			}
		}

		if (cnt == 0) {
			return Infinity;
		}

		if (sum instanceof nexacro.Decimal) {
			sum.divDouble(cnt);
		}
		else {
			sum = sum / cnt;
		}

		return sum;
	};

	_pDataset._calcNFData = function (fn, expr, start, end) {
		var currentView = this._viewRecords;
		this._viewRecords = this._rawRecords;
		this._checkRowData = this._checkRawRowData;

		var value = "";
		if (end === undefined) {
			if (start === undefined) {
				value = fn.call(this, expr);
			}
			else {
				value = fn.call(this, expr, start);
			}
		}
		else {
			value = fn.call(this, expr, start, end);
		}

		this._checkRowData = this._checkViewRowData;
		this._viewRecords = currentView;

		return value;
	};

	_pDataset._findMaxLengthRow = function (colidx, start, end) {
		var view = this._viewRecords;
		var rowData;
		var maxLen = undefined;
		var maxRow = -1;

		var i = start;
		function _findMaxLengthRow_loop (pthis) {
			if (i < end) {
				rowData = view[i];
				if (pthis._checkRowData(rowData)) {
					if (rowData[colidx]) {
						var len = rowData[colidx].toString().length;

						if (maxLen == null || len > maxLen) {
							maxLen = len;
							maxRow = i;
						}
					}
				}
				i++;
				return false;
			}
			return true;
		}
		while (true) {
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
			if (_findMaxLengthRow_loop(this)) {
				break;
			}
		}

		return maxRow;
	};

	delete _pDataset;

	nexacro.TransactionItem = function (path, context, svcid, inDatasetsParam, outDatasetsParam, argsParam, datatype, async, last_modified, version) {
		nexacro.CommunicationItem.call(this, path, "data", false, last_modified, version);

		this.context = context;
		this.svcid = svcid;
		this.inputDatasets = this._parseDSParam(inDatasetsParam);
		this.outputDatasets = this._parseDSParam(outDatasetsParam);
		this.parameters = this._parseVarParam(argsParam);
		this.datatype = (!datatype ? 0 : datatype);

		this._sendData = this._serializeData();

		this._usewaitcursor = async && application.usewaitcursor;
		this._remain_data = null;

		this._progress_data = null;
		this._progress_cnt = 0;
		this._is_unknowntype_data = false;
		this._responseData = null;

		this._has_firstcount_dataset = this._hasFirstCountDs();

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 8) {
			this._check_responseXML = true;
		}
		else {
			this._check_responseXML = false;
		}

		if ((!application._cookie_variables || application._cookie_variables.length == 0) && !this.parameters && !this.inputDatasets) {
			this._http_method = "GET";
		}
		else {
			this._http_method = "POST";
		}
	};

	var _pTransactionItem = nexacro._createPrototype(nexacro.CommunicationItem, nexacro.TransactionItem);
	nexacro.TransactionItem.prototype = _pTransactionItem;

	_pTransactionItem._handle = null;
	_pTransactionItem.callbackList = [];
	_pTransactionItem.type = "data";
	_pTransactionItem.bcache = false;

	_pTransactionItem._type_name = "TransactionItem";

	_pTransactionItem.on_start = function () {
		if (this._usewaitcursor) {
			this._showWaitCursor(this.context);
		}

		application._appendCommContext(this.context);
		application.on_fire_oncommunication(application, 0);
	};

	_pTransactionItem.on_load_data = function (data, cookie, last_modified) {
		var datasets = null;
		var parameters = null;
		var errorinfo;
		var bcache = this.bcache;
		var ret = null;

		this._addCookieToGlobalVariable(cookie);

		if (data && data._type_name == "DataCache") {
			bcache = false;
			errorinfo = data._loadData(this);
		}
		else {
			if (this._protocol < 0) {
				data = this.on_decrypt(data);
			}

			if (this._progress_data) {
				this.on_progress_data(data, true);
				errorinfo = this._progress_data._error_info;

				if (bcache) {
					var target_ds = null;

					datasets = new nexacro.Collection();
					for (var buff_ds in this._progress_data._datasets) {
						if (this._progress_data._datasets[buff_ds]._isEnable) {
							target_ds = this._progress_data._datasets[buff_ds]._target_ds;
							datasets.add_item(target_ds.id, new nexacro._DataSetCache(target_ds.id, target_ds.colinfos, target_ds._constVars, target_ds._rawRecords));
						}
					}

					this._progress_data._datasets = null;

					parameters = this._progress_data._parameters;
				}
			}
			else {
				ret = this._deserializeData(data, 0);
				if (bcache) {
					parameters = ret[1];
					datasets = ret[2];
				}

				errorinfo = ret[0];
			}
		}

		if (bcache) {
			var d_cache = nexacro._DataCacheList[this.path];
			if (!d_cache) {
				nexacro._DataCacheList[this.path] = new nexacro._DataCache(parameters, datasets, last_modified, this.version);
			}
			else {
				d_cache.parameters = parameters;
				d_cache.datasets = datasets;
				d_cache.last_modified = last_modified ? last_modified : "";
				d_cache.version = this.version;
			}
			d_cache = null;
		}

		parameters = null;
		datasets = null;
		data = null;
		ret = null;

		var errorcode = 0;
		var errormsg = "SUCCESS";
		if (errorinfo) {
			errorcode = errorinfo[0];
			errormsg = errorinfo[1];
			errorinfo = null;
		}

		if (this._usewaitcursor) {
			this._hideWaitCursor(this.context);
		}

		application._removeCommContext(this.context);
		application.on_fire_oncommunication(application, 1);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			var loadmanager = this.context._load_manager;
			var dataitem = loadmanager ? loadmanager.getDataItem(this.svcid) : null;
			if (dataitem) {
				dataitem._is_cancel = undefined;
			}

			dataitem = null;
			loadmanager = null;

			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.svcid, errorcode, errormsg);
				}
				target = null;
				item = null;
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};

	_pTransactionItem.on_load_xmldom = function (xmldom, cookie, last_modified) {
		this._addCookieToGlobalVariable(cookie);


		var ret = this.__deserializeXML("", xmldom);
		var errorcode = 0;
		var errormsg = "SUCCESS";
		var errorinfo = ret[0];

		if (this.bcache) {
			var d_cache = nexacro._DataCacheList[this.path];
			if (!d_cache) {
				nexacro._DataCacheList[this.path] = new nexacro._DataCache(ret[1], ret[2], last_modified, this.version);
			}
			else {
				d_cache.parameters = ret[1];
				d_cache.datasets = ret[2];
				d_cache.last_modified = last_modified;
				d_cache.version = this.version;
			}
		}

		if (errorinfo) {
			errorcode = errorinfo[0];
			errormsg = errorinfo[1];
		}

		if (this._usewaitcursor) {
			this._hideWaitCursor(this.context);
		}

		application._removeCommContext(this.context);
		application.on_fire_oncommunication(application, 1);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.svcid, errorcode, errormsg);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};

	_pTransactionItem.on_progress = nexacro._emptyFn;
	_pTransactionItem.on_progress_data = function (data, bFinal) {
		if (!this._progress_data) {
			data = nexacro.trimLeft(data);
			var data_type = this._getStreamType(data);

			switch (data_type) {
				case "CSV":
					this._progress_data = new nexacro._ProgressDataCSV(this);
					break;
				case "SSV":
					this._progress_data = new nexacro._ProgressDataSSV(this);
					break;
				case "PPX":
					this._progress_data = new nexacro._ProgressDataPPX(this);
					break;
				case "XML":
					this._progress_data = new nexacro._ProgressDataXML(this);
					break;
				case "UNKNOWN":
					this._is_unknowntype_data = true;
					return;
				default:
					return;
			}
		}

		this._progress_data._on_progress(data, bFinal);
	};

	_pTransactionItem.on_error = function (errstatus, fireerrorcode, returncode, locationurl) {
		var callbackList = this.callbackList;
		var n = callbackList.length;
		var ret = false;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					ret = item.callback.call(target, this.svcid, -1, "FAILED", fireerrorcode, returncode, this.path, locationurl);
					if (ret) {
						continue;
					}
				}
			}
			if (ret) {
				return true;
			}
		}

		var loadmanager = this.context._load_manager;
		var dataitem = loadmanager ? loadmanager.getDataItem(this.svcid) : null;
		var dataitem_handle = dataitem ? dataitem._handle : null;


		if (dataitem && !dataitem._is_cancel) {
			return;
		}

		callbackList.splice(0, n);

		if (this._usewaitcursor) {
			this._hideWaitCursor(this.context);
		}

		application._removeCommContext(this.context);
		application.on_fire_oncommunication(application, 1);

		this._handle = null;
	};

	_pTransactionItem._loadFromData = function (data) {
		var ret = this._deserializeData(data, 0);
		var errorcode = 0;
		var errormsg = "SUCCESS";
		var bcache = this.bcache;

		errorinfo = ret[0];
		if (errorinfo) {
			errorcode = errorinfo[0];
			errormsg = errorinfo[1];
		}

		if (bcache) {
			var parameters = ret[1];
			var datasets = ret[2];

			var d_cache = nexacro._DataCacheList[this.path];
			if (!d_cache) {
				nexacro._DataCacheList[this.path] = new nexacro._DataCache(parameters, datasets, last_modified, this.version);
			}
			else {
				d_cache.parameters = parameters;
				d_cache.datasets = datasets;
				d_cache.last_modified = last_modified ? last_modified : "";
				d_cache.version = this.version;
			}
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.svcid, errorcode, errormsg);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};

	_pTransactionItem._showWaitCursor = function (context) {
		if (context) {
			context._waitCursor(true, context);

			if (application._refcommuni && application._refcommuni >= 0) {
				application._refcommuni++;
			}
			else {
				application._refcommuni = 0;
			}
		}
	};

	_pTransactionItem._hideWaitCursor = function (context) {
		if (context) {
			context._waitCursor(false, context);

			if (application._refcommuni > 0) {
				application._refcommuni--;
			}
		}
	};

	_pTransactionItem._parseDSParam = function (paramStr) {
		if (!paramStr) {
			return undefined;
		}

		var list = [];
		var expr = /([a-zA-Z가-힣_$][a-zA-Z가-힣0-9_$]*)\s*=\s*([a-zA-Z가-힣_$][a-zA-Z가-힣0-9_$]*(?:\:[aAuUnN])?)/g;
		var splitedParams = paramStr.match(expr);

		if (!splitedParams || splitedParams.length == 0) {
			return undefined;
		}
		var splitedParamCnt = splitedParams.length;

		var listLength = 0;

		for (var i = 0; i < splitedParamCnt; i++) {
			var param = splitedParams[i].split("=");
			var key = param[0].trim();
			var value = param[1].trim();

			var bduplicate = false;
			for (var j = 0; j < i; j++) {
				var checkparam = splitedParams[j].split("=");
				var checkkey = checkparam[0].trim();
				if (key == checkkey) {
					bduplicate = true;
				}
			}
			if (bduplicate) {
				i++;
				return false;
			}

			var type = "N";

			var index = value.indexOf(":");
			if (index > -1) {
				type = value.substring(index + 1);
				value = value.substring(0, index);
			}

			var paramObj = {
				lval : key, 
				rval : value, 
				saveType : type
			};
			list.push(paramObj);
		}
		return list;
	};

	_pTransactionItem._parseVarParam = function (paramStr) {
		if (!paramStr) {
			return;
		}

		paramStr = paramStr.replace(/^\s*|\s*$/g, '');
		if (paramStr.length == 0) {
			return undefined;
		}

		var list = [];
		var expr = /([a-zA-Z_][a-zA-Z0-9_]*)\s*="([^"]*)"|([a-zA-Z_][a-zA-Z0-9_]*)\s*='([^']*)'|([a-zA-Z_][a-zA-Z0-9_]*)\s*=([^ ]*)/g;

		var splitedParams = paramStr.match(expr);
		var splitedParamCnt = splitedParams.length;

		for (var i = 0; i < splitedParamCnt; i++) {
			var param = splitedParams[i].split("=");
			var len = param.length;
			var key = param[0].trim();
			var value = param[1].trim();

			for (var j = 2; j < len; j++) {
				value = value + "=" + param[j].trim();
			}

			var type = "N";

			var len = value.length;
			if (len > 0) {
				value = nexacro.stripQuote(value);
			}

			var paramObj = {
				lval : key, 
				rval : value, 
				saveType : type
			};

			list.push(paramObj);
		}
		return list;
	};

	_pTransactionItem._serializeData = function () {
		if (this.datatype == 1) {
			return this.__serializeBIN();
		}
		else if (this.datatype == 2) {
			return this.__serializeSSV();
		}
		else {
			return this.__serializeXML();
		}
	};

	_pTransactionItem.__serializeXML = function () {
		var depth = 0;
		var list = [];
		var cookievar = application._cookie_variables;

		this._writeData(list, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>", depth);
		this._writeData(list, "<Root xmlns=\"http://www.nexacroplatform.com/platform/dataset\">", depth++);

		var argParamsCnt = 0;
		var cookievarCnt = 0;

		var argParams = this.parameters;
		if (argParams) {
			argParamsCnt = argParams.length;
		}
		if (cookievar) {
			cookievarCnt = cookievar.length;
		}

		if (argParamsCnt > 0 || cookievarCnt > 0) {
			this._writeData(list, "<Parameters>", depth++);

			if (cookievarCnt) {
				for (var i = 0; i < cookievarCnt; i++) {
					var id = cookievar[i];
					var val = application[id];

					if (val && val.length) {
						val = nexacro._encodeXml(val);
						this._writeData(list, "<Parameter id=\"" + id + "\">" + val + "</Parameter>", depth);
					}
					else {
						this._writeData(list, "<Parameter id=\"" + id + "\" />", depth);
					}
				}
			}
			if (argParamsCnt > 0) {
				for (var i = 0; i < argParamsCnt; i++) {
					var id = argParams[i].lval;
					var val = argParams[i].rval;

					if (val && val.length) {
						val = nexacro._encodeXml(val);
						this._writeData(list, "<Parameter id=\"" + id + "\">" + val + "</Parameter>", depth);
					}
					else {
						this._writeData(list, "<Parameter id=\"" + id + "\" />", depth);
					}
				}
			}
			this._writeData(list, "</Parameters>", --depth);
		}
		else {
			this._writeData(list, "<Parameters />", depth);
		}

		var datasetParams = this.inputDatasets;
		if (datasetParams && datasetParams.length) {
			var datasetCnt = datasetParams.length;
			for (i = 0; i < datasetCnt; i++) {
				var id = datasetParams[i].rval;
				var ds = this.context._getDatasetObject(id);
				if (ds) {
					list.push(ds._saveXML(datasetParams[i].lval, datasetParams[i].saveType, depth, false));
				}
			}
		}
		this._writeData(list, "</Root>", --depth);

		var rntVal;

		if (argParamsCnt == 0 && cookievarCnt == 0 && (!datasetParams || datasetParams.length == 0)) {
			rntVal = "";
		}
		else {
			rntVal = list.join("\n");
		}

		return rntVal;
	};

	_pTransactionItem.__serializeSSV = function () {
		var _rs_ = String.fromCharCode(30);
		var _cs_ = String.fromCharCode(31);

		var depth = 0;
		var list = [];
		var cookievar = application._cookie_variables;
		var id, val, ds;

		var listLength = 0;
		list.push("SSV:utf-8" + _rs_);

		var argParamsCnt = 0;
		var cookievarCnt = 0;

		var argParams = this.parameters;
		if (argParams) {
			argParamsCnt = argParams.length;
		}
		if (cookievar) {
			cookievarCnt = cookievar.length;
		}

		if (cookievarCnt > 0) {
			for (i = 0; i < cookievarCnt; i++) {
				id = cookievar[i];
				val = application[id];

				if (val && val.length) {
					val = val;
					list.push(id + "=" + val + _rs_);
				}
				else {
					list.push(id + "=" + _rs_);
				}
			}
		}
		if (argParamsCnt > 0) {
			for (i = 0; i < argParamsCnt; i++) {
				id = argParams[i].lval;
				val = argParams[i].rval;

				if (val) {
					val = val;
					list.push(id + "=" + val + _rs_);
				}
				else {
					list.push(id + "=" + _rs_);
				}
			}
		}

		var datasetParams = this.inputDatasets;
		if (datasetParams && datasetParams.length) {
			var datasetCnt = datasetParams.length;
			for (var i = 0; i < datasetCnt; i++) {
				var id = datasetParams[i].rval;
				var ds = this.context._getDatasetObject(id);
				if (ds) {
					list.push(ds.saveSSV(datasetParams[i].lval, datasetParams[i].saveType));
				}
			}
		}

		var rtnVal = list.join("");
		return rtnVal;
	};

	_pTransactionItem.__serializeBIN = function () {
		var ssvdata = this.__serializeSSV();
		if (ssvdata) {
			return nexacro._convertStreamSSVToBIN(ssvdata);
		}
		return "";
	};

	_pTransactionItem._deserializeData = function (strRecvData, bPending) {
		if (!strRecvData) {
			return [[-1, "Stream Data is null!"], [], new nexacro.Collection()];
		}

		strRecvData = strRecvData.trim();
		var fstr = strRecvData.substring(0, 3);

		if (fstr == "SSV") {
			return this.__deserializeSSV(strRecvData);
		}
		else if (fstr == "CSV") {
			return this.__deserializeCSV(strRecvData);
		}
		else if (fstr == "PPX") {
			return this.__deserializePPX(strRecvData);
		}
		else {
			return this.__deserializeXML(strRecvData);
		}
	};

	_pTransactionItem._setParamter = function (id, val) {
		var form = this.context;
		if (id in form) {
			if (typeof (form[id]) != "object") {
				form[id] = val;
			}
		}
		else {
			if (application._existVariable(id)) {
				application[id] = val;
			}
		}
	};


	_pTransactionItem._getDataset = function (id) {
		var form = this.context;
		var outDatasets = this.outputDatasets;
		if (outDatasets && outDatasets.length) {
			var outDataCnt = outDatasets.length;
			for (var i = 0; i < outDataCnt; i++) {
				var param = outDatasets[i];
				if (param.rval == id) {
					return form._getDatasetObject(param.lval);
				}
			}
		}
	};

	_pTransactionItem._hasFirstCountDs = function () {
		if (!this.outputDatasets) {
			return false;
		}

		var outDataCnt = this.outputDatasets.length;
		var form = this.context;

		for (var i = 0; i < outDataCnt; i++) {
			var param = this.outputDatasets[i];
			var ds = form._getDatasetObject(param.lval);
			if (ds) {
				if (ds.firefirstcount > 0) {
					return true;
				}
			}
		}

		return false;
	};

	_pTransactionItem.__deserializeXML = function (strRecvData, doc) {
		var parameters = [];
		var datasets = new nexacro.Collection();
		var code = 0;
		var message = "SUCCESS";

		if (strRecvData.length > 0 && !this._check_responseXML) {
			var fstr = strRecvData.substr(0, 10).toLowerCase();
			if (fstr.indexOf("<?xml") < 0) {
				return [[-1, "invalid nexacro communication format"], parameters, datasets];
			}

			return this.__deserializeXMLFromStr(strRecvData);
		}

		if (!doc) {
			if (strRecvData.indexOf("&quot;") >= 0) {
				strRecvData = nexacro._replaceAll(strRecvData, "&quot;", "\"");
			}
			if (strRecvData.indexOf("&apos;") >= 0) {
				strRecvData = nexacro._replaceAll(strRecvData, "&apos;", "\'");
			}
			doc = nexacro._parseXMLDocument(strRecvData);
		}

		if (doc.parseError && doc.parseError.errorCode != 0) {
			message = "invalid nexacro communication format";
			code = -1;
		}

		if (code <= -1) {
			return [[code, message], parameters, datasets];
		}

		var form = this.context;

		var errorinfo = [code, message];

		var ret = nexacro._getCommDataFromDom(doc, this);
		if (ret) {
			var variable = ret[0];
			var len = variable.length;
			for (var i = 0; i < len; i++) {
				if (variable[i].id == "ErrorCode") {
					errorinfo[0] = variable[i].val;
				}
				else if (variable[i].id == "ErrorMsg") {
					errorinfo[1] = variable[i].val;
				}

				if (this.bcache) {
					parameters[parameters.length] = new nexacro._ParametersCache(variable[i].id, variable[i].val);
				}
			}

			if (this.bcache) {
				var dataset_list = ret[1];
				len = dataset_list.length;
				for (var i = 0; i < len; i++) {
					datasets.add_item(dataset_list[i].id, new nexacro._DataSetCache(dataset_list[i].id, dataset_list[i].colinfos, dataset_list[i]._constVars, dataset_list[i]._rawRecords));
				}
			}
		}
		doc = null;

		if (errorinfo[0] && errorinfo[0] <= -1) {
			return [errorinfo, parameters, datasets];
		}

		var inDatasets = this.inputDatasets;
		if (inDatasets && inDatasets.length) {
			var inDataCnt = inDatasets.length;
			for (var i = 0; i < inDataCnt; i++) {
				var param = inDatasets[i];
				var ds = form._getDatasetObject(param.rval);
				if (ds) {
					ds.applyChange();
				}
			}
		}

		return [errorinfo, parameters, datasets];
	};


	_pTransactionItem.__deserializeXMLFromStr = function (strRecvData) {
		var parameters = [];
		var datasets = new nexacro.Collection();

		var code = 0;
		var message = "SUCCESS";

		if (!strRecvData) {
			return [[-1, "Stream Data is null!"], null, null];
		}

		var form = this.context;

		var xml_parse_pos = strRecvData.indexOf("<Dataset ");
		var headerData;
		if (xml_parse_pos > -1) {
			headerData = strRecvData.substring(0, xml_parse_pos);
		}
		else {
			headerData = strRecvData;
		}

		var head_parse_pos = 0;
		var paramsInfo = nexacro._getXMLTagData(headerData, head_parse_pos, "<Parameters>", "</Parameters>");
		if (paramsInfo) {
			var paramsData = paramsInfo[0];
			head_parse_pos = paramsInfo[3];

			var param_parse_pos = 0;
			var varInfo = nexacro._getXMLTagData2(paramsData, param_parse_pos, "<Parameter ", "</Parameter>");
			while (varInfo) {
				param_parse_pos = varInfo[3];
				var attrStr = varInfo[1];
				var id = nexacro._getXMLAttributeID(attrStr);
				if (id && id.length) {
					var val = varInfo[0];

					if (id == "ErrorCode") {
						code = parseInt(val) | 0;
						if (isFinite(code) == false) {
							code = -1;
						}
						val = code;
					}
					else if (id == "ErrorMsg") {
						val = nexacro._decodeXml(val);
						message = val;
					}
					else if (id in form) {
						if (typeof (form[id]) != "object") {
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
					if (this.bcache) {
						parameters[parameters.length] = new nexacro._ParametersCache(id, val);
					}
				}
				varInfo = nexacro._getXMLTagData2(paramsData, param_parse_pos, "<Parameter ", "</Parameter>");
			}
		}

		if (code <= -1) {
			return [[code, message], parameters, datasets];
		}

		var inDatasets = this.inputDatasets;
		if (inDatasets && inDatasets.length) {
			var inDataCnt = inDatasets.length;
			for (var i = 0; i < inDataCnt; i++) {
				var param = inDatasets[i];
				var ds = form._getDatasetObject(param.rval);
				if (ds) {
					ds.applyChange();
				}
			}
		}

		var dsIds = {
		};
		var outDatasets = this.outputDatasets;
		if (outDatasets && outDatasets.length) {
			var outDataCnt = outDatasets.length;
			for (var i = 0; i < outDataCnt; i++) {
				var param = outDatasets[i];
				if (dsIds[param.rval] == undefined) {
					dsIds[param.rval] = param.lval;
				}
			}
		}

		if (xml_parse_pos >= -1) {
			var datasetInfo = nexacro._getXMLTagData2(strRecvData, xml_parse_pos, "<Dataset ", "</Dataset>");
			while (datasetInfo) {
				xml_parse_pos = datasetInfo[3];
				var attrStr = datasetInfo[1];
				var remoteId = nexacro._getXMLAttributeID(attrStr);
				if (remoteId && remoteId.length) {
					var localId = dsIds[remoteId];
					var ds = form._getDatasetObject(localId);
					if (ds) {
						ds.rowposition = -1;
						ds.loadFromXMLStr(datasetInfo[0]);
						if (this.bcache) {
							datasets[localId] = new nexacro._DataSetCache(localId, ds.colinfos, ds._constVars, ds._rawRecords);
						}
					}
				}
				datasetInfo = nexacro._getXMLTagData2(strRecvData, xml_parse_pos, "<Dataset ", "</Dataset>");
			}
		}
		dsIds = null;
		return [[code, message], parameters, datasets];
	};

	nexacro._getCommDataFromDom = function (doc, target) {
		var variablelist = [];
		var paramElems = doc.getElementsByTagName("Parameter");
		var code = 0;
		if (paramElems && paramElems.length) {
			var varCnt = paramElems.length;
			for (var i = 0; i < varCnt; i++) {
				var paramElem = paramElems[i];
				var id = paramElem.getAttribute("id");
				if (id && id.length) {
					var val = (paramElem.textContent || (paramElem.firstChild ? paramElem.firstChild.nodeValue : ""));

					if (id == "ErrorCode") {
						code = parseInt(val) | 0;
						if (isFinite(code) == false) {
							code = -1;
						}
						variablelist.push({
							id : id, 
							val : code
						});
					}
					else if (id == "ErrorMsg") {
						variablelist.push({
							id : id, 
							val : val
						});
					}
					else {
						target._setParamter(id, val);
					}
				}
			}
		}

		if (code <= -1) {
			return [variablelist, null];
		}

		var datasetlist = [];
		var datasets = doc.getElementsByTagName("Dataset");
		if (datasets && datasets.length) {
			var dataCnt = datasets.length;
			for (var i = 0; i < dataCnt; i++) {
				var remoteId = datasets[i].getAttribute("id");
				if (remoteId && remoteId.length) {
					var ds = target._getDataset(remoteId);
					if (!ds) {
						ds = new nexacro.Dataset(remoteId);
					}
					if (ds) {
						ds.rowposition = -1;
						ds.loadFromDOM(datasets[i]);
						datasetlist.push(ds);
					}
				}
			}
		}

		return [variablelist, datasetlist];
	};

	_pTransactionItem.__deserializePPX = function (strRecvData) {
		var parameters = [];
		var datasets = new nexacro.Collection();

		var _rs_ = String.fromCharCode(30);
		var _cs_ = String.fromCharCode(31);

		var code = 0;
		var message = "SUCCESS";

		if (!strRecvData) {
			return [[-1, "Stream Data is null!"], null, null];
		}

		var form = this.context;

		var ppxLines = strRecvData.split(_rs_);
		var lineCnt = ppxLines.length;

		curIdx = 1;

		var curStr;
		var curType;


		for (; curIdx < lineCnt; curIdx++) {
			curStr = ppxLines[curIdx];
			curType = curStr.charAt(0);

			if (curType == "P") {
				var paramArr = curStr.split(_cs_);
				var id = paramArr[1];
				var val = paramArr[2];
				if (val == String.fromCharCode(3)) {
					val = undefined;
				}

				if (id == "ErrorCode") {
					code = parseInt(val) | 0;
					if (isFinite(code) == false) {
						code = -1;
					}
					val = code;
				}
				else if (id == "ErrorMsg") {
					message = paramArr[2];
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
				if (this.bcache) {
					parameters[parameters.length] = new nexacro._ParametersCache(id, val);
				}
			}
			else {
				break;
			}
		}

		if (code <= -1) {
			ppxLines = null;
			strRecvData = null;

			return [[code, message], parameters, datasets];
		}

		var inDatasets = this.inputDatasets;
		if (inDatasets && inDatasets.length) {
			var inDataCnt = inDatasets.length;
			for (var i = 0; i < inDataCnt; i++) {
				var param = inDatasets[i];
				var ds = form._getDatasetObject(param.rval);
				if (ds) {
					ds.applyChange();
				}
			}
		}
		inDatasets = null;

		var dsIds = {
		};
		var outDatasets = this.outputDatasets;
		if (outDatasets && outDatasets.length) {
			var outDataCnt = outDatasets.length;
			for (var i = 0; i < outDataCnt; i++) {
				var param = outDatasets[i];
				if (dsIds[param.rval] == undefined) {
					dsIds[param.rval] = param.lval;
				}
			}
		}
		outDatasets = null;

		function find_next_dataset_loop () {
			if (curIdx < lineCnt) {
				curStr = ppxLines[curIdx];
				if (curStr.charAt(0) == "D") {
					return true;
				}
				curIdx++;
				return false;
			}
			return true;
		}

		while (curIdx < lineCnt) {
			while (true) {
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
			}
			if (curIdx < lineCnt) {
				var valArr = curStr.split(_cs_);
				var remoteId = valArr[1];
				if (remoteId && remoteId.length) {
					var localId = dsIds[remoteId];
					var ds = form._getDatasetObject(localId);
					if (ds) {
						ds.rowposition = -1;
						curIdx = ds.loadFromPPXArray(ppxLines, lineCnt, curIdx, true);
						if (this.bcache) {
							datasets.add_item(localId, new nexacro._DataSetCache(localId, ds.colinfos, ds._constVars, ds._rawRecords));
						}
					}
					else {
						curIdx++;
					}
					ds = null;
				}
				else {
					curIdx++;
				}
			}
		}
		ppxLines = null;
		strRecvData = null;

		return [[code, message], parameters, datasets];
	};

	_pTransactionItem.__deserializeSSV = function (strRecvData) {
		var parameters = [];
		var datasets = new nexacro.Collection();
		;

		var _rs_ = String.fromCharCode(30);
		var _cs_ = String.fromCharCode(31);

		var code = 0;
		var message = "SUCCESS";

		if (!strRecvData) {
			return [[-1, "Stream Data is null!"], null, null];
		}

		var form = this.context;

		var ssvLines = strRecvData.split(_rs_);
		var lineCnt = ssvLines.length;
		var curIdx = 0;
		curIdx++;

		var curStr;

		for (; curIdx < lineCnt; curIdx++) {
			curStr = ssvLines[curIdx];
			if (curStr.substring(0, 7) != "Dataset") {
				var paramArr = curStr.split(_cs_);
				var paramCnt = paramArr.length;
				for (var i = 0; i < paramCnt; i++) {
					var paramStr = paramArr[i];
					var varInfo = paramStr;
					var val = undefined;
					var sep_pos = paramStr.indexOf("=");
					if (sep_pos >= 0) {
						varInfo = paramStr.substring(0, sep_pos);
						val = paramStr.substring(sep_pos + 1);
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
							code = parseInt(val) | 0;
							if (isFinite(code) == false) {
								code = -1;
							}
							val = code;
						}
						else if (id == "ErrorMsg") {
							message = val;
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

						if (this.bcache) {
							parameters[parameters.length] = new nexacro._ParametersCache(id, val);
						}
					}
				}
			}
			else {
				break;
			}
		}

		if (code <= -1) {
			return [[code, message], parameters, datasets];
		}

		var inDatasets = this.inputDatasets;
		if (inDatasets && inDatasets.length) {
			var inDataCnt = inDatasets.length;
			for (var i = 0; i < inDataCnt; i++) {
				var param = inDatasets[i];
				var ds = form._getDatasetObject(param.rval);
				if (ds) {
					ds.applyChange();
				}
			}
		}

		var dsIds = {
		};
		var outDatasets = this.outputDatasets;
		if (outDatasets && outDatasets.length) {
			var outDataCnt = outDatasets.length;
			for (var i = 0; i < outDataCnt; i++) {
				var param = outDatasets[i];
				if (dsIds[param.rval] == undefined) {
					dsIds[param.rval] = param.lval;
				}
			}
		}

		function find_next_dataset_loop () {
			if (curIdx < lineCnt) {
				curStr = ssvLines[curIdx];
				if (curStr.substring(0, 7) == "Dataset") {
					return true;
				}
				curIdx++;
				return false;
			}
			return true;
		}

		while (curIdx < lineCnt) {
			while (true) {
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
			}
			if (curIdx < lineCnt) {
				var sep_pos = curStr.indexOf(":");
				if (sep_pos >= 0) {
					var remoteId = curStr.substring(sep_pos + 1);
					if (remoteId && remoteId.length) {
						var localId = dsIds[remoteId];
						var ds = form._getDatasetObject(localId);
						if (ds) {
							ds.rowposition = -1;
							curIdx = ds.loadFromSSVArray(ssvLines, lineCnt, curIdx, true);
							if (this.bcache) {
								datasets.add_item(localId, new nexacro._DataSetCache(localId, ds.colinfos, ds._constVars, ds._rawRecords));
							}
						}
						else {
							curIdx++;
						}
					}
					else {
						curIdx++;
					}
				}
				else {
					curIdx++;
				}
			}
		}

		dsIds = null;
		return [[code, message], parameters, datasets];
	};

	_pTransactionItem.__deserializeCSV = function (strRecvData) {
		var parameters = [];
		var datasets = new nexacro.Collection();

		var code = 0;
		var message = "SUCCESS";

		if (!strRecvData) {
			return [[-1, "Stream Data is null!"], null, null];
		}

		var form = this.context;

		var csvLines = strRecvData.split(/\r\n|\n/);

		var lineCnt = csvLines.length;
		var curIdx = 0;
		curIdx++;

		var varInfoArr, varInfo, id, val, pIdx;
		var curStr;

		for (; curIdx < lineCnt; curIdx++) {
			curStr = csvLines[curIdx];
			if (curStr.substring(0, 7) != "Dataset") {
				var paramArr = curStr.split(",");
				var paramCnt = paramArr.length;
				for (var i = 0; i < paramCnt; i++) {
					var paramStr = paramArr[i];
					if (paramStr.charAt(0) == "\"" || paramStr.charAt(0) == "\'") {
						paramStr = paramStr.substring(1, paramStr.length - 1);
					}
					var varInfo = paramStr;
					var val = undefined;
					var sep_pos = paramStr.indexOf("=");
					if (sep_pos >= 0) {
						varInfo = paramStr.substring(0, sep_pos);
						val = paramStr.substring(sep_pos + 1);
					}
					if (varInfo) {
						var id = varInfo;
						var sep_pos = varInfo.indexOf(":");
						if (sep_pos >= 0) {
							id = varInfo.substring(0, sep_pos);
						}

						if (id == "ErrorCode") {
							code = parseInt(val) | 0;
							if (isFinite(code) == false) {
								code = -1;
							}
							val = code;
						}
						else if (id == "ErrorMsg") {
							message = val;
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
						if (this.bcache) {
							parameters[parameters.length] = new nexacro._ParametersCache(id, val);
						}
					}
				}
			}
			else {
				break;
			}
		}

		if (code <= -1) {
			return [[code, message], parameters, datasets];
		}

		var inDatasets = this.inputDatasets;
		if (inDatasets && inDatasets.length) {
			var inDataCnt = inDatasets.length;
			for (var i = 0; i < inDataCnt; i++) {
				var param = inDatasets[i];
				var ds = form._getDatasetObject(param.rval);
				if (ds) {
					ds.applyChange();
				}
			}
		}

		var dsIds = {
		};
		var outDatasets = this.outputDatasets;
		if (outDatasets && outDatasets.length) {
			var outDataCnt = outDatasets.length;
			for (var i = 0; i < outDataCnt; i++) {
				var param = outDatasets[i];
				if (dsIds[param.rval] == undefined) {
					dsIds[param.rval] = param.lval;
				}
			}
		}

		function find_next_dataset_loop () {
			if (curIdx < lineCnt) {
				curStr = csvLines[curIdx];
				if (curStr.substring(0, 7) == "Dataset") {
					return true;
				}
				curIdx++;
				return false;
			}
			return true;
		}

		while (curIdx < lineCnt) {
			while (true) {
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
				if (find_next_dataset_loop()) {
					break;
				}
			}
			if (curIdx < lineCnt) {
				var sep_pos = curStr.indexOf(":");
				if (sep_pos >= 0) {
					var remoteId = curStr.substring(sep_pos + 1);
					if (remoteId && remoteId.length) {
						var localId = dsIds[remoteId];
						var ds = form._getDatasetObject(localId);
						if (ds) {
							ds.rowposition = -1;
							curIdx = ds.loadFromCSVArray(csvLines, lineCnt, curIdx, true);
							if (this.bcache) {
								datasets.add_item(localId, new nexacro._DataSetCache(localId, ds.colinfos, ds._constVars, ds._rawRecords));
							}
						}
						else {
							curIdx++;
						}
					}
					else {
						curIdx++;
					}
				}
				else {
					curIdx++;
				}
			}
		}

		return [[code, message], parameters, datasets];
	};

	_pTransactionItem._TABS = ["", "\t", "\t\t", "\t\t\t", "\t\t\t\t", "\t\t\t\t\t", "\t\t\t\t\t\t"];
	_pTransactionItem._writeData = function (list, str, depth) {
		list[list.length] = this._TABS[depth] + str;
	};

	_pTransactionItem._dsUpdate = function (ds) {
		if (ds) {
			var dsCnt;
			var viewRecords = ds._viewRecords;
			var viewRecLength = viewRecords.length;
			if (ds._deletedRecords.length > 0) {
				viewRecords = ds._viewRecords = [];
				var len = ds._rawRecords.length;
				for (dsCnt = 0; dsCnt < len; dsCnt++) {
					var _currowData = ds._rawRecords[dsCnt];
					if (_currowData._rtype != 8) {
						viewRecords[viewRecLength] = _currowData;
					}
				}
			}

			ds.colcount = ds.colinfos.length;
			ds.rowcount = ds._viewRecords.length;

			ds.loadstatus = false;
			ds._eventstat = ds.enableevent;

			ds._reFilter();
			ds._resetSortGroup();
		}
	};

	_pTransactionItem._dsOnload = function (ds, reason) {
		if (ds) {
			if (ds._viewRecords.length > 0) {
				ds.rowposition = 0;
			}
			if (ds._eventstat) {
				if (reason) {
					ds.on_fire_onload(0, "", reason);
				}
				else {
					ds.on_fire_onload(0, "", 0);
				}
			}
		}
	};

	_pTransactionItem._getStreamType = function (strRecvData) {
		if (!strRecvData) {
			return null;
		}

		var data = nexacro.trimLeft(strRecvData);
		var type = data.slice(0, 10).toUpperCase();

		if (type.indexOf("CSV") == 0) {
			return "CSV";
		}
		else if (type.indexOf("SSV") == 0) {
			return "SSV";
		}
		else if (type.indexOf("PPX") == 0) {
			return "PPX";
		}
		else if (type.indexOf("<?XML") == 0) {
			return "XML";
		}
		else if (type.length == 10) {
			return "UNKNOWN";
		}

		return null;
	};
	delete _pTransactionItem;
}
