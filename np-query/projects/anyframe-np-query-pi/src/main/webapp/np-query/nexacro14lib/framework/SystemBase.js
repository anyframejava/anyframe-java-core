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


if (!this.nexacro) {
	this.nexacro = {
	};
}

if (!nexacro.Init_systembase) {
	nexacro.Init_systembase = true;

	nexacro.Browser = "";
	nexacro.BrowserVersion = -1;
	nexacro.BrowserType = "";
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

	if (nexacro.__getOSType) {
		nexacro.Browser = "Runtime";
		nexacro.BrowserVersion = 14;
		nexacro.BrowserType = "Runtime";
	}
	else {
		if (navigator.appVersion.indexOf('MSIE') > -1) {
			nexacro.Browser = "IE";
			if (document.documentMode) {
				nexacro.BrowserVersion = document.documentMode;
				nexacro.BrowserType = nexacro.Browser + nexacro.BrowserVersion;
			}
			else {
				var compatMode = document.compatMode;
				if (compatMode && compatMode.toLowerCase() == "backcompat") {
					if (/MSIE\s+7(.+)[;]/.test(navigator.appVersion)) {
						nexacro.BrowserVersion = 7;
						nexacro.BrowserType = "IE7";
					}
					else if (/MSIE\s+6(.+)[;]/.test(navigator.appVersion)) {
						nexacro.BrowserVersion = 6;
						nexacro.BrowserType = "IE6";
					}
					else if (/MSIE\s+5(.+)[;]/.test(navigator.appVersion)) {
						nexacro.BrowserVersion = 5;
						nexacro.BrowserType = "IE6";
					}
				}
				compatMode = null;
			}
		}
		else if (navigator.userAgent.match(/Trident\/.*rv\:(.+?)[\);]/)) {
			nexacro.Browser = "IE";
			if (document.documentMode) {
				nexacro.BrowserVersion = document.documentMode;
				nexacro.BrowserType = nexacro.Browser + nexacro.BrowserVersion;
			}
			else {
				nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			}
		}
		else if (navigator.userAgent.match(/Edge/)) {
			nexacro.Browser = "Edge";
			nexacro.BrowserType = "Edge";
			var versionRegExp = /Edge\/([\.\d]+)/;
			versionRegExp.test(navigator.userAgent);
			nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			versionRegExp = null;
		}
		else if (!!window.opera || navigator.userAgent.match(/Opera/)) {
			nexacro.Browser = "Opera";
			nexacro.BrowserType = "Opera";
			var versionRegExp = /Version\/([\.\d]+)/;
			versionRegExp.test(navigator.userAgent);
			nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			versionRegExp = null;
		}
		else if (navigator.userAgent.match(/Chrome/)) {
			nexacro.Browser = "Chrome";
			nexacro.BrowserType = "WebKit";
			var versionRegExp = /Chrome\/([\.\d]+)/;
			versionRegExp.test(navigator.userAgent);
			nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			versionRegExp = null;
		}
		else if (navigator.userAgent.match(/Apple.*Mobile/)) {
			nexacro.Browser = "MobileSafari";
			nexacro.BrowserType = "WebKit";
		}
		else if (navigator.userAgent.match(/AppleWebKit\//)) {
			nexacro.Browser = "Safari";
			nexacro.BrowserType = "WebKit";
			var versionRegExp = /Version\/([\.\d]+)/;
			versionRegExp.test(navigator.userAgent);
			nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			versionRegExp = null;
		}
		else if (navigator.userAgent.match(/WebKit\//)) {
			nexacro.Browser = "WebKit";
			nexacro.BrowserType = "WebKit";
			var versionRegExp = /WebKit\/([\.\d]+)/;
			versionRegExp.test(navigator.userAgent);
			nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			versionRegExp = null;
		}
		else if (navigator.userAgent.match(/Gecko\//)) {
			nexacro.Browser = "Gecko";
			var versionRegExp = /rv\:(.+?)[\);]/;
			versionRegExp.test(navigator.userAgent);
			nexacro.BrowserVersion = parseInt(RegExp.$1) | 0;
			if (nexacro.BrowserVersion < 2) {
				nexacro.BrowserType = "GeckoOld";
			}
			else if (nexacro.BrowserVersion >= 10) {
				nexacro.BrowserType = "GeckoNew";
			}
			else {
				nexacro.BrowserType = "Gecko";
			}
			versionRegExp = null;
		}
	}


	nexacro.Version = "14";
	nexacro._framework_libpath = "./nexacro14lib";

	nexacro.ImportTypes = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL : 0x0420, 
		HANCELL2014 : 0x0410, 
		CSV : 0x0500
	};

	nexacro.ExportTypes = 
		{
		EXCEL : 0x0100, 
		EXCEL97 : 0x0110, 
		EXCEL2007 : 0x0120, 
		HANCELL2010 : 0x0400, 
		HANCELL2014 : 0x0410
	};

	nexacro.ExportItemTypes = 
		{
		GRID : 0x0100
	};

	nexacro.XPushAction = 
		{
		AUTH : 0, 
		BYEC : 1, 
		ADDF : 2, 
		DELF : 3, 
		REQD : 4, 
		RECT : 5, 
		RGST : 6, 
		UNRG : 7, 
		ADUI : 8, 
		UNUI : 9, 
		MSGC : 10
	};

	nexacro.DragDataFormats = 
		{
		FILEDROP : "filedrop", 
		TEXT : "text", 
		UNICODETEXT : "unicodetext", 
		CSV : "csv"
	};

	nexacro._dontenum_descriptor = {
		"writable" : true, 
		"enumerable" : false
	};
	nexacro._dontwritableenum_descriptor = {
		"writable" : false, 
		"enumerable" : false
	};

	nexacro._zindex_popup = 1e6 + 1;
	nexacro._zindex_firstmodal = 1e6 + 2;
	nexacro._zindex_waitcursor = 2e6;
	nexacro._zindex_hide = -2e6;

	nexacro._zoom_factor = 0;

	nexacro._allow_default_pinchzoom = false;
	nexacro._minimum_scale = undefined;
	nexacro._maximum_scale = undefined;

	if (nexacro.__proto__) {
		nexacro._createPrototype = function (super_fn, constructor_fn) {
			var ptype = new Object();
			if ((typeof super_fn) == "function") {
				ptype.__proto__ = super_fn.prototype;
				if (constructor_fn) {
					ptype.constructor = constructor_fn;
				}
			}
			return ptype;
		};
	}
	else {
		nexacro._createPrototype = function (super_fn, constructor_fn) {
			if ((typeof super_fn) == "function") {
				function F () {
				}
				;
				F.prototype = super_fn.prototype;
				var ptype = new F();
				if (constructor_fn) {
					ptype.constructor = constructor_fn;
				}
				return ptype;
			}
			return new Object();
		};
	}

	nexacro.FuncBinder = function (pthis, fn) {
		this.pthis = pthis;
		this.fn = fn;
	};
	var _pFuncBinder = nexacro._createPrototype(Object, nexacro.FuncBinder);
	nexacro.FuncBinder.prototype = _pFuncBinder;

	_pFuncBinder.call = function () {
		var fn = this.fn;
		if (fn) {
			return fn.apply(this.pthis, arguments);
		}
	};
	delete _pFuncBinder;

	nexacro.SetterBinder = function (pthis, prop, fn) {
		this.pthis = pthis;
		this.prop = prop;
		this.fn = fn;
	};
	var _pSetterBinder = nexacro._createPrototype(Object, nexacro.SetterBinder);
	nexacro.SetterBinder.prototype = _pSetterBinder;

	_pSetterBinder.set = function (val) {
		this.fn.call(this.pthis, val);
		return val;
	};
	_pSetterBinder.addset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] + val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.subset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] - val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.mulset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] * val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.divset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] / val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.modset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] % val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.andset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] & val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.orset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] | val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pSetterBinder.xorset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] ^ val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.lshset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] << val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.rshset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] >> val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pSetterBinder.zrshset = function (val) {
		var pthis = this.pthis;
		var retval = pthis[this.prop] >>> val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pSetterBinder.preInc = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, ++val);
		return val;
	};
	_pSetterBinder.preDec = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, --val);
		return val;
	};
	_pSetterBinder.postInc = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, +val + 1);
		return val;
	};
	_pSetterBinder.postDec = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, +val - 1);
		return val;
	};
	delete _pSetterBinder;

	nexacro.IntSetterBinder = function (pthis, prop, fn) {
		this.pthis = pthis;
		this.prop = prop;
		this.fn = fn;
	};
	var _pIntSetterBinder = nexacro._createPrototype(Object, nexacro.IntSetterBinder);
	nexacro.IntSetterBinder.prototype = _pIntSetterBinder;

	_pIntSetterBinder.set = function (val) {
		this.fn.call(this.pthis, val);
		return val;
	};
	_pIntSetterBinder.addset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) + (val | 0);
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.subset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) - val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.mulset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) * val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.divset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) / val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.modset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) % val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.andset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) & val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.orset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) | val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pIntSetterBinder.xorset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) ^ val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.lshset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) << val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.rshset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) >> val;
		this.fn.call(pthis, retval);
		return retval;
	};
	_pIntSetterBinder.zrshset = function (val) {
		var pthis = this.pthis;
		var retval = (parseInt(pthis[this.prop]) | 0) >>> val;
		this.fn.call(pthis, retval);
		return retval;
	};

	_pIntSetterBinder.preInc = function () {
		var val = parseInt(this.pthis[this.prop]) | 0;
		this.fn.call(this.pthis, ++val);
		return val;
	};
	_pIntSetterBinder.preDec = function () {
		var val = this.pthis[this.prop];
		this.fn.call(this.pthis, --val);
		return val;
	};
	_pIntSetterBinder.postInc = function () {
		var val = parseInt(this.pthis[this.prop]) | 0;
		this.fn.call(this.pthis, val + 1);
		return val;
	};
	_pIntSetterBinder.postDec = function () {
		var val = parseInt(this.pthis[this.prop]) | 0;
		this.fn.call(this.pthis, val - 1);
		return val;
	};
	delete _pIntSetterBinder;

	nexacro.PropBinder = function (pthis, prop) {
		this.pthis = pthis;
		this.prop = prop;
	};
	var _pPropBinder = nexacro._createPrototype(Object, nexacro.PropBinder);
	nexacro.PropBinder.prototype = _pPropBinder;

	_pPropBinder.set = function (val) {
		return (this.pthis[this.prop] = val);
	};
	_pPropBinder.addset = function (val) {
		return (this.pthis[this.prop] += val);
	};
	_pPropBinder.subset = function (val) {
		return (this.pthis[this.prop] -= val);
	};
	_pPropBinder.mulset = function (val) {
		return (this.pthis[this.prop] *= val);
	};
	_pPropBinder.divset = function (val) {
		return (this.pthis[this.prop] /= val);
	};
	_pPropBinder.modset = function (val) {
		return (this.pthis[this.prop] %= val);
	};
	_pPropBinder.andset = function (val) {
		return (this.pthis[this.prop] &= val);
	};
	_pPropBinder.orset = function (val) {
		return (this.pthis[this.prop] |= val);
	};
	_pPropBinder.xorset = function (val) {
		return (this.pthis[this.prop] ^= val);
	};
	_pPropBinder.lshset = function (val) {
		return (this.pthis[this.prop] <<= val);
	};
	_pPropBinder.rshset = function (val) {
		return (this.pthis[this.prop] >>= val);
	};
	_pPropBinder.zrshset = function (val) {
		return (this.pthis[this.prop] >= val);
	};

	_pPropBinder.preInc = function () {
		return ++this.pthis[this.prop];
	};
	_pPropBinder.preDec = function () {
		return --this.pthis[prop];
	};
	_pPropBinder.postInc = function () {
		return this.pthis[this.prop]++;
	};
	_pPropBinder.postDec = function () {
		return this.pthis[this.prop]--;
	};
	delete _pPropBinder;

	nexacro.NumPropBinder = function (pthis, prop) {
		this.pthis = pthis;
		this.prop = prop;
	};
	var _pNumPropBinder = nexacro._createPrototype(Object, nexacro.NumPropBinder);
	nexacro.NumPropBinder.prototype = _pNumPropBinder;

	_pNumPropBinder.set = function (val) {
		return (this.pthis[this.prop] = val);
	};
	_pNumPropBinder.addset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) + (val | 0));
	};
	_pNumPropBinder.subset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) - val);
	};
	_pNumPropBinder.mulset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) * val);
	};
	_pNumPropBinder.divset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) / val);
	};
	_pNumPropBinder.modset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) % val);
	};
	_pNumPropBinder.andset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) & val);
	};
	_pNumPropBinder.orset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) | val);
	};
	_pNumPropBinder.xorset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) ^ val);
	};
	_pNumPropBinder.lshset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) << val);
	};
	_pNumPropBinder.rshset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) >> val);
	};
	_pNumPropBinder.zrshset = function (val) {
		return (this.pthis[this.prop] = parseFloat(this.pthis[this.prop]) >>> val);
	};

	_pNumPropBinder.preInc = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = ++val;
		return val;
	};
	_pNumPropBinder.preDec = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = --val;
		return val;
	};
	_pNumPropBinder.postInc = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = val + 1;
		return val;
	};
	_pNumPropBinder.postDec = function () {
		var val = this.pthis[this.prop];
		this.pthis[this.prop] = val - 1;
		return val;
	};
	delete _pNumPropBinder;


	Object.prototype.getSetter = function (name, fnname) {
		return new nexacro.PropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(Object.prototype, "getSetter", {
				"value" : Object.prototype.getSetter, 
				"writable" : true, 
				"enumerable" : false
			});
		}
		catch (e) {
			;
		}
	}
	Object.prototype.getNumSetter = function (name, fnname) {
		return new nexacro.NumPropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(Object.prototype, "getNumSetter", {
				"value" : Object.prototype.getNumSetter, 
				"writable" : true, 
				"enumerable" : false
			});
		}
		catch (e) {
			;
		}
	}


	Array.prototype.indexOf = function (item) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if (this[i] == item) {
				return i;
			}
		}
		return -1;
	};

	nexacro._indexOf = function (arr, item) {
		if (arr == null) {
			return -1;
		}
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			if (arr[i] == item) {
				return i;
			}
		}
		return -1;
	};

	if (!String.prototype.trim) {
		String.prototype.trim = function (v) {
			if (v) {
				var len = this.length;
				var s = 0;
				var e = len - 1;
				while (++s < len && this.charAt(s) == v) {
				}
				while (--e > s && this.charAt(e) == v) {
				}
				return this.substring(s, e + 1);
			}
			else {
				var len = this.length;
				var s = -1;
				var e = len;
				var c;
				while (++s < len && ((c = this.charCodeAt(s)) == 32 || (c >= 9 && c <= 13) || 
					c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
					c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
				}
				while (--e > s && ((c = this.charCodeAt(e)) == 32 || (c >= 9 && c <= 13) || 
					c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
					c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
				}
				return this.substring(s, e + 1);
			}
		};
	}

	nexacro.replaceAll = function (str, orgStr, repStr) {
		return str.split(orgStr).join(repStr);
		;
	};

	if (nexacro.Browser == "Runtime" || nexacro.Browser == "Chrome") {
		nexacro._replaceAll = function (str, orgStr, repStr) {
			return str.split(orgStr).join(repStr);
		};
	}
	else {
		nexacro._replaceAll = function (str, orgStr, repStr) {
			return str.replace(new RegExp(orgStr, "g"), repStr);
		};
	}

	String.prototype.padLeft = function (n, pad) {
		var t = [];
		if (n > this.length) {
			for (var i = 0, cnt = n - this.length; i < cnt; i++) {
				t.push(pad);
			}
		}
		t.push(this);
		return t.join('');
	};
	String.prototype.padRight = function (n, pad) {
		var t = [];
		t.push(this);
		if (n > this.length) {
			for (i = 0, cnt = n - this.length; i < cnt; i++) {
				t.push(pad);
			}
		}
		return t.join('');
	};

	nexacro.isNumeric = function (v) {
		if (v == null || v === "") {
			return false;
		}
		if (typeof (v) == "number") {
			if (v >= 48 && v <= 57) {
				return true;
			}
			return false;
		}
		if (typeof (v) == "string") {
			var len = v.length;
			for (var i = 0; i < len; i++) {
				var c = v.charCodeAt(i);
				if (c >= 48 && c <= 57) {
					continue;
				}
				return false;
			}
			return true;
		}
		if (typeof (v) == "object") {
			if (v instanceof String) {
				var value = v.valueOf();
				if (typeof (value) != "object") {
					return nexacro.isNumeric(value);
				}
			}
		}
		return false;
	};

	nexacro.isAlpha = function (v) {
		if (v == null || v === "") {
			return false;
		}
		if (typeof (v) == "number") {
			if ((v >= 65 && v <= 90) || (v >= 97 && v <= 122)) {
				return true;
			}
			return false;
		}
		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			for (var i = 0; i < len; i++) {
				var c = v.charCodeAt(i);
				if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
					continue;
				}
				return false;
			}
			return true;
		}
		return false;
	};

	nexacro.isAlphaNumeric = function (v) {
		if (v == null || v === "") {
			return false;
		}
		if (typeof (v) == "number") {
			if ((v >= 48 && v <= 57) || (v >= 65 && v <= 90) || (v >= 97 && v <= 122) || (v == 95)) {
				return true;
			}
			return false;
		}
		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			for (var i = 0; i < len; i++) {
				var c = v.charCodeAt(i);
				if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c == 95)) {
					continue;
				}
				return false;
				;
			}
			return true;
		}
		return false;
	};

	nexacro.isSpace = function (v) {
		if (v == null) {
			return false;
		}
		if (typeof (v) == "number") {
			if (v == 32 || (v >= 9 && v <= 13) || 
				v == 160 || v == 5760 || v == 6158 || (v >= 8192 && v <= 8202) || 
				v == 8232 || v == 8233 || v == 8239 || v == 8287 || v == 12288) {
				return true;
			}
		}

		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var c = v.charCodeAt(i);
					if (c == 32 || (c >= 9 && c <= 13) || 
						c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
						c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288) {
						continue;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	};

	nexacro.isLower = function (v) {
		if (v == null) {
			return false;
		}
		if (typeof (v) == "number") {
			if (v >= 97 && v <= 122) {
				return true;
			}
		}

		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var c = v.charCodeAt(i);
					if (c >= 97 && c <= 122) {
						continue;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	};

	nexacro.isUpper = function (v) {
		if (v == null) {
			return false;
		}
		if (typeof (v) == "number") {
			if (v >= 65 && v <= 90) {
				return true;
			}
		}
		if (typeof (v) == "string" || typeof v.valueOf() == "string") {
			var len = v.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var c = v.charCodeAt(i);
					if (c >= 65 && c <= 90) {
						continue;
					}
					return false;
				}
				return true;
			}
		}
		return false;
	};

	if (nexacro.Browser == "Runtime" || nexacro.Browser == "Chrome") {
		nexacro.wrapQuote = function (str) {
			if (arguments.length == 0) {
				return "";
			}
			if (str == null) {
				return "\"" + str + "\"";
			}

			str = str + "";
			str = str.split(/\\/g).join("\\\\");
			str = str.split(/"/g).join("\\\"");

			return "\"" + str + "\"";
		};

		nexacro.stripQuote = function (v) {
			if (typeof (v) != "string") {
				return v + "";
			}

			if (v.length >= 2 && ((v.substr(0, 1) == "'" && v.substr(v.length - 1, 1) == "'") || (v.substr(0, 1) == '"' && v.substr(v.length - 1, 1) == '"'))) {
				v = v.substring(1, v.length - 1);
			}

			if (v.indexOf("\\") >= 0) {
				v = v.split(/\\\"/g).join("\"");
				v = v.split(/\\\\/g).join("\\");
				return v;
			}

			return v;
		};
	}
	else {
		(function () {
			var re_quot = /"/g, re_esc = /\\/g;
			var un_quot = /\\\"/g, un_esc = /\\\\/g;

			nexacro.wrapQuote = function (str) {
				if (arguments.length == 0) {
					return "";
				}
				if (str == null) {
					return "\"" + str + "\"";
				}

				str = str + "";
				str = str.replace(re_esc, "\\\\").replace(re_quot, "\\\"");

				return "\"" + str + "\"";
			};

			nexacro.stripQuote = function (v) {
				if (typeof (v) != "string") {
					return v + "";
				}

				if (v.length >= 2 && ((v.substr(0, 1) == "'" && v.substr(v.length - 1, 1) == "'") || (v.substr(0, 1) == '"' && v.substr(v.length - 1, 1) == '"'))) {
					v = v.substring(1, v.length - 1);
				}

				if (v.indexOf("\\") >= 0) {
					v = v.replace(un_quot, "\"").replace(un_esc, "\\");
					return v;
				}

				return v;
			};
		})();
	}

	nexacro.trimLeft = function (str, v) {
		if (v) {
			var len = str.length;
			var s = -1;
			while (++s < len && str.charAt(s) !== v) {
			}
			return str.substring(s + 1);
		}
		else {
			var len = str.length;
			var s = -1;
			var c;
			while (++s < len && ((c = str.charCodeAt(s)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			return str.substring(s);
		}
	};

	nexacro.trimRight = function (str, v) {
		if (v) {
			var len = str.length;
			var e = len;
			while (--e >= 0 && str.charAt(e) !== v) {
			}
			return str.substring(0, e);
		}
		else {
			var len = str.length;
			var e = len;
			var c;
			while (--e >= 0 && ((c = str.charCodeAt(e)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			return str.substring(0, e + 1);
		}
	};

	nexacro.trim = function (str, v) {
		if (v) {
			var len = str.length;
			var s = 0;
			var e = len - 1;
			while (s < len && str.charAt(s) == v && ++s) {
			}
			while (e > s && str.charAt(e) == v && --e) {
			}
			return str.substring(s, e + 1);
		}
		else {
			var len = str.length;
			var s = -1;
			var e = len;
			var c;
			while (++s < len && ((c = str.charCodeAt(s)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			while (--e > s && ((c = str.charCodeAt(e)) == 32 || (c >= 9 && c <= 13) || 
				c == 160 || c == 5760 || c == 6158 || (c >= 8192 && c <= 8202) || 
				c == 8232 || c == 8233 || c == 8239 || c == 8287 || c == 12288)) {
			}
			return str.substring(s, e + 1);
		}
	};

	nexacro.toNumber = function (v, NaNval, pinfval, ninfval) {
		var n = (+v);

		if (n != n) {
			return (NaNval !== undefined) ? NaNval : n;
		}
		else if (n == Infinity) {
			return (pinfval !== undefined) ? pinfval : n;
		}
		else if (n == -Infinity) {
			return (ninfval !== undefined) ? ninfval : n;
		}
		return n;
	};

	if (!Date.prototype.addMonth) {
		Date.prototype.addMonth = function (v) {
			return this.setMonth(this.getMonth() + v);
		};

		Date.prototype.addDate = function (v) {
			return this.setDate(this.getDate() + v);
		};

		Date.prototype.addHours = function (v) {
			return this.setHours(this.getHours() + v);
		};

		Date.prototype.addMilliseconds = function (v) {
			return this.setMilliseconds(this.getMilliseconds() + v);
		};

		Date.prototype.addMinutes = function (v) {
			return this.setMinutes(this.getMinutes() + v);
		};

		Date.prototype.addSeconds = function (v) {
			return this.setSeconds(this.getSeconds() + v);
		};

		Date.prototype.addYear = function (v) {
			return this.setFullYear(this.getFullYear() + v);
		};

		Date.prototype.getYear = function () {
			var y = this.getFullYear();
			if (1900 <= y && y <= 1999) {
				return (y - 1900);
			}
			return y;
		};
	}

	nexacro._pow_factors = [1e-30, 1e-29, 1e-28, 1e-27, 1e-26, 1e-25, 1e-24, 1e-23, 1e-22, 1e-21, 1e-20, 1e-19, 1e-18, 1e-17, 1e-16, 1e-15, 1e-14, 1e-13, 1e-12, 1e-11, 1e-10, 1e-9, 1e-8, 1e-7, 1e-6, 1e-5, 1e-4, 1e-3, 1e-2, 1e-1, 1, 1e+1, 1e+2, 1e+3, 1e+4, 1e+5, 1e+6, 1e+7, 1e+8, 1e+9, 1e+10, 1e+11, 1e+12, 1e+13, 1e+14, 1e+15, 1e+16, 1e+17, 1e+18, 1e+19, 1e+20, 1e+21, 1e+22, 1e+23, 1e+24, 1e+25, 1e+26, 1e+27, 1e+28, 1e+29, 1e+30];
	if (!nexacro.floor) {
		nexacro.floor = function (v, digit) {
			if (digit == undefined) {
				return Math.floor(v);
			}
			var p = nexacro._pow_factors[digit + 30];
			return Math.floor(v * p) / p;
		};
	}
	;

	if (!nexacro.ceil) {
		nexacro.ceil = function (v, digit) {
			var str_v = v + "";
			var idx_dot = str_v.indexOf(".");
			var str_len = str_v.length;
			var decimal_len = str_len - idx_dot - 1;
			if (digit == undefined) {
				return Math.ceil(v);
			}
			else if (digit && digit >= decimal_len) {
				return v;
			}

			var p = nexacro._pow_factors[digit + 30];
			return Math.ceil(v * p) / p;
		};
	}
	;

	if (!nexacro.round) {
		nexacro.round = function (v, digit) {
			if (digit == undefined) {
				return Math.round(v);
			}
			var p = nexacro._pow_factors[digit + 30];
			return Math.round(v * p) / p;
		};
	}
	;

	if (!nexacro.parseDate) {
		if (nexacro.Browser == "Runtime" || nexacro.Browser == "Chrome") {
			nexacro.parseDate = function (date) {
				if (date && date.length > 0) {
					if (date.length > 10) {
						return nexacro._parseDatetime(date);
					}
					else {
						date = date.split("-").join("/");
						return Date.parse(date);
					}
				}
				else {
					return undefined;
				}
			};
		}
		else {
			(function () {
				var re_minus = /-/g;

				nexacro.parseDate = function (date) {
					if (date && date.length > 0) {
						if (date.length > 10) {
							return nexacro._parseDatetime(date);
						}
						else {
							date = date.replace(re_minus, "/");
							return Date.parse(date);
						}
					}
					else {
						return undefined;
					}
				};
			})();
		}

		nexacro._parseDatetime = function (datetime) {
			if (datetime.length > 0) {
				var parsedStr = "";
				if (datetime.length > 10 && datetime[10] === "T") {
					datetime = datetime.replace("T", " ");
				}
				parsedStr = datetime.split(" ");
				if (parsedStr.length > 2) {
					return Date.parse(datetime);
				}
				var date = parsedStr[0];
				var time = parsedStr[1];
				var newdatetime = nexacro.parseDate(date);
				newdatetime += nexacro._parseTime(time);
				return newdatetime;
			}
			else {
				return undefined;
			}
		};
		nexacro._parseTime = function (time) {
			if (time.length > 0) {
				var parsedStr = "";
				parsedStr = time.split(":");
				var hour = parseInt(parsedStr[0]) | 0;
				var min = parseInt(parsedStr[1]) | 0;
				var sec = parsedStr[2];
				parsedStr = sec.split(".");
				sec = parseInt(parsedStr[0]) | 0;
				var strMillsec = "";
				if (parsedStr[1] != undefined) {
					strMillsec = parsedStr[1];
				}
				var len = strMillsec.length;
				for (var i = len; i < 3; i++) {
					strMillsec += "0";
				}
				var millsec = parseInt(strMillsec) | 0;
				var newtime = (hour * 3600 * 1000) + (min * 60 * 1000) + (sec * 1000) + millsec;
				return newtime;
			}
			else {
				return undefined;
			}
		};
	}

	nexacro._nexacroBind = function (_this, fn) {
		var retfn = function () {
			return fn.apply(_this, arguments);
		};
		retfn._bindthis = _this;
		return retfn;
	};

	if (nexacro.Browser == "Runtime") {
		nexacro._executeEvalStr = function (evalstr, url) {
			try {
				if (url) {
					evalstr += ("\r\n//@ sourceURL=" + encodeURI(url));
				}
				return eval(evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};
		nexacro._executeScript = function (script, url) {
			try {
				return nexacro.__executeScript(url, script);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				script = null;
			}
		};
	}
	else if (nexacro.Browser == "Gecko") {
		nexacro._executeEvalStr = function (evalstr, url) {
			var err = null;
			try {
				if (url) {
					evalstr += ("\r\n//@ sourceURL=" + encodeURI(url));
				}

				err = new Error('at eval script(' + url + ')');
				return eval(evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url, err.lineNumber));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};
		nexacro._executeScript = nexacro._executeEvalStr;
	}
	else {
		nexacro._executeEvalStr = function (evalstr, url) {
			try {
				if (url) {
					evalstr += ("\r\n//@ sourceURL=" + encodeURI(url));
				}

				return eval(evalstr);
			}
			catch (e) {
				if (trace) {
					trace(nexacro._getEvalExceptionMessage(e, url));
				}
				return e;
			}
			finally {
				evalstr = null;
			}
		};
		nexacro._executeScript = nexacro._executeEvalStr;
	}

	nexacro._createInlineFunc = function (inline_expr, arglist) {
		var _fn_ = "_fn_ = function(";
		_fn_ += arglist.join(',');
		_fn_ += ") { ";
		_fn_ += "try { return " + inline_expr + "; } ";
		_fn_ += "catch(e) { return undefined; } };";
		return _fn_ = nexacro._executeEvalStr(_fn_);
	};

	nexacro._emptyFn = function () {
	};

	nexacro._emptyFnExistReturn = function () {
		return null;
	};

	nexacro._echoFn = function (v) {
		return v;
	};


	nexacro._isNumber = function (v) {
		return (typeof (v) == "number");
	};

	nexacro._isInt = function (v) {
		if (typeof (v) == "number") {
			return (v == (v | 0));
		}
		return false;
	};

	nexacro._isString = function (v) {
		return typeof (v) == "string";
	};

	nexacro._isUndefined = function (v) {
		return (v === undefined);
	};

	nexacro._isNull = function (v) {
		return (v === undefined || v === null);
	};

	nexacro._isArray = function (v) {
		return (v instanceof Array);
	};

	nexacro._isFunction = function (v) {
		return (typeof (v) == "function");
	};

	nexacro._isObject = function (v) {
		return (typeof (v) == "object");
	};

	nexacro._isDecimal = function (v) {
		return (v instanceof nexacro.Decimal);
	};

	nexacro._nvl = function (v, def) {
		return (v == null || v == "") ? def : v;
	};
	nexacro._parseInt = function (v, def) {
		if (v == null) {
			return def;
		}
		var ret = parseInt(v);
		return (isFinite(ret)) ? ret : def;
	};

	nexacro._toString = function (v) {
		return (v == null) ? v : v + "";
	};

	nexacro._toInt = function (v) {
		var num = parseInt(v) | 0;

		return (isFinite(num)) ? num : undefined;
	};

	nexacro._toBoolean = function (v) {
		if (typeof v == "number") {
			return (v == v) && v != 0;
		}
		if (typeof v == 'string') {
			if (v == "false" || v == "NaN") {
				return false;
			}
			return (+v) != 0;
		}
		else if (v instanceof nexacro.Decimal) {
			v = (+v);
			return (v == v) && v != 0;
		}
		else {
			return !!v;
		}
	};

	nexacro._convertPtToPx = function (ptsize) {
		ptsize = parseInt(ptsize) | 0;
		if (!isNaN(ptsize)) {
			return (ptsize * (0.35146 / 25.4) * 96);
		}
		return null;
	};

	nexacro._isAbsolutePath = function (url) {
		if (!url) {
			return false;
		}

		var ch = url.charAt(0);
		if (ch == '/' || ch == '\\') {
			return true;
		}

		if (url.indexOf("::") >= 0) {
			return false;
		}

		if (url.substring(0, 8).toLowerCase() != "theme://" && url.indexOf(":\/") >= 0) {
			return true;
		}

		if (url.substring(0, 10).toLowerCase() == "data:image") {
			return true;
		}

		return false;
	};

	if (nexacro.Browser == "Runtime" || nexacro.Browser == "Chrome") {
		nexacro._getBaseUrl = function (url) {
			if (!url) {
				return url;
			}
			url = url.split("\\").join("/");
			if (url.charAt(url.length - 1) != '/') {
				url = url.substring(0, url.lastIndexOf("/") + 1);
			}

			return url;
		};
	}
	else {
		(function () {
			var re_backslach = /\\/g;

			nexacro._getBaseUrl = function (url) {
				url = url.replace(re_backslach, "/");
				if (url.charAt(url.length - 1) != '/') {
					url = url.substring(0, url.lastIndexOf("/") + 1);
				}
				return url;
			};
		})();
	}

	nexacro._getURIValue = function (uristr) {
		if (uristr && uristr.substring(0, 4).toLowerCase() == "url(") {
			if (uristr.charAt(4) == "'" && uristr.charAt(uristr.length - 2) == "'") {
				uristr = uristr.substring(5, uristr.length - 2);
			}
			else if (uristr.charAt(4) == "\"" && uristr.charAt(uristr.length - 2) == "\"") {
				uristr = uristr.substring(5, uristr.length - 2);
			}
			else {
				uristr = uristr.substring(4, uristr.length - 1);
			}
			return nexacro.stripQuote(uristr);
		}
		return uristr;
	};

	nexacro.Object = function (id, parent) {
		this.id = id || "";
		this.parent = parent || null;
	};

	var _pObject = nexacro._createPrototype(Object, nexacro.Object);
	nexacro.Object.prototype = _pObject;
	_pObject._type_name = "Object";

	_pObject._toString_str = "[object Object]";
	_pObject._is_array = false;
	_pObject._is_data = false;
	_pObject._is_event = false;
	_pObject._is_elelemt = false;
	_pObject._is_component = false;
	_pObject._is_context = false;
	_pObject._is_form = false;
	_pObject._is_frame = false;
	_pObject._is_window = false;
	_pObject._is_application = false;

	_pObject.toString = function () {
		return "[object " + this._type_name + "]";
	};

	_pObject.getSetter = function (name, fnname) {
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.SetterBinder(this, name, fn);
		}
		return new nexacro.PropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(_pObject, "getSetter", {
				"value" : _pObject.getSetter, 
				"writable" : true, 
				"enumerable" : false
			});
		}
		catch (e) {
			;
		}
	}

	_pObject.getNumSetter = function (name, fnname) {
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.IntSetterBinder(this, name, fn);
		}
		return new nexacro.NumPropBinder(this, name);
	};

	if (Object.defineProperty) {
		try {
			Object.defineProperty(_pObject, "getNumSetter", {
				"value" : _pObject.getNumSetter, 
				"writable" : false, 
				"enumerable" : false
			});
		}
		catch (e) {
			;
		}
	}


	_pObject.set_id = function (id) {
		this.id = id;
	};
	_pObject.destroy = function () {
		this.parent = null;
	};

	delete _pObject;

	nexacro.Collection = function () {
		this._idArray = [];
		this._idxMap = {
		};
		this.length = 0;
	};
	var _pCollection = nexacro._createPrototype(Object, nexacro.Collection);
	nexacro.Collection.prototype = _pCollection;
	_pCollection._type_name = "ObjectArray";

	_pCollection._is_array = true;

	_pCollection.toString = function () {
		return "[object " + this._type_name + "]";
	};


	_pCollection.get_id = function (idx) {
		return this._idArray[idx];
	};

	_pCollection.update_id = function (idx, newID) {
		var id_array = this._idArray;
		var oldID = id_array[idx];
		if (oldID != null && oldID != newID) {
			this[newID] = this[oldID];
			delete this[oldID];
			var idx_map = this._idxMap;
			idx_map[newID] = idx;
			delete idx_map[oldID];
			id_array[idx] = newID;
			return true;
		}
		return false;
	};

	_pCollection.indexOf = function (id) {
		return this._idxMap[id];
	};

	_pCollection.get_item = function (key) {
		return this[key];
	};
	_pCollection.set_item = function (key, val) {
		if (typeof (key) == "number") {
			var id = this._idArray[key];
			if (id != null) {
				return (this[id] = this[key] = val);
			}
		}
		else {
			var idx = this._idxMap[key];
			if (idx != null) {
				return (this[key] = this[idx] = val);
			}
		}
		return undefined;
	};
	_pCollection.clear = function () {
		var id_array = this._idArray;
		var len = id_array.length;
		for (var i = 0; i < len; i++) {
			delete this[id_array[i]];
			this[id_array[i]] = null;
			delete this[i];
			this[i] = null;
		}
		this._idArray = [];
		this._idxMap = {
		};
		this.length = 0;

		id_array = null;
	};

	_pCollection.add_item = function (id, obj) {
		var idx_map = this._idxMap;
		var idx = idx_map[id];
		if (idx != null) {
			this[id] = this[idx] = obj;
		}
		else {
			idx = this.length;
			this[id] = this[idx] = obj;
			this._idArray.push(id);
			this._idxMap[id] = idx;
			this.length = this._idArray.length;
		}
		return idx;
	};
	_pCollection.add = _pCollection.add_item;
	_pCollection.append = _pCollection.add_item;
	_pCollection.appendItem = _pCollection.add_item;

	_pCollection.delete_item = function (key) {
		if (typeof (key) == "number") {
			var id_array = this._idArray;
			var idx_map = this._idxMap;
			var len = id_array.length - 1;
			if (key >= 0 && key <= len) {
				var id = id_array[key];
				delete this[id];

				id_array.splice(key, 1);
				for (var i = key; i < len; i++) {
					idx_map[id_array[i]] = i;
					this[i] = this[i + 1];
				}
				delete this[i];
				delete idx_map[id];

				this.length = id_array.length;
				return key;
			}
			return -1;
		}
		else {
			var id_array = this._idArray;
			var idx_map = this._idxMap;
			var idx = idx_map[key];
			if (idx != null) {
				var len = id_array.length - 1;
				delete this[key];

				id_array.splice(idx, 1);
				for (var i = idx; i < len; i++) {
					idx_map[id_array[i]] = i;
					this[i] = this[i + 1];
				}
				delete this[i];
				delete idx_map[key];

				this.length = id_array.length;
				return idx;
			}
			return -1;
		}
	};
	_pCollection.remove = _pCollection.delete_item;
	_pCollection.remove_item = _pCollection.delete_item;

	_pCollection.insert_item = function (idx, id, obj) {
		idx = (idx | 0);
		var id_array = this._idArray;
		var idx_map = this._idxMap;
		var len = id_array.length;
		if (idx >= len || idx == -1) {
			return this.add_item(id, obj);
		}
		if (id in idx_map) {
			return this.set_item(idx, obj);
		}

		this[id] = obj;
		id_array.splice(idx, 0, id);
		len++;
		for (var i = len - 1; i >= idx + 1; i--) {
			idx_map[id_array[i]] = i;
			this[i] = this[i - 1];
		}
		this[idx] = obj;
		idx_map[id] = idx;
		this.length = len;
		return idx;
	};
	_pCollection.insert = _pCollection.insert_item;

	_pCollection.size = function () {
		return this.length;
	};

	_pCollection.destroy = function () {
		var id_array = this._idArray;
		var len = id_array.length;
		for (var i = 0; i < len; i++) {
			this[id_array[i]] = null;
			this[i] = null;
		}
		this._idArray = null;
		this._idxMap = null;
		this.length = 0;
	};

	_pCollection.set_length = nexacro._emptyFn;

	delete _pCollection;

	nexacro.Error = function (name, except) {
		this.id = this.name = name;
		this.except = except;
	};
	var _pError = nexacro._createPrototype(nexacro.Object, nexacro.Error);
	nexacro.Error.prototype = _pError;

	_pError._type_name = "Error";

	_pError.toString = function () {
		return this.name + ": " + this.except;
	};
	delete _pError;



	nexacro._GetSystemErrorMsg = function (obj, errorcode) {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		var args = Array.prototype.slice.call(arguments, 1);
		var errormsg = application._getErrorMessge.apply(this, args);

		return errormsg;
	};



	nexacro.EventSinkObject = function (id, parent) {
		this.id = id;
		this.parent = parent || null;
	};

	var _pEventSinkObject = nexacro._createPrototype(nexacro.Object, nexacro.EventSinkObject);
	nexacro.EventSinkObject.prototype = _pEventSinkObject;
	_pEventSinkObject._type_name = "EventSinkObject";

	_pEventSinkObject._event_list = {
	};
	_pEventSinkObject._loading_event_list = null;
	_pEventSinkObject._created_event_list = null;

	_pEventSinkObject.destroy = function () {
		this._clearEventListeners();
		this._event_list = null;
		this._loading_event_list = null;
		this._created_event_list = null;
		nexacro.Object.prototype.destroy.call(this);
	};

	_pEventSinkObject._clearEventListener = function (evt_id) {
		var evt = this[evt_id];
		if (evt && evt._has_handlers) {
			evt._clearAll();
			this[evt_id] = null;
		}
	};
	_pEventSinkObject._clearEventListeners = function () {
		var evt_list = this._created_event_list;
		if (evt_list) {
			var len = evt_list.length;
			if (len > 0) {
				var i = 0;
				while (true) {
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
					if (i >= len) {
						break;
					}
					this._clearEventListener(evt_list[i++]);
				}
			}
		}
	};

	_pEventSinkObject._setEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._setHandler(target, func);
			}
			else {
				idx = listener._setHandler(this, func);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._setHandler(target, func);
			}
			else {
				idx = listener._setHandler(this, func);
			}
		}
		return idx;
	};

	_pEventSinkObject._addEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._addHandler(target, func);
			}
			else {
				idx = listener._addHandler(this, func);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandler(target, func);
			}
			else {
				idx = listener._addHandler(this, func);
			}
		}
		return idx;
	};

	_pEventSinkObject._removeEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var nRemovedEvt = 0;
		if (listener) {
			if (target) {
				nRemovedEvt = listener._removeHandler(target, func);
			}
			else {
				nRemovedEvt = listener._removeHandler(null, func);
			}
		}
		return nRemovedEvt;
	};

	_pEventSinkObject._findEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -2;
		if (listener) {
			var handlers = listener._sys_handlers;
			if (target) {
				idx = listener._findHandler(handlers, target, func);
			}
			else {
				idx = listener._findHandler(handlers, null, func);
			}
		}
		return idx;
	};

	_pEventSinkObject.setEventHandler = function (evt_id, func, target) {
		if (!func) {
			return -1;
		}

		if (this._is_loading) {
			if (!this._loading_event_list) {
				this._loading_event_list = [];
			}

			this._loading_event_list.push({
				id : evt_id, 
				func : func, 
				target : target
			});
		}

		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._setHandler(target, func, true);
			}
			else {
				idx = listener._setHandler(this, func, true);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._setHandler(target, func, true);
			}
			else {
				idx = listener._setHandler(this, func, true);
			}
		}
		return idx;
	};

	_pEventSinkObject.addEventHandler = function (evt_id, func, target) {
		if (this._is_loading) {
			if (!this._loading_event_list) {
				this._loading_event_list = [];
			}
			this._loading_event_list.push({
				id : evt_id, 
				func : func, 
				target : target
			});
		}

		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._addHandler(target, func, true);
			}
			else {
				idx = listener._addHandler(this, func, true);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandler(target, func, true);
			}
			else {
				idx = listener._addHandler(this, func, true);
			}
		}
		return idx;
	};

	_pEventSinkObject.removeEventHandler = function (evt_id, func, target) {
		if (!func) {
			return 0;
		}

		var listener = this[evt_id];
		var nRemovedEvt = 0;
		if (listener) {
			if (target) {
				nRemovedEvt = listener._removeHandler(target, func, true);
			}
			else {
				nRemovedEvt = listener._removeHandler(null, func, true);
			}
		}
		return nRemovedEvt;
	};

	_pEventSinkObject.findEventHandler = function (evt_id, func, target) {
		var listener = this[evt_id];
		var idx = -2;
		if (listener) {
			var handlers = listener._user_handlers;
			if (target) {
				idx = listener._findHandler(handlers, target, func);
			}
			else {
				idx = listener._findHandler(handlers, this, func);
			}
		}
		return idx;
	};

	_pEventSinkObject.getEventHandler = function (evt_id, idx) {
		var listener = this[evt_id];
		var fn = "";
		if (listener) {
			var handlers = listener._user_handlers;
			fn = listener._getHandler(handlers, idx);
		}
		return fn;
	};

	_pEventSinkObject.clearEventHandler = function (evt_id) {
		var listener = this[evt_id];
		if (listener) {
			return listener._clearAll();
		}
		return 0;
	};

	_pEventSinkObject.setEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._setHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._setHandlerLookup(this, funcstr);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}

			if (target) {
				idx = listener._setHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._setHandlerLookup(this, funcstr);
			}
		}
		return idx;
	};

	_pEventSinkObject.addEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var idx = -1;
		if (listener) {
			if (target) {
				idx = listener._addHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._addHandlerLookup(this, funcstr);
			}
		}
		else if (evt_id in this._event_list) {
			listener = new nexacro.EventListener(evt_id);
			this[evt_id] = listener;
			if (this._created_event_list) {
				this._created_event_list.push(evt_id);
			}
			else {
				this._created_event_list = [];
				this._created_event_list.push(evt_id);
			}
			if (target) {
				idx = listener._addHandlerLookup(target, funcstr);
			}
			else {
				idx = listener._addHandlerLookup(this, funcstr);
			}
		}
		return idx;
	};

	_pEventSinkObject.removeEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var nRemovedEvt = 0;
		if (listener) {
			if (target) {
				nRemovedEvt = listener._removeHandlerLookup(target, funcstr);
			}
			else {
				nRemovedEvt = listener._removeHandlerLookup(this, funcstr);
			}
		}
		return nRemovedEvt;
	};

	_pEventSinkObject.findEventHandlerLookup = function (evt_id, funcstr, target) {
		var listener = this[evt_id];
		var idx = -2;
		if (listener) {
			var handlers = listener._user_handlers;
			if (target) {
				idx = listener._findHandlerLookup(handlers, target, funcstr);
			}
			else {
				idx = listener._findHandlerLookup(handlers, this, funcstr);
			}
		}
		return idx;
	};

	delete _pEventSinkObject;

	nexacro.EventHandler = function (obj, fn) {
		this.target = obj;
		this.handler = fn;
	};

	nexacro.EventListener = function (id) {
		this.id = this.name = id;
		this.length = 0;

		this.defaultprevented = false;
		this.stoppropagation = false;

		this._sys_handlers = [];
		this._user_handlers = [];
		this._has_handlers = false;
	};
	var _pEventListener = nexacro._createPrototype(nexacro.Object, nexacro.EventListener);
	nexacro.EventListener.prototype = _pEventListener;

	_pEventListener._type_name = "EventListener";

	_pEventListener.set_length = nexacro._emptyFn;

	_pEventListener._findByObj = function (handlers, obj) {
		var len = handlers.length;
		for (var i = 0; i < len; i++) {
			if (handlers[i].target == obj) {
				return i;
			}
		}
		return -1;
	};

	_pEventListener._findHandler = function (handlers, obj, fn) {
		var len = handlers.length;
		for (var i = 0; i < len; i++) {
			if (handlers[i].target == obj && handlers[i].handler == fn) {
				return i;
			}
		}
		return -1;
	};

	_pEventListener._getHandler = function (handlers, idx) {
		var len = handlers.length;
		if (idx >= 0 && idx < len) {
			return handlers[idx].handler;
		}
		return undefined;
	};

	_pEventListener._setHandler = function (obj, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}

		var target = obj;
		var idx = this._findByObj(handlers, target);
		if (idx < 0) {
			idx = handlers.length;
			handlers.push(new nexacro.EventHandler(target, fn));
		}
		else {
			handlers[idx] = new nexacro.EventHandler(target, fn);
		}
		this._has_handlers |= handlers.length;
		return idx;
	};

	_pEventListener._addHandler = function (obj, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}
		var idx = -1;
		if (fn) {
			var target = obj;
			var len = handlers.length;
			var _handler = new nexacro.EventHandler(target, fn);
			for (var i = 0; i < len; i++) {
				if (handlers[i].handler == _handler.handler && handlers[i].target == _handler.target) {
					return i;
				}
			}
			handlers.push(_handler);

			if (user_handler) {
				this.length = handlers.length;
			}

			this._has_handlers |= handlers.length;
			idx = len;
		}
		return idx;
	};

	_pEventListener._removeHandler = function (obj, fn, user_handler) {
		var handlers = this._sys_handlers;
		if (user_handler) {
			handlers = this._user_handlers;
		}
		var len = handlers.length;
		for (var i = len - 1; i >= 0; i--) {
			if (obj == null) {
				if (fn == null) {
					handlers.splice(i, 1);
				}
				else if (handlers[i].handler == fn) {
					handlers.splice(i, 1);
				}
			}
			else {
				if (fn == null) {
					handlers.splice(i, 1);
				}
				else if (handlers[i].target == obj && handlers[i].handler == fn) {
					handlers.splice(i, 1);
				}
			}
		}
		this._has_handlers |= handlers.length;

		if (user_handler) {
			this.length = handlers.length;
		}

		return len - handlers.length;
	};

	_pEventListener._setHandlerLookup = function (obj, fnstr) {
		var handlers = this._user_handlers;
		var idx = -1;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					var target = f;
					idx = this._findByObj(handlers, target);
					if (idx < 0) {
						idx = handlers.length;
						handlers.push(new nexacro.EventHandler(target, fn));
					}
					else {
						handlers[idx] = new nexacro.EventHandler(target, fn);
					}
					this._has_handlers |= handlers.length;
					return idx;
				}
				if (f._type_name == "Application") {
					return idx;
				}
			}
		}
		return idx;
	};

	_pEventListener._addHandlerLookup = function (obj, fnstr) {
		var handlers = this._user_handlers;
		var idx = -1;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					var target = obj;
					idx = handlers.length;

					for (var i = 0; i < idx; i++) {
						if (handlers[i].handler == f[fnstr]) {
							return i;
						}
					}

					handlers.push(new nexacro.EventHandler(target, f[fnstr]));
					this._has_handlers |= handlers.length;
					return idx;
				}
				if (f._type_name == "Application") {
					return idx;
				}
			}
		}
		return idx;
	};

	_pEventListener._removeHandlerLookup = function (obj, fnstr) {
		var handlers = this._user_handlers;
		var len = handlers.length;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					for (var i = len - 1; i >= 0; i--) {
						if (handlers[i].handler == fn) {
							handlers.splice(i, 1);
						}
					}
					this._has_handlers |= handlers.length;
				}
				if (f._type_name == "Application") {
					return len - handlers.length;
				}
			}
		}
		return 0;
	};

	_pEventListener._findHandlerLookup = function (handlers, obj, fnstr) {
		var len = handlers.length;
		if (fnstr.length > 0) {
			for (var f = obj; (f != null); f = f.parent) {
				var fn = f[fnstr];
				if (fn) {
					for (var i = 0; i < len; i++) {
						if (handlers[i].target == f && handlers[i].handler == fn) {
							return i;
						}
					}
					this._has_handlers |= handlers.length;
				}
				if (f._type_name == "Application") {
					return -1;
				}
			}
		}
		return -1;
	};

	_pEventListener._clearAll = function () {
		var numofEvent = this._sys_handlers.length + this._user_handlers.length;
		var len = this._sys_handlers.length;
		for (var i = 0; i < len; i++) {
			var handler = this._sys_handlers[i];
			handler.target = null;
			handler.handler = null;
			this._sys_handlers[i] = null;
			delete this._sys_handlers[i];
		}

		len = this._user_handlers.length;
		for (i = 0; i < len; i++) {
			var handler = this._user_handlers[i];
			handler.target = null;
			handler.handler = null;
			handler = null;
			this._user_handlers[i] = null;
			delete this._user_handlers[i];
		}
		this._sys_handlers = [];
		this._user_handlers = [];
		this.length = 0;
		this._has_handlers = 0;
		return numofEvent;
	};

	_pEventListener._fireEvent = function (obj, evt, only_sys) {
		var i, ret;
		var h;
		var handlers = this._user_handlers;
		var len = handlers.length;

		if (!only_sys) {
			try {
				for (var i = 0; i < len; i++) {
					h = handlers[i];
					if (obj.enableevent !== false) {
						ret = h.handler.call(h.target, obj, evt);
					}
					if (evt) {
						this.defaultprevented = evt._prevented;
						this.stoppropagation = evt._stoppropagation;
					}
				}
			}
			catch (e) {
				if (e.obj) {
					application._onSystemError(e.obj, e.name, e.message);
				}
				else {
					var msg = nexacro._getExceptionMessage(e);
					application._onSystemError(application, e.name, msg);
				}
			}
		}

		handlers = this._sys_handlers;
		len = handlers.length;

		for (var i = 0; i < len; i++) {
			h = handlers[i];
			if (obj.enableevent !== false) {
				ret = h.handler.call(h.target, obj, evt);
			}
			if (evt) {
				this.defaultprevented = evt._prevented;
				this.stoppropagation = evt._stoppropagation;
			}
		}

		return ret;
	};

	_pEventListener._fireSysEvent = function (obj, evt) {
		var i, ret;
		var handlers = this._sys_handlers;
		var len = handlers.length;
		var h;
		for (var i = 0; i < len; i++) {
			h = handlers[i];
			if (obj.enableevent !== false) {
				ret = h.handler.call(h.target, obj, evt);
			}
			if (evt) {
				this.defaultprevented = evt._prevented;
				this.stoppropagation = evt._stoppropagation;
			}
		}
		return ret;
	};

	_pEventListener._fireUserEvent = function (obj, evt) {
		var i, ret;
		var h;
		var handlers = this._user_handlers;
		var len = handlers.length;

		try {
			for (var i = 0; i < len; i++) {
				h = handlers[i];

				if (obj.enableevent !== false) {
					ret = h.handler.call(h.target, obj, evt);
				}
				if (evt) {
					this.defaultprevented = evt._prevented;
					this.stoppropagation = evt._stoppropagation;
				}
			}
		}
		catch (e) {
			if (e.obj) {
				application._onSystemError(e.obj, e.name, e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				application._onSystemError(application, e.name, msg);
			}
		}
		return ret;
	};

	_pEventListener._fireCheckEvent = function (obj, evt) {
		var i, ret;
		var handlers = this._user_handlers;
		var len = handlers.length;
		var h;

		try {
			for (var i = 0; i < len; i++) {
				h = handlers[i];

				if (obj.enableevent !== false) {
					ret = h.handler.call(h.target, obj, evt);
				}
				if (evt) {
					this.defaultprevented = evt._prevented;
					this.stoppropagation = evt._stoppropagation;
				}

				if (ret) {
					ret = nexacro._toBoolean(ret);
				}

				if (ret != null && (!ret)) {
					return false;
				}
			}
		}
		catch (e) {
			if (e.obj) {
				application._onSystemError(e.obj, e.name, e.message);
			}
			else {
				var msg = nexacro._getExceptionMessage(e);
				application._onSystemError(application, e.name, msg);
			}
		}

		handlers = this._sys_handlers;
		len = handlers.length;
		var ret;
		for (var i = 0; i < len; i++) {
			h = handlers[i];
			if (obj.enableevent) {
				ret = h.handler.call(h.target, obj, evt);
			}
			if (evt) {
				this.defaultprevented = evt._prevented;
				this.stoppropagation = evt._stoppropagation;
			}
			if (ret != null && (!ret)) {
				return false;
			}
		}



		return true;
	};

	_pEventListener.fireEvent = function (obj, evt) {
		evt.eventid = this.name;
		evt.fromobject = obj;
		this._fireEvent(obj, evt);
	};

	_pEventListener.clear = function () {
		var cnt = this._user_handlers.length;
		this._user_handlers = [];
		this.length = 0;
		this._has_handlers = (this.length + this._sys_handlers.length);
		return cnt;
	};

	delete _pEventListener;

	nexacro.Event = function (obj, evt_id) {
		this.id = this.eventid = evt_id || "";
		this.fromobject = this.fromreferenceobject = obj;
		this._prevented = false;
		this._stoppropagation = false;
		this.cancelable = false;
		this.bubbles = false;
	};

	var _pEvent = nexacro._createPrototype(nexacro.Object, nexacro.Event);
	nexacro.Event.prototype = _pEvent;
	_pEvent._type_name = "Event";

	_pEvent._is_event = true;

	_pEvent.preventDefault = function () {
		this._prevented = this.cancelable;
	};

	_pEvent.stopPropagation = function () {
		this._stoppropagation = this.bubbles;
	};

	_pEvent.destroy = function () {
		this.fromobject = null;
		this.fromreferenceobject = null;
	};


	delete _pEvent;

	nexacro.EventInfo = function (obj, evt_id) {
		this.id = this.eventid = evt_id || "";
		this.fromobject = this.fromreferenceobject = obj;
		this._prevented = false;
		this._stoppropagation = false;
		this.cancelable = false;
		this.bubbles = false;
	};

	var _pEventInfo = nexacro._createPrototype(nexacro.Object, nexacro.EventInfo);
	nexacro.EventInfo.prototype = _pEventInfo;
	_pEventInfo._type_name = "EventInfo";

	_pEventInfo._is_event = true;

	_pEventInfo.set_eventid = function (v) {
		if (v && v != this.eventid) {
			this.eventid = v;
		}
	};

	delete _pEventInfo;

	nexacro.Event.KEY_RETURN = 13;
	nexacro.Event.KEY_ENTER = 13;
	nexacro.Event.KEY_TAB = 9;
	nexacro.Event.KEY_UP = 38;
	nexacro.Event.KEY_DOWN = 40;
	nexacro.Event.KEY_LEFT = 37;
	nexacro.Event.KEY_RIGHT = 39;
	nexacro.Event.KEY_SPACE = 32;
	nexacro.Event.KEY_SHIFT = 16;
	nexacro.Event.KEY_CTRL = 17;
	nexacro.Event.KEY_CONTROL = 17;
	nexacro.Event.KEY_ALT = 18;
	nexacro.Event.KEY_ESC = 27;
	nexacro.Event.KEY_F1 = 112;
	nexacro.Event.KEY_F2 = 113;
	nexacro.Event.KEY_F3 = 114;
	nexacro.Event.KEY_F4 = 115;
	nexacro.Event.KEY_F5 = 116;
	nexacro.Event.KEY_F6 = 117;
	nexacro.Event.KEY_F7 = 118;
	nexacro.Event.KEY_F8 = 119;
	nexacro.Event.KEY_F9 = 120;
	nexacro.Event.KEY_F10 = 121;
	nexacro.Event.KEY_F11 = 122;
	nexacro.Event.KEY_F12 = 123;
	nexacro.Event.KEY_DEL = 46;
	nexacro.Event.KEY_DELETE = 46;
	nexacro.Event.KEY_BACKSPACE = 8;
	nexacro.Event.KEY_INSERT = 45;
	nexacro.Event.KEY_HOME = 36;
	nexacro.Event.KEY_END = 35;
	nexacro.Event.KEY_PAGE_UP = 33;
	nexacro.Event.KEY_PAGE_DOWN = 34;
	nexacro.Event.KEY_NUM_LOCK = 144;
	nexacro.Event.KEY_NUMPAD0 = 96;
	nexacro.Event.KEY_NUMPAD1 = 97;
	nexacro.Event.KEY_NUMPAD2 = 98;
	nexacro.Event.KEY_NUMPAD3 = 99;
	nexacro.Event.KEY_NUMPAD4 = 100;
	nexacro.Event.KEY_NUMPAD5 = 101;
	nexacro.Event.KEY_NUMPAD6 = 102;
	nexacro.Event.KEY_NUMPAD7 = 103;
	nexacro.Event.KEY_NUMPAD8 = 104;
	nexacro.Event.KEY_NUMPAD9 = 105;
	nexacro.Event.KEY_NUMPAD_DIVIDE = 111;
	nexacro.Event.KEY_NUMPAD_MULTIPLY = 106;
	nexacro.Event.KEY_NUMPAD_MINUS = 109;
	nexacro.Event.KEY_NUMPAD_PLUS = 107;

	nexacro.TimerEventInfo = function (obj, id, timerid) {
		this.id = this.eventid = id || "ontimer";
		this.fromobject = this.fromreferenceobject = obj;
		this.timerid = timerid;
	};
	var _pTimerEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TimerEventInfo);
	nexacro.TimerEventInfo.prototype = _pTimerEventInfo;
	_pTimerEventInfo._type_name = "TimerEventInfo";

	delete _pTimerEventInfo;

	nexacro.ErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = this.fromreferenceobject = obj;

		this.cancelable = true;
		this.errortype = errortype;
		this.errormsg = errormsg;
		this.errorobj = errorobj;

		if (statuscode) {
			this.statuscode = statuscode;
		}
		else {
			this.statuscode = 0;
		}

		this.requesturi = requesturi;
		this.locationuri = locationuri;
	};
	var _pErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ErrorEventInfo);
	nexacro.ErrorEventInfo.prototype = _pErrorEventInfo;
	_pErrorEventInfo._type_name = "ErrorEventInfo";

	_pErrorEventInfo.set_errortype = function (n) {
		if (n && this.errortype != n) {
			this.errortype = n;
		}
	};

	_pErrorEventInfo.set_errormsg = function (v) {
		if (v && this.errormsg != v) {
			this.errormsg = v;
		}
	};

	_pErrorEventInfo.set_errorobj = function (obj) {
		if (obj && this.errorobj != obj) {
			this.errorobj = obj;
		}
	};

	_pErrorEventInfo.set_locationuri = function (v) {
		if (v && this.locationuri != v) {
			this.locationuri = v;
		}
	};

	_pErrorEventInfo.set_requesturi = function (v) {
		if (v && this.requesturi != v) {
			this.requesturi = v;
		}
	};

	_pErrorEventInfo.set_statuscode = function (v) {
		if (v && this.statuscode != v) {
			this.statuscode = v;
		}
	};

	_pErrorEventInfo.getHexaErrorCode = function () {
		return this.errorcode;
	};

	delete _pErrorEventInfo;

	nexacro.ExitEventInfo = function (obj, id) {
		this.id = this.eventid = id || "onexit";
		this.fromobject = this.fromreferenceobject = obj;
	};
	var _pExitEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ExitEventInfo);
	nexacro.ExitEventInfo.prototype = _pExitEventInfo;
	_pExitEventInfo._type_name = "ExitEventInfo";

	delete _pExitEventInfo;

	nexacro.AccessibilityEventInfo = function (obj, id, label, status, value, description) {
		this.id = this.eventid = id || "onaccessibility";
		this.fromobject = this.fromreferenceobject = obj;

		this.label = label;
		this.status = status;
		this.value = value;
		this.description = description;
	};
	var _pAccessibilityEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.AccessibilityEventInfo);
	nexacro.AccessibilityEventInfo.prototype = _pAccessibilityEventInfo;
	_pAccessibilityEventInfo._type_name = "AccessibilityEventInfo";

	delete _pAccessibilityEventInfo;

	nexacro.ActivateEventInfo = function (obj, id, state) {
		nexacro.Event.call(this, obj, id || "onactivate");
		this.fromobject = this.fromreferenceobject = obj;
		this.state = state;

		this.bubbles = true;
	};
	var _pActivateEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ActivateEventInfo);
	nexacro.ActivateEventInfo.prototype = _pActivateEventInfo;
	_pActivateEventInfo._type_name = "ActivateEventInfo";

	delete _pActivateEventInfo;

	nexacro.SysCommandEventInfo = function (obj, id, state) {
		this.id = this.eventid = id || "onsyscommand";
		this.fromobject = this.fromreferenceobject = obj;

		this.bubbles = true;

		this.state = state;
	};
	var _pSysCommandEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SysCommandEventInfo);
	nexacro.SysCommandEventInfo.prototype = _pSysCommandEventInfo;
	_pSysCommandEventInfo._type_name = "SysCommandEventInfo";

	delete _pSysCommandEventInfo;

	nexacro.CloseEventInfo = function (obj, id, from_comp, refer_comp, root_closing_comp) {
		nexacro.Event.call(this, obj, id || "onclose");
		this.bubbles = true;

		this.fromobject = from_comp || obj;
		this.fromreferenceobject = refer_comp || obj;

		this._root_closing_comp = root_closing_comp;
	};
	var _pCloseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CloseEventInfo);
	nexacro.CloseEventInfo.prototype = _pCloseEventInfo;
	_pCloseEventInfo._type_name = "CloseEventInfo";

	delete _pCloseEventInfo;

	nexacro.LoadEventInfo = function (obj, id, url) {
		nexacro.Event.call(this, obj, id || "onload");
		this.url = url;
	};
	var _pLoadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CloseEventInfo);
	nexacro.LoadEventInfo.prototype = _pLoadEventInfo;
	_pLoadEventInfo._type_name = "LoadEventInfo";

	delete _pLoadEventInfo;

	nexacro.SetFocusEventInfo = function (obj, id, oldcomp, oldrefcomp) {
		this.id = this.eventid = id || "onsetfocus";
		this.fromobject = this.fromreferenceobject = obj;

		this.oldcomponent = oldcomp;
		this.oldreferencecomponent = oldrefcomp;
	};
	var _pSetFocusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SetFocusEventInfo);
	nexacro.SetFocusEventInfo.prototype = _pSetFocusEventInfo;
	_pSetFocusEventInfo._type_name = "SetFocusEventInfo";

	delete _pSetFocusEventInfo;

	nexacro.KillFocusEventInfo = function (obj, id, newcomp, newrefcomp) {
		nexacro.Event.call(this, obj, id || "onkillfocus");
		this.newcomponent = newcomp;
		this.newreferencecomponent = newrefcomp;
	};
	var _pKillFocusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.KillFocusEventInfo);
	nexacro.KillFocusEventInfo.prototype = _pKillFocusEventInfo;
	_pKillFocusEventInfo._type_name = "KillFocusEventInfo";

	delete _pKillFocusEventInfo;

	nexacro.MoveEventInfo = function (obj, id, left, top) {
		this.id = this.eventid = id || "onmove";
		this.fromobject = this.fromreferenceobject = obj;

		this.x = left;
		this.y = top;
	};
	var _pMoveEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.MoveEventInfo);
	nexacro.MoveEventInfo.prototype = _pMoveEventInfo;
	_pMoveEventInfo._type_name = "MoveEventInfo";

	delete _pMoveEventInfo;

	nexacro.SizeEventInfo = function (obj, id, width, height) {
		this.id = this.eventid = id || "onsize";
		this.fromobject = this.fromreferenceobject = obj;

		this.cx = width;
		this.cy = height;

		this.reverse = false;

		this._orientation = nexacro._getMobileOrientation();

		switch (this._orientation) {
			case 0:
				this.orientation = "portrait";
				break;
			case 1:
				this.orientation = "portrait";
				this.reverse = true;
				break;
			case 2:
				this.orientation = "landscape";
				this.reverse = true;
				break;
			case 3:
				this.orientation = "landscape";
				break;
			default:
				this.orientation = "resize";
				break;
		}
	};
	var _pSizeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SizeEventInfo);
	nexacro.SizeEventInfo.prototype = _pSizeEventInfo;
	_pSizeEventInfo._type_name = "SizeEventInfo";

	delete _pSizeEventInfo;

	nexacro.KeyEventInfo = function (obj, id, alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onkey";

		this.cancelable = true;
		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = alt_key;
		this.ctrlKey = ctrl_key;
		this.shiftKey = shift_key;
		this.keycode = key_code;
	};
	var _pKeyEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.KeyEventInfo);
	nexacro.KeyEventInfo.prototype = _pKeyEventInfo;
	_pKeyEventInfo._type_name = "KeyEventInfo";

	delete _pKeyEventInfo;

	nexacro.MouseEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onmouse";

		this.cancelable = true;
		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = altKey || false;
		this.ctrlKey = ctrlKey || false;
		this.button = strButton || "";
		this.shiftKey = shiftKey || false;
		this.screenX = screenX || -1;
		this.screenY = screenY || -1;
		this.canvasX = canvasX || -1;
		this.canvasY = canvasY || -1;
		this.clientX = clientX || -1;
		this.clientY = clientY || -1;
	};

	var _pMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseEventInfo);
	nexacro.MouseEventInfo.prototype = _pMouseEventInfo;
	_pMouseEventInfo._type_name = "MouseEventInfo";

	delete _pMouseEventInfo;

	nexacro.ClickEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onclick";

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = altKey || false;
		this.ctrlKey = ctrlKey || false;
		this.button = strButton || "";
		this.shiftKey = shiftKey || false;
		this.screenX = (screenX === undefined ? -1 : screenX);
		this.screenY = (screenY === undefined ? -1 : screenY);
		this.canvasX = (canvasX === undefined ? -1 : canvasX);
		this.canvasY = (canvasY === undefined ? -1 : canvasY);
		this.clientX = (clientX === undefined ? -1 : clientX);
		this.clientY = (clientY === undefined ? -1 : clientY);
	};

	var _pClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ClickEventInfo);
	nexacro.ClickEventInfo.prototype = _pClickEventInfo;
	_pClickEventInfo._type_name = "ClickEventInfo";

	delete _pClickEventInfo;
	nexacro.MouseWheelEventInfo = function (obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, delta, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onmousewheel";

		this.bubbles = true;
		this.cancelable = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = alt_key || false;
		this.ctrlKey = ctrl_key || false;
		this.button = button || "";
		this.shiftKey = shift_key || false;
		this.screenX = screenX || -1;
		this.screenY = screenY || -1;
		this.canvasX = canvasX || -1;
		this.canvasY = canvasY || -1;
		this.clientX = clientX || -1;
		this.clientY = clientY || -1;
		this.amount = delta;
	};
	var _pMouseWheelEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseWheelEventInfo);
	nexacro.MouseWheelEventInfo.prototype = _pMouseWheelEventInfo;
	_pMouseWheelEventInfo._type_name = "MouseWheelEventInfo";

	delete _pMouseWheelEventInfo;

	nexacro.ScrollEventInfo = function (obj, id, pos, type, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onscroll";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;

		this.pos = pos;
		this.type = type;
	};
	var _pScrollEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ScrollEventInfo);
	nexacro.ScrollEventInfo.prototype = _pScrollEventInfo;
	_pScrollEventInfo._type_name = "ScrollEventInfo";

	delete _pScrollEventInfo;

	nexacro.DragEventInfo = function (obj, id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		this.id = this.eventid = id || "ondrag";
		if (!from_refer_comp) {
			from_refer_comp = from_comp;
		}

		this.cancelable = true;
		this.bubbles = true;

		this.dragdata = dragdata;
		this.userdata = userdata;
		this.sourceobject = src_comp;
		this.sourcereferenceobject = src_refer_comp;
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = alt_key || false;
		this.ctrlKey = ctrl_key || false;
		this.button = button || "";
		this.shiftKey = shift_key || false;
		this.screenX = screenX || -1;
		this.screenY = screenY || -1;
		this.canvasX = canvasX || -1;
		this.canvasY = canvasY || -1;
		this.clientX = clientX || -1;
		this.clientY = clientY || -1;
	};

	var _pDragEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DragEventInfo);
	nexacro.DragEventInfo.prototype = _pDragEventInfo;
	_pDragEventInfo._type_name = "DragEventInfo";

	_pDragEventInfo.set_dragdata = function (v) {
		if (this.dragdata != v) {
			this.dragdata = v;
		}
	};
	_pDragEventInfo.set_userdata = function (v) {
		if (this.userdata != v) {
			this.userdata = v;
		}
	};

	delete _pDragEventInfo;

	nexacro.DragDataObject = function (id) {
		this.id = id || "dragdataobject";

		this._data_table = {
		};
	};

	var _pDragDataObject = nexacro._createPrototype(nexacro.Object, nexacro.DragDataObject);
	nexacro.DragDataObject.prototype = _pDragDataObject;
	_pDragDataObject._type_name = "DragDataObject";

	_pDragDataObject.setData = function (type, value) {
		if (this._data_table[type]) {
			delete this._data_table[type];
		}

		this._data_table[type] = value;
	};

	_pDragDataObject.getData = function (type) {
		if (this._data_table[type]) {
			return this._data_table[type];
		}

		return null;
	};

	_pDragDataObject.isAvailableData = function (type) {
		if (this._data_table[type]) {
			return true;
		}

		return false;
	};

	delete _pDragDataObject;

	nexacro.CharEventInfo = function (obj, id, chartext, pretext, posttext) {
		this.id = this.eventid = id || "onchar";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
	};
	var _pCharEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CharEventInfo);
	nexacro.CharEventInfo.prototype = _pCharEventInfo;
	_pCharEventInfo._type_name = "CharEventInfo";

	delete _pCharEventInfo;


	nexacro.GestureEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "ongesture";

		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
	};
	var _pGestureEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GestureEventInfo);
	nexacro.GestureEventInfo.prototype = _pGestureEventInfo;
	_pGestureEventInfo._type_name = "GestureEventInfo";
	delete _pGestureEventInfo;

	nexacro.TapEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "ontap";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
	};
	var _pTapEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TapEventInfo);
	nexacro.TapEventInfo.prototype = _pTapEventInfo;
	_pTapEventInfo._type_name = "TapEventInfo";
	delete _pTapEventInfo;

	nexacro.LongPressEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onlongpress";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pLongPressEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.LongPressEventInfo);
	nexacro.LongPressEventInfo.prototype = _pLongPressEventInfo;
	_pLongPressEventInfo._type_name = "LongPressEventInfo";
	delete _pLongPressEventInfo;

	nexacro.SlideEventInfo = function (obj, id, pointinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onslide";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
		this.xaccvalue = xaccvalue;
		this.yaccvalue = yaccvalue;
		this.xdeltavalue = xdeltavalue;
		this.ydeltavalue = ydeltavalue;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pSlideEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.SlideEventInfo);
	nexacro.SlideEventInfo.prototype = _pSlideEventInfo;
	_pSlideEventInfo._type_name = "SlideEventInfo";
	delete _pSlideEventInfo;

	nexacro.PinchEventInfo = function (obj, id, pointinfos, accvalue, deltavalue, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onpinch";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.pointinfos = pointinfos;
		this.pointcount = pointinfos ? pointinfos.length : 0;
		this.accvalue = accvalue;
		this.deltavalue = deltavalue;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pPinchEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.PinchEventInfo);
	nexacro.PinchEventInfo.prototype = _pPinchEventInfo;
	_pPinchEventInfo._type_name = "PinchEventInfo";
	delete _pPinchEventInfo;

	nexacro.FlingEventInfo = function (obj, id, pointinfos, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onfling";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;

		this.pointcount = touchlen;
		this.xstartvalue = xstartvalue;
		this.ystartvalue = ystartvalue;
		this.xdeltavalue = xdeltavalue;
		this.ydeltavalue = ydeltavalue;

		this.cancelable = true;
		this.bubbles = true;
	};
	var _pFlingEventInfo = nexacro._createPrototype(nexacro.GestureEventInfo, nexacro.FlingEventInfo);
	nexacro.FlingEventInfo.prototype = _pFlingEventInfo;
	_pFlingEventInfo._type_name = "FlingEventInfo";
	delete _pFlingEventInfo;

	nexacro.ZoomEventInfo = function (obj, id, zoomfactor, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onzoom";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.zoom = zoomfactor;
	};
	var _pZoomEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ZoomEventInfo);
	nexacro.ZoomEventInfo.prototype = _pZoomEventInfo;
	_pZoomEventInfo._type_name = "ZoomEventInfo";
	delete _pZoomEventInfo;

	nexacro.OrientationChangeEventInfo = function (obj, id, orientation) {
		this.id = this.eventid = id || "onzoom";
		this.fromobject = null;
		this.fromreferenceobject = null;
		this._orientation = orientation;
		if (orientation == 0 || orientation == 1) {
			this.orientation = "portrait";
		}
		else if (orientation == 2 || orientation == 3) {
			this.orientation = "landscape";
		}
		else {
			this.orientation = "";
		}
	};
	var _pOrientationChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.OrientationChangeEventInfo);
	nexacro.OrientationChangeEventInfo.prototype = _pOrientationChangeEventInfo;
	_pOrientationChangeEventInfo._type_name = "OrientationChangeEventInfo";
	delete _pOrientationChangeEventInfo;

	nexacro.ContextMenuEventInfo = function (obj, id, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "oncontextmenu";
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.cancelable = true;
	};
	var _pContextMenuEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ContextMenuEventInfo);
	nexacro.ContextMenuEventInfo.prototype = _pContextMenuEventInfo;
	_pContextMenuEventInfo._type_name = "ContextMenuEventInfo";
	delete _pContextMenuEventInfo;


	nexacro.TouchInputInfo = function (elem, type, touchid, time, is_first, screenX, screenY, windowX, windowY) {
		this.touchid = touchid;
		this.type = {
			touchstart : 0, 
			touchmove : 1, 
			touchend : 2, 
			touchcancel : 3
		}[type];
		this.time = time;
		this.isfirst = is_first;
		this.screenX = screenX;
		this.screenY = screenY;
		this.canvasX = undefined;
		this.canvasY = undefined;
		this.clientX = undefined;
		this.clientY = undefined;

		this._elem = elem;
		this._current_state = type;
		this._x = this._oldx = this._startx = windowX;
		this._y = this._oldy = this._starty = windowY;
	};
	var _pTouchInputInfo = nexacro._createPrototype(nexacro.Object, nexacro.TouchInputInfo);
	nexacro.TouchInputInfo.prototype = _pTouchInputInfo;
	_pTouchInputInfo._type_name = "TouchInputInfo";

	_pTouchInputInfo._updateInfo = function (elem, type, time, screenX, screenY, windowX, windowY) {
		this.type = {
			touchstart : 0, 
			touchmove : 1, 
			touchend : 2, 
			touchcancel : 3
		}[type];
		this.time = time;
		this.screenX = screenX;
		this.screenY = screenY;

		this._elem = elem;
		this._current_state = type;
		this._oldx = this._x;
		this._oldy = this._y;
		this._x = windowX;
		this._y = windowY;
	};

	delete _pTouchInputInfo;

	nexacro.TouchEventInfo = function (obj, id, touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Event.call(this, obj, id || "ontouch");

		this.cancelable = true;
		this.bubbles = true;

		this.touchinputinfos = touchinfos;
		this.changedtouchinputinfos = changedtouchinfos;
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
	};
	var _pTouchEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TouchEventInfo);
	nexacro.TouchEventInfo.prototype = _pTouchEventInfo;
	_pTouchEventInfo._type_name = "TouchEventInfo";
	delete _pTouchEventInfo;

	nexacro.ItemClickEventInfo = function (obj, id, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		nexacro.ClickEventInfo.call(this, obj, id || "onitemclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
		this.fromobject = this.fromreferenceobject = obj;

		this.index = index;
		this.itemtext = itemtext;
		this.itemvalue = itemvalue;
	};
	var _pItemClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.ItemClickEventInfo);
	nexacro.ItemClickEventInfo.prototype = _pItemClickEventInfo;
	_pItemClickEventInfo._type_name = "ItemClickEventInfo";

	delete _pItemClickEventInfo;

	nexacro.ChangeEventInfo = function (obj, id, pretext, prevalue, posttext, postvalue) {
		nexacro.Event.call(this, obj, id || "onchange");

		this.pretext = pretext;
		this.prevalue = prevalue;
		this.posttext = posttext;
		this.postvalue = postvalue;
	};
	var _pChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangeEventInfo);
	nexacro.ChangeEventInfo.prototype = _pChangeEventInfo;
	_pChangeEventInfo._type_name = "ChangeEventInfo";

	delete _pChangeEventInfo;

	nexacro.ChangedEventInfo = function (obj, id, pretext, prevalue, posttext, postvalue) {
		this.id = this.eventid = id || "onchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = pretext;
		this.prevalue = prevalue;
		this.posttext = posttext;
		this.postvalue = postvalue;
	};
	var _pChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangedEventInfo);
	nexacro.ChangedEventInfo.prototype = _pChangedEventInfo;
	_pChangedEventInfo._type_name = "ChangedEventInfo";

	delete _pChangedEventInfo;

	nexacro.ItemChangeEventInfo = function (obj, id, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		this.id = this.eventid = id || "onitemchagne";
		this.fromobject = this.fromreferenceobject = obj;

		this.preindex = preindex;
		this.pretext = pretext;
		this.prevalue = prevalue;
		this.postindex = postindex;
		this.posttext = posttext;
		this.postvalue = postvalue;
	};
	var _pItemChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ItemChangeEventInfo);
	nexacro.ItemChangeEventInfo.prototype = _pItemChangeEventInfo;
	_pItemChangeEventInfo._type_name = "ItemChangeEventInfo";

	delete _pItemChangeEventInfo;

	nexacro.DuplicateExcutionEventInfo = function (obj, id, _arguments) {
		this.id = this.eventid = id || "onduplicateexcution";
		this.fromobject = this.fromreferenceobject = obj;

		this.arguments = _arguments;
	};
	var _pDuplicateExcutionEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DuplicateExcutionEventInfo);
	nexacro.DuplicateExcutionEventInfo.prototype = _pDuplicateExcutionEventInfo;
	_pDuplicateExcutionEventInfo._type_name = "DuplicateExcutionEventInfo";

	delete _pDuplicateExcutionEventInfo;

	nexacro.UserNotify = function (obj, id, notifyid, message) {
		this.id = this.eventid = id || "onusernotify";
		this.fromobject = this.fromreferenceobject = obj;

		this.notifyid = notifyid;
		this.message = message;
	};
	var _pEventUserNotify = nexacro._createPrototype(nexacro.Event, nexacro.UserNotify);
	nexacro.UserNotify.prototype = _pEventUserNotify;
	_pEventUserNotify._type_name = "UserNotifyEvent";

	delete _pEventUserNotify;

	nexacro.ApplicationUserNotify = function (obj, id, userdata) {
		this.id = this.eventid = id || "onusernotify";
		this.fromobject = this.fromreferenceobject = obj;

		this.userdata = userdata;
	};
	var _pEventAppUserNotify = nexacro._createPrototype(nexacro.Event, nexacro.ApplicationUserNotify);
	nexacro.ApplicationUserNotify.prototype = _pEventAppUserNotify;
	_pEventAppUserNotify._type_name = "ApplicationUserNotifyEvent";
	delete _pEventAppUserNotify;

	nexacro.AddLog = function (obj, id, message) {
		this.id = this.eventid = id || "onaddlog";
		this.fromobject = this.fromreferenceobject = obj;
		this.message = message;
	};
	var _pEventAddLog = nexacro._createPrototype(nexacro.Event, nexacro.AddLog);
	nexacro.AddLog.prototype = _pEventAddLog;
	_pEventAddLog._type_name = "AddLogEvent";
	delete _pEventAddLog;

	nexacro.Communication = function (obj, id, state) {
		this.id = this.eventid = id || "oncommunication";
		this.fromobject = this.fromreferenceobject = obj;
		this.state = state;
	};
	var _pEventCommunication = nexacro._createPrototype(nexacro.Event, nexacro.Communication);
	nexacro.Communication.prototype = _pEventCommunication;
	_pEventCommunication._type_name = "CommunicationEvent";
	delete _pEventCommunication;

	nexacro.NotificationEventInfo = function (obj, id, reason, messages) {
		this.id = this.eventid = id || "onnotification";
		this.fromobject = this.fromreferenceobject = obj;

		this.reason = reason;
		if (this.reason == 200 || this.resaon == '200') {
			this.messages = messages;
		}
	};
	var _pNotificationEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.NotificationEventInfo);
	nexacro.NotificationEventInfo.prototype = _pNotificationEventInfo;
	_pNotificationEventInfo._type_name = "NotificationEventInfo";

	delete _pNotificationEventInfo;

	nexacro._gen_arrmap = function (arr) {
		var arr_map = {
		};
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			arr_map[arr[i]] = i;
		}
		return arr_map;
	};

	if (nexacro.Browser == "Runtime") {
		nexacro.base64Encode = function (input) {
			return nexacro.__base64Encode(input);
		};
		nexacro.base64Decode = function (input) {
			return nexacro.__base64Decode(input);
		};
	}
	else {
		(function () {
			var _base64keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split('');
			var _base64keys = nexacro._gen_arrmap(_base64keyStr);
			var _re_not_base64Chars = /[^A-Za-z0-9\+\/\=]/g;

			nexacro.base64Encode = function (input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;

				input = nexacro.utf8Encode(input);

				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if ((+chr2) != (+chr2)) {
						enc3 = enc4 = 64;
					}
					else if ((+chr3) != (+chr3)) {
						enc4 = 64;
					}

					output = output + _base64keyStr[enc1] + _base64keyStr[enc2] + _base64keyStr[enc3] + _base64keyStr[enc4];
				}

				return output;
			};

			nexacro.base64Decode = function (input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;

				input = input.replace(_re_not_base64Chars, "");

				while (i < input.length) {
					enc1 = _base64keys[input[i++]];
					enc2 = _base64keys[input[i++]];
					enc3 = _base64keys[input[i++]];
					enc4 = _base64keys[input[i++]];

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				return nexacro.utf8Decode(output);
			};

			nexacro.utf8Encode = function (string) {
				var utf = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);

					if (c == 13) {
						if (string.charCodeAt(n + 1) != '\n') {
							utf += String.fromCharCode(c);
						}
					}
					else if (c < 128) {
						utf += String.fromCharCode(c);
					}
					else if ((c > 127) && (c < 2048)) {
						utf += String.fromCharCode((c >> 6) | 192);
						utf += String.fromCharCode((c & 63) | 128);
					}
					else {
						utf += String.fromCharCode((c >> 12) | 224);
						utf += String.fromCharCode(((c >> 6) & 63) | 128);
						utf += String.fromCharCode((c & 63) | 128);
					}
				}
				return utf;
			};

			nexacro.utf8Decode = function (utftext) {
				var i = 0;
				var c = c1 = c2 = 0;

				var string = [];
				while (i < utftext.length) {
					c = utftext.charCodeAt(i);

					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					}
					else if ((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					}
					else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}
				}
				return string;
			};
		})();
	}

	nexacro._checkBase64String = function (str) {
		var regExp = /[^A-Za-z0-9+\/=]/g;

		if (str == "" || str == null) {
			return false;
		}

		if (str.length >= 10 && str.substr(0, 10).toLowerCase() == "data:image") {
			return true;
		}

		if (str.match(regExp) == null) {
			return true;
		}

		regExp = null;

		return false;
	};
	nexacro._mergeUrl = function (left, right) {
		if (left && right) {
			var rpos = right.indexOf("/");
			if (left.charAt(left.length - 1) == '/') {
				if (right.charAt(0) == '/') {
					return left + right.substring(1);
				}
				else {
					return left + right;
				}
			}
			else {
				if (right.charAt(0) == '/') {
					return left + right;
				}
				else {
					return left + '/' + right;
				}
			}
		}
		else {
			return left || right;
		}
	};


	nexacro._findParentComponent = function (elem) {
		var _comp = elem.parent;
		while (_comp && !_comp._is_component) {
			_comp = _comp.parent;
		}
		return _comp;
	};
	nexacro._findParentForm = function (comp) {
		var ctx = comp.parent;
		while (ctx && !ctx._is_form) {
			ctx = ctx.parent;
		}
		return ctx;
	};
	nexacro._findReferenceForm = function (comp) {
		var ctx = comp;
		while (ctx && !ctx._is_form) {
			ctx = ctx.parent;
		}
		return ctx;
	};

	nexacro._findParentContext = function (comp) {
		var ctx = comp.parent;
		while (ctx && !ctx._is_context) {
			ctx = ctx.parent;
		}
		return ctx;
	};
	nexacro._findReferenceContext = function (comp) {
		var ctx = comp;
		while (ctx && !ctx._is_context) {
			ctx = ctx.parent;
		}
		return ctx;
	};

	nexacro._findParentFrame = function (comp) {
		var frame = comp.parent;
		while (frame && !frame._is_frame) {
			frame = frame.parent;
		}
		return frame;
	};
	nexacro._findParentWindow = function (comp) {
		var win = comp.parent;
		while (win && !win._is_window) {
			win = win.parent;
		}
		return win;
	};



	nexacro._setForwardingSystemEventHandlers = function (ptype) {
		var base = nexacro.Component.prototype;
		ptype._on_sys_focus = base._on_sys_focus_forward;
		ptype._on_sys_lbuttondown = base._on_sys_lbuttondown_forward;
		ptype._on_sys_lbuttonup = base._on_sys_lbuttonup_forward;
		ptype._on_sys_rbuttondown = base._on_sys_rbuttondown_forward;
		ptype._on_sys_rbuttonup = base._on_sys_rbuttonup_forward;
		ptype._on_sys_mouseenter = base._on_sys_mouseenter_forward;
		ptype._on_sys_mouseleave = base._on_sys_mouseleave_forward;
		ptype._on_sys_mousemove = base._on_sys_mousemove_forward;
		ptype._on_sys_keydown = base._on_sys_keydown_forward;
		ptype._on_sys_keypress = base._on_sys_keypress_forward;
		ptype._on_sys_keyup = base._on_sys_keyup_forward;
		ptype._on_sys_dblclick = base._on_sys_dblclick_forward;
		ptype._on_sys_mousewheel = base._on_sys_mousewheel_forward;
		ptype._on_sys_dragleave = base._on_sys_dragleave_forward;
		ptype._on_sys_drop = base._on_sys_drop_forward;
		ptype._on_sys_dragenter = base._on_sys_dragenter_forward;
		ptype._on_sys_dragmove = base._on_sys_dragmove_forward;
		ptype._on_sys_touch = base._on_sys_touch_forward;
	};
	nexacro._setForMouseTrackSystemEventHandler = function (ptype) {
		var base = nexacro.Component.prototype;
		ptype._on_sys_lbuttondown = base._on_sys_lbuttondown_simpletrack;
		ptype._on_starttrack = base._on_starttrack_simpletrack;
		ptype._on_movetrack = base._on_movetrack_simpletrack;
		ptype._on_endtrack = base._on_movetrack_simpletrack;
	};

	nexacro._setStyleFinders_ForNonComponent = function (ptype) {
		var base = nexacro.Component.prototype;
		ptype._find_comp_pseudo_obj = base._find_comp_pseudo_obj;
		ptype._find_ctrl_pseudo_obj = base._find_comp_pseudo_obj;
		ptype._find_typedctrl_pseudo_obj = base._find_comp_pseudo_obj;
		ptype._updateCurrentStyle = base._updateCurrentStyle;
		ptype._find_pseudo_obj = base._find_pseudo_obj;
	};
	nexacro._setForComponetStyleFinder = function (ptype) {
		ptype._find_pseudo_obj = nexacro.Component.prototype._find_comp_pseudo_obj;
	};
	nexacro._setForControlStyleFinder = function (ptype) {
		ptype._find_pseudo_obj = nexacro.Component.prototype._find_ctrl_pseudo_obj;
	};
	nexacro._setForTypedControlStyleFinder = function (ptype) {
		ptype._find_pseudo_obj = nexacro.Component.prototype._find_typedctrl_pseudo_obj;
	};

	nexacro._setForEventListeners = function (ptype) {
		ptype._initEventHandlers = ptype._initEventListeners;
		ptype._clearEventHandlers = ptype._clearEventListeners;
	};



	nexacro._getValueForStyleBindExpr = function (comp, propobj, propid, rowidx) {
		if (propobj && propobj._bindtype != 0) {
			var compobj = comp;
			var dataset = comp._innerdataset;
			if (dataset == null) {
				propobj = null;
			}
			else {
				var val;
				if (propobj._bindtype == 1) {
					val = dataset.getColumn(rowidx, propobj._bindexpr);
				}
				else {
					var exprfn = compobj._exprcache[propobj._bindexpr];
					if (exprfn == null) {
						exprfn = dataset._createExprFunc(propobj._bindexpr);
						compobj._exprcache[propobj._bindexpr] = exprfn;
					}

					if ((typeof exprfn) == "function") {
						val = exprfn.call(compobj, rowidx, rowidx, compobj, dataset);
						if (val) {
							val = val.toString();
						}
					}
					else {
						val = propobj._bindexpr;
					}
				}
				if (val != null && val != "") {
					propobj = nexacro._getCachedStyleObj(propid, val);
				}
				else {
					propobj = null;
				}
			}
		}
		return propobj;
	};

	nexacro._communicationStatusTable = 
		{
		"stop" : 499
	};

	nexacro._CommunicationManager = {
	};
	nexacro._CacheList = {
	};
	nexacro._DataCacheList = {
	};

	nexacro._ParametersCache = function (id, value) {
		this.id = id;
		this.value = value;
	};
	nexacro._DataSetCache = function (id, colinfos, constVars, rawRecords) {
		this.id = id;
		this.rawRecords = null;
		this.colinfos = null;
		this.constVars = null;

		if (rawRecords) {
			this.rawRecords = rawRecords.slice(0, rawRecords.length);
		}

		if (colinfos) {
			this.colinfos = new nexacro.DSColumnInfoList();
			for (var i = 0; i < colinfos.length; i++) {
				this.colinfos.add(colinfos[i].id, colinfos[i]);
			}
		}

		if (constVars) {
			this.constVars = new nexacro.VariableList();
			for (var i = 0; i < constVars.length; i++) {
				this.constVars.add(constVars[i].id, constVars[i]);
			}
		}
	};

	nexacro._DataCache = function (parametersCaches, datasetCaches, last_modified, version) {
		this.parameters = parametersCaches;
		this.datasets = datasetCaches;
		this.last_modified = last_modified;
		this.version = version;
	};
	var _pDataCache = nexacro._createPrototype(nexacro.Object, nexacro._DataCache);
	nexacro._DataCache.prototype = _pDataCache;
	_pDataCache._type_name = "DataCache";

	_pDataCache._loadData = function (loadItem) {
		var err_info = this._loadParametersFromCache(loadItem);
		this._loadDatasetsFromCache(loadItem);

		return err_info;
	};

	_pDataCache._loadParametersFromCache = function (loadItem) {
		var params = this.parameters;
		var len = params.length;
		var form = loadItem.context;
		var id, val, code, message;

		for (var i = 0; i < len; i++) {
			id = params[i].id;
			val = params[i].value;

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
		}

		return [code, message];
	};

	_pDataCache._loadDatasetsFromCache = function (loadItem) {
		var datasets = this.datasets;
		var outputDatasets = loadItem.outputDatasets;

		if (!outputDatasets) {
			return;
		}

		var len = outputDatasets.length;
		var form = loadItem.context;
		var ds_cache, ds;
		var localId, constVars, colinfos, rawRecords;

		for (var i = 0; i < len; i++) {
			localId = outputDatasets[i].lval;
			ds_cache = datasets[localId];
			if (!ds_cache) {
				continue;
			}

			constVars = ds_cache.constVars;
			colinfos = ds_cache.colinfos;
			rawRecords = ds_cache.rawRecords;

			ds = form._getDatasetObject(localId);
			if (ds) {
				var target_colinfos = colinfos;

				if (ds.useclientlayout) {
					ds.clearData();
					target_colinfos = ds.colinfos;
				}
				else {
					ds.clear();
					ds._copyConstColList(constVars);
					ds._appendColList(colinfos);
				}

				if (rawRecords) {
					if (target_colinfos == colinfos) {
						ds._rawRecords = rawRecords.slice(0, rawRecords.length);
					}
					else {
						if (colinfos) {
							var colid, colidx, colinfo, index;
							var expr = "(function(){ return function(arr) { var ret = new Array(); ";
							for (var j = 0; j < colinfos.length; j++) {
								colid = colinfos[j].id;
								colidx = target_colinfos._idxMap[colid];
								if (colidx >= 0) {
									index = target_colinfos[colidx]._index;
									expr += "ret[" + index + "] = arr[" + index + "];";
								}
							}

							expr += "return ret; };})();";

							var convertFn = nexacro._executeEvalStr(expr);
							for (var k = 0; k < rawRecords.length; k++) {
								ds._rawRecords[k] = convertFn(rawRecords[k]);
								ds._rawRecords[k]._rawidx = rawRecords[k]._rawidx;
								ds._rawRecords[k]._rtype = rawRecords[k]._rtype;
								if (rawRecords[k]._orgcolstrings) {
									ds._rawRecords[k]._orgcolstrings = convertFn(rawRecords[k]._orgcolstrings);
								}
							}
						}
					}

					ds._reFilter();
					ds._resetSortGroup();

					if (ds._eventstat) {
						ds.on_fire_onload(0, "", 0);
						if (ds._viewRecords.length > 0) {
							ds._forcesetRowPosition(0, 51);
						}
						else {
							ds._forcesetRowPosition(-1, 51);
						}
					}
					else if (ds._viewRecords.length > 0) {
						ds.rowposition = 0;
					}
				}
			}
		}
	};

	delete _pDataCache;

	nexacro._ImgInfoCacheList = {
	};
	nexacro.CommunicationItem = function (path, type, bcache, last_modified, version) {
		this.path = path;
		this._handle = null;
		this.callbackList = [];
		this.type = type;
		this.bcache = bcache;
		this.last_modified = last_modified;
		this.version = version ? version : "0";

		var ar = path.split("://");
		if (ar) {
			this.protocol = ar[0];
			switch (this.protocol) {
				case "http":
					this._protocol = 0;
					break;
				case "https":
					this._protocol = 1;
					break;
				case "file":
					this._protocol = 2;
					break;
				default:
					this._protocol = -1;
					break;
			}
		}

		this._addCookieFromGlobalvariables();

		this._check_responseXML = false;
	};
	var _pCommunicationItem = nexacro.CommunicationItem.prototype;

	_pCommunicationItem.appendCallback = function (pthis, callbackFn) {
		var callbackList = this.callbackList;
		callbackList.push({
			target : pthis, 
			callback : callbackFn
		});
	};

	_pCommunicationItem.removeCallback = function (pthis, callbackFn) {
		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				if (item.pthis == pthis && item.callback == callbackFn) {
					callbackList.splice(i, 1);
					if (callbackList.length == 0) {
						if (this._handle) {
							nexacro.__cancelCommunication(this._handle);
						}
						this._handle = null;
						delete nexacro._CommunicationManager[this.path];
					}
					return true;
				}
			}
		}
		return false;
	};

	_pCommunicationItem._addCookieFromGlobalvariables = function () {
		var cookievar = application._cookie_variables;
		var cookievarCnt = 0;
		if (cookievar) {
			cookievarCnt = cookievar.length;
		}

		for (var i = 0; i < cookievarCnt; i++) {
			var cookieid = cookievar[i];
			var curCookie = nexacro._getCookie(cookieid);
			if (curCookie != application[cookieid]) {
				nexacro._setCookie(cookieid, application[cookieid]);
			}
		}
	};


	_pCommunicationItem._addCookieFromVariables = function (headers) {
		var len = headers.length;
		for (var i = 0; i < len; i++) {
			nexacro._setCookie(headers[i].id, headers[i].value);
		}
	};

	_pCommunicationItem._addCookieToGlobalVariable = function (cookieStr) {
		if (application && cookieStr) {
			var cookielist = cookieStr.split("; ");
			var cookievarCnt = cookielist.length;
			var sep_pos;
			var cookie_id, cookie_value;
			for (var i = 0; i < cookievarCnt; i++) {
				sep_pos = cookielist[i].indexOf("=");
				if (sep_pos <= 0) {
					continue;
				}

				cookie_id = cookielist[i].substr(0, sep_pos);
				cookie_value = cookielist[i].substr(sep_pos + 1);

				if (nexacro._indexOf(application._cookie_variables, cookie_id) >= 0) {
					application[cookie_id] = cookie_value;
				}
				else {
					if (application.addcookietovariable && (nexacro._indexOf(application._variables, cookie_id) < 0)) {
						application._addVariable(cookie_id, cookie_value, true);
					}
				}
			}
		}
	};

	_pCommunicationItem.on_decrypt = function (data) {
		if (this._protocol < 0) {
			var protocoladp = application._getProtocol(this.protocol);
			if (protocoladp) {
				data = protocoladp.decrypt(this.path, data);
			}
		}
		return data;
	};

	_pCommunicationItem.on_encrypt = function (data) {
		if (this._protocol < 0) {
			var protocoladp = application._getProtocol(this.protocol);
			if (protocoladp) {
				data = protocoladp.encrypt(this.path, data);
			}
		}
		return data;
	};

	_pCommunicationItem.on_start = nexacro._emptyFn;
	_pCommunicationItem.on_load = nexacro._emptyFn;

	_pCommunicationItem.on_load_module = function (data, cookie, last_modified) {
		delete nexacro._CommunicationManager[this.path];
		var module;
		if (typeof (data) == "function") {
			module = data;
		}
		else {
			if (this._protocol < 0) {
				data = this.on_decrypt(data);
			}

			this._addCookieToGlobalVariable(cookie);

			module = nexacro._executeEvalStr(data, this.path);

			if (this.bcache && nexacro.Browser != "Runtime") {
				var m_cache = nexacro._CacheList[this.path];

				if (!m_cache) {
					nexacro._CacheList[this.path] = {
						data : data, 
						last_modified : last_modified, 
						version : this.version
					};
				}
				else {
					m_cache.data = data;
					m_cache.last_modified = last_modified;
					m_cache.version = this.version;
				}
			}
		}

		var callbackList = this.callbackList;
		var item = null;

		if (callbackList.length > 0) {
			while (item = callbackList.pop()) {
				var target = item.target;
				if (target && target.context && target.context.on_fire_oninit) {
					target.context.on_fire_oninit(target.context);
				}

				item.callback.call(target, this.path, 0, module);
			}
		}

		this._handle = null;
	};

	_pCommunicationItem.on_load_text = function (data, cookie, last_modified) {
		delete nexacro._CommunicationManager[this.path];

		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToGlobalVariable(cookie);

		if (this.bcache && nexacro.Browser != "Runtime") {
			var m_cache = nexacro._CacheList[this.path];
			if (!m_cache) {
				nexacro._CacheList[this.path] = {
					data : data, 
					last_modified : last_modified, 
					version : this.version
				};
			}
			else {
				m_cache.data = data;
				m_cache.last_modified = last_modified;
				m_cache.version = this.version;
			}
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, 0, data);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};
	_pCommunicationItem.on_load_image = function (width, height) {
		delete nexacro._CommunicationManager[this.path];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, width, height);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};
	_pCommunicationItem.on_load_update = function (data, cookie) {
		delete nexacro._CommunicationManager[this.path];
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToGlobalVariable(cookie);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, 0, "");
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};
	_pCommunicationItem.on_load_data = function (data, cookie, last_modified) {
		delete nexacro._CommunicationManager[this.path];
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		this._addCookieToGlobalVariable(cookie);

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, 0, data);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};

	_pCommunicationItem.on_progress = nexacro._emptyFn;
	_pCommunicationItem.on_progress_data = function (status, data) {
		if (this._protocol < 0) {
			data = this.on_decrypt(data);
		}

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, 1, data);
				}
			}
		}
	};

	_pCommunicationItem.on_error = function (errstatus, fireerrorcode, returncode, locationuri) {
		delete nexacro._CommunicationManager[this.path];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, errstatus, null, fireerrorcode, returncode, this.path, locationuri);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};

	_pCommunicationItem.on_error_image = function (width, height, _handle, errstatus, fireerrorcode, returncode, locationuri) {
		delete nexacro._CommunicationManager[this.path];

		var callbackList = this.callbackList;
		var n = callbackList.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				var item = callbackList[i];
				var target = item.target;
				if (target._is_alive != false) {
					item.callback.call(target, this.path, width, height, _handle, errstatus, null, fireerrorcode, returncode, this.path, locationuri);
				}
			}
			callbackList.splice(0, n);
		}
		this._handle = null;
	};

	delete _pCommunicationItem;

	nexacro._loadJSModule = function (path, target, handler, bcache, service, async) {
		var loadItem;
		var last_modified = "";
		if (async) {
			loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
			}
		}

		var m_cache = nexacro._CacheList[path];

		if (service && m_cache && !nexacro._isSimulator()) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!loadItem && m_cache.version >= service.version) {
					loadItem = new nexacro.CommunicationItem(path, "module", false);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;

					loadItem.on_load_module(m_cache.data, null);

					return loadItem._handle;
				}
			}

			m_cache.version = service.version;
			last_modified = m_cache.last_modified;
		}

		bcache = true;
		if (!service || service.cachelevel == "none" || nexacro._isSimulator()) {
			bcache = false;
		}

		if (!loadItem) {
			loadItem = new nexacro.CommunicationItem(path, "module", bcache, last_modified, service ? service.version : "0");
			nexacro._CommunicationManager[path] = loadItem;
			loadItem.appendCallback(target, handler);
		}

		loadItem._handle = nexacro._startCommunication(loadItem, path, service ? service.cachelevel : "none", async, service);
		return loadItem._handle;
	};

	nexacro._loadJSText = function (path, target, handler, service, async) {
		var loadItem;
		var last_modified = "";
		if (async) {
			loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
			}
		}

		var m_cache = nexacro._CacheList[path];

		if (service && m_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!loadItem && m_cache.version >= service.version) {
					loadItem = new nexacro.CommunicationItem(path, "module", false);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_module(m_cache.data, null);
					return loadItem._handle;
				}
			}

			m_cache.version = servcie.version;
			last_modified = m_cache.last_modified;
		}

		var bcache = true;
		if (!service || service.cachelevel == "none") {
			bcache = false;
		}

		if (!loadItem) {
			loadItem = new nexacro.CommunicationItem(path, "text", bcache, last_modified, service ? service.version : "0");
			nexacro._CommunicationManager[path] = loadItem;
			loadItem.appendCallback(target, handler);
		}

		loadItem._handle = nexacro._startCommunication(loadItem, path, service ? service.cachelevel : "none", async, service);
		return loadItem._handle;
	};


	nexacro._loadUpdateModule = function (path, target, handler, service, async, type, targetpath, ref, ver, failpass) {
		if (async) {
			var loadItem = nexacro._CommunicationManager[path];
			if (loadItem) {
				loadItem.appendCallback(target, handler);
			}
			else {
				loadItem = new nexacro.CommunicationItem(path, "update");
				nexacro._CommunicationManager[path] = loadItem;
				loadItem.appendCallback(target, handler);
				loadItem._handle = nexacro._startCommunication(loadItem, path, "dynamic", true, service, null, type, targetpath, ref, ver, failpass);
				return loadItem._handle;
			}
		}
		else {
			var loadItem = new nexacro.CommunicationItem(path, "update");
			loadItem.appendCallback(target, handler);
			nexacro._startCommunication(loadItem, path, "dynamic", false, service, null, type, targetpath, ref, ver, failpass);
		}

		handler.call(target, 0);
		return null;
	};

	nexacro._loadData = function (path, target, handler, service, form, svcid, indatasets, outdatasets, parameters, async, datatype, compress) {
		var loadItem;
		var last_modified = "";
		var servicecachelevel = service.cachelevel;

		var d_cache = nexacro._DataCacheList[path];
		if (service && d_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!service.version || d_cache.version >= service.version) {
					loadItem = new nexacro.TransactionItem(path, form, svcid, indatasets, outdatasets, parameters, datatype, async);
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_data(d_cache, "", "");
					return loadItem._handle;
				}
			}

			d_cache.version = service.version;
			last_modified = d_cache.last_modified;
		}

		loadItem = new nexacro.TransactionItem(path, form, svcid, indatasets, outdatasets, parameters, datatype, async, last_modified, service.version);

		if (service && service.cachelevel != "none") {
			loadItem.bcache = true;
		}

		loadItem.last_modified = last_modified;

		loadItem.appendCallback(target, handler);
		loadItem.on_start();
		target.transactionList.push(loadItem);

		service.cachelevel = servicecachelevel;
		return nexacro._startCommunication(loadItem, path, service.cachelevel, async, service, (form ? form._url : ""), loadItem._sendData, datatype, compress);
	};

	nexacro._preloadData = function (path, target, handler, service, svcid, referer, args, async, datatype, compress) {
		var bcache = false;
		;
		var last_modified = "";
		var d_cache = nexacro._DataCacheList[path];

		if (service && d_cache) {
			if (service.cachelevel == "session" || service.cachelevel == "static") {
				if (!service.version || d_cache.version >= service.version) {
					var loadItem = new nexacro.CommunicationItem(svcid, "data");
					loadItem.bcache = bcache;
					loadItem.appendCallback(target, handler);

					loadItem.bcache = false;
					loadItem.on_load_data(d_cache, "", "");

					return loadItem._handle;
				}
			}

			d_cache.version = servcie.version;
			last_modified = d_cache.last_modified;
		}

		if (service && service.cachelevel != "none") {
			bcache = true;
		}

		var tritem = new nexacro.TransactionItem(path, target.context, svcid, "", "", args, 0, async);

		if (async) {
			var loadItem = new nexacro.CommunicationItem(svcid, "data");
			loadItem.bcache = bcache;
			loadItem.last_modified = last_modified;

			loadItem.appendCallback(target, handler);
			loadItem._handle = nexacro._startCommunication(loadItem, path, "none", true, service, referer, tritem._sendData, datatype, compress);
			return loadItem._handle;
		}
		else {
			var loadItem = new nexacro.CommunicationItem(svcid, "data");
			loadItem.bcache = bcache;
			loadItem.last_modified = last_modified;

			loadItem.appendCallback(target, handler);
			nexacro._startCommunication(loadItem, path, "none", false, service, referer, tritem._sendData, datatype, compress);
		}
	};


	nexacro._startCommunication = function (loadItem, url, cachelevel, async, service, referer, data, ndatatype, compress, ver, failpass) {
		var path = url;
		var senddata = data;
		if (loadItem._protocol < 0) {
			var createadaptor = false;
			var protocoladp = application._getProtocol(loadItem.protocol);
			if (!protocoladp) {
				var isprotocol = application._isProtocol(loadItem.protocol);
				if (isprotocol) {
					var adptorclass = nexacro._executeEvalStr(loadItem.protocol);
					if (adptorclass) {
						protocoladp = new adptorclass;
						createadaptor = true;
					}
				}
			}

			if (protocoladp) {
				if (createadaptor && protocoladp.initialize) {
					protocoladp.initialize(url);
					application._addProtocol(loadItem.protocol, protocoladp);
				}

				var protocol = protocoladp.getUsingProtocol(url);
				var sep = path.split("://");
				if (sep) {
					path = protocol + "://" + sep[1];
				}

				if (data && protocoladp.encrypt) {
					senddata = loadItem.on_encrypt(data);
				}

				if (protocoladp.getCommunicationHeaders) {
					var headers = protocoladp.getCommunicationHeaders(url);
					if (headers) {
						loadItem._addCookieFromVariables(headers);
					}
				}
			}
		}

		return nexacro.__startCommunication(loadItem, path, cachelevel, async, referer, senddata, ndatatype, compress, ver, failpass, service);
	};

	nexacro._removedatalist = function (datalist, index) {
		return (index < 0 || index > datalist.length) ? datalist : datalist.slice(0, index).concat(datalist.slice(index + 1, datalist.length));
	};
	nexacro._cancelLoad = function (_handle) {
		if (_handle) {
			nexacro.__cancelCommunication(_handle);
		}
	};

	nexacro._stopTransaction = function (form, flag) {
		if (!form && flag != 2) {
			return;
		}

		var form_window;
		var ret = 0;
		var contextlist = application._comm_contextlist.slice(0, application._comm_contextlist.length);
		for (var i = 0; i < contextlist.length; i++) {
			var cur_context = contextlist[i];
			if (flag == 0) {
				if (cur_context == form) {
					return form._stopTransaction();
				}
			}
			else if (flag == 1) {
				if (!form_window) {
					form_window = form._getWindow();
				}
				if (form_window == cur_context._getWindow()) {
					ret = cur_context._stopTransaction();
				}
			}
			else if (flag == 2) {
				ret = cur_context._stopTransaction();
			}
		}
		return ret;
	};

	nexacro._stopTransactionAll = function () {
		nexacro._stopTransaction(null, 2);
	};

	nexacro._registerHotkeyComp = function (base, comp, hotkey, altKey, ctrlKey, shiftKey) {
		if (!hotkey) {
			return;
		}

		if (hotkey instanceof nexacro.HotKey) {
			base._hotkey_list.push([comp, hotkey._keycode, ((hotkey._modifierkey & 0x02) == 0x02), ((hotkey._modifierkey & 0x01) == 0x01), ((hotkey._modifierkey & 0x04) == 0x04)]);
			hotkey._is_registered = true;
		}
		else {
			var keycode = hotkey;
			base._hotkey_list.push([comp, keycode, altKey, ctrlKey, shiftKey]);
		}
	};

	nexacro._unregisterHotkeyComp = function (base, comp, hotkey, altKey, ctrlKey, shiftKey) {
		if (!hotkey) {
			return;
		}

		var keycode;
		if (hotkey instanceof nexacro.HotKey) {
			keycode = hotkey._keycode;
			altKey = ((hotkey._modifierkey & 0x02) == 0x02);
			ctrlKey = ((hotkey._modifierkey & 0x01) == 0x01);
			shiftKey = ((hotkey._modifierkey & 0x04) == 0x04);
		}
		else {
			keycode = hotkey;
		}

		var hotkey_list = base._hotkey_list;
		var cnt = hotkey_list.length;
		for (var i = 0; i < hotkey_list.length; i++) {
			var hotkey_info = hotkey_list[i];
			if (hotkey_info[1] == keycode && 
				hotkey_info[2] == altKey && 
				hotkey_info[3] == ctrlKey && 
				hotkey_info[4] == shiftKey) {
				for (var j = i; j < cnt - 1; j++) {
					hotkey_list[j] = hotkey_list[j + 1];
				}
				hotkey_list[cnt - 1] = null;
				hotkey_list.length = hotkey_list.length - 1;

				if (hotkey instanceof nexacro.HotKey) {
					hotkey._is_registered = false;
				}
				break;
			}
		}
	};


	nexacro._checkHighContrast = function () {
		return nexacro.__checkHighContrast();
	};

	nexacro._getFirstTouchInfo = function (touchinfos) {
		for (var i = 0; i < touchinfos.length; i++) {
			if (touchinfos[i].isfirst == true) {
				return touchinfos[i];
			}
		}
		return null;
	};

	nexacro._getElementRootComponent = function (elem) {
		var control_elem = elem;
		if (control_elem) {
			while (control_elem && !control_elem.linkedcontrol) {
				control_elem = control_elem.parent;
			}
			var comp = control_elem.linkedcontrol;
			while (comp && (comp._is_subcontrol || !comp._is_component)) {
				if (comp == comp.parent) {
					break;
				}
				comp = comp.parent;
			}
			return comp;
		}
	};

	nexacro._isDesktop = function () {
		var system_type = nexacro.SystemType.toLowerCase();
		switch (system_type) {
			case "win32":
			case "win64":
			case "mac":
			case "linux":
				return true;
				break;
			case "ipad":
			case "iphone":
			case "winphone":
			case "android":
				return false;
				break;
			default:
				return true;
				break;
		}

		return true;
	};

	nexacro._isPortrait = function () {
		var orientation = nexacro._getMobileOrientation();
		if (orientation == 0 || orientation == 1) {
			return true;
		}
		return false;
	};

	nexacro._enableaccessibility = false;
	nexacro._attachAccessibilityComponentFunctions = function () {
		nexacro._enableaccessibility = true;
		nexacro.__setEnableAccessibility(true);

		var _ptype = nexacro.Component.prototype;
		_ptype._setAccessibilityRole = function (role) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityRole(role);
			}
		};

		_ptype._setAccessibilityLabel = function (label) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityLabel(label);
			}
		};

		_ptype._setAccessibilityEnable = function (enable) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityEnable(enable);
			}
		};

		_ptype._setAccessibilityDescription = function (desc) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityDescription(desc);
			}
		};

		_ptype._setAccessibilityDescLevel = function (desclevel) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityDescLevel(desclevel);
			}
		};

		_ptype._setAccessibilityValue = function (value, bfocus) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityValue(value, this._input_element, bfocus);
			}
		};

		_ptype._setAccessibilityStatDisabled = function (disabled) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatDisabled(disabled);
			}
		};

		_ptype._setAccessibilityStatHidden = function (hidden) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatHidden(hidden);
			}
		};

		_ptype._setAccessibilityHidden = function (hidden) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityHidden(hidden);
			}
		};

		_ptype._setAccessibilityStatChecked = function (checked) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatChecked(checked);
			}
		};

		_ptype._setAccessibilityStatPressed = function (pressed) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatPressed(pressed);
			}
		};

		_ptype._setAccessibilityStatSelected = function (selected) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatSelected(selected);
			}
		};

		_ptype._setAccessibilityStatExpanded = function (expanded) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatExpanded(expanded);
			}
		};

		_ptype._setAccessibilityStatAutoComplete = function (autocomplete) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityStatAutoComplete(autocomplete);
			}
		};

		_ptype._setAccessibilityFlagHasPopup = function (haspopup) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagHasPopup(haspopup);
			}
		};

		_ptype._setAccessibilityFlagFocusable = function (focusable) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagFocusable(focusable);
			}
		};

		_ptype._setAccessibilityFlagReadOnly = function (readonly) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagReadOnly(readonly);
			}
		};

		_ptype._setAccessibilityFlagPassword = function (password) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagPassword(password);
			}
		};

		_ptype._setAccessibilityFlagMultiSelectable = function (multiselectable) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagMultiSelectable(multiselectable);
			}
		};

		_ptype._setAccessibilityFlagSelectable = function (selectable) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagSelectable(selectable);
			}
		};

		_ptype._setAccessibilityFlagDefaultButton = function (defaultbutton) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagDefaultButton(defaultbutton);
			}
		};

		_ptype._setAccessibilityFlagMultiLine = function (multiline) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityFlagMultiLine(multiline);
			}
		};

		_ptype._setAccessibilityInfoCount = function (count) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityInfoCount(count);
			}
		};

		_ptype._setAccessibilityInfoIndex = function (index) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityInfoIndex(index);
			}
		};

		_ptype._setAccessibilityInfoValueMax = function (valuemax) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityInfoValueMax(valuemax);
			}
		};

		_ptype._setAccessibilityInfoValueMin = function (valuemin) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityInfoValueMin(valuemin);
			}
		};

		_ptype._setAccessibilityInfoValueCur = function (valuecur) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityInfoValueCur(valuecur);
			}
		};


		_ptype._setAccessibilityInfoLevel = function (level) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityInfoLevel(level);
			}
		};

		_ptype._setAccessibilityHotKey = function (hotkey) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityHotKey(hotkey);
			}
		};

		_ptype._setAccessibilityActiveDescendant = function (subcomp) {
			if (this._control_element) {
				this._control_element.setElementAccessibilityActiveDescendant(subcomp.getElement(), subcomp._input_element);
			}
		};

		_ptype._notifyAccessibility = function (label, notifyevent) {
			if (this._control_element) {
				this._control_element.notifyAccessibility(label, notifyevent);
			}
		};

		_ptype._setAccessibilityStatFlag = function (status, pseudo) {
			if (status == "enable") {
				this._setAccessibilityStatDisabled(false);
			}
			if (status == "disable") {
				this._setAccessibilityStatDisabled(true);
			}
			else if (status == "readonly") {
				this._setAccessibilityFlagReadOnly(true);
			}
			else if (this._pushed) {
				this._setAccessibilityStatPressed(true);
			}
			else if (pseudo == "selected") {
				this._setAccessibilityStatPressed(false);
			}

			if (!this._pushed) {
				this._setAccessibilityStatPressed(false);
			}

			if (this._selected && status != "focus") {
				this._setAccessibilityStatSelected(true);
				this._setAccessibilityStatFocus();

				var window = this._getWindow();
				if (window && window._keydown_element) {
					this.on_apply_custom_setfocus(true);
				}
			}
		};

		_ptype._isAccessibilityEnable = function () {
			var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
			if (accessibility && !accessibility.enable) {
				return false;
			}
			return true;
		};

		_ptype._isItemAccessibilityEnable = function () {
			if (this.on_find_CurrentStyle_itemaccessibility) {
				var accessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo);
				if (accessibility && accessibility.enable) {
					return true;
				}
			}
			return false;
		};

		_ptype._setAccessibilityStatFocus = function (evt_name) {
			if (this._control_element) {
				var _label = "";
				var focusdir = -1;
				if (evt_name == "tabkey") {
					focusdir = 0;
				}
				else if (evt_name == "shifttabkey") {
					focusdir = 1;
				}
				else if (evt_name == "downkey") {
					focusdir = 2;
				}
				else if (evt_name == "upkey") {
					focusdir = 3;
				}
				if (focusdir > -1) {
					var form = this._refform;
					if (form) {
						var current = (this.parent == form) ? this : null;
						if (focusdir > 1) {
							var baccessibility = nexacro._enableaccessibility;
						}

						if (current) {
							if (current == form._getTabOrderFirst(baccessibility)) {
								_label = current._getAccessibilityReadLabel() + " " + application.accessibilityfirstovertext;
							}
							if (current == form._getTabOrderLast(baccessibility)) {
								_label = current._getAccessibilityReadLabel() + " " + application.accessibilitylastovertext;
							}
						}
					}
				}

				this._control_element.setElementAccessibilityStatFocus(_label);
			}

			application._set_accessibility_history(this);
		};
	};

	nexacro._accessibilitytype = 1;
	nexacro._accessibilitydescreadtype = 0x01;
	nexacro._accessibilitywholereadtype = 0;
	nexacro._setAccessibilityType = function (accessibilitytype) {
		if (accessibilitytype == "sensereader") {
			application._accessibilitytype = 2;
			nexacro._accessibilitytype = 2;
		}
		else if (accessibilitytype == "jaws") {
			application._accessibilitytype = 3;
			nexacro._accessibilitytype = 3;
		}
		else if (accessibilitytype == "voiceover") {
			application._accessibilitytype = 4;
			nexacro._accessibilitytype = 4;
		}
		else if (accessibilitytype == "talkback") {
			application._accessibilitytype = 5;
			nexacro._accessibilitytype = 5;
		}

		nexacro.__setAccessibilityType(accessibilitytype);
	};
	nexacro._setAccessibilityDescReadType = function (v) {
		nexacro._accessibilitydescreadtype = 0;
		if (v.match("label")) {
			nexacro._accessibilitydescreadtype |= 0x01;
		}
		if (v.match("action")) {
			nexacro._accessibilitydescreadtype |= 0x02;
		}
		if (v.match("description")) {
			nexacro._accessibilitydescreadtype |= 0x04;
		}
	};
	nexacro._setAccessibilityWholeReadType = function (v) {
		if (v == "load") {
			nexacro._accessibilitywholereadtype = 1;
		}
		else if (v == "change") {
			nexacro._accessibilitywholereadtype = 2;
		}
		else if (v == "load,change") {
			nexacro._accessibilitywholereadtype = 3;
		}
		else {
			nexacro._accessibilitywholereadtype = 0;
		}
	};


	nexacro.ProtocolAdp = function () {
	};

	var _pProtocolAdp = nexacro._createPrototype(nexacro.Object, nexacro.ProtocolAdp);
	nexacro.ProtocolAdp.prototype = _pProtocolAdp;
	_pProtocolAdp._type_name = "ProtocolAdp";

	_pProtocolAdp.encrypt = function (url, data) {
		return data;
	};

	_pProtocolAdp.decrypt = function (url, data) {
		return data;
	};

	_pProtocolAdp.initialize = nexacro._emptyFn;
	_pProtocolAdp.finalize = nexacro._emptyFn;
	_pProtocolAdp.getUsingProtocol = function (url) {
		return "http";
	};

	_pProtocolAdp.getCommunicationHeaders = nexacro._emptyFn;

	delete _pProtocolAdp;


	nexacro.MakeError = function (type, obj, code, arg1) {
		var _args = Array.prototype.slice.call(arguments, 1);
		return nexacro._MakeError(type, _args);
	};

	nexacro.MakeEvalError = function (obj, code, arg1) {
		return nexacro._MakeError(EvalError, arguments);
	};

	nexacro.MakeRangeError = function (obj, code, arg1) {
		return nexacro._MakeError(RangeError, arguments);
	};

	nexacro.MakeReferenceError = function (obj, code, arg1) {
		return nexacro._MakeError(ReferenceError, arguments);
	};

	nexacro.MakeSyntaxError = function (obj, code, arg1) {
		return nexacro._MakeError(SyntaxError, arguments);
	};

	nexacro.MakeTypeError = function (obj, code, arg1) {
		return nexacro._MakeError(TypeError, arguments);
	};

	nexacro.MakeNativeError = function (obj, code, arg1) {
		return nexacro._MakeError(nexacro.NativeError, arguments);
	};

	nexacro.MakeCommunicationError = function (obj, code, arg1) {
		return nexacro._MakeError(nexacro.CommunicationError, arguments);
	};

	nexacro.MakeURIError = function (obj, code, arg1) {
		return nexacro._MakeError(URIError, arguments);
	};

	nexacro._MakeError = function (type, args) {
		var _args = Array.prototype.slice.call(args, 1);
		var str = application._getErrorMessge.apply(this, _args);
		var error;
		if (type && (typeof (type) == "function")) {
			error = new type(str);
		}
		else {
			error = new Error(str);
			error.name = type;
		}

		error.obj = args[0];
		return error;
	};

	nexacro.CommunicationError = function (message) {
		this.name = "CommunicationError";
		this.message = message;
		this.obj = null;
	};

	var _pCommunicationError = nexacro._createPrototype(Error, nexacro.CommunicationError);
	nexacro.CommunicationError.prototype = _pCommunicationError;
	nexacro.CommunicationError._type_name = "CommunicationError";
	delete _pCommunicationError;

	nexacro.NativeError = function (message) {
		this.name = "NativeError";
		this.message = message;
		this.obj = null;
	};
	var _pNativeError = nexacro._createPrototype(Error, nexacro.NativeError);
	nexacro.NativeError.prototype = _pNativeError;
	nexacro.NativeError._type_name = "NativeError";
	delete _pNativeError;

	if (!nexacro.AccessibilityUtil) {
		nexacro.AccessibilityUtil = {
		};
		nexacro.AccessibilityUtil.Hotkey = {
		};
		nexacro.AccessibilityUtil.Hotkey.NONE = 0;
		nexacro.AccessibilityUtil.Hotkey.FIRSTCELL = 1;
		nexacro.AccessibilityUtil.Hotkey.LASTCELL = 2;
		nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN = 3;
		nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN = 4;
		nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW = 5;
		nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW = 6;


		nexacro.AccessibilityUtil.GridHotkeyList = {
		};
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_HOME] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_END] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINROW;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_UP] = nexacro.AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN;
		nexacro.AccessibilityUtil.GridHotkeyList[nexacro.Event.KEY_CTRL + " " + nexacro.Event.KEY_ALT + " " + nexacro.Event.KEY_PAGE_DOWN] = nexacro.AccessibilityUtil.Hotkey.LASTCELLINCOLUMN;

		nexacro.AccessibilityUtil.getAccessibilityLabel = nexacro._emptyFn;
		nexacro.AccessibilityUtil.getAccessibilityAction = nexacro._emptyFn;
		nexacro.AccessibilityUtil.getAccessibilityDescription = nexacro._emptyFn;
		nexacro.AccessibilityUtil.setDOMNodeLabel = nexacro._emptyFn;
		nexacro.AccessibilityUtil.supportMobileApplicationAccessibility = nexacro._emptyFn;
		nexacro.AccessibilityUtil.unsupportMobileApplicationAccessibility = nexacro._emptyFn;
		nexacro.AccessibilityUtil.cancelTouchEvent = nexacro._emptyFn;
		nexacro.AccessibilityUtil.isUseTooltipText = function () {
			return true;
		};
		nexacro.AccessibilityUtil.init = function () {
			if (nexacro._accessibilitytype !== undefined) {
				var accessibilityjs = ["./nexacro14lib/framework/Accessibility.js"];
				nexacro.loadJSLibraries(accessibilityjs);
			}
		};
		nexacro.AccessibilityUtil.checkComponentHotkey = function (obj, keyCode, altKey, ctrlKey, shiftKey) {
			var strHotkey = "";
			var hotkeyList = null;

			if (ctrlKey) {
				strHotkey = strHotkey + nexacro.Event.KEY_CTRL + " ";
			}
			if (altKey) {
				strHotkey = strHotkey + nexacro.Event.KEY_ALT + " ";
			}
			if (shiftKey) {
				strHotkey = strHotkey + nexacro.Event.KEY_SHIFT + " ";
			}

			strHotkey = strHotkey + keyCode;

			if (obj instanceof nexacro.Grid) {
				hotkeyList = nexacro.AccessibilityUtil.GridHotkeyList;
			}

			if (hotkeyList) {
				return hotkeyList[strHotkey];
			}

			return nexacro.AccessibilityUtil.Hotkey.NONE;
		};
	}

	nexacro.loadJSLibraries = function (accessibilityjs) {
		if (accessibilityjs) {
			if (typeof accessibilityjs == "object") {
				var i;
				for (i = 0; i < accessibilityjs.length; i++) {
					var strSource = accessibilityjs[i];
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = strSource;
					document.getElementsByTagName('HEAD')[0].appendChild(script);
				}
				return true;
			}
			else if (typeof accessibilityjs == "string") {
				var strSource = accessibilityjs;
				var script = document.createElement("script");
				script.type = "text/javascript";
				script.src = strSource;
				document.getElementsByTagName('HEAD')[0].appendChild(script);
				return true;
			}
		}
		return false;
	};

	if (!nexacro.Locale) {
		nexacro.Locale = function () {
		};

		nexacro.Locale._type_name = "Locale";

		nexacro.Locale.getLocaleInfo = function (locale) {
			if (locale) {
				locale = locale.toLowerCase();
				locale = locale.replace(/-/g, "_");
			}

			switch (locale) {
				case "aa_DJ":
				case "aa_dj":
					{

						if (!nexacro.Locale.aa_DJ) {
							nexacro.Locale.aa_DJ = {
								name : "aa_DJ", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0044\u004A\u0046\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 

								weekday_names_long : ["\u0041\u0063\u0061\u0061\u0064\u0061", "\u0045\u0074\u006C\u0065\u0065\u006E\u0069", "\u0054\u0061\u006C\u0061\u0061\u0074\u0061", "\u0041\u0072\u0062\u0061\u0071\u0061", "\u004B\u0061\u006D\u0069\u0069\u0073\u0069", "\u0047\u0075\u006D\u0071\u0061\u0074\u0061", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0061\u0063\u0061", "\u0065\u0074\u006C", "\u0074\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0061\u006D", "\u0067\u0075\u006D", "\u0073\u0061\u0062"], 
								weekday_names_narrow : ["\u0061\u0063\u0061", "\u0065\u0074\u006C", "\u0074\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0061\u006D", "\u0067\u0075\u006D", "\u0073\u0061\u0062"], 
								month_names_long : ["\u0051\u0075\u006E\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075", "\u004B\u0075\u0064\u006F", "\u0043\u0069\u0067\u0067\u0069\u006C\u0074\u0061\u0020\u004B\u0075\u0064\u006F", "\u0041\u0067\u0064\u0061\u0020\u0042\u0061\u0078\u0069\u0073\u0073\u006F", "\u0043\u0061\u0078\u0061\u0068\u0020\u0041\u006C\u0073\u0061", "\u0051\u0061\u0073\u0061\u0020\u0044\u0069\u0072\u0072\u0069", "\u0051\u0061\u0064\u006F\u0020\u0044\u0069\u0072\u0072\u0069", "\u004C\u0069\u0069\u0071\u0065\u006E", "\u0057\u0061\u0079\u0073\u0075", "\u0044\u0069\u0074\u0065\u006C\u0069", "\u0058\u0069\u006D\u006F\u006C\u0069", "\u004B\u0061\u0078\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075"], 
								month_names_short : ["\u0071\u0075\u006E", "\u006E\u0061\u0068", "\u0063\u0069\u0067", "\u0061\u0067\u0064", "\u0063\u0061\u0078", "\u0071\u0061\u0073", "\u0071\u0061\u0064", "\u006C\u0065\u0071", "\u0077\u0061\u0079", "\u0064\u0069\u0074", "\u0078\u0069\u006D", "\u006B\u0061\u0078"], 
								month_names_narrow : ["\u0071\u0075\u006E", "\u006E\u0061\u0068", "\u0063\u0069\u0067", "\u0061\u0067\u0064", "\u0063\u0061\u0078", "\u0071\u0061\u0073", "\u0071\u0061\u0064", "\u006C\u0065\u0071", "\u0077\u0061\u0079", "\u0064\u0069\u0074", "\u0078\u0069\u006D", "\u006B\u0061\u0078"], 
								ampm : ["\u0073\u0061\u0061\u006B\u0075", "\u0063\u0061\u0072\u0072\u0061"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.aa_DJ;
					}
					break;
				case "aa_ER":
				case "aa_er":
					{

						if (!nexacro.Locale.aa_ER) {
							nexacro.Locale.aa_ER = {
								name : "aa_ER", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0052\u004E\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 0, 
								frac_digits : 0, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0041\u0063\u0061\u0061\u0064\u0061", "\u0045\u0074\u006C\u0065\u0065\u006E\u0069", "\u0054\u0061\u006C\u0061\u0061\u0074\u0061", "\u0041\u0072\u0062\u0061\u0071\u0061", "\u004B\u0061\u006D\u0069\u0069\u0073\u0069", "\u0047\u0075\u006D\u0071\u0061\u0074\u0061", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u0051\u0075\u006E\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075", "\u004E\u0061\u0068\u0061\u0072\u0073\u0069\u0020\u004B\u0075\u0064\u006F", "\u0043\u0069\u0067\u0067\u0069\u006C\u0074\u0061\u0020\u004B\u0075\u0064\u006F", "\u0041\u0067\u0064\u0061\u0020\u0042\u0061\u0078\u0069\u0073\u0073\u006F", "\u0043\u0061\u0078\u0061\u0068\u0020\u0041\u006C\u0073\u0061", "\u0051\u0061\u0073\u0061\u0020\u0044\u0069\u0072\u0072\u0069", "\u0051\u0061\u0064\u006F\u0020\u0044\u0069\u0072\u0072\u0069", "\u004C\u0065\u0071\u0065\u0065\u006E\u0069", "\u0057\u0061\u0079\u0073\u0075", "\u0044\u0069\u0074\u0065\u006C\u0069", "\u0058\u0069\u006D\u006F\u006C\u0069", "\u004B\u0061\u0078\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075"], 
								month_names_short : ["\u0051\u0075\u006E", "\u004E\u0061\u0068", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
								month_names_narrow : ["\u0051\u0075\u006E", "\u004E\u0061\u0068", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
								ampm : ["\u0073\u0061\u0061\u006B\u0075", "\u0063\u0061\u0072\u0072\u0061"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.aa_ER;
					}
					break;
				case "aa_ET":
				case "aa_et":
					{

						if (!nexacro.Locale.aa_ET) {
							nexacro.Locale.aa_ET = {
								name : "aa_ET", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0054\u0042\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0041\u0063\u0061\u0061\u0064\u0061", "\u0045\u0074\u006C\u0065\u0065\u006E\u0069", "\u0054\u0061\u006C\u0061\u0061\u0074\u0061", "\u0041\u0072\u0062\u0061\u0071\u0061", "\u004B\u0061\u006D\u0069\u0069\u0073\u0069", "\u0047\u0075\u006D\u0071\u0061\u0074\u0061", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u0041\u0063\u0061", "\u0045\u0074\u006C", "\u0054\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0061\u006D", "\u0047\u0075\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u0051\u0075\u006E\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075", "\u004B\u0075\u0064\u006F", "\u0043\u0069\u0067\u0067\u0069\u006C\u0074\u0061\u0020\u004B\u0075\u0064\u006F", "\u0041\u0067\u0064\u0061\u0020\u0042\u0061\u0078\u0069\u0073\u0073\u006F", "\u0043\u0061\u0078\u0061\u0068\u0020\u0041\u006C\u0073\u0061", "\u0051\u0061\u0073\u0061\u0020\u0044\u0069\u0072\u0072\u0069", "\u0051\u0061\u0064\u006F\u0020\u0044\u0069\u0072\u0072\u0069", "\u004C\u0069\u0069\u0071\u0065\u006E", "\u0057\u0061\u0079\u0073\u0075", "\u0044\u0069\u0074\u0065\u006C\u0069", "\u0058\u0069\u006D\u006F\u006C\u0069", "\u004B\u0061\u0078\u0078\u0061\u0020\u0047\u0061\u0072\u0061\u0062\u006C\u0075"], 
								month_names_short : ["\u0051\u0075\u006E", "\u004B\u0075\u0064", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
								month_names_narrow : ["\u0051\u0075\u006E", "\u004B\u0075\u0064", "\u0043\u0069\u0067", "\u0041\u0067\u0064", "\u0043\u0061\u0078", "\u0051\u0061\u0073", "\u0051\u0061\u0064", "\u004C\u0065\u0071", "\u0057\u0061\u0079", "\u0044\u0069\u0074", "\u0058\u0069\u006D", "\u004B\u0061\u0078"], 
								ampm : ["\u0073\u0061\u0061\u006B\u0075", "\u0063\u0061\u0072\u0072\u0061"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.aa_ET;
					}
					break;
				case "af":
				case "af_ZA":
				case "af_za":
					{

						if (!nexacro.Locale.af_ZA) {
							nexacro.Locale.af_ZA = {
								name : "af_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u006F\u006E\u0064\u0061\u0067", "\u004D\u0061\u0061\u006E\u0064\u0061\u0067", "\u0044\u0069\u006E\u0073\u0064\u0061\u0067", "\u0057\u006F\u0065\u006E\u0073\u0064\u0061\u0067", "\u0044\u006F\u006E\u0064\u0065\u0072\u0064\u0061\u0067", "\u0056\u0072\u0079\u0064\u0061\u0067", "\u0053\u0061\u0074\u0065\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u0053\u006F", "\u004D\u0061", "\u0044\u0069", "\u0057\u006F", "\u0044\u006F", "\u0056\u0072", "\u0053\u0061"], 
								weekday_names_narrow : ["\u0053\u006F", "\u004D\u0061", "\u0044\u0069", "\u0057\u006F", "\u0044\u006F", "\u0056\u0072", "\u0053\u0061"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0069\u0065", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0069\u0065", "\u004D\u0061\u0061\u0072\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u0069", "\u004A\u0075\u006E\u0069\u0065", "\u004A\u0075\u006C\u0069\u0065", "\u0041\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0072\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0072\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								ampm : ["\u0056\u004D", "\u004E\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.af_ZA;
					}
					break;
				case "ar_AE":
				case "ar_ae":
					{

						if (!nexacro.Locale.ar_AE) {
							nexacro.Locale.ar_AE = {
								name : "ar_AE", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0041\u0045\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0625\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A\u0020"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl", 
								locale_digits : ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"]
							};
						}

						return nexacro.Locale.ar_AE;
					}
					break;
				case "ar_BH":
				case "ar_bh":
					{

						if (!nexacro.Locale.ar_BH) {
							nexacro.Locale.ar_BH = {
								name : "ar_BH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0042\u0048\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0628\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_BH;
					}
					break;
				case "ar_DZ":
				case "ar_dz":
					{

						if (!nexacro.Locale.ar_DZ) {
							nexacro.Locale.ar_DZ = {
								name : "ar_DZ", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0044\u005A\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u062C\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_DZ;
					}
					break;
				case "ar_EG":
				case "ar_eg":
					{

						if (!nexacro.Locale.ar_EG) {
							nexacro.Locale.ar_EG = {
								name : "ar_EG", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0045\u0047\u0050\u0020", 
								currency_symbol : "\u062C\u002E\u0645\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_EG;
					}
					break;
				case "ar_IN":
				case "ar_in":
					{

						if (!nexacro.Locale.ar_IN) {
							nexacro.Locale.ar_IN = {
								name : "ar_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u20A8", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_IN;
					}
					break;
				case "ar_IQ":
				case "ar_iq":
					{

						if (!nexacro.Locale.ar_IQ) {
							nexacro.Locale.ar_IQ = {
								name : "ar_IQ", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0049\u0051\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0639\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644	", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_IQ;
					}
					break;
				case "ar_JO":
				case "ar_jo":
					{

						if (!nexacro.Locale.ar_JO) {
							nexacro.Locale.ar_JO = {
								name : "ar_JO", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004A\u004F\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0623\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_narrow : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_short : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_narrow : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_JO;
					}
					break;
				case "ar_KW":
				case "ar_kw":
					{

						if (!nexacro.Locale.ar_KW) {
							nexacro.Locale.ar_KW = {
								name : "ar_KW", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004B\u0057\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0643\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_KW;
					}
					break;
				case "ar_LB":
				case "ar_lb":
					{

						if (!nexacro.Locale.ar_LB) {
							nexacro.Locale.ar_LB = {
								name : "ar_LB", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004C\u0042\u0050\u0020", 
								currency_symbol : "\u0644\u002E\u0644\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_narrow : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_short : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_narrow : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_LB;
					}
					break;
				case "ar_LY":
				case "ar_ly":
					{

						if (!nexacro.Locale.ar_LY) {
							nexacro.Locale.ar_LY = {
								name : "ar_LY", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004C\u0059\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0644\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_LY;
					}
					break;
				case "ar_MA":
				case "ar_ma":
					{

						if (!nexacro.Locale.ar_MA) {
							nexacro.Locale.ar_MA = {
								name : "ar_MA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004D\u0041\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u0645\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_MA;
					}
					break;
				case "ar_OM":
				case "ar_om":
					{

						if (!nexacro.Locale.ar_OM) {
							nexacro.Locale.ar_OM = {
								name : "ar_OM", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004F\u004D\u0052\u0020", 
								currency_symbol : "\u0631\u002E\u0639\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_OM;
					}
					break;
				case "ar_QA":
				case "ar_qa":
					{

						if (!nexacro.Locale.ar_QA) {
							nexacro.Locale.ar_QA = {
								name : "ar_QA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0051\u0041\u0052\u0020", 
								currency_symbol : "\u0631\u002E\u0642\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627	", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_QA;
					}
					break;
				case "ar":
				case "ar_SA":
				case "ar_sa":
					{

						if (!nexacro.Locale.ar_SA) {
							nexacro.Locale.ar_SA = {
								name : "ar_SA", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [3], 
								int_curr_symbol : "\u0053\u0041\u0052\u0020", 
								currency_symbol : "\u0631\u064A\u0627\u0644", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "", 
								mon_grouping : [-1], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0625\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0640\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0640\u0627\u0646", "\u0623\u064A\u0627\u0631", "\u062D\u0632\u064A\u0631\u0627\u0646", "\u062A\u0640\u0645\u0640\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0041\u0020\u0025\u002E\u0031\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								time_format : "\u0025\u002E\u0031\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u002E\u0031\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0025\u0041\u0020\u0025\u002E\u0031\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0020\u0025\u002E\u0031\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u002F\u0025\u0042\u002F\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_SA;
					}
					break;
				case "ar_SD":
				case "ar_sd":
					{

						if (!nexacro.Locale.ar_SD) {
							nexacro.Locale.ar_SD = {
								name : "ar_SD", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0053\u0044\u0044\u0020", 
								currency_symbol : "\u062C\u002E\u0633\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_SD;
					}
					break;
				case "ar_SY":
				case "ar_sy":
					{

						if (!nexacro.Locale.ar_SY) {
							nexacro.Locale.ar_SY = {
								name : "ar_SY", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0053\u0059\u0050\u0020", 
								currency_symbol : "\u0644\u002E\u0633\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_narrow : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								month_names_long : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631\u0627\u0646", "\u062D\u0632\u064A\u0631", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_short : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631\u0627\u0646", "\u062D\u0632\u064A\u0631", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								month_names_narrow : ["\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0634\u0628\u0627\u0637", "\u0622\u0630\u0627\u0631", "\u0646\u064A\u0633\u0627\u0646", "\u0646\u0648\u0627\u0631\u0627\u0646", "\u062D\u0632\u064A\u0631", "\u062A\u0645\u0648\u0632", "\u0622\u0628", "\u0623\u064A\u0644\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u0623\u0648\u0644", "\u062A\u0634\u0631\u064A\u0646\u0020\u0627\u0644\u062B\u0627\u0646\u064A", "\u0643\u0627\u0646\u0648\u0646\u0020\u0627\u0644\u0623\u0648\u0644"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_SY;
					}
					break;
				case "ar_TN":
				case "ar_tn":
					{

						if (!nexacro.Locale.ar_TN) {
							nexacro.Locale.ar_TN = {
								name : "ar_TN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0054\u004E\u0044\u0020", 
								currency_symbol : "\u062F\u002E\u062A\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_TN;
					}
					break;
				case "ar_YE":
				case "ar_ye":
					{

						if (!nexacro.Locale.ar_YE) {
							nexacro.Locale.ar_YE = {
								name : "ar_YE", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0059\u0045\u0052\u0020", 
								currency_symbol : "\u0631\u002E\u064A\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633", "\u0627\u0644\u062C\u0645\u0639\u0629", "\u0627\u0644\u0633\u0628\u062A"], 
								weekday_names_short : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								weekday_names_narrow : ["\u062D", "\u0646", "\u062B", "\u0631", "\u062E", "\u062C", "\u0633"], 
								month_names_long : ["\u064A\u0646\u0627\u064A\u0631", "\u0641\u0628\u0631\u0627\u064A\u0631", "\u0645\u0627\u0631\u0633", "\u0623\u0628\u0631\u064A\u0644", "\u0645\u0627\u064A\u0648", "\u064A\u0648\u0646\u064A\u0648", "\u064A\u0648\u0644\u064A\u0648", "\u0623\u063A\u0633\u0637\u0633", "\u0633\u0628\u062A\u0645\u0628\u0631", "\u0623\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0641\u0645\u0628\u0631", "\u062F\u064A\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								month_names_narrow : ["\u064A\u0646\u0627", "\u0641\u0628\u0631", "\u0645\u0627\u0631", "\u0623\u0628\u0631", "\u0645\u0627\u064A", "\u064A\u0648\u0646", "\u064A\u0648\u0644", "\u0623\u063A\u0633", "\u0633\u0628\u062A", "\u0623\u0643\u062A", "\u0646\u0648\u0641", "\u062F\u064A\u0633"], 
								ampm : ["\u0635", "\u0645"], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020", 
								time_format_ampm : "\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0064\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u005A\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ar_YE;
					}
					break;
				case "as":
				case "as_IN":
				case "as_in":
					{

						if (!nexacro.Locale.as_IN) {
							nexacro.Locale.as_IN = {
								name : "as_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u099F", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u09A6\u09C7\u0993\u09AC\u09BE\u09F0", "\u09B8\u09CB\u09AE\u09AC\u09BE\u09F0", "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09F0", "\u09AC\u09C1\u09A7\u09AC\u09BE\u09F0", "\u09AC\u09C3\u09B9\u09B7\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09F0", "\u09B6\u09C1\u0995\u09CD\u09F0\u09AC\u09BE\u09F0", "\u09B6\u09A8\u09BF\u09AC\u09BE\u09F0"], 
								weekday_names_short : ["\u09A6\u09C7\u0993", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B7\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09F0", "\u09B6\u09A8\u09BF"], 
								weekday_names_narrow : ["\u09A6\u09C7\u0993", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B7\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09F0", "\u09B6\u09A8\u09BF"], 
								month_names_long : ["\u099C\u09BE\u09A8\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AB\u09C7\u09AC\u09CD\u09F0\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AE\u09BE\u09F0\u09CD\u099A", "\u098F\u09AA\u09CD\u09F0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B7\u09CD\u099F", "\u099A\u09C7\u09AA\u09CD\u09A4\u09C7\u09AE\u09CD\u09AC\u09F0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09F0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09F0", "\u09A1\u09BF\u099A\u09C7\u09AE\u09CD\u09AC\u09F0"], 
								month_names_short : ["\u099C\u09BE\u09A8\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AB\u09C7\u09AC\u09CD\u09F0\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AE\u09BE\u09F0\u09CD\u099A", "\u098F\u09AA\u09CD\u09F0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997", "\u099A\u09C7\u09AA\u09CD\u09A4\u09C7\u09AE\u09CD\u09AC\u09F0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09F0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09F0", "\u09A1\u09BF\u099A\u09C7\u09AE\u09CD\u09AC\u09F0"], 
								month_names_narrow : ["\u099C\u09BE\u09A8\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AB\u09C7\u09AC\u09CD\u09F0\u09C1\u09F1\u09BE\u09F0\u09C0", "\u09AE\u09BE\u09F0\u09CD\u099A", "\u098F\u09AA\u09CD\u09F0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997", "\u099A\u09C7\u09AA\u09CD\u09A4\u09C7\u09AE\u09CD\u09AC\u09F0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09F0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09F0", "\u09A1\u09BF\u099A\u09C7\u09AE\u09CD\u09AC\u09F0"], 
								ampm : ["\u09AA\u09C2\u09F0\u09CD\u09AC\u09CD\u09AC\u09BE\u09B9\u09CD\u09A8", "\u0985\u09AA\u09F0\u09BE\u09B9\u09CD\u09A8"], 
								date_format : "\u0025\u0065\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u0070", 
								time_format_ampm : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0065\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u002C\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0041", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.as_IN;
					}
					break;
				case "az":
				case "az_AZ":
				case "az_az":
					{

						if (!nexacro.Locale.az_AZ) {
							nexacro.Locale.az_AZ = {
								name : "az_AZ", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0041\u005A\u004D\u0020", 
								currency_symbol : "\u006D\u0061\u006E\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0062\u0061\u007A\u0061\u0072\u0020\u0067\u00FC\u006E\u00FC", "\u0062\u0061\u007A\u0061\u0072\u0020\u0065\u0072\u0074\u0259\u0073\u0069", "\u00E7\u0259\u0072\u015F\u0259\u006E\u0062\u0259\u0020\u0061\u0078\u015F\u0061\u006D\u0131", "\u00E7\u0259\u0072\u015F\u0259\u006E\u0062\u0259", "\u0063\u00FC\u006D\u0259\u0020\u0061\u0078\u015F\u0061\u006D\u0131", "\u0063\u00FC\u006D\u0259", "\u015F\u0259\u006E\u0062\u0259"], 
								weekday_names_short : ["\u0062\u0061\u007A", "\u0062\u0065\u0072", "\u00E7\u0061\u0078", "\u00E7\u0259\u0072", "\u0063\u0061\u0078", "\u0063\u00FC\u006D", "\u015F\u006E\u0062"], 
								weekday_names_narrow : ["\u0062\u0061\u007A", "\u0062\u0065\u0072", "\u00E7\u0061\u0078", "\u00E7\u0259\u0072", "\u0063\u0061\u0078", "\u0063\u00FC\u006D", "\u015F\u006E\u0062"], 
								month_names_long : ["\u0079\u0061\u006E\u0076\u0061\u0072", "\u0066\u0065\u0076\u0072\u0061\u006C", "\u006D\u0061\u0072\u0074", "\u0061\u0070\u0072\u0065\u006C", "\u006D\u0061\u0079", "\u0069\u0079\u0075\u006E", "\u0069\u0079\u0075\u006C", "\u0061\u0076\u0071\u0075\u0073\u0074", "\u0073\u0065\u006E\u0074\u0079\u0061\u0062\u0072", "\u006F\u006B\u0074\u0079\u0061\u0062\u0072", "\u006E\u006F\u0079\u0061\u0062\u0072", "\u0064\u0065\u006B\u0061\u0062\u0072"], 
								month_names_short : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0130\u0079\u006E", "\u0130\u0079\u006C", "\u0041\u0076\u0071", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
								month_names_narrow : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0130\u0079\u006E", "\u0130\u0079\u006C", "\u0041\u0076\u0071", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.az_AZ;
					}
					break;
				case "be":
				case "be_BY":
				case "be_by":
					{

						if (!nexacro.Locale.be_BY) {
							nexacro.Locale.be_BY = {
								name : "be_BY", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0042\u0059\u0052\u0020", 
								currency_symbol : "\u0440\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u041D\u044F\u0434\u0437\u0435\u043B\u044F", "\u041F\u0430\u043D\u044F\u0434\u0437\u0435\u043B\u0430\u043A", "\u0410\u045E\u0442\u043E\u0440\u0430\u043A", "\u0421\u0435\u0440\u0430\u0434\u0430", "\u0427\u0430\u0446\u0432\u0435\u0440", "\u041F\u044F\u0442\u043D\u0456\u0446\u0430", "\u0421\u0443\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u041D\u044F\u0434", "\u041F\u0430\u043D", "\u0410\u045E\u0442", "\u0421\u0440\u0434", "\u0427\u0446\u0432", "\u041F\u044F\u0442", "\u0421\u0443\u0431"], 
								weekday_names_narrow : ["\u041D\u044F\u0434", "\u041F\u0430\u043D", "\u0410\u045E\u0442", "\u0421\u0440\u0434", "\u0427\u0446\u0432", "\u041F\u044F\u0442", "\u0421\u0443\u0431"], 
								month_names_long : ["\u0421\u0442\u0443\u0434\u0437\u0435\u043D\u044C", "\u041B\u044E\u0442\u044B", "\u0421\u0430\u043A\u0430\u0432\u0456\u043A", "\u041A\u0440\u0430\u0441\u0430\u0432\u0456\u043A", "\u0422\u0440\u0430\u0432\u0435\u043D\u044C", "\u0427\u044D\u0440\u0432\u0435\u043D\u044C", "\u041B\u0456\u043F\u0435\u043D\u044C", "\u0416\u043D\u0456\u0432\u0435\u043D\u044C", "\u0412\u0435\u0440\u0430\u0441\u0435\u043D\u044C", "\u041A\u0430\u0441\u0442\u0440\u044B\u0447\u043D\u0456\u043A", "\u041B\u0456\u0441\u0442\u0430\u043F\u0430\u0434", "\u0421\u043D\u0435\u0436\u0430\u043D\u044C"], 
								month_names_short : ["\u0421\u0442\u0434", "\u041B\u044E\u0442", "\u0421\u0430\u043A", "\u041A\u0440\u0441", "\u0422\u0440\u0430", "\u0427\u044D\u0440", "\u041B\u0456\u043F", "\u0416\u043D\u0432", "\u0412\u0440\u0441", "\u041A\u0441\u0442", "\u041B\u0456\u0441", "\u0421\u043D\u0436"], 
								month_names_narrow : ["\u0421\u0442\u0434", "\u041B\u044E\u0442", "\u0421\u0430\u043A", "\u041A\u0440\u0441", "\u0422\u0440\u0430", "\u0427\u044D\u0440", "\u041B\u0456\u043F", "\u0416\u043D\u0432", "\u0412\u0440\u0441", "\u041A\u0441\u0442", "\u041B\u0456\u0441", "\u0421\u043D\u0436"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.be_BY;
					}
					break;
				case "bg":
				case "bg_BG":
				case "bg_bg":
					{

						if (!nexacro.Locale.bg_BG) {
							nexacro.Locale.bg_BG = {
								name : "bg_BG", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0042\u0047\u004E\u0020", 
								currency_symbol : "\u043B\u0432", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u043D\u0435\u0434\u0435\u043B\u044F", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u044F\u0434\u0430", "\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A", "\u043F\u0435\u0442\u044A\u043A", "\u0441\u044A\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u043D\u0434", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"], 
								weekday_names_narrow : ["\u043D\u0434", "\u043F\u043D", "\u0432\u0442", "\u0441\u0440", "\u0447\u0442", "\u043F\u0442", "\u0441\u0431"], 
								month_names_long : ["\u044F\u043D\u0443\u0430\u0440\u0438", "\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0439", "\u044E\u043D\u0438", "\u044E\u043B\u0438", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438", "\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438", "\u043D\u043E\u0435\u043C\u0432\u0440\u0438", "\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438"], 
								month_names_short : ["\u044F\u043D\u0443", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u044E\u043D\u0438", "\u044E\u043B\u0438", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
								month_names_narrow : ["\u044F\u043D\u0443", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u044E\u043D\u0438", "\u044E\u043B\u0438", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0065\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u006B\u002C\u0025\u004D\u002C\u0025\u0053", 
								time_format_ampm : "\u0025\u006C\u002C\u0025\u004D\u002C\u0025\u0053", 
								date_time_format : "\u0025\u0078\u0020\u0028\u0025\u0061\u0029\u0020\u0025\u0058\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 1, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0433\u002E", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059\u0020\u0433\u002E", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.bg_BG;
					}
					break;
				case "bn_BD":
				case "bn_bd":
					{

						if (!nexacro.Locale.bn_BD) {
							nexacro.Locale.bn_BD = {
								name : "bn_BD", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0042\u0044\u0054\u0020", 
								currency_symbol : "\u09F3", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0", "\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0", "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0", "\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0", "\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0", "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0"], 
								weekday_names_short : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u0983", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
								weekday_names_narrow : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u0983", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
								month_names_long : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
								month_names_short : ["\u099C\u09BE\u09A8\u09C1", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2", "\u0986\u0997", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7", "\u0985\u0995\u09CD\u099F\u09CB", "\u09A8\u09AD\u09C7", "\u09A1\u09BF\u09B8\u09C7"], 
								month_names_narrow : ["\u099C\u09BE\u09A8\u09C1", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2", "\u0986\u0997", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7", "\u0985\u0995\u09CD\u099F\u09CB", "\u09A8\u09AD\u09C7", "\u09A1\u09BF\u09B8\u09C7"], 
								ampm : ["\u09AA\u09C2\u09B0\u09CD\u09AC\u09BE\u09B9\u09CD\u09A3", "\u0985\u09AA\u09B0\u09BE\u09B9\u09CD\u09A3"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.bn_BD;
					}
					break;
				case "bn":
				case "bn_IN":
				case "bn_in":
					{

						if (!nexacro.Locale.bn_IN) {
							nexacro.Locale.bn_IN = {
								name : "bn_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u099F\u09BE\u0995\u09BE", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0", "\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0", "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0", "\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0", "\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0", "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0"], 
								weekday_names_short : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
								weekday_names_narrow : ["\u09B0\u09AC\u09BF", "\u09B8\u09CB\u09AE", "\u09AE\u0999\u09CD\u0997\u09B2", "\u09AC\u09C1\u09A7", "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF", "\u09B6\u09C1\u0995\u09CD\u09B0", "\u09B6\u09A8\u09BF"], 
								month_names_long : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
								month_names_short : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
								month_names_narrow : ["\u099C\u09BE\u09A8\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09DF\u09BE\u09B0\u09BF", "\u09AE\u09BE\u09B0\u09CD\u099A", "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2", "\u09AE\u09C7", "\u099C\u09C1\u09A8", "\u099C\u09C1\u09B2\u09BE\u0987", "\u0986\u0997\u09B8\u09CD\u099F", "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0", "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0", "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0", "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"], 
								ampm : ["\u09AA\u09C2\u09B0\u09CD\u09AC\u09BE\u09B9\u09CD\u09A3", "\u0985\u09AA\u09B0\u09BE\u09B9\u09CD\u09A3"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.bn_IN;
					}
					break;
				case "br":
				case "br_FR":
				case "br_fr":
					{

						if (!nexacro.Locale.br_FR) {
							nexacro.Locale.br_FR = {
								name : "br_FR", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0073\u0075\u006C", "\u006C\u0075\u006E", "\u006D\u0065\u0075\u0072\u007A\u0068", "\u006D\u0065\u0072\u0063\u0027\u0068\u0065\u0072", "\u0079\u0061\u006F\u0075", "\u0067\u0077\u0065\u006E\u0065\u0072", "\u0073\u0061\u0064\u006F\u0072\u006E"], 
								weekday_names_short : ["\u0073\u0075\u006C", "\u006C\u0075\u006E", "\u006D\u0065\u0075", "\u006D\u0065\u0072", "\u0079\u0061\u006F", "\u0067\u0077\u0065", "\u0073\u0061\u0064"], 
								weekday_names_narrow : ["\u0073\u0075\u006C", "\u006C\u0075\u006E", "\u006D\u0065\u0075", "\u006D\u0065\u0072", "\u0079\u0061\u006F", "\u0067\u0077\u0065", "\u0073\u0061\u0064"], 
								month_names_long : ["\u0047\u0065\u006E\u0076\u0065\u0072", "\u0043\u0027\u0068\u0077\u0065\u0076\u0072\u0065\u0072", "\u004D\u0065\u0075\u0072\u007A\u0068", "\u0045\u0062\u0072\u0065\u006C", "\u004D\u0061\u0065", "\u004D\u0065\u007A\u0068\u0065\u0076\u0065\u006E", "\u0047\u006F\u0075\u0065\u0072\u0065", "\u0045\u006F\u0073\u0074", "\u0047\u0077\u0065\u006E\u0067\u006F\u006C\u006F", "\u0048\u0065\u0072\u0065", "\u0044\u0075", "\u004B\u0065\u0072\u007A\u0075"], 
								month_names_short : ["\u0047\u0065\u006E\u0020", "\u0043\u0027\u0068\u0077", "\u004D\u0065\u0075\u0020", "\u0045\u0062\u0072\u0020", "\u004D\u0061\u0065\u0020", "\u0045\u0076\u0065\u0020", "\u0047\u006F\u0075\u0020", "\u0045\u006F\u0073\u0020", "\u0047\u0077\u0065\u0020", "\u0048\u0065\u0072\u0020", "\u0044\u0075\u0020\u0020", "\u004B\u0065\u0072\u0020"], 
								month_names_narrow : ["\u0047\u0065\u006E\u0020", "\u0043\u0027\u0068\u0077", "\u004D\u0065\u0075\u0020", "\u0045\u0062\u0072\u0020", "\u004D\u0061\u0065\u0020", "\u0045\u0076\u0065\u0020", "\u0047\u006F\u0075\u0020", "\u0045\u006F\u0073\u0020", "\u0047\u0077\u0065\u0020", "\u0048\u0065\u0072\u0020", "\u0044\u0075\u0020\u0020", "\u004B\u0065\u0072\u0020"], 
								ampm : ["\u0020", "\u0020"], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u0065\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0044\u0027\u0061\u0072\u0020\u0025\u0041\u0020\u0025\u0064\u0020\u0061\u0020\u0076\u0069\u007A\u0020\u0025\u0042\u0020\u0025\u0059", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.br_FR;
					}
					break;
				case "bs":
				case "bs_BA":
				case "bs_ba":
					{

						if (!nexacro.Locale.bs_BA) {
							nexacro.Locale.bs_BA = {
								name : "bs_BA", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0042\u0041\u004D\u0020", 
								currency_symbol : "\u004B\u004D", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004E\u0065\u0064\u006A\u0065\u006C\u006A\u0061", "\u0050\u006F\u006E\u0065\u0064\u006A\u0065\u006C\u006A\u0061\u006B", "\u0055\u0074\u006F\u0072\u0061\u006B", "\u0053\u0072\u0069\u006A\u0065\u0064\u0061", "\u010C\u0065\u0074\u0076\u0072\u0074\u0061\u006B", "\u0050\u0065\u0074\u0061\u006B", "\u0053\u0075\u0062\u006F\u0074\u0061"], 
								weekday_names_short : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
								weekday_names_narrow : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u0061\u0072\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u006A", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0061\u0072", "\u004F\u006B\u0074\u006F\u0062\u0061\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0061\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0061\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u006A", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u006A", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.bs_BA;
					}
					break;
				case "ca_AD":
				case "ca_ad":
					{

						if (!nexacro.Locale.ca_AD) {
							nexacro.Locale.ca_AD = {
								name : "ca_AD", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
								weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ca_AD;
					}
					break;
				case "ca":
				case "ca_ES":
				case "ca_es":
					{

						if (!nexacro.Locale.ca_ES) {
							nexacro.Locale.ca_ES = {
								name : "ca_ES", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
								weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u002F\u0020\u0025\u0042\u0020\u002F\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ca_ES;
					}
					break;
				case "ca_FR":
				case "ca_fr":
					{

						if (!nexacro.Locale.ca_FR) {
							nexacro.Locale.ca_FR = {
								name : "ca_FR", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
								weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ca_FR;
					}
					break;
				case "ca_IT":
				case "ca_it":
					{

						if (!nexacro.Locale.ca_IT) {
							nexacro.Locale.ca_IT = {
								name : "ca_IT", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u0075\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0074\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u006F\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0073\u0061\u0062\u0074\u0065"], 
								weekday_names_short : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								weekday_names_narrow : ["\u0064\u0067", "\u0064\u006C", "\u0064\u0074", "\u0064\u0063", "\u0064\u006A", "\u0064\u0076", "\u0064\u0073"], 
								month_names_long : ["\u0067\u0065\u006E\u0065\u0072", "\u0066\u0065\u0062\u0072\u0065\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u0067", "\u006A\u0075\u006E\u0079", "\u006A\u0075\u006C\u0069\u006F\u006C", "\u0061\u0067\u006F\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0073\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ca_IT;
					}
					break;
				case "cs":
				case "cs_CZ":
				case "cs_cz":
					{

						if (!nexacro.Locale.cs_CZ) {
							nexacro.Locale.cs_CZ = {
								name : "cs_CZ", 
								decimal_point : "\u002C", 
								thousands_sep : "\u00A0", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0043\u005A\u004B\u0020", 
								currency_symbol : "\u004B\u010D", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004E\u0065\u0064\u011B\u006C\u0065", "\u0050\u006F\u006E\u0064\u011B\u006C\u00ED", "\u00DA\u0074\u0065\u0072\u00FD", "\u0053\u0074\u0159\u0065\u0064\u0061", "\u010C\u0074\u0076\u0072\u0074\u0065\u006B", "\u0050\u00E1\u0074\u0065\u006B", "\u0053\u006F\u0062\u006F\u0074\u0061"], 
								weekday_names_short : ["\u004E\u0065", "\u0050\u006F", "\u00DA\u0074", "\u0053\u0074", "\u010C\u0074", "\u0050\u00E1", "\u0053\u006F"], 
								weekday_names_narrow : ["\u004E\u0065", "\u0050\u006F", "\u00DA\u0074", "\u0053\u0074", "\u010C\u0074", "\u0050\u00E1", "\u0053\u006F"], 
								month_names_long : ["\u006C\u0065\u0064\u0065\u006E", "\u00FA\u006E\u006F\u0072", "\u0062\u0159\u0065\u007A\u0065\u006E", "\u0064\u0075\u0062\u0065\u006E", "\u006B\u0076\u011B\u0074\u0065\u006E", "\u010D\u0065\u0072\u0076\u0065\u006E", "\u010D\u0065\u0072\u0076\u0065\u006E\u0065\u0063", "\u0073\u0072\u0070\u0065\u006E", "\u007A\u00E1\u0159\u00ED", "\u0159\u00ED\u006A\u0065\u006E", "\u006C\u0069\u0073\u0074\u006F\u0070\u0061\u0064", "\u0070\u0072\u006F\u0073\u0069\u006E\u0065\u0063"], 
								month_names_short : ["\u006C\u0065\u0064", "\u00FA\u006E\u006F", "\u0062\u0159\u0065", "\u0064\u0075\u0062", "\u006B\u0076\u011B", "\u010D\u0065\u006E", "\u010D\u0065\u0063", "\u0073\u0072\u0070", "\u007A\u00E1\u0159", "\u0159\u00ED\u006A", "\u006C\u0069\u0073", "\u0070\u0072\u006F"], 
								month_names_narrow : ["\u006C\u0065\u0064", "\u00FA\u006E\u006F", "\u0062\u0159\u0065", "\u0064\u0075\u0062", "\u006B\u0076\u011B", "\u010D\u0065\u006E", "\u010D\u0065\u0063", "\u0073\u0072\u0070", "\u007A\u00E1\u0159", "\u0159\u00ED\u006A", "\u006C\u0069\u0073", "\u0070\u0072\u006F"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0025\u0061\u00A0\u0025\u0065\u002E\u00A0\u0025\u0042\u00A0\u0025\u0059\u002C\u00A0\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u00A0\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 1, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.cs_CZ;
					}
					break;
				case "cy":
				case "cy_GB":
				case "cy_gb":
					{

						if (!nexacro.Locale.cy_GB) {
							nexacro.Locale.cy_GB = {
								name : "cy_GB", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0047\u0042\u0050\u0020", 
								currency_symbol : "\u00A3", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006C", "\u004C\u006C\u0075\u006E", "\u004D\u0061\u0077\u0072\u0074\u0068", "\u004D\u0065\u0072\u0063\u0068\u0065\u0072", "\u0049\u0061\u0075", "\u0047\u0077\u0065\u006E\u0065\u0072", "\u0053\u0061\u0064\u0077\u0072\u006E"], 
								weekday_names_short : ["\u0053\u0075\u006C", "\u004C\u006C\u0075", "\u004D\u0061\u0077", "\u004D\u0065\u0072", "\u0049\u0061\u0075", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
								weekday_names_narrow : ["\u0053\u0075\u006C", "\u004C\u006C\u0075", "\u004D\u0061\u0077", "\u004D\u0065\u0072", "\u0049\u0061\u0075", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
								month_names_long : ["\u0049\u006F\u006E\u0061\u0077\u0072", "\u0043\u0068\u0077\u0065\u0066\u0072\u006F\u0072", "\u004D\u0061\u0077\u0072\u0074\u0068", "\u0045\u0062\u0072\u0069\u006C\u006C", "\u004D\u0061\u0069", "\u004D\u0065\u0068\u0065\u0066\u0069\u006E", "\u0047\u006F\u0072\u0066\u0066\u0065\u006E\u006E\u0061\u0066", "\u0041\u0077\u0073\u0074", "\u004D\u0065\u0064\u0069", "\u0048\u0079\u0064\u0072\u0065\u0066", "\u0054\u0061\u0063\u0068\u0077\u0065\u0064\u0064", "\u0052\u0068\u0061\u0067\u0066\u0079\u0072"], 
								month_names_short : ["\u0049\u006F\u006E", "\u0043\u0068\u0077", "\u004D\u0061\u0077", "\u0045\u0062\u0072", "\u004D\u0061\u0069", "\u004D\u0065\u0068", "\u0047\u006F\u0072", "\u0041\u0077\u0073", "\u004D\u0065\u0064", "\u0048\u0079\u0064", "\u0054\u0061\u0063\u0068", "\u0052\u0068\u0061"], 
								month_names_narrow : ["\u0049\u006F\u006E", "\u0043\u0068\u0077", "\u004D\u0061\u0077", "\u0045\u0062\u0072", "\u004D\u0061\u0069", "\u004D\u0065\u0068", "\u0047\u006F\u0072", "\u0041\u0077\u0073", "\u004D\u0065\u0064", "\u0048\u0079\u0064", "\u0054\u0061\u0063\u0068", "\u0052\u0068\u0061"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050\u0020\u0025\u005A", 
								date_time_format : "\u0044\u0079\u0064\u0064\u0020\u0025\u0041\u0020\u0025\u0064\u0020\u006d\u0069\u0073\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.cy_GB;
					}
					break;
				case "da":
				case "da_DK":
				case "da_dk":
					{

						if (!nexacro.Locale.da_DK) {
							nexacro.Locale.da_DK = {
								name : "da_DK", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0044\u004B\u004B\u0020", 
								currency_symbol : "\u006B\u0072\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 2, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u00F8\u006E\u0064\u0061\u0067", "\u006D\u0061\u006E\u0064\u0061\u0067", "\u0074\u0069\u0072\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F8\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
								weekday_names_narrow : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0074\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.da_DK;
					}
					break;
				case "de_AT":
				case "de_at":
					{

						if (!nexacro.Locale.de_AT) {
							nexacro.Locale.de_AT = {
								name : "de_AT", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
								month_names_long : ["\u004A\u00E4\u006E\u006E\u0065\u0072", "\u0046\u0065\u0062\u0065\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u00E4\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u00E4\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.de_AT;
					}
					break;
				case "de_BE":
				case "de_be":
					{

						if (!nexacro.Locale.de_BE) {
							nexacro.Locale.de_BE = {
								name : "de_BE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.de_BE;
					}
					break;
				case "de_CH":
				case "de_ch":
					{

						if (!nexacro.Locale.de_CH) {
							nexacro.Locale.de_CH = {
								name : "de_CH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u0027", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0043\u0048\u0046\u0020", 
								currency_symbol : "\u0046\u0072\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0027", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006F\u006E", "\u0044\u0069\u0065", "\u004D\u0069\u0074", "\u0044\u006F\u006E", "\u0046\u0072\u0065", "\u0053\u0061\u006D"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.de_CH;
					}
					break;
				case "de":
				case "de_DE":
				case "de_de":
					{

						if (!nexacro.Locale.de_DE) {
							nexacro.Locale.de_DE = {
								name : "de_DE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
								weekday_names_short : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
								weekday_names_narrow : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0064\u002E\u0020\u0025\u0062\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 1, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.de_DE;
					}
					break;
				case "de_LU":
				case "de_lu":
					{

						if (!nexacro.Locale.de_LU) {
							nexacro.Locale.de_LU = {
								name : "de_LU", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u006F\u006E\u006E\u0074\u0061\u0067", "\u004D\u006F\u006E\u0074\u0061\u0067", "\u0044\u0069\u0065\u006E\u0073\u0074\u0061\u0067", "\u004D\u0069\u0074\u0074\u0077\u006F\u0063\u0068", "\u0044\u006F\u006E\u006E\u0065\u0072\u0073\u0074\u0061\u0067", "\u0046\u0072\u0065\u0069\u0074\u0061\u0067", "\u0053\u0061\u006D\u0073\u0074\u0061\u0067"], 
								weekday_names_short : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
								weekday_names_narrow : ["\u0053\u006F", "\u004D\u006F", "\u0044\u0069", "\u004D\u0069", "\u0044\u006F", "\u0046\u0072", "\u0053\u0061"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072", "\u004D\u00E4\u0072\u007A", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u007A\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u00E4\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.de_LU;
					}
					break;
				case "dz":
				case "dz_BT":
				case "dz_bt":
					{

						if (!nexacro.Locale.dz_BT) {
							nexacro.Locale.dz_BT = {
								name : "dz_BT", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0042\u0054\u004E\u0020", 
								currency_symbol : "\u0F51\u0F44\u0F74\u0F63\u0F0B\u0F40\u0FB2\u0F58\u0F0B", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0F42\u0F5F\u0F60\u0F0B\u0F5F\u0FB3\u0F0B\u0F56\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F58\u0F72\u0F42\u0F0B\u0F51\u0F58\u0F62\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F63\u0FB7\u0F42\u0F0B\u0F55\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F74\u0F62\u0F0B\u0F56\u0F74\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F54\u0F0B\u0F66\u0F44\u0F66\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F66\u0FA4\u0F7A\u0F53\u0F0B\u0F55\u0F0B", "\u0F42\u0F5F\u0F60\u0F0B\u0F49\u0F72\u0F0B\u0F58\u0F0B"], 
								weekday_names_short : ["\u0F5F\u0FB3\u0F0B", "\u0F58\u0F72\u0F62\u0F0B", "\u0F63\u0FB7\u0F42\u0F0B", "\u0F54\u0F74\u0F62\u0F0B", "\u0F66\u0F44\u0F66\u0F0B", "\u0F66\u0FA4\u0F7A\u0F53\u0F0B", "\u0F49\u0F72\u0F0B"], 
								weekday_names_narrow : ["\u0F5F\u0FB3\u0F0B", "\u0F58\u0F72\u0F62\u0F0B", "\u0F63\u0FB7\u0F42\u0F0B", "\u0F54\u0F74\u0F62\u0F0B", "\u0F66\u0F44\u0F66\u0F0B", "\u0F66\u0FA4\u0F7A\u0F53\u0F0B", "\u0F49\u0F72\u0F0B"], 
								month_names_long : ["\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F44\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F42\u0F66\u0F74\u0F58\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F5E\u0F72\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F63\u0F94\u0F0B\u0F55\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0FB2\u0F74\u0F42\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F51\u0F74\u0F53\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F62\u0F92\u0FB1\u0F51\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F51\u0F42\u0F74\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F45\u0F72\u0F42\u0F0B\u0F54\u0F0B", "\u0F5F\u0FB3\u0F0B\u0F56\u0F0B\u0F56\u0F45\u0F74\u0F0B\u0F42\u0F49\u0F72\u0F66\u0F0B\u0F54\u0F0B"], 
								month_names_short : ["\u0F5F\u0FB3\u0F0B\u0F21", "\u0F5F\u0FB3\u0F0B\u0F22", "\u0F5F\u0FB3\u0F0B\u0F23", "\u0F5F\u0FB3\u0F0B\u0F24", "\u0F5F\u0FB3\u0F0B\u0F25", "\u0F5F\u0FB3\u0F0B\u0F26", "\u0F5F\u0FB3\u0F0B\u0F27", "\u0F5F\u0FB3\u0F0B\u0F28", "\u0F5F\u0FB3\u0F0B\u0F29", "\u0F5F\u0FB3\u0F0B\u0F21\u0F20", "\u0F5F\u0FB3\u0F0B\u0F21\u0F21", "\u0F5F\u0FB3\u0F0B\u0F21\u0F22"], 
								month_names_narrow : ["\u0F5F\u0FB3\u0F0B\u0F21", "\u0F5F\u0FB3\u0F0B\u0F22", "\u0F5F\u0FB3\u0F0B\u0F23", "\u0F5F\u0FB3\u0F0B\u0F24", "\u0F5F\u0FB3\u0F0B\u0F25", "\u0F5F\u0FB3\u0F0B\u0F26", "\u0F5F\u0FB3\u0F0B\u0F27", "\u0F5F\u0FB3\u0F0B\u0F28", "\u0F5F\u0FB3\u0F0B\u0F29", "\u0F5F\u0FB3\u0F0B\u0F21\u0F20", "\u0F5F\u0FB3\u0F0B\u0F21\u0F21", "\u0F5F\u0FB3\u0F0B\u0F21\u0F22"], 
								ampm : ["\u0F44\u0F66\u0F0B\u0F46", "\u0F55\u0FB1\u0F72\u0F0B\u0F46"], 
								date_format : "\u0F54\u0F66\u0FB1\u0F72\u0F0B\u0F63\u0F7C%y\u0F5F\u0F63%m\u0F5A\u0F7A\u0F66%d", 
								time_format : "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51%   H\u0F40\u0F66\u0F62\u0F0B\u0F58%M\u0F40\u0F66\u0F62\u0F0B\u0F46%S", 
								time_format_ampm : "\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51%I\u0F40\u0F66\u0F62\u0F0B\u0F58%M\u0F40\u0F66\u0F62\u0F0B\u0F46%S %p", 
								date_time_format : "\u0F54\u0F66\u0FB1\u0F72\u0F0B\u0F63\u0F7C%y\u0F5F\u0F63%m\u0F5A\u0F7A\u0F66%d\u0F46\u0F74\u0F0B\u0F5A\u0F7C\u0F51%H\u0F40\u0F66\u0F62\u0F0B\u0F58%M\u0F40\u0F66\u0F62\u0F0B\u0F46%S", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.dz_BT;
					}
					break;
				case "el_CY":
				case "el_cy":
					{

						if (!nexacro.Locale.el_CY) {
							nexacro.Locale.el_CY = {
								name : "el_CY", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0043\u0059\u0050\u0020", 
								currency_symbol : "\u00A3", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 4, 
								frac_digits : 4, 
								p_cs_precedes : 0, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE", "\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1", "\u03A4\u03C1\u03AF\u03C4\u03B7", "\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7", "\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7", "\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE", "\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF"], 
								weekday_names_short : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
								weekday_names_narrow : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
								month_names_long : ["\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2", "\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2", "\u039C\u03AC\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2", "\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2", "\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2"], 
								month_names_short : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
								month_names_narrow : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
								ampm : ["\u03C0\u03BC", "\u03BC\u03BC"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0072", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.el_CY;
					}
					break;
				case "el":
				case "el_GR":
				case "el_gr":
					{

						if (!nexacro.Locale.el_GR) {
							nexacro.Locale.el_GR = {
								name : "el_GR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 4, 
								frac_digits : 4, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u039A\u03C5\u03C1\u03B9\u03B1\u03BA\u03AE", "\u0394\u03B5\u03C5\u03C4\u03AD\u03C1\u03B1", "\u03A4\u03C1\u03AF\u03C4\u03B7", "\u03A4\u03B5\u03C4\u03AC\u03C1\u03C4\u03B7", "\u03A0\u03AD\u03BC\u03C0\u03C4\u03B7", "\u03A0\u03B1\u03C1\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE", "\u03A3\u03AC\u03B2\u03B2\u03B1\u03C4\u03BF"], 
								weekday_names_short : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
								weekday_names_narrow : ["\u039A\u03C5\u03C1", "\u0394\u03B5\u03C5", "\u03A4\u03C1\u03B9", "\u03A4\u03B5\u03C4", "\u03A0\u03B5\u03BC", "\u03A0\u03B1\u03C1", "\u03A3\u03B1\u03B2"], 
								month_names_long : ["\u0399\u03B1\u03BD\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u03A6\u03B5\u03B2\u03C1\u03BF\u03C5\u03AC\u03C1\u03B9\u03BF\u03C2", "\u039C\u03AC\u03C1\u03C4\u03B9\u03BF\u03C2", "\u0391\u03C0\u03C1\u03AF\u03BB\u03B9\u03BF\u03C2", "\u039C\u03AC\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BD\u03B9\u03BF\u03C2", "\u0399\u03BF\u03CD\u03BB\u03B9\u03BF\u03C2", "\u0391\u03CD\u03B3\u03BF\u03C5\u03C3\u03C4\u03BF\u03C2", "\u03A3\u03B5\u03C0\u03C4\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039F\u03BA\u03C4\u03CE\u03B2\u03C1\u03B9\u03BF\u03C2", "\u039D\u03BF\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2", "\u0394\u03B5\u03BA\u03AD\u03BC\u03B2\u03C1\u03B9\u03BF\u03C2"], 
								month_names_short : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
								month_names_narrow : ["\u0399\u03B1\u03BD", "\u03A6\u03B5\u03B2", "\u039C\u03AC\u03C1", "\u0391\u03C0\u03C1", "\u039C\u03AC\u03B9", "\u0399\u03BF\u03CD\u03BD", "\u0399\u03BF\u03CD\u03BB", "\u0391\u03CD\u03B3", "\u03A3\u03B5\u03C0", "\u039F\u03BA\u03C4", "\u039D\u03BF\u03AD", "\u0394\u03B5\u03BA"], 
								ampm : ["\u03C0\u03BC", "\u03BC\u03BC"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0072", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.el_GR;
					}
					break;
				case "en_AU":
				case "en_au":
					{

						if (!nexacro.Locale.en_AU) {
							nexacro.Locale.en_AU = {
								name : "en_AU", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0041\u0055\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_AU;
					}
					break;
				case "en_BW":
				case "en_bw":
					{

						if (!nexacro.Locale.en_BW) {
							nexacro.Locale.en_BW = {
								name : "en_BW", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0042\u0057\u0050\u0020", 
								currency_symbol : "\u0050\u0075", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_BW;
					}
					break;
				case "en_CA":
				case "en_ca":
					{

						if (!nexacro.Locale.en_CA) {
							nexacro.Locale.en_CA = {
								name : "en_CA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0043\u0041\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0072", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0042\u002D\u0025\u0064\u002D\u0025\u0079", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_CA;
					}
					break;
				case "en_DK":
				case "en_dk":
					{

						if (!nexacro.Locale.en_DK) {
							nexacro.Locale.en_DK = {
								name : "en_DK", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0044\u004B\u004B\u0020", 
								currency_symbol : "\u00A4", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064\u0054\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_DK;
					}
					break;
				case "en_GB":
				case "en_gb":
					{

						if (!nexacro.Locale.en_GB) {
							nexacro.Locale.en_GB = {
								name : "en_GB", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0047\u0042\u0050\u0020", 
								currency_symbol : "\u00A3", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_GB;
					}
					break;
				case "en_HK":
				case "en_hk":
					{

						if (!nexacro.Locale.en_HK) {
							nexacro.Locale.en_HK = {
								name : "en_HK", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0048\u004B\u0044\u0020", 
								currency_symbol : "\u0048\u004B\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0070\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0059\u0020\u0025\u0070\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_HK;
					}
					break;
				case "en_IE":
				case "en_ie":
					{

						if (!nexacro.Locale.en_IE) {
							nexacro.Locale.en_IE = {
								name : "en_IE", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_IE;
					}
					break;
				case "en_IN":
				case "en_in":
					{

						if (!nexacro.Locale.en_IN) {
							nexacro.Locale.en_IN = {
								name : "en_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u20A8\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_IN;
					}
					break;
				case "en_NZ":
				case "en_nz":
					{

						if (!nexacro.Locale.en_NZ) {
							nexacro.Locale.en_NZ = {
								name : "en_NZ", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004E\u005A\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "U0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_NZ;
					}
				case "en_PH":
				case "en_ph":
					{

						if (!nexacro.Locale.en_PH) {
							nexacro.Locale.en_PH = {
								name : "en_PH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0050\u0048\u0050\u0020", 
								currency_symbol : "\u0050\u0068\u0070", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_PH;
					}
					break;
				case "en_SG":
				case "en_sg":
					{

						if (!nexacro.Locale.en_SG) {
							nexacro.Locale.en_SG = {
								name : "en_SG", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0053\u0047\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u002C\u0025\u0042\u002C\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u002C\u0025\u0042\u002C\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006E\u002D\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_SG;
					}
					break;
				case "en":
				case "en_US":
				case "en_us":
					{

						if (!nexacro.Locale.en_US) {
							nexacro.Locale.en_US = {
								name : "en_US", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0055\u0053\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0059", 
								time_format : "\u0025\u0072", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_US;
					}
					break;
				case "en_ZA":
				case "en_za":
					{

						if (!nexacro.Locale.en_ZA) {
							nexacro.Locale.en_ZA = {
								name : "en_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_ZA;
					}
					break;
				case "en_ZW":
				case "en_zw":
					{

						if (!nexacro.Locale.en_ZW) {
							nexacro.Locale.en_ZW = {
								name : "en_ZW", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0057\u0044\u0020", 
								currency_symbol : "\u005A\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0053\u0075\u006E\u0064\u0061\u0079", "\u004D\u006F\u006E\u0064\u0061\u0079", "\u0054\u0075\u0065\u0073\u0064\u0061\u0079", "\u0057\u0065\u0064\u006E\u0065\u0073\u0064\u0061\u0079", "\u0054\u0068\u0075\u0072\u0073\u0064\u0061\u0079", "\u0046\u0072\u0069\u0064\u0061\u0079", "\u0053\u0061\u0074\u0075\u0072\u0064\u0061\u0079"], 
								weekday_names_short : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								weekday_names_narrow : ["\u0053\u0075\u006E", "\u004D\u006F\u006E", "\u0054\u0075\u0065", "\u0057\u0065\u0064", "\u0054\u0068\u0075", "\u0046\u0072\u0069", "\u0053\u0061\u0074"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0079", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0079", "\u004D\u0061\u0072\u0063\u0068", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0079", "\u004A\u0075\u006E\u0065", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u0063\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u0063\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.en_ZW;
					}
					break;
				case "es_AR":
				case "es_ar":
					{

						if (!nexacro.Locale.es_AR) {
							nexacro.Locale.es_AR = {
								name : "es_AR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0041\u0052\u0053\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_AR;
					}
					break;
				case "es_BO":
				case "es_bo":
					{

						if (!nexacro.Locale.es_BO) {
							nexacro.Locale.es_BO = {
								name : "es_BO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0042\u004F\u0042\u0020", 
								currency_symbol : "\u0024\u0062", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_BO;
					}
					break;
				case "es_CL":
				case "es_cl":
					{

						if (!nexacro.Locale.es_CL) {
							nexacro.Locale.es_CL = {
								name : "es_CL", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0043\u004C\u0050\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_CL;
					}
					break;
				case "es_CO":
				case "es_co":
					{

						if (!nexacro.Locale.es_CO) {
							nexacro.Locale.es_CO = {
								name : "es_CO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0043\u004F\u0050\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_CO;
					}
					break;
				case "es_CR":
				case "es_cr":
					{

						if (!nexacro.Locale.es_CR) {
							nexacro.Locale.es_CR = {
								name : "es_CR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0043\u0052\u0043\u0020", 
								currency_symbol : "\u20A1", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_CR;
					}
					break;
				case "es_DO":
				case "es_do":
					{

						if (!nexacro.Locale.es_DO) {
							nexacro.Locale.es_DO = {
								name : "es_DO", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0044\u004F\u0050\u0020", 
								currency_symbol : "\u0052\u0044\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_DO;
					}
					break;
				case "es_EC":
				case "es_ec":
					{

						if (!nexacro.Locale.es_EC) {
							nexacro.Locale.es_EC = {
								name : "es_EC", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0055\u0053\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_EC;
					}
					break;
				case "es":
				case "es_ES":
				case "es_es":
					{

						if (!nexacro.Locale.es_ES) {
							nexacro.Locale.es_ES = {
								name : "es_ES", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_ES;
					}
					break;
				case "es_GT":
				case "es_gt":
					{

						if (!nexacro.Locale.es_GT) {
							nexacro.Locale.es_GT = {
								name : "es_GT", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0047\u0054\u0051\u0020", 
								currency_symbol : "\u0051", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_GT;
					}
					break;
				case "es_HN":
				case "es_hn":
					{

						if (!nexacro.Locale.es_HN) {
							nexacro.Locale.es_HN = {
								name : "es_HN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0048\u004E\u004C\u0020", 
								currency_symbol : "\u004C\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 999], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_HN;
					}
					break;
				case "es_MX":
				case "es_mx":
					{

						if (!nexacro.Locale.es_MX) {
							nexacro.Locale.es_MX = {
								name : "es_MX", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u004D\u0058\u004E\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_MX;
					}
					break;
				case "es_NI":
				case "es_ni":
					{

						if (!nexacro.Locale.es_NI) {
							nexacro.Locale.es_NI = {
								name : "es_NI", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u004E\u0049\u004F\u0020", 
								currency_symbol : "\u0024\u0043", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_NI;
					}
					break;
				case "es_PA":
				case "es_pa":
					{

						if (!nexacro.Locale.es_PA) {
							nexacro.Locale.es_PA = {
								name : "es_PA", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0050\u0041\u0042\u0020", 
								currency_symbol : "\u0042\u002F", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_PA;
					}
					break;
				case "es_PE":
				case "es_pe":
					{

						if (!nexacro.Locale.es_PE) {
							nexacro.Locale.es_PE = {
								name : "es_PE", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0050\u0045\u004E\u0020", 
								currency_symbol : "\u0053\u002F\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_PE;
					}
					break;
				case "es_PR":
				case "es_pr":
					{

						if (!nexacro.Locale.es_PR) {
							nexacro.Locale.es_PR = {
								name : "es_PR", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0055\u0053\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 999], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_PR;
					}
					break;
				case "es_PY":
				case "es_py":
					{

						if (!nexacro.Locale.es_PY) {
							nexacro.Locale.es_PY = {
								name : "es_PY", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0050\u0059\u0047\u0020", 
								currency_symbol : "\u0047\u0073", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_PY;
					}
					break;
				case "es_SV":
				case "es_sv":
					{

						if (!nexacro.Locale.es_SV) {
							nexacro.Locale.es_SV = {
								name : "es_SV", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0053\u0056\u0043\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 999], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_SV;
					}
					break;
				case "es_US":
				case "es_us":
					{

						if (!nexacro.Locale.es_US) {
							nexacro.Locale.es_US = {
								name : "es_US", 
								name : "es_US", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 999], 
								int_curr_symbol : "\u0055\u0053\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_US;
					}
					break;
				case "es_UY":
				case "es_uy":
					{

						if (!nexacro.Locale.es_UY) {
							nexacro.Locale.es_UY = {
								name : "es_UY", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0055\u0059\u0055\u0020", 
								currency_symbol : "\u0024\u0055", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_UY;
					}
					break;
				case "es_VE":
				case "es_ve":
					{

						if (!nexacro.Locale.es_VE) {
							nexacro.Locale.es_VE = {
								name : "es_VE", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0056\u0045\u0042\u0020", 
								currency_symbol : "\u0042\u0073\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u006C\u0075\u006E\u0065\u0073", "\u006D\u0061\u0072\u0074\u0065\u0073", "\u006D\u0069\u00E9\u0072\u0063\u006F\u006C\u0065\u0073", "\u006A\u0075\u0065\u0076\u0065\u0073", "\u0076\u0069\u0065\u0072\u006E\u0065\u0073", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0069\u00E9", "\u006A\u0075\u0065", "\u0076\u0069\u0065", "\u0073\u00E1\u0062"], 
								month_names_long : ["\u0065\u006E\u0065\u0072\u006F", "\u0066\u0065\u0062\u0072\u0065\u0072\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0079\u006F", "\u006A\u0075\u006E\u0069\u006F", "\u006A\u0075\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0070\u0074\u0069\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u0075\u0062\u0072\u0065", "\u006E\u006F\u0076\u0069\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0069\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0065\u006E\u0065", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0079", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u006F", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.es_VE;
					}
					break;
				case "et":
				case "et_EE":
				case "et_ee":
					{

						if (!nexacro.Locale.et_EE) {
							nexacro.Locale.et_EE = {
								name : "et_EE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u00A0", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0045\u004B\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0070\u00FC\u0068\u0061\u0070\u00E4\u0065\u0076", "\u0065\u0073\u006D\u0061\u0073\u0070\u00E4\u0065\u0076", "\u0074\u0065\u0069\u0073\u0069\u0070\u00E4\u0065\u0076", "\u006B\u006F\u006C\u006D\u0061\u0070\u00E4\u0065\u0076", "\u006E\u0065\u006C\u006A\u0061\u0070\u00E4\u0065\u0076", "\u0072\u0065\u0065\u0064\u0065", "\u006C\u0061\u0075\u0070\u00E4\u0065\u0076"], 
								weekday_names_short : ["\u0050", "\u0045", "\u0054", "\u004B", "\u004E", "\u0052", "\u004C"], 
								weekday_names_narrow : ["\u0050", "\u0045", "\u0054", "\u004B", "\u004E", "\u0052", "\u004C"], 
								month_names_long : ["\u006A\u0061\u0061\u006E\u0075\u0061\u0072", "\u0076\u0065\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u00E4\u0072\u0074\u0073", "\u0061\u0070\u0072\u0069\u006C\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0075\u006E\u0069", "\u006A\u0075\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0074\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u0061\u006E\u0020", "\u0076\u0065\u0065\u0062\u0072", "\u006D\u00E4\u0072\u0074\u0073", "\u0061\u0070\u0072\u0020\u0020", "\u006D\u0061\u0069\u0020\u0020", "\u006A\u0075\u0075\u006E\u0069", "\u006A\u0075\u0075\u006C\u0069", "\u0061\u0075\u0067\u0020\u0020", "\u0073\u0065\u0070\u0074\u0020", "\u006F\u006B\u0074\u0020\u0020", "\u006E\u006F\u0076\u0020\u0020", "\u0064\u0065\u0074\u0073\u0020"], 
								month_names_narrow : ["\u006A\u0061\u0061\u006E\u0020", "\u0076\u0065\u0065\u0062\u0072", "\u006D\u00E4\u0072\u0074\u0073", "\u0061\u0070\u0072\u0020\u0020", "\u006D\u0061\u0069\u0020\u0020", "\u006A\u0075\u0075\u006E\u0069", "\u006A\u0075\u0075\u006C\u0069", "\u0061\u0075\u0067\u0020\u0020", "\u0073\u0065\u0070\u0074\u0020", "\u006F\u006B\u0074\u0020\u0020", "\u006E\u006F\u0076\u0020\u0020", "\u0064\u0065\u0074\u0073\u0020"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E\u0020\u0020\\\u0061\u002E", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.et_EE;
					}
					break;
				case "eu":
				case "eu_ES":
				case "eu_es":
					{

						if (!nexacro.Locale.eu_ES) {
							nexacro.Locale.eu_ES = {
								name : "eu_ES", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0069\u0067\u0061\u006E\u0064\u0065\u0061", "\u0061\u0073\u0074\u0065\u006C\u0065\u0068\u0065\u006E\u0061", "\u0061\u0073\u0074\u0065\u0061\u0072\u0074\u0065\u0061", "\u0061\u0073\u0074\u0065\u0061\u007A\u006B\u0065\u006E\u0061", "\u006F\u0073\u0074\u0065\u0067\u0075\u006E\u0061", "\u006F\u0073\u0074\u0069\u0072\u0061\u006C\u0061", "\u006C\u0061\u0072\u0075\u006E\u0062\u0061\u0074\u0061"], 
								weekday_names_short : ["\u0069\u0067\u002E", "\u0061\u006C\u002E", "\u0061\u0072\u002E", "\u0061\u007A\u002E", "\u006F\u0067\u002E", "\u006F\u0072\u002E", "\u006C\u0072\u002E"], 
								weekday_names_narrow : ["\u0069\u0067\u002E", "\u0061\u006C\u002E", "\u0061\u0072\u002E", "\u0061\u007A\u002E", "\u006F\u0067\u002E", "\u006F\u0072\u002E", "\u006C\u0072\u002E"], 
								month_names_long : ["\u0075\u0072\u0074\u0061\u0072\u0072\u0069\u006C\u0061", "\u006F\u0074\u0073\u0061\u0069\u006C\u0061", "\u006D\u0061\u0072\u0074\u0078\u006F\u0061", "\u0061\u0070\u0069\u0072\u0069\u006C\u0061", "\u006D\u0061\u0069\u0061\u0074\u007A\u0061", "\u0065\u006B\u0061\u0069\u006E\u0061", "\u0075\u007A\u0074\u0061\u0069\u006C\u0061", "\u0061\u0062\u0075\u007A\u0074\u0075\u0061", "\u0069\u0072\u0061\u0069\u006C\u0061", "\u0075\u0072\u0072\u0069\u0061", "\u0061\u007A\u0061\u0072\u006F\u0061", "\u0061\u0062\u0065\u006E\u0064\u0075\u0061"], 
								month_names_short : ["\u0075\u0072\u0074", "\u006F\u0074\u0073", "\u006D\u0061\u0072", "\u0061\u0070\u0069", "\u006D\u0061\u0069", "\u0065\u006B\u0061", "\u0075\u007A\u0074", "\u0061\u0062\u0075", "\u0069\u0072\u0061", "\u0075\u0072\u0072", "\u0061\u007A\u0061", "\u0061\u0062\u0065"], 
								month_names_narrow : ["\u0075\u0072\u0074", "\u006F\u0074\u0073", "\u006D\u0061\u0072", "\u0061\u0070\u0069", "\u006D\u0061\u0069", "\u0065\u006B\u0061", "\u0075\u007A\u0074", "\u0061\u0062\u0075", "\u0069\u0072\u0061", "\u0075\u0072\u0072", "\u0061\u007A\u0061", "\u0061\u0062\u0065"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0061\u002C\u0020\u0025\u0059\u002E\u0065\u006B\u006F\u0020\u0025\u0062\u0072\u0065\u006E\u0020\u0025\u0064\u0061", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0079\u002D\u0025\u006D\u002D\u0025\u0064\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0059\u002E\u0065\u006B\u006F\u0020\u0025\u0042\u0020\u0025\u0065", 
								shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.eu_ES;
					}
					break;
				case "fa":
				case "fa_IR":
				case "fa_ir":
					{

						if (!nexacro.Locale.fa_IR) {
							nexacro.Locale.fa_IR = {
								name : "fa_IR", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0049\u0052\u0052\u0020", 
								currency_symbol : "\u0631\u06CC\u0627\u0644", 
								mon_decimal_point : "\u066B", 
								mon_thousands_sep : "\u066C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 0, 
								frac_digits : 0, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u06CC\u06A9\u0634\u0646\u0628\u0647", "\u062F\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647\u200C\u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067E\u0646\u062C\u0634\u0646\u0628\u0647", "\u062C\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647"], 
								weekday_names_short : ["\u06CC\u06A9\u0634\u0646\u0628\u0647", "\u062F\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647\u200C\u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067E\u0646\u062C\u0634\u0646\u0628\u0647", "\u062C\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647"], 
								weekday_names_narrow : ["\u06CC\u06A9\u0634\u0646\u0628\u0647", "\u062F\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647\u200C\u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067E\u0646\u062C\u0634\u0646\u0628\u0647", "\u062C\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647"], 
								month_names_long : ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u0647", "\u0698\u0648\u0626\u0646", "\u0698\u0648\u0626\u06CC\u0647", "\u0627\u0648\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u0643\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"], 
								month_names_short : ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u0647", "\u0698\u0648\u0626\u0646", "\u0698\u0648\u0626\u06CC\u0647", "\u0627\u0648\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u0643\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"], 
								month_names_narrow : ["\u0698\u0627\u0646\u0648\u06CC\u0647", "\u0641\u0648\u0631\u06CC\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06CC\u0644", "\u0645\u0647", "\u0698\u0648\u0626\u0646", "\u0698\u0648\u0626\u06CC\u0647", "\u0627\u0648\u062A", "\u0633\u067E\u062A\u0627\u0645\u0628\u0631", "\u0627\u0643\u062A\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062F\u0633\u0627\u0645\u0628\u0631"], 
								ampm : ["", ""], 
								date_format : "\u0025\u004F\u0079\u002F\u0025\u004F\u006D\u002F\u0025\u004F\u0064", 
								time_format : "\u0025\u004F\u0048\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053", 
								time_format_ampm : "", 
								date_time_format : "\u202B\u0025\u0041\u0020\u0025\u004F\u0065\u0020\u0025\u0042\u0020\u0025\u004F\u0079\u060C\u0020\u0025\u004F\u0048\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u202C", 
								full_date_time_format : "\u202B\u0025\u0041\u0020\u0025\u004F\u0065\u0020\u0025\u0042\u0020\u0025\u004F\u0079\u060C\u0020\u0633\u0627\u0639\u062A\u0020\u0025\u004F\u0048\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0028\u0025\u005A\u0029\u202C", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.fa_IR;
					}
					break;
				case "fi":
				case "fi_FI":
				case "fi_fi":
					{

						if (!nexacro.Locale.fi_FI) {
							nexacro.Locale.fi_FI = {
								name : "fi_FI", 
								decimal_point : "\u002C", 
								thousands_sep : "\u00A0", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 2, 
								n_cs_precedes : 0, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0073\u0075\u006E\u006E\u0075\u006E\u0074\u0061\u0069", "\u006D\u0061\u0061\u006E\u0061\u006E\u0074\u0061\u0069", "\u0074\u0069\u0069\u0073\u0074\u0061\u0069", "\u006B\u0065\u0073\u006B\u0069\u0076\u0069\u0069\u006B\u006B\u006F", "\u0074\u006F\u0072\u0073\u0074\u0061\u0069", "\u0070\u0065\u0072\u006A\u0061\u006E\u0074\u0061\u0069", "\u006C\u0061\u0075\u0061\u006E\u0074\u0061\u0069"], 
								weekday_names_short : ["\u0073\u0075", "\u006D\u0061", "\u0074\u0069", "\u006B\u0065", "\u0074\u006F", "\u0070\u0065", "\u006C\u0061"], 
								weekday_names_narrow : ["\u0073\u0075", "\u006D\u0061", "\u0074\u0069", "\u006B\u0065", "\u0074\u006F", "\u0070\u0065", "\u006C\u0061"], 
								month_names_long : ["\u0074\u0061\u006D\u006D\u0069\u006B\u0075\u0075", "\u0068\u0065\u006C\u006D\u0069\u006B\u0075\u0075", "\u006D\u0061\u0061\u006C\u0069\u0073\u006B\u0075\u0075", "\u0068\u0075\u0068\u0074\u0069\u006B\u0075\u0075", "\u0074\u006F\u0075\u006B\u006F\u006B\u0075\u0075", "\u006B\u0065\u0073\u00E4\u006B\u0075\u0075", "\u0068\u0065\u0069\u006E\u00E4\u006B\u0075\u0075", "\u0065\u006C\u006F\u006B\u0075\u0075", "\u0073\u0079\u0079\u0073\u006B\u0075\u0075", "\u006C\u006F\u006B\u0061\u006B\u0075\u0075", "\u006D\u0061\u0072\u0072\u0061\u0073\u006B\u0075\u0075", "\u006A\u006F\u0075\u006C\u0075\u006B\u0075\u0075"], 
								month_names_short : ["\u0074\u0061\u006D\u006D\u0069\u00A0", "\u0068\u0065\u006C\u006D\u0069\u00A0", "\u006D\u0061\u0061\u006C\u0069\u0073", "\u0068\u0075\u0068\u0074\u0069\u00A0", "\u0074\u006F\u0075\u006B\u006F\u00A0", "\u006B\u0065\u0073\u00E4\u00A0\u00A0", "\u0068\u0065\u0069\u006E\u00E4\u00A0", "\u0065\u006C\u006F\u00A0\u00A0\u00A0", "\u0073\u0079\u0079\u0073\u00A0\u00A0", "\u006C\u006F\u006B\u0061\u00A0\u00A0", "\u006D\u0061\u0072\u0072\u0061\u0073", "\u006A\u006F\u0075\u006C\u0075\u00A0"], 
								month_names_narrow : ["\u0074\u0061\u006D\u006D\u0069\u00A0", "\u0068\u0065\u006C\u006D\u0069\u00A0", "\u006D\u0061\u0061\u006C\u0069\u0073", "\u0068\u0075\u0068\u0074\u0069\u00A0", "\u0074\u006F\u0075\u006B\u006F\u00A0", "\u006B\u0065\u0073\u00E4\u00A0\u00A0", "\u0068\u0065\u0069\u006E\u00E4\u00A0", "\u0065\u006C\u006F\u00A0\u00A0\u00A0", "\u0073\u0079\u0079\u0073\u00A0\u00A0", "\u006C\u006F\u006B\u0061\u00A0\u00A0", "\u006D\u0061\u0072\u0072\u0061\u0073", "\u006A\u006F\u0075\u006C\u0075\u00A0"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0065\u002E\u0020\u0025\u0042\u0074\u0061\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0064\u002E\u0025\u002D\u006D\u002E\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u007A", 
								first_weekday : 1, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fi_FI;
					}
					break;
				case "fo":
				case "fo_FO":
				case "fo_fo":
					{

						if (!nexacro.Locale.fo_FO) {
							nexacro.Locale.fo_FO = {
								name : "fo_FO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0044\u004B\u004B\u0020", 
								currency_symbol : "\u006B\u0072\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 2, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u0075\u006E\u006E\u0075\u0064\u0061\u0067\u0075\u0072", "\u006D\u00E1\u006E\u0061\u0064\u0061\u0067\u0075\u0072", "\u0074\u00FD\u0073\u0064\u0061\u0067\u0075\u0072", "\u006D\u0069\u006B\u0075\u0064\u0061\u0067\u0075\u0072", "\u0068\u00F3\u0073\u0064\u0061\u0067\u0075\u0072", "\u0066\u0072\u00ED\u0067\u0067\u006A\u0061\u0064\u0061\u0067\u0075\u0072", "\u006C\u0065\u0079\u0067\u0061\u0072\u0064\u0061\u0067\u0075\u0072"], 
								weekday_names_short : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u0074\u00FD\u0073", "\u006D\u0069\u006B", "\u0068\u00F3\u0073", "\u0066\u0072\u00ED", "\u006C\u0065\u0079"], 
								weekday_names_narrow : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u0074\u00FD\u0073", "\u006D\u0069\u006B", "\u0068\u00F3\u0073", "\u0066\u0072\u00ED", "\u006C\u0065\u0079"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u00ED\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fo_FO;
					}
					break;
				case "fr_BE":
				case "fr_be":
					{

						if (!nexacro.Locale.fr_BE) {
							nexacro.Locale.fr_BE = {
								name : "fr_BE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fr_BE;
					}
					break;
				case "fr_CA":
				case "fr_ca":
					{

						if (!nexacro.Locale.fr_CA) {
							nexacro.Locale.fr_CA = {
								name : "fr_CA", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0043\u0041\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fr_CA;
					}
					break;
				case "fr_CH":
				case "fr_ch":
					{

						if (!nexacro.Locale.fr_CH) {
							nexacro.Locale.fr_CH = {
								name : "fr_CH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u0027", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0043\u0048\u0046\u0020", 
								currency_symbol : "\u0066\u0072\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0027", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fr_CH;
					}
					break;
				case "fr":
				case "fr_FR":
				case "fr_fr":
					{

						if (!nexacro.Locale.fr_FR) {
							nexacro.Locale.fr_FR = {
								name : "fr_FR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fr_FR;
					}
					break;
				case "fr_LU":
				case "fr_lu":
					{

						if (!nexacro.Locale.fr_LU) {
							nexacro.Locale.fr_LU = {
								name : "fr_LU", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u006D\u0061\u006E\u0063\u0068\u0065", "\u006C\u0075\u006E\u0064\u0069", "\u006D\u0061\u0072\u0064\u0069", "\u006D\u0065\u0072\u0063\u0072\u0065\u0064\u0069", "\u006A\u0065\u0075\u0064\u0069", "\u0076\u0065\u006E\u0064\u0072\u0065\u0064\u0069", "\u0073\u0061\u006D\u0065\u0064\u0069"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006A\u0065\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u006D"], 
								month_names_long : ["\u006A\u0061\u006E\u0076\u0069\u0065\u0072", "\u0066\u00E9\u0076\u0072\u0069\u0065\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0076\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u0069\u006E", "\u006A\u0075\u0069\u006C\u006C\u0065\u0074", "\u0061\u006F\u00FB\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u00E9\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u00E9\u0076", "\u006D\u0061\u0072", "\u0061\u0076\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u0069", "\u0061\u006F\u00FB", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u00E9\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fr_LU;
					}
					break;
				case "fy":
				case "fy_NL":
				case "fy_nl":
					{

						if (!nexacro.Locale.fy_NL) {
							nexacro.Locale.fy_NL = {
								name : "fy_NL", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u0053\u006E\u0065\u0069\u006E", "\u004D\u006F\u0061\u006E\u0064\u0065\u0069", "\u0054\u0069\u0069\u0073\u0064\u0065\u0069", "\u0057\u006F\u0061\u006E\u0073\u0064\u0065\u0069", "\u0054\u006F\u006E\u0067\u0065\u0072\u0073\u0064\u0065\u0069", "\u0046\u0072\u0065\u0065\u0064", "\u0053\u006E\u0065\u006F\u006E"], 
								weekday_names_short : ["\u0053\u006E", "\u004D\u006F", "\u0054\u0069", "\u0057\u006F", "\u0054\u006F", "\u0046\u0072", "\u0053\u006E"], 
								weekday_names_narrow : ["\u0053\u006E", "\u004D\u006F", "\u0054\u0069", "\u0057\u006F", "\u0054\u006F", "\u0046\u0072", "\u0053\u006E"], 
								month_names_long : ["\u004A\u0061\u006E\u0061\u0072\u0069\u0073", "\u0046\u0065\u0062\u0072\u0065\u0077\u0061\u0072\u0069\u0073", "\u004D\u0061\u0061\u0072\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0061\u0061\u0069\u0065", "\u004A\u0075\u006E\u0079", "\u004A\u0075\u006C\u0079", "\u0041\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0053\u0065\u0070\u0074\u0069\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0069\u006D\u0062\u0065\u0072", "\u0044\u0065\u0073\u0069\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0061", "\u0041\u0070\u0072", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0061", "\u0041\u0070\u0072", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0075\u0067", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.fy_NL;
					}
					break;
				case "ga":
				case "ga_IE":
				case "ga_ie":
					{

						if (!nexacro.Locale.ga_IE) {
							nexacro.Locale.ga_IE = {
								name : "ga_IE", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0044\u00E9\u0020\u0044\u006F\u006D\u0068\u006E\u0061\u0069\u0067\u0068", "\u0044\u00E9\u0020\u004C\u0075\u0061\u0069\u006E", "\u0044\u00E9\u0020\u004D\u00E1\u0069\u0072\u0074", "\u0044\u00E9\u0020\u0043\u00E9\u0061\u0064\u0061\u006F\u0069\u006E", "\u0044\u00E9\u0061\u0072\u0064\u0061\u006F\u0069\u006E", "\u0044\u00E9\u0020\u0068\u0041\u006F\u0069\u006E\u0065", "\u0044\u00E9\u0020\u0053\u0061\u0074\u0068\u0061\u0069\u0072\u006E"], 
								weekday_names_short : ["\u0044\u006F\u006D\u0068", "\u004C\u0075\u0061\u006E", "\u004D\u00E1\u0069\u0072\u0074", "\u0043\u00E9\u0061\u0064", "\u0044\u00E9\u0061\u0072", "\u0041\u006F\u0069\u006E\u0065", "\u0053\u0061\u0074\u0068"], 
								weekday_names_narrow : ["\u0044\u006F\u006D\u0068", "\u004C\u0075\u0061\u006E", "\u004D\u00E1\u0069\u0072\u0074", "\u0043\u00E9\u0061\u0064", "\u0044\u00E9\u0061\u0072", "\u0041\u006F\u0069\u006E\u0065", "\u0053\u0061\u0074\u0068"], 
								month_names_long : ["\u0045\u0061\u006E\u00E1\u0069\u0072", "\u0046\u0065\u0061\u0062\u0068\u0072\u0061", "\u004D\u00E1\u0072\u0074\u0061", "\u0041\u0069\u0062\u0072\u0065\u00E1\u006E", "\u004D\u00ED\u0020\u006E\u0061\u0020\u0042\u0065\u0061\u006C\u0074\u0061\u0069\u006E\u0065", "\u004D\u0065\u0069\u0074\u0068", "\u0049\u00FA\u0069\u006C", "\u004C\u00FA\u006E\u0061\u0073\u0061", "\u004D\u0065\u00E1\u006E\u0020\u0046\u00F3\u006D\u0068\u0061\u0069\u0072", "\u0044\u0065\u0069\u0072\u0065\u0061\u0064\u0068\u0020\u0046\u00F3\u006D\u0068\u0061\u0069\u0072", "\u004D\u00ED\u0020\u006E\u0061\u0020\u0053\u0061\u006D\u0068\u006E\u0061", "\u004D\u00ED\u0020\u006E\u0061\u0020\u004E\u006F\u006C\u006C\u0061\u0067"], 
								month_names_short : ["\u0045\u0061\u006E", "\u0046\u0065\u0061\u0062\u0068", "\u004D\u00E1\u0072\u0074\u0061", "\u0041\u0069\u0062", "\u0042\u0065\u0061\u006C", "\u004D\u0065\u0069\u0074\u0068", "\u0049\u00FA\u0069\u006C", "\u004C\u00FA\u006E", "\u004D\u0046\u00F3\u006D\u0068", "\u0044\u0046\u00F3\u006D\u0068", "\u0053\u0061\u006D\u0068", "\u004E\u006F\u006C\u006C"], 
								month_names_narrow : ["\u0045\u0061\u006E", "\u0046\u0065\u0061\u0062\u0068", "\u004D\u00E1\u0072\u0074\u0061", "\u0041\u0069\u0062", "\u0042\u0065\u0061\u006C", "\u004D\u0065\u0069\u0074\u0068", "\u0049\u00FA\u0069\u006C", "\u004C\u00FA\u006E", "\u004D\u0046\u00F3\u006D\u0068", "\u0044\u0046\u00F3\u006D\u0068", "\u0053\u0061\u006D\u0068", "\u004E\u006F\u006C\u006C"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ga_IE;
					}
					break;
				case "gd":
				case "gd_GB":
				case "gd_gb":
					{

						if (!nexacro.Locale.gd_GB) {
							nexacro.Locale.gd_GB = {
								name : "gd_GB", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0047\u0042\u0050\u0020", 
								currency_symbol : "\u00A3", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0044\u0069\u0064\u00F2\u006D\u0068\u006E\u0061\u0069\u0063\u0068", "\u0044\u0069\u006C\u0075\u0061\u0069\u006E", "\u0044\u0069\u006D\u00E0\u0069\u0072\u0074", "\u0044\u0069\u0063\u0069\u0061\u0064\u0061\u0069\u006E", "\u0044\u0069\u0061\u0072\u0064\u0061\u006F\u0069\u006E", "\u0044\u0069\u0068\u0061\u006F\u0069\u006E\u0065", "\u0044\u0069\u0073\u0061\u0074\u0068\u0061\u0069\u0072\u006E\u0065"], 
								weekday_names_short : ["\u0044\u0069\u0064\u006F", "\u0044\u0069\u006C\u0075", "\u0044\u0069\u006D", "\u0044\u0069\u0063", "\u0044\u0069\u0061\u0072", "\u0044\u0069\u0068\u0061", "\u0044\u0069\u0073\u0061"], 
								weekday_names_narrow : ["\u0044\u0069\u0064\u006F", "\u0044\u0069\u006C\u0075", "\u0044\u0069\u006D", "\u0044\u0069\u0063", "\u0044\u0069\u0061\u0072", "\u0044\u0069\u0068\u0061", "\u0044\u0069\u0073\u0061"], 
								month_names_long : ["\u0041\u006D\u0020\u0046\u0061\u006F\u0069\u006C\u0074\u0065\u0061\u0063\u0068", "\u0041\u006E\u0020\u0047\u0065\u0061\u0072\u0072\u0061\u006E", "\u0041\u006D\u0020\u004D\u00E0\u0072\u0074", "\u0041\u006E\u0020\u0047\u0069\u0062\u006C\u0065\u0061\u006E", "\u0041\u0027\u0020\u004D\u0068\u00E0\u0069\u0067\u0068", "\u0041\u006E\u0020\u0074\u002D\u004D\u0068\u00EC\u006F\u0073", "\u0041\u006E\u0020\u0074\u002D\u006C\u0075\u0063\u0068\u0061\u0072", "\u0041\u006E\u0020\u004C\u00F9\u006E\u0061\u0073\u0064\u0061\u006C", "\u0041\u006E\u0020\u0074\u002D\u0053\u0075\u006C\u0074\u0061\u0069\u006E", "\u0041\u006E\u0020\u0044\u0061\u006D\u0068\u0061\u0069\u0072", "\u0041\u006E\u0020\u0074\u002D\u0053\u0061\u006D\u0068\u0061\u0069\u006E", "\u0041\u006E\u0020\u0044\u00F9\u0062\u0068\u006C\u0061\u0063\u0068\u0064"], 
								month_names_short : ["\u0046\u0061\u006F", "\u0047\u0065\u0061", "\u004D\u00E0\u0072", "\u0047\u0069\u0062", "\u004D\u0068\u00E0", "\u004F\u0067\u004D", "\u006C\u0075\u0063", "\u004C\u00F9\u006E", "\u0053\u0075\u006C", "\u0044\u0061\u006D", "\u0053\u0061\u006D", "\u0044\u00F9\u0062"], 
								month_names_narrow : ["\u0046\u0061\u006F", "\u0047\u0065\u0061", "\u004D\u00E0\u0072", "\u0047\u0069\u0062", "\u004D\u0068\u00E0", "\u004F\u0067\u004D", "\u006C\u0075\u0063", "\u004C\u00F9\u006E", "\u0053\u0075\u006C", "\u0044\u0061\u006D", "\u0053\u0061\u006D", "\u0044\u00F9\u0062"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.gd_GB;
					}
					break;
				case "gl":
				case "gl_ES":
				case "gl_es":
					{

						if (!nexacro.Locale.gl_ES) {
							nexacro.Locale.gl_ES = {
								name : "gl_ES", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0044\u006F\u006D\u0069\u006E\u0067\u006F", "\u004C\u0075\u006E\u0073", "\u004D\u0061\u0072\u0074\u0065\u0073", "\u004D\u00E9\u0072\u0063\u006F\u0072\u0065\u0073", "\u0058\u006F\u0076\u0065\u0073", "\u0056\u0065\u006E\u0072\u0065\u0073", "\u0053\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0044\u006F\u006D", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u00E9\u0072", "\u0058\u006F\u0076", "\u0056\u0065\u006E", "\u0053\u00E1\u0062"], 
								weekday_names_narrow : ["\u0044\u006F\u006D", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u00E9\u0072", "\u0058\u006F\u0076", "\u0056\u0065\u006E", "\u0053\u00E1\u0062"], 
								month_names_long : ["\u0058\u0061\u006E\u0065\u0069\u0072\u006F", "\u0046\u0065\u0062\u0072\u0065\u0069\u0072\u006F", "\u004D\u0061\u0072\u007A\u006F", "\u0041\u0062\u0072\u0069\u006C", "\u004D\u0061\u0069\u006F", "\u0058\u0075\u00F1\u006F", "\u0058\u0075\u006C\u006C\u006F", "\u0041\u0067\u006F\u0073\u0074\u006F", "\u0053\u0065\u0074\u0065\u006D\u0062\u0072\u006F", "\u004F\u0075\u0074\u0075\u0062\u0072\u006F", "\u004E\u006F\u0076\u0065\u006D\u0062\u0072\u006F", "\u0044\u0065\u0063\u0065\u006D\u0062\u0072\u006F"], 
								month_names_short : ["\u0058\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u0058\u0075\u00F1", "\u0058\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								month_names_narrow : ["\u0058\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u0058\u0075\u00F1", "\u0058\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.gl_ES;
					}
					break;
				case "gu":
				case "gu_IN":
				case "gu_in":
					{

						if (!nexacro.Locale.gu_IN) {
							nexacro.Locale.gu_IN = {
								name : "gu_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0AB0\u0AC2", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0AB0\u0AB5\u0ABF\u0AB5\u0ABE\u0AB0", "\u0AB8\u0ACB\u0AAE\u0AB5\u0ABE\u0AB0", "\u0AAE\u0A82\u0A97\u0AB3\u0AB5\u0ABE\u0AB0", "\u0AAC\u0AC1\u0AA7\u0AB5\u0ABE\u0AB0", "\u0A97\u0AC1\u0AB0\u0AC1\u0AB5\u0ABE\u0AB0", "\u0AB6\u0AC1\u0A95\u0ACD\u0AB0\u0AB5\u0ABE\u0AB0", "\u0AB6\u0AA8\u0ABF\u0AB5\u0ABE\u0AB0"], 
								weekday_names_short : ["\u0AB0\u0AB5\u0ABF", "\u0AB8\u0ACB\u0AAE", "\u0AAE\u0A82\u0A97\u0AB3", "\u0AAC\u0AC1\u0AA7", "\u0A97\u0AC1\u0AB0\u0AC1", "\u0AB6\u0AC1\u0A95\u0ACD\u0AB0", "\u0AB6\u0AA8\u0ABF"], 
								weekday_names_narrow : ["\u0AB0\u0AB5\u0ABF", "\u0AB8\u0ACB\u0AAE", "\u0AAE\u0A82\u0A97\u0AB3", "\u0AAC\u0AC1\u0AA7", "\u0A97\u0AC1\u0AB0\u0AC1", "\u0AB6\u0AC1\u0A95\u0ACD\u0AB0", "\u0AB6\u0AA8\u0ABF"], 
								month_names_long : ["\u0A9C\u0ABE\u0AA8\u0ACD\u0AAF\u0AC1\u0A86\u0AB0\u0AC0", "\u0AAB\u0AC7\u0AAC\u0ACD\u0AB0\u0AC1\u0A86\u0AB0\u0AC0", "\u0AAE\u0ABE\u0AB0\u0ACD\u0A9A", "\u0A8F\u0AAA\u0ACD\u0AB0\u0ABF\u0AB2", "\u0AAE\u0AC7", "\u0A9C\u0AC1\u0AA8", "\u0A9C\u0AC1\u0AB2\u0ABE\u0A87", "\u0A93\u0A97\u0AB8\u0ACD\u0A9F", "\u0AB8\u0AAA\u0ACD\u0A9F\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0", "\u0A93\u0A95\u0ACD\u0A9F\u0ACB\u0AAC\u0AB0", "\u0AA8\u0AB5\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0", "\u0AA1\u0ABF\u0AB8\u0AC7\u0AAE\u0ACD\u0AAC\u0AB0"], 
								month_names_short : ["\u0A9C\u0ABE\u0AA8", "\u0AAB\u0AC7\u0AAC", "\u0AAE\u0ABE\u0AB0", "\u0A8F\u0AAA\u0ACD\u0AB0", "\u0AAE\u0AC7", "\u0A9C\u0AC1\u0AA8", "\u0A9C\u0AC1\u0AB2", "\u0A93\u0A97", "\u0AB8\u0AAA\u0ACD\u0A9F", "\u0A93\u0A95\u0ACD\u0A9F", "\u0AA8\u0ACB\u0AB5", "\u0AA1\u0ABF\u0AB8"], 
								month_names_narrow : ["\u0A9C\u0ABE\u0AA8", "\u0AAB\u0AC7\u0AAC", "\u0AAE\u0ABE\u0AB0", "\u0A8F\u0AAA\u0ACD\u0AB0", "\u0AAE\u0AC7", "\u0A9C\u0AC1\u0AA8", "\u0A9C\u0AC1\u0AB2", "\u0A93\u0A97", "\u0AB8\u0AAA\u0ACD\u0A9F", "\u0A93\u0A95\u0ACD\u0A9F", "\u0AA8\u0ACB\u0AB5", "\u0AA1\u0ABF\u0AB8"], 
								ampm : ["\u0AB8\u0AB5\u0ABE\u0AB0\u0AC7", "\u0AB8\u0ABE\u0A82\u0A9C\u0AC7"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.gu_IN;
					}
					break;
				case "gv":
				case "gv_GB":
				case "gv_gb":
					{

						if (!nexacro.Locale.gv_GB) {
							nexacro.Locale.gv_GB = {
								name : "gv_GB", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0047\u0042\u0050\u0020", 
								currency_symbol : "\u00A3", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004A\u0065\u0064\u006F\u006F\u006E\u0065\u0065", "\u004A\u0065\u006C\u0068\u0065\u0069\u006E", "\u004A\u0065\u006D\u0061\u0079\u0072\u0074", "\u004A\u0065\u0072\u0063\u0065\u0061\u006E", "\u004A\u0065\u0072\u0064\u0065\u0069\u006E", "\u004A\u0065\u0068\u0065\u0069\u006E\u0065\u0079", "\u004A\u0065\u0073\u0061\u0072\u006E"], 
								weekday_names_short : ["\u004A\u0065\u0064", "\u004A\u0065\u006C", "\u004A\u0065\u006D", "\u004A\u0065\u0072\u0063", "\u004A\u0065\u0072\u0064", "\u004A\u0065\u0068", "\u004A\u0065\u0073"], 
								weekday_names_narrow : ["\u004A\u0065\u0064", "\u004A\u0065\u006C", "\u004A\u0065\u006D", "\u004A\u0065\u0072\u0063", "\u004A\u0065\u0072\u0064", "\u004A\u0065\u0068", "\u004A\u0065\u0073"], 
								month_names_long : ["\u004A\u0065\u0072\u0072\u0065\u0079\u002D\u0067\u0065\u0075\u0072\u0065\u0065", "\u0054\u006F\u0073\u0068\u0069\u0061\u0067\u0068\u0074\u002D\u0061\u0072\u0072\u0065\u0065", "\u004D\u0061\u0079\u0072\u006E\u0074", "\u0041\u0076\u0065\u0072\u0069\u006C", "\u0042\u006F\u0061\u006C\u0064\u0079\u006E", "\u004D\u0065\u0061\u006E\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004A\u0065\u0072\u0072\u0065\u0079\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004C\u0075\u0061\u006E\u0069\u0073\u0074\u0079\u006E", "\u004D\u0065\u0061\u006E\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004A\u0065\u0072\u0072\u0065\u0079\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004D\u0065\u0065\u0020\u0048\u006F\u0075\u006E\u0065\u0079", "\u004D\u0065\u0065\u0020\u006E\u0079\u0020\u004E\u006F\u006C\u006C\u0069\u0063\u006B"], 
								month_names_short : ["\u004A\u002D\u0067\u0075\u0065\u0072", "\u0054\u002D\u0061\u0072\u0072\u0065\u0065", "\u004D\u0061\u0079\u0072\u006E\u0074", "\u0041\u0076\u0072\u0072\u0069\u006C", "\u0042\u006F\u0061\u006C\u0064\u0079\u006E", "\u004D\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004A\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004C\u0075\u0061\u006E\u0069\u0073\u0074\u0079\u006E", "\u004D\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004A\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004D\u002E\u0048\u006F\u0075\u006E\u0065\u0079", "\u004D\u002E\u004E\u006F\u006C\u006C\u0069\u0063\u006B"], 
								month_names_narrow : ["\u004A\u002D\u0067\u0075\u0065\u0072", "\u0054\u002D\u0061\u0072\u0072\u0065\u0065", "\u004D\u0061\u0079\u0072\u006E\u0074", "\u0041\u0076\u0072\u0072\u0069\u006C", "\u0042\u006F\u0061\u006C\u0064\u0079\u006E", "\u004D\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004A\u002D\u0073\u006F\u0075\u0072\u0065\u0065", "\u004C\u0075\u0061\u006E\u0069\u0073\u0074\u0079\u006E", "\u004D\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004A\u002D\u0066\u006F\u0075\u0079\u0069\u0072", "\u004D\u002E\u0048\u006F\u0075\u006E\u0065\u0079", "\u004D\u002E\u004E\u006F\u006C\u006C\u0069\u0063\u006B"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.gv_GB;
					}
					break;
				case "he":
				case "he_IL":
				case "he_il":
					{

						if (!nexacro.Locale.he_IL) {
							nexacro.Locale.he_IL = {
								name : "he_IL", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0049\u004C\u0053\u0020", 
								currency_symbol : "\u20AA", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 2, 
								n_sign_posn : 2, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u05E8\u05D0\u05E9\u05D5\u05DF", "\u05E9\u05E0\u05D9", "\u05E9\u05DC\u05D9\u05E9\u05D9", "\u05E8\u05D1\u05D9\u05E2\u05D9", "\u05D7\u05DE\u05D9\u05E9\u05D9", "\u05E9\u05D9\u05E9\u05D9", "\u05E9\u05D1\u05EA"], 
								weekday_names_short : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
								weekday_names_narrow : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
								month_names_long : ["\u05D9\u05E0\u05D5\u05D0\u05E8", "\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8\u05D9\u05DC", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0\u05D9", "\u05D9\u05D5\u05DC\u05D9", "\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8", "\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8", "\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8", "\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8", "\u05D3\u05E6\u05DE\u05D1\u05E8"], 
								month_names_short : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
								month_names_narrow : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050", 
								date_time_format : "\u0025\u005A\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u0020\u0025\u0061", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.he_IL;
					}
					break;
				case "hi":
				case "hi_IN":
				case "hi_in":
					{

						if (!nexacro.Locale.hi_IN) {
							nexacro.Locale.hi_IN = {
								name : "hi_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0930\u0942", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0930\u0935\u093F\u0935\u093E\u0930\u0020", "\u0938\u094B\u092E\u0935\u093E\u0930\u0020", "\u092E\u0902\u0917\u0932\u0935\u093E\u0930\u0020", "\u092C\u0941\u0927\u0935\u093E\u0930\u0020", "\u0917\u0941\u0930\u0941\u0935\u093E\u0930\u0020", "\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930\u0020", "\u0936\u0928\u093F\u0935\u093E\u0930\u0020"], 
								weekday_names_short : ["\u0930\u0935\u093F\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u0917\u0941\u0930\u0941\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
								weekday_names_narrow : ["\u0930\u0935\u093F\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u0917\u0941\u0930\u0941\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
								month_names_long : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
								month_names_short : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
								month_names_narrow : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
								ampm : ["\u092A\u0942\u0930\u094D\u0935\u093E\u0939\u094D\u0928", "\u0905\u092A\u0930\u093E\u0939\u094D\u0928"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.hi_IN;
					}
					break;
				case "hr":
				case "hr_HR":
				case "hr_hr":
					{

						if (!nexacro.Locale.hr_HR) {
							nexacro.Locale.hr_HR = {
								name : "hr_HR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0048\u0052\u004B\u0020", 
								currency_symbol : "\u004B\u006E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004E\u0065\u0064\u006A\u0065\u006C\u006A\u0061", "\u0050\u006F\u006E\u0065\u0064\u006A\u0065\u006C\u006A\u0061\u006B", "\u0055\u0074\u006F\u0072\u0061\u006B", "\u0053\u0072\u0069\u006A\u0065\u0064\u0061", "\u010C\u0065\u0074\u0076\u0072\u0074\u0061\u006B", "\u0050\u0065\u0074\u0061\u006B", "\u0053\u0075\u0062\u006F\u0074\u0061"], 
								weekday_names_short : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
								weekday_names_narrow : ["\u004E\u0065\u0064", "\u0050\u006F\u006E", "\u0055\u0074\u006F", "\u0053\u0072\u0069", "\u010C\u0065\u0074", "\u0050\u0065\u0074", "\u0053\u0075\u0062"], 
								month_names_long : ["\u0053\u0069\u006A\u0065\u010D\u0061\u006E\u006A", "\u0056\u0065\u006C\u006A\u0061\u010D\u0061", "\u004F\u017E\u0075\u006A\u0061\u006B", "\u0054\u0072\u0061\u0076\u0061\u006E\u006A", "\u0053\u0076\u0069\u0062\u0061\u006E\u006A", "\u004C\u0069\u0070\u0061\u006E\u006A", "\u0053\u0072\u0070\u0061\u006E\u006A", "\u004B\u006F\u006C\u006F\u0076\u006F\u007A", "\u0052\u0075\u006A\u0061\u006E", "\u004C\u0069\u0073\u0074\u006F\u0070\u0061\u0064", "\u0053\u0074\u0075\u0064\u0065\u006E\u0069", "\u0050\u0072\u006F\u0073\u0069\u006E\u0061\u0063"], 
								month_names_short : ["\u0053\u0069\u006A", "\u0056\u0065\u006C", "\u004F\u017E\u0075", "\u0054\u0072\u0061", "\u0053\u0076\u0069", "\u004C\u0069\u0070", "\u0053\u0072\u0070", "\u004B\u006F\u006C", "\u0052\u0075\u006A", "\u004C\u0069\u0073", "\u0053\u0074\u0075", "\u0050\u0072\u006F"], 
								month_names_narrow : ["\u0053\u0069\u006A", "\u0056\u0065\u006C", "\u004F\u017E\u0075", "\u0054\u0072\u0061", "\u0053\u0076\u0069", "\u004C\u0069\u0070", "\u0053\u0072\u0070", "\u004B\u006F\u006C", "\u0052\u0075\u006A", "\u004C\u0069\u0073", "\u0053\u0074\u0075", "\u0050\u0072\u006F"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059\u002E", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.hr_HR;
					}
					break;
				case "hu":
				case "hu_HU":
				case "hu_hu":
					{

						if (!nexacro.Locale.hu_HU) {
							nexacro.Locale.hu_HU = {
								name : "hu_HU", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0048\u0055\u0046\u0020", 
								currency_symbol : "\u0046\u0074", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0076\u0061\u0073\u00E1\u0072\u006E\u0061\u0070", "\u0068\u00E9\u0074\u0066\u0151", "\u006B\u0065\u0064\u0064", "\u0073\u007A\u0065\u0072\u0064\u0061", "\u0063\u0073\u00FC\u0074\u00F6\u0072\u0074\u00F6\u006B", "\u0070\u00E9\u006E\u0074\u0065\u006B", "\u0073\u007A\u006F\u006D\u0062\u0061\u0074"], 
								weekday_names_short : ["\u0076", "\u0068", "\u006B", "\u0073\u007A\u0065", "\u0063\u0073", "\u0070", "\u0073\u007A\u006F"], 
								weekday_names_narrow : ["\u0076", "\u0068", "\u006B", "\u0073\u007A\u0065", "\u0063\u0073", "\u0070", "\u0073\u007A\u006F"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u00E1\u0072", "\u0066\u0065\u0062\u0072\u0075\u00E1\u0072", "\u006D\u00E1\u0072\u0063\u0069\u0075\u0073", "\u00E1\u0070\u0072\u0069\u006C\u0069\u0073", "\u006D\u00E1\u006A\u0075\u0073", "\u006A\u00FA\u006E\u0069\u0075\u0073", "\u006A\u00FA\u006C\u0069\u0075\u0073", "\u0061\u0075\u0067\u0075\u0073\u007A\u0074\u0075\u0073", "\u0073\u007A\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u00F3\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062\u0072", "\u006D\u00E1\u0072\u0063", "\u00E1\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u007A\u0065\u0070\u0074", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062\u0072", "\u006D\u00E1\u0072\u0063", "\u00E1\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u007A\u0065\u0070\u0074", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
								time_format_ampm : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
								date_time_format : "\u0025\u0059\u002E\u0020\u0025\u0062\u002E\u0020\u0025\u0065\u002E\u002C\u0020\u0025\u0041\u002C\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0059\u002E\u0020\u0025\u0062\u002E\u0020\u0025\u0065\u002E\u002C\u0020\u0025\u0041\u002C\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u002E\u0020\u0025\u0042\u0020\u0025\u0065", 
								shortdate_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064\u002E", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.hu_HU;
					}
					break;
				case "hy":
				case "hy_AM":
				case "hy_am":
					{

						if (!nexacro.Locale.hy_AM) {
							nexacro.Locale.hy_AM = {
								name : "hy_AM", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0041\u004D\u0044\u0020", 
								currency_symbol : "\u0564\u0580\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u053F\u056B\u0580\u0561\u056F\u056B", "\u0535\u0580\u056F\u0578\u0582\u0577\u0561\u0562\u0569\u056B", "\u0535\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B", "\u0549\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056B", "\u0540\u056B\u0576\u0563\u0577\u0561\u0562\u0569\u056B", "\u0548\u0582\u0580\u0562\u0561\u0569", "\u0547\u0561\u0562\u0561\u0569"], 
								weekday_names_short : ["\u053F\u0580\u056F", "\u0535\u0580\u056F", "\u0535\u0580\u0584", "\u0549\u0580\u0584", "\u0540\u0576\u0563", "\u0548\u0582\u0580", "\u0547\u0562\u0569"], 
								weekday_names_narrow : ["\u053F\u0580\u056F", "\u0535\u0580\u056F", "\u0535\u0580\u0584", "\u0549\u0580\u0584", "\u0540\u0576\u0563", "\u0548\u0582\u0580", "\u0547\u0562\u0569"], 
								month_names_long : ["\u0540\u0578\u0582\u0576\u057E\u0561\u0580\u056B", "\u0553\u0565\u057F\u0580\u057E\u0561\u0580\u056B", "\u0544\u0561\u0580\u057F\u056B", "\u0531\u057A\u0580\u056B\u056C\u056B", "\u0544\u0561\u0575\u056B\u057D\u056B", "\u0540\u0578\u0582\u0576\u056B\u057D\u056B", "\u0540\u0578\u0582\u056C\u056B\u057D\u056B", "\u0555\u0563\u0578\u057D\u057F\u0578\u057D\u056B", "\u054D\u0565\u057A\u057F\u0565\u0574\u0562\u0565\u0580\u056B", "\u0540\u0578\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B", "\u0546\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056B", "\u0534\u0565\u056F\u057F\u0565\u0574\u0562\u0565\u0580\u056B"], 
								month_names_short : ["\u0540\u0576\u057E", "\u0553\u057F\u0580", "\u0544\u0561\u0580", "\u0531\u057A\u0580", "\u0544\u0561\u0575", "\u0540\u0576\u057D", "\u0540\u056C\u057D", "\u0555\u0563\u057D", "\u054D\u0565\u057A", "\u0540\u0578\u056F", "\u0546\u0574\u0562", "\u0534\u0565\u056F"], 
								month_names_narrow : ["\u0540\u0576\u057E", "\u0553\u057F\u0580", "\u0544\u0561\u0580", "\u0531\u057A\u0580", "\u0544\u0561\u0575", "\u0540\u0576\u057D", "\u0540\u056C\u057D", "\u0555\u0563\u057D", "\u054D\u0565\u057A", "\u0540\u0578\u056F", "\u0546\u0574\u0562", "\u0534\u0565\u056F"], 
								ampm : ["", ""], 
								date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0079", 
								time_format : "\u0025\u0072", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.hy_AM;
					}
					break;
				case "id":
				case "id_ID":
				case "id_id":
					{

						if (!nexacro.Locale.id_ID) {
							nexacro.Locale.id_ID = {
								name : "id_ID", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0049\u0044\u0052\u0020", 
								currency_symbol : "\u0052\u0070", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u004D\u0069\u006E\u0067\u0067\u0075", "\u0053\u0065\u006E\u0069\u006E", "\u0053\u0065\u006C\u0061\u0073\u0061", "\u0052\u0061\u0062\u0075", "\u004B\u0061\u006D\u0069\u0073", "\u004A\u0075\u006D\u0061\u0074", "\u0053\u0061\u0062\u0074\u0075"], 
								weekday_names_short : ["\u004D\u0069\u006E", "\u0053\u0065\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0061\u006D", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u004D\u0069\u006E", "\u0053\u0065\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0061\u006D", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0050\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u004D\u0061\u0072\u0065\u0074", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0069", "\u0041\u0067\u0075\u0073\u0074\u0075\u0073", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.id_ID;
					}
					break;
				case "is":
				case "is_IS":
				case "is_is":
					{

						if (!nexacro.Locale.is_IS) {
							nexacro.Locale.is_IS = {
								name : "is_IS", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0049\u0053\u004B\u0020", 
								currency_symbol : "\u006B\u0072\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 0, 
								frac_digits : 0, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0073\u0075\u006E\u006E\u0075\u0064\u0061\u0067\u0075\u0072", "\u006D\u00E1\u006E\u0075\u0064\u0061\u0067\u0075\u0072", "\u00FE\u0072\u0069\u00F0\u006A\u0075\u0064\u0061\u0067\u0075\u0072", "\u006D\u0069\u00F0\u0076\u0069\u006B\u0075\u0064\u0061\u0067\u0075\u0072", "\u0066\u0069\u006D\u006D\u0074\u0075\u0064\u0061\u0067\u0075\u0072", "\u0066\u00F6\u0073\u0074\u0075\u0064\u0061\u0067\u0075\u0072", "\u006C\u0061\u0075\u0067\u0061\u0072\u0064\u0061\u0067\u0075\u0072"], 
								weekday_names_short : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u00FE\u0072\u0069", "\u006D\u0069\u00F0", "\u0066\u0069\u006D", "\u0066\u00F6\u0073", "\u006C\u0061\u0075"], 
								weekday_names_narrow : ["\u0073\u0075\u006E", "\u006D\u00E1\u006E", "\u00FE\u0072\u0069", "\u006D\u0069\u00F0", "\u0066\u0069\u006D", "\u0066\u00F6\u0073", "\u006C\u0061\u0075"], 
								month_names_long : ["\u006A\u0061\u006E\u00FA\u0061\u0072", "\u0066\u0065\u0062\u0072\u00FA\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u00ED\u006C", "\u006D\u0061\u00ED", "\u006A\u00FA\u006E\u00ED", "\u006A\u00FA\u006C\u00ED", "\u00E1\u0067\u00FA\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u00F3\u0062\u0065\u0072", "\u006E\u00F3\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u00ED", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u00E1\u0067\u00FA", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u00F3\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u00ED", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u00E1\u0067\u00FA", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u00F3\u0076", "\u0064\u0065\u0073"], 
								ampm : ["\u0066\u0068", "\u0065\u0068"], 
								date_format : "\u0025\u0061\u0020\u0025\u0065\u002E\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0065\u002E\u0025\u0062\u0020\u0025\u0059\u002C\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.is_IS;
					}
					break;
				case "it_CH":
				case "it_ch":
					{

						if (!nexacro.Locale.it_CH) {
							nexacro.Locale.it_CH = {
								name : "it_CH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u0027", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0043\u0048\u0046\u0020", 
								currency_symbol : "\u0046\u0072\u002E", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0027", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0064\u006F\u006D\u0065\u006E\u0069\u0063\u0061", "\u006C\u0075\u006E\u0065\u0064\u00EC", "\u006D\u0061\u0072\u0074\u0065\u0064\u00EC", "\u006D\u0065\u0072\u0063\u006F\u006C\u0065\u0064\u00EC", "\u0067\u0069\u006F\u0076\u0065\u0064\u00EC", "\u0076\u0065\u006E\u0065\u0072\u0064\u00EC", "\u0073\u0061\u0062\u0061\u0074\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006D\u0065\u0072", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u006D\u0065\u0072", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
								month_names_long : ["\u0067\u0065\u006E\u006E\u0061\u0069\u006F", "\u0066\u0065\u0062\u0062\u0072\u0061\u0069\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0070\u0072\u0069\u006C\u0065", "\u006D\u0061\u0067\u0067\u0069\u006F", "\u0067\u0069\u0075\u0067\u006E\u006F", "\u006C\u0075\u0067\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0074\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0074\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.it_CH;
					}
					break;
				case "it":
				case "it_IT":
				case "it_it":
					{

						if (!nexacro.Locale.it_IT) {
							nexacro.Locale.it_IT = {
								name : "it_IT", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0065\u006E\u0069\u0063\u0061", "\u006C\u0075\u006E\u0065\u0064\u00EC", "\u006D\u0061\u0072\u0074\u0065\u0064\u00EC", "\u006D\u0065\u0072\u0063\u006F\u006C\u0065\u0064\u00EC", "\u0067\u0069\u006F\u0076\u0065\u0064\u00EC", "\u0076\u0065\u006E\u0065\u0072\u0064\u00EC", "\u0073\u0061\u0062\u0061\u0074\u006F"], 
								weekday_names_short : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u0067\u0069\u006F", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
								weekday_names_narrow : ["\u0064\u006F\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0072", "\u0067\u0069\u006F", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
								month_names_long : ["\u0067\u0065\u006E\u006E\u0061\u0069\u006F", "\u0066\u0065\u0062\u0062\u0072\u0061\u0069\u006F", "\u006D\u0061\u0072\u007A\u006F", "\u0061\u0070\u0072\u0069\u006C\u0065", "\u006D\u0061\u0067\u0067\u0069\u006F", "\u0067\u0069\u0075\u0067\u006E\u006F", "\u006C\u0075\u0067\u006C\u0069\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0074\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0074\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0069\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0067", "\u0067\u0069\u0075", "\u006C\u0075\u0067", "\u0061\u0067\u006F", "\u0073\u0065\u0074", "\u006F\u0074\u0074", "\u006E\u006F\u0076", "\u0064\u0069\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.it_IT;
					}
					break;
				case "iw":
				case "iw_IL":
				case "iw_il":
					{

						if (!nexacro.Locale.iw_IL) {
							nexacro.Locale.iw_IL = {
								name : "iw_IL", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0049\u004C\u0053\u0020", 
								currency_symbol : "\u05E9\u05D7", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 2, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u05E8\u05D0\u05E9\u05D5\u05DF", "\u05E9\u05E0\u05D9", "\u05E9\u05DC\u05D9\u05E9\u05D9", "\u05E8\u05D1\u05D9\u05E2\u05D9", "\u05D7\u05DE\u05D9\u05E9\u05D9", "\u05E9\u05D9\u05E9\u05D9", "\u05E9\u05D1\u05EA"], 
								weekday_names_short : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
								weekday_names_narrow : ["\u05D0\u0027", "\u05D1\u0027", "\u05D2\u0027", "\u05D3\u0027", "\u05D4\u0027", "\u05D5\u0027", "\u05E9\u0027"], 
								month_names_long : ["\u05D9\u05E0\u05D5\u05D0\u05E8", "\u05E4\u05D1\u05E8\u05D5\u05D0\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8\u05D9\u05DC", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0\u05D9", "\u05D9\u05D5\u05DC\u05D9", "\u05D0\u05D5\u05D2\u05D5\u05E1\u05D8", "\u05E1\u05E4\u05D8\u05DE\u05D1\u05E8", "\u05D0\u05D5\u05E7\u05D8\u05D5\u05D1\u05E8", "\u05E0\u05D5\u05D1\u05DE\u05D1\u05E8", "\u05D3\u05E6\u05DE\u05D1\u05E8"], 
								month_names_short : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
								month_names_narrow : ["\u05D9\u05E0\u05D5", "\u05E4\u05D1\u05E8", "\u05DE\u05E8\u05E5", "\u05D0\u05E4\u05E8", "\u05DE\u05D0\u05D9", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05D5\u05D2", "\u05E1\u05E4\u05D8", "\u05D0\u05D5\u05E7", "\u05E0\u05D5\u05D1", "\u05D3\u05E6\u05DE"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050", 
								date_time_format : "\u0025\u005A\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u0020\u0025\u0061", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "rtl"
							};
						}


						return nexacro.Locale.iw_IL;
					}
					break;
				case "ja":
				case "ja_JP":
				case "ja_jp":
					{

						if (!nexacro.Locale.ja_JP) {
							nexacro.Locale.ja_JP = {
								name : "ja_JP", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004A\u0050\u0059\u0020", 
								currency_symbol : "\uFFE5", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 0, 
								frac_digits : 0, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								mon_n_sign_posn : 1, 
								weekday_names_long : ["\u65E5\u66DC\u65E5", "\u6708\u66DC\u65E5", "\u706B\u66DC\u65E5", "\u6C34\u66DC\u65E5", "\u6728\u66DC\u65E5", "\u91D1\u66DC\u65E5", "\u571F\u66DC\u65E5"], 
								weekday_names_short : ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"], 
								weekday_names_narrow : ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"], 
								month_names_long : ["\u0031\u6708", "\u0032\u6708", "\u0033\u6708", "\u0034\u6708", "\u0035\u6708", "\u0036\u6708", "\u0037\u6708", "\u0038\u6708", "\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								month_names_short : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								month_names_narrow : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								ampm : ["\u5348\u524D", "\u5348\u5F8C"], 
								date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
								time_format : "\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
								time_format_ampm : "\u0025\u0070\u0025\u0049\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
								date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
								shortdate_format : "\u0025\u0059\u002F\u0025\u006D\u002F\u0025\u0064", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ja_JP;
					}
					break;
				case "ka":
				case "ka_GE":
				case "ka_ge":
					{

						if (!nexacro.Locale.ka_GE) {
							nexacro.Locale.ka_GE = {
								name : "ka_GE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0047\u0045\u004C\u0020", 
								currency_symbol : "\u004C\u0061\u0072\u0069", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u10D9\u10D5\u10D8\u10E0\u10D0", "\u10DD\u10E0\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10E1\u10D0\u10DB\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10DD\u10D7\u10EE\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10EE\u10E3\u10D7\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8", "\u10DE\u10D0\u10E0\u10D0\u10E1\u10D9\u10D4\u10D5\u10D8", "\u10E8\u10D0\u10D1\u10D0\u10D7\u10D8"], 
								weekday_names_short : ["\u10D9\u10D5\u10D8", "\u10DD\u10E0\u10E8", "\u10E1\u10D0\u10DB", "\u10DD\u10D7\u10EE", "\u10EE\u10E3\u10D7", "\u10DE\u10D0\u10E0", "\u10E8\u10D0\u10D1"], 
								weekday_names_narrow : ["\u10D9\u10D5\u10D8", "\u10DD\u10E0\u10E8", "\u10E1\u10D0\u10DB", "\u10DD\u10D7\u10EE", "\u10EE\u10E3\u10D7", "\u10DE\u10D0\u10E0", "\u10E8\u10D0\u10D1"], 
								month_names_long : ["\u10D8\u10D0\u10DC\u10D5\u10D0\u10E0\u10D8", "\u10D7\u10D4\u10D1\u10D4\u10E0\u10D5\u10D0\u10DA\u10D8", "\u10DB\u10D0\u10E0\u10E2\u10D8", "\u10D0\u10DE\u10E0\u10D8\u10DA\u10D8", "\u10DB\u10D0\u10D8\u10E1\u10D8", "\u10D8\u10D5\u10DC\u10D8\u10E1\u10D8", "\u10D8\u10D5\u10DA\u10D8\u10E1\u10D8", "\u10D0\u10D2\u10D5\u10D8\u10E1\u10E2\u10DD", "\u10E1\u10D4\u10E5\u10E2\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8", "\u10DD\u10E5\u10E2\u10DD\u10DB\u10D1\u10D4\u10E0\u10D8", "\u10DC\u10DD\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8", "\u10D3\u10D4\u10D9\u10D4\u10DB\u10D1\u10D4\u10E0\u10D8"], 
								month_names_short : ["\u10D8\u10D0\u10DC", "\u10D7\u10D4\u10D1", "\u10DB\u10D0\u10E0", "\u10D0\u10DE\u10E0", "\u10DB\u10D0\u10D8", "\u10D8\u10D5\u10DC", "\u10D8\u10D5\u10DA", "\u10D0\u10D2\u10D5", "\u10E1\u10D4\u10E5", "\u10DD\u10E5\u10E2", "\u10DC\u10DD\u10D4", "\u10D3\u10D4\u10D9"], 
								month_names_narrow : ["\u10D8\u10D0\u10DC", "\u10D7\u10D4\u10D1", "\u10DB\u10D0\u10E0", "\u10D0\u10DE\u10E0", "\u10DB\u10D0\u10D8", "\u10D8\u10D5\u10DC", "\u10D8\u10D5\u10DA", "\u10D0\u10D2\u10D5", "\u10E1\u10D4\u10E5", "\u10DD\u10E5\u10E2", "\u10DC\u10DD\u10D4", "\u10D3\u10D4\u10D9"], 
								ampm : ["", ""], 
								date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0059\u0020\u10EC\u10DA\u10D8\u10E1\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u0020\u10EC\u10DA\u10D8\u10E1\u0020\u0025\u0064\u0020\u0025\u006D\u002C\u0020\u0025\u0041", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ka_GE;
					}
					break;
				case "kk":
				case "kk_KZ":
				case "kk_kz":
					{

						if (!nexacro.Locale.kk_KZ) {
							nexacro.Locale.kk_KZ = {
								name : "kk_KZ", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004B\u005A\u0054\u0020", 
								currency_symbol : "\u0422", 
								mon_decimal_point : "\u002D", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0416\u0435\u043A\u0441\u0435\u043D\u0431\u0456", "\u0414\u04AF\u0439\u0441\u0435\u043D\u0431\u0456", "\u0421\u0435\u0439\u0441\u0435\u043D\u0431\u0456", "\u0421\u04D9\u0440\u0441\u0435\u043D\u0431\u0456", "\u0411\u0435\u0439\u0441\u0435\u043D\u0431\u0456", "\u0416\u04B1\u043C\u0430", "\u0421\u0435\u043D\u0431\u0456"], 
								weekday_names_short : ["\u0416\u043A", "\u0414\u0441", "\u0421\u0441", "\u0421\u0440", "\u0411\u0441", "\u0416\u043C", "\u0421\u043D"], 
								weekday_names_narrow : ["\u0416\u043A", "\u0414\u0441", "\u0421\u0441", "\u0421\u0440", "\u0411\u0441", "\u0416\u043C", "\u0421\u043D"], 
								month_names_long : ["\u049A\u0430\u04A3\u0442\u0430\u0440", "\u0410\u049B\u043F\u0430\u043D", "\u041D\u0430\u0443\u0440\u044B\u0437", "\u0421\u04D9\u0443\u0456\u0440", "\u041C\u0430\u043C\u044B\u0440", "\u041C\u0430\u0443\u0441\u044B\u043C", "\u0428\u0456\u043B\u0434\u0435", "\u0422\u0430\u043C\u044B\u0437", "\u049A\u044B\u0440\u043A\u04AF\u0439\u0435\u043A", "\u049A\u0430\u0437\u0430\u043D", "\u049A\u0430\u0440\u0430\u0448\u0430", "\u0416\u0435\u043B\u0442\u043E\u049B\u0441\u0430\u043D"], 
								month_names_short : ["\u049A\u0430\u04A3", "\u0410\u049B\u043F", "\u041D\u0430\u0443", "\u0421\u04D9\u0443", "\u041C\u0430\u043C", "\u041C\u0430\u0443", "\u0428\u0456\u043B", "\u0422\u0430\u043C", "\u049A\u044B\u0440", "\u049A\u0430\u0437", "\u049A\u0430\u0440", "\u0416\u0435\u043B"], 
								month_names_narrow : ["\u049A\u0430\u04A3", "\u0410\u049B\u043F", "\u041D\u0430\u0443", "\u0421\u04D9\u0443", "\u041C\u0430\u043C", "\u041C\u0430\u0443", "\u0428\u0456\u043B", "\u0422\u0430\u043C", "\u049A\u044B\u0440", "\u049A\u0430\u0437", "\u049A\u0430\u0440", "\u0416\u0435\u043B"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041\u0020\u0436\u002E", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.kk_KZ;
					}
					break;
				case "kl":
				case "kl_GL":
				case "kl_gl":
					{

						if (!nexacro.Locale.kl_GL) {
							nexacro.Locale.kl_GL = {
								name : "kl_GL", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0044\u004B\u004B\u0020", 
								currency_symbol : "\u006B\u0072", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 2, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u0061\u0062\u0061\u0061\u0074", "\u0061\u0074\u0061\u0061\u0073\u0069\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u006D\u0061\u0072\u006C\u0075\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0070\u0069\u006E\u0067\u0061\u0073\u0075\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0073\u0069\u0073\u0061\u006D\u0061\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0074\u0061\u006C\u006C\u0069\u006D\u0061\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071", "\u0061\u0072\u0066\u0069\u006E\u0069\u006E\u006E\u0067\u006F\u0072\u006E\u0065\u0071"], 
								weekday_names_short : ["\u0073\u0061\u0062", "\u0061\u0074\u0061", "\u006D\u0061\u0072", "\u0070\u0069\u006E", "\u0073\u0069\u0073", "\u0074\u0061\u006C", "\u0061\u0072\u0066"], 
								weekday_names_narrow : ["\u0073\u0061\u0062", "\u0061\u0074\u0061", "\u006D\u0061\u0072", "\u0070\u0069\u006E", "\u0073\u0069\u0073", "\u0074\u0061\u006C", "\u0061\u0072\u0066"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0072\u0074\u0073\u0069", "\u0061\u0070\u0072\u0069\u006C\u0069", "\u006D\u0061\u006A\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0075\u0073\u0069", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072\u0069", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072\u0069", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072\u0069", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072\u0069"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.kl_GL;
					}
					break;
				case "km":
				case "km_KH":
				case "km_kh":
					{

						if (!nexacro.Locale.km_KH) {
							nexacro.Locale.km_KH = {
								name : "km_KH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004B\u0048\u0052\u0020", 
								currency_symbol : "\u17DB", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 0, 
								n_cs_precedes : 0, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u1790\u17D2\u1784\u17C3\u200B\u17A2\u17B6\u1791\u17B7\u178F\u17D2\u1799", "\u1790\u17D2\u1784\u17C3\u200B\u1785\u17D0\u1793\u17D2\u1791", "\u1790\u17D2\u1784\u17C3\u200B\u17A2\u1784\u17D2\u1782\u17B6\u179A", "\u1790\u17D2\u1784\u17C3\u200B\u1796\u17BB\u1792", "\u1790\u17D2\u1784\u17C3\u200B\u1796\u17D2\u179A\u17A0\u179F\u17D2\u1794\u178F\u17B7\u17CD", "\u1790\u17D2\u1784\u17C3\u200B\u179F\u17BB\u1780\u17D2\u179A", "\u1790\u17D2\u1784\u17C3\u200B\u179F\u17C5\u179A\u17CD"], 
								weekday_names_short : ["\u17A2\u17B6", "\u1785", "\u17A2", "\u1796\u17BB", "\u1796\u17D2\u179A", "\u179F\u17BB", "\u179F"], 
								weekday_names_narrow : ["\u17A2\u17B6", "\u1785", "\u17A2", "\u1796\u17BB", "\u1796\u17D2\u179A", "\u179F\u17BB", "\u179F"], 
								month_names_long : ["\u1798\u1780\u179A\u17B6", "\u1780\u17BB\u1798\u17D2\u1797\u17C8", "\u1798\u17B7\u1793\u17B6", "\u1798\u17C1\u179F\u17B6", "\u17A7\u179F\u1797\u17B6", "\u1798\u17B7\u1790\u17BB\u1793\u17B6", "\u1780\u1780\u17D2\u1780\u178A\u17B6", "\u179F\u17B8\u17A0\u17B6", "\u1780\u1789\u17D2\u1789\u17B6", "\u178F\u17BB\u179B\u17B6", "\u179C\u17B7\u1785\u17D2\u1786\u17B7\u1780\u17B6", "\u1792\u17D2\u1793\u17BC"], 
								month_names_short : ["\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9", "\u17E1\u17E0", "\u17E1\u17E1", "\u17E1\u17E2"], 
								month_names_narrow : ["\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9", "\u17E1\u17E0", "\u17E1\u17E1", "\u17E1\u17E2"], 
								ampm : ["\u1796\u17D2\u179A\u17B9\u1780", "\u179B\u17D2\u1784\u17B6\u1785"], 
								date_format : "%e %B %Y", 
								time_format : "%H:%M:%S", 
								time_format_ampm : "%I\u003A%M\u003A%S\u0020%p", 
								date_time_format : "%A \u1790\u17D2\u1784\u17C3 %e \u1781\u17C2 %B \u1786\u17D2\u1793\u17B6\u17C6  %Y, %H \u1798\u17C9\u17C4\u1784 m \u1793\u17B6\u1791\u17B8 %S \u179C\u17B7\u1793\u17B6\u1791\u17B8\u200B", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062%\u0020\u0025\u0045\u0079\u0020\u0025\u0048\u003A\u0025\u004D%\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.km_KH;
					}
					break;
				case "kn":
				case "kn_IN":
				case "kn_in":
					{

						if (!nexacro.Locale.kn_IN) {
							nexacro.Locale.kn_IN = {
								name : "kn_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0CB0\u0CC2", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0CB0\u0CB5\u0CBF\u0CB5\u0CBE\u0CB0", "\u0CB8\u0CCB\u0CAE\u0CB5\u0CBE\u0CB0", "\u0CAE\u0C82\u0C97\u0CB3\u0CB5\u0CBE\u0CB0", "\u0CAC\u0CC1\u0CA7\u0CB5\u0CBE\u0CB0", "\u0C97\u0CC1\u0CB0\u0CC1\u0CB5\u0CBE\u0CB0", "\u0CB6\u0CC1\u0C95\u0CCD\u0CB0\u0CB5\u0CBE\u0CB0", "\u0CB6\u0CA8\u0CBF\u0CB5\u0CBE\u0CB0"], 
								weekday_names_short : ["\u0CB0", "\u0CB8\u0CCB", "\u0CAE\u0C82", "\u0CAC\u0CC1", "\u0C97\u0CC1", "\u0CB6\u0CC1", "\u0CB6"], 
								weekday_names_narrow : ["\u0CB0", "\u0CB8\u0CCB", "\u0CAE\u0C82", "\u0CAC\u0CC1", "\u0C97\u0CC1", "\u0CB6\u0CC1", "\u0CB6"], 
								month_names_long : ["\u0C9C\u0CA8\u0CB5\u0CB0\u0CBF", "\u0CAB\u0CC6\u0CAC\u0CCD\u0CB0\u0CB5\u0CB0\u0CBF", "\u0CAE\u0CBE\u0CB0\u0CCD\u0C9A", "\u0C8F\u0CAA\u0CCD\u0CB0\u0CBF\u0CB2\u0CCD", "\u0CAE\u0CC7", "\u0C9C\u0CC2\u0CA8\u0CCD", "\u0C9C\u0CC1\u0CB2\u0CBE\u0CAF\u0CBF", "\u0C86\u0C97\u0CB8\u0CCD\u0CA4\u0CC1", "\u0CB8\u0CC6\u0CAA\u0CCD\u0C9F\u0CC6\u0C82\u0CAC\u0CB0", "\u0C85\u0C95\u0CCD\u0CA4\u0CC2\u0CAC\u0CB0", "\u0CA8\u0CB5\u0CC6\u0C82\u0CAC\u0CB0", "\u0CA6\u0CB6\u0C82\u0CAC\u0CB0"], 
								month_names_short : ["\u0C9C", "\u0CAB\u0CC6", "\u0CAE\u0CBE", "\u0C8F", "\u0CAE\u0CC7", "\u0C9C\u0CC2", "\u0C9C\u0CC1", "\u0C86", "\u0CB8\u0CC6", "\u0C85", "\u0CA8", "\u0CA6"], 
								month_names_narrow : ["\u0C9C", "\u0CAB\u0CC6", "\u0CAE\u0CBE", "\u0C8F", "\u0CAE\u0CC7", "\u0C9C\u0CC2", "\u0C9C\u0CC1", "\u0C86", "\u0CB8\u0CC6", "\u0C85", "\u0CA8", "\u0CA6"], 
								ampm : ["\u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CBE\u0CB9\u0CCD\u0CA8", "\u0C85\u0CAA\u0CB0\u0CBE\u0CB9\u0CCD\u0CA8"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.kn_IN;
					}
					break;
				case "ko":
				case "ko_KR":
				case "ko_kr":
					{

						if (!nexacro.Locale.ko_KR) {
							nexacro.Locale.ko_KR = {
								name : "ko_KR", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004B\u0052\u0057\u0020", 
								currency_symbol : "\uFFE6", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 0, 
								frac_digits : 0, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\uC77C\uC694\uC77C", "\uC6D4\uC694\uC77C", "\uD654\uC694\uC77C", "\uC218\uC694\uC77C", "\uBAA9\uC694\uC77C", "\uAE08\uC694\uC77C", "\uD1A0\uC694\uC77C"], 
								weekday_names_short : ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"], 
								weekday_names_narrow : ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"], 
								month_names_long : ["\u0031\uC6D4", "\u0032\uC6D4", "\u0033\uC6D4", "\u0034\uC6D4", "\u0035\uC6D4", "\u0036\uC6D4", "\u0037\uC6D4", "\u0038\uC6D4", "\u0039\uC6D4", "\u0031\u0030\uC6D4", "\u0031\u0031\uC6D4", "\u0031\u0032\uC6D4"], 
								month_names_short : ["\u0020\u0031\uC6D4", "\u0020\u0032\uC6D4", "\u0020\u0033\uC6D4", "\u0020\u0034\uC6D4", "\u0020\u0035\uC6D4", "\u0020\u0036\uC6D4", "\u0020\u0037\uC6D4", "\u0020\u0038\uC6D4", "\u0020\u0039\uC6D4", "\u0031\u0030\uC6D4", "\u0031\u0031\uC6D4", "\u0031\u0032\uC6D4"], 
								month_names_narrow : ["\u0020\u0031\uC6D4", "\u0020\u0032\uC6D4", "\u0020\u0033\uC6D4", "\u0020\u0034\uC6D4", "\u0020\u0035\uC6D4", "\u0020\u0036\uC6D4", "\u0020\u0037\uC6D4", "\u0020\u0038\uC6D4", "\u0020\u0039\uC6D4", "\u0031\u0030\uC6D4", "\u0031\u0031\uC6D4", "\u0031\u0032\uC6D4"], 
								ampm : ["\uC624\uC804", "\uC624\uD6C4"], 
								date_format : "\u0025\u0059\uB144\u0020\u0025\u006D\uC6D4\u0020\u0025\u0064\uC77C", 
								time_format : "\u0025\u0048\uC2DC\u0020\u0025\u004D\uBD84\u0020\u0025\u0053\uCD08", 
								time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\uC2DC\u0020\u0025\u004D\uBD84\u0020\u0025\u0053\uCD08", 
								date_time_format : "\u0025\u0078\u0020\u0028\u0025\u0061\u0029\u0020\u0025\u0072", 
								full_date_time_format : "\u0025\u0059\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0064\u002E\u0020\u0028\u0025\u0061\u0029\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\uB144\u0020\u0025\u006E\uC6D4\u0020\u0025\u0065\uC77C\u0020\u0025\u0041", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ko_KR;
					}
					break;
				case "ku":
				case "ku_TR":
				case "ku_tr":
					{

						if (!nexacro.Locale.ku_TR) {
							nexacro.Locale.ku_TR = {
								name : "ku_TR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0054\u0052\u0059\u0020", 
								currency_symbol : "\u0059\u0054\u004C", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0079\u00EA\u006B\u0073\u00EA\u006D", "\u0064\u0075\u0073\u00EA\u006D", "\u0073\u00EA\u0073\u00EA\u006D", "\u00E7\u0061\u0072\u0073\u00EA\u006D", "\u0070\u00EA\u006E\u0063\u0073\u00EA\u006D", "\u00EE\u006E\u00EE", "\u0073\u0065\u0070\u0074"], 
								weekday_names_short : ["\u0079\u00EA\u006B", "\u0064\u0075\u0073", "\u0073\u00EA\u0073", "\u00E7\u0061\u0072", "\u0070\u00EA\u006E", "\u00EE\u006E\u00EE", "\u0073\u0065\u0070"], 
								weekday_names_narrow : ["\u0079\u00EA\u006B", "\u0064\u0075\u0073", "\u0073\u00EA\u0073", "\u00E7\u0061\u0072", "\u0070\u00EA\u006E", "\u00EE\u006E\u00EE", "\u0073\u0065\u0070"], 
								month_names_long : ["\u00C7\u0069\u006C\u0065", "\u0053\u0069\u0062\u0061\u0074", "\u0041\u0064\u0061\u0072", "\u004E\u00EE\u0073\u0061\u006E", "\u0047\u0075\u006C\u0061\u006E", "\u0048\u0065\u007A\u00EE\u0072\u0061\u006E", "\u0054\u00EE\u0072\u006D\u0065\u0068", "\u0054\u0065\u0062\u0061\u0078", "\u00CE\u006C\u006F\u006E", "\u0043\u006F\u0074\u006D\u0065\u0068", "\u004D\u0069\u006A\u0064\u0061\u0072", "\u004B\u0061\u006E\u00FB\u006E"], 
								month_names_short : ["\u00C7\u0069\u006C", "\u0053\u0069\u0062", "\u0041\u0064\u0061", "\u004E\u00EE\u0073", "\u0047\u0075\u006C", "\u0048\u0065\u007A", "\u0054\u00EE\u0072", "\u0054\u0065\u0062", "\u00CE\u006C\u006F", "\u0043\u006F\u0074", "\u004D\u0069\u006A", "\u004B\u0061\u006E"], 
								month_names_narrow : ["\u00C7\u0069\u006C", "\u0053\u0069\u0062", "\u0041\u0064\u0061", "\u004E\u00EE\u0073", "\u0047\u0075\u006C", "\u0048\u0065\u007A", "\u0054\u00EE\u0072", "\u0054\u0065\u0062", "\u00CE\u006C\u006F", "\u0043\u006F\u0074", "\u004D\u0069\u006A", "\u004B\u0061\u006E"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ku_TR;
					}
					break;
				case "kw":
				case "kw_GB":
				case "kw_gb":
					{

						if (!nexacro.Locale.kw_GB) {
							nexacro.Locale.kw_GB = {
								name : "kw_GB", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0047\u0042\u0050\u0020", 
								currency_symbol : "\u00A3", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0044\u0065\u0020\u0053\u0075\u006C", "\u0044\u0065\u0020\u004C\u0075\u006E", "\u0044\u0065\u0020\u004D\u0065\u0072\u0074\u0068", "\u0044\u0065\u0020\u004D\u0065\u0072\u0068\u0065\u0072", "\u0044\u0065\u0020\u0059\u006F\u0077", "\u0044\u0065\u0020\u0047\u0077\u0065\u006E\u0065\u0072", "\u0044\u0065\u0020\u0053\u0061\u0064\u006F\u0072\u006E"], 
								weekday_names_short : ["\u0053\u0075\u006C", "\u004C\u0075\u006E", "\u004D\u0074\u0068", "\u004D\u0068\u0072", "\u0059\u006F\u0077", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
								weekday_names_narrow : ["\u0053\u0075\u006C", "\u004C\u0075\u006E", "\u004D\u0074\u0068", "\u004D\u0068\u0072", "\u0059\u006F\u0077", "\u0047\u0077\u0065", "\u0053\u0061\u0064"], 
								month_names_long : ["\u004D\u0079\u0073\u0020\u0047\u0065\u006E\u0076\u0065\u0072", "\u004D\u0079\u0073\u0020\u0057\u0068\u0065\u0076\u0072\u0065\u006C", "\u004D\u0079\u0073\u0020\u004D\u0065\u0072\u0074\u0068", "\u004D\u0079\u0073\u0020\u0045\u0062\u0072\u0065\u006C", "\u004D\u0079\u0073\u0020\u004D\u0065", "\u004D\u0079\u0073\u0020\u0045\u0076\u0061\u006E", "\u004D\u0079\u0073\u0020\u0047\u006F\u0072\u0074\u0068\u0065\u0072\u0065\u006E", "\u004D\u0079\u0065\u0020\u0045\u0073\u0074", "\u004D\u0079\u0073\u0020\u0047\u0077\u0079\u006E\u0067\u0061\u006C\u0061", "\u004D\u0079\u0073\u0020\u0048\u0065\u0064\u0072\u0061", "\u004D\u0079\u0073\u0020\u0044\u0075", "\u004D\u0079\u0073\u0020\u004B\u0065\u0076\u0061\u0072\u0064\u0068\u0075"], 
								month_names_short : ["\u0047\u0065\u006E", "\u0057\u0068\u0065", "\u004D\u0065\u0072", "\u0045\u0062\u0072", "\u004D\u0065", "\u0045\u0076\u006E", "\u0047\u006F\u0072", "\u0045\u0073\u0074", "\u0047\u0077\u006E", "\u0048\u0065\u0064", "\u0044\u0075", "\u004B\u0065\u0076"], 
								month_names_narrow : ["\u0047\u0065\u006E", "\u0057\u0068\u0065", "\u004D\u0065\u0072", "\u0045\u0062\u0072", "\u004D\u0065", "\u0045\u0076\u006E", "\u0047\u006F\u0072", "\u0045\u0073\u0074", "\u0047\u0077\u006E", "\u0048\u0065\u0064", "\u0044\u0075", "\u004B\u0065\u0076"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.kw_GB;
					}
					break;
				case "ky":
				case "ky_KG":
				case "ky_kg":
					{

						if (!nexacro.Locale.ky_KG) {
							nexacro.Locale.ky_KG = {
								name : "ky_KG", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004B\u0047\u0053\u0020", 
								currency_symbol : "\u0441\u043E\u043C", 
								mon_decimal_point : "\u002D", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0436\u0435\u043A\u0448\u0435\u043C\u0431\u0438", "\u0434\u04AF\u0439\u0448\u04E9\u043C\u0431\u04AF", "\u0448\u0435\u0439\u0448\u0435\u043C\u0431\u0438", "\u0448\u0430\u0440\u0448\u0435\u043C\u0431\u0438", "\u0431\u0435\u0439\u0448\u0435\u043C\u0431\u0438", "\u0436\u0443\u043C\u0430", "\u0438\u0448\u0435\u043C\u0431\u0438"], 
								weekday_names_short : ["\u0436\u043A", "\u0434\u0448", "\u0448\u0435", "\u0448\u0430", "\u0431\u0448", "\u0436\u043C", "\u0438\u0448"], 
								weekday_names_narrow : ["\u0436\u043A", "\u0434\u0448", "\u0448\u0435", "\u0448\u0430", "\u0431\u0448", "\u0436\u043C", "\u0438\u0448"], 
								month_names_long : ["\u044F\u043D\u0432\u0430\u0440\u044C", "\u0444\u0435\u0432\u0440\u0430\u043B\u044C", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0435\u043B\u044C", "\u043C\u0430\u0439", "\u0438\u044E\u043D\u044C", "\u0438\u044E\u043B\u044C", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u043E\u043A\u0442\u044F\u0431\u0440\u044C", "\u043D\u043E\u044F\u0431\u0440\u044C", "\u0434\u0435\u043A\u0430\u0431\u0440\u044C"], 
								month_names_short : ["\u044F\u043D\u0432", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u0438\u044E\u043D", "\u0438\u044E\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043D", "\u043E\u043A\u0442", "\u043D\u043E\u044F", "\u0434\u0435\u043A"], 
								month_names_narrow : ["\u044F\u043D\u0432", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u0438\u044E\u043D", "\u0438\u044E\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043D", "\u043E\u043A\u0442", "\u043D\u043E\u044F", "\u0434\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0065\u002D\u0025\u0062\u0020\u0025\u0059\u0020\u0436\u002C\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002D\u0025\u0042\u0020\u0025\u0059\u002D\u0025\u0041\u0020\u0436\u002E", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0079", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ky_KG;
					}
					break;
				case "lg":
				case "lg_UG":
				case "lg_ug":
					{

						if (!nexacro.Locale.lg_UG) {
							nexacro.Locale.lg_UG = {
								name : "lg_UG", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0055\u0047\u0058\u0020", 
								currency_symbol : "\u002F\u002D", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 0, 
								n_cs_precedes : 0, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0061\u0062\u0069\u0069\u0074\u0069", "\u0042\u0061\u006C\u0061\u007A\u0061", "\u004C\u0077\u0061\u006B\u0075\u0062\u0069\u0072\u0069", "\u004C\u0077\u0061\u006B\u0075\u0073\u0061\u0074\u0075", "\u004C\u0077\u0061\u006B\u0075\u006E\u0061", "\u004C\u0077\u0061\u006B\u0075\u0074\u0061\u0061\u006E\u006F", "\u004C\u0077\u0061\u006D\u0075\u006B\u0061\u0061\u0067\u0061"], 
								weekday_names_short : ["\u0053\u0061\u0062", "\u0042\u0061\u006C", "\u004C\u0077\u0032", "\u004C\u0077\u0033", "\u004C\u0077\u0034", "\u004C\u0077\u0035", "\u004C\u0077\u0036"], 
								weekday_names_narrow : ["\u0053\u0061\u0062", "\u0042\u0061\u006C", "\u004C\u0077\u0032", "\u004C\u0077\u0033", "\u004C\u0077\u0034", "\u004C\u0077\u0035", "\u004C\u0077\u0036"], 
								month_names_long : ["\u004A\u0061\u006E\u0077\u0061\u006C\u0069\u0079\u006F", "\u0046\u0065\u0062\u0077\u0061\u006C\u0069\u0079\u006F", "\u004D\u0061\u0072\u0069\u0073\u0069", "\u0041\u0070\u0075\u006C\u0069", "\u004D\u0061\u0061\u0079\u0069", "\u004A\u0075\u0075\u006E\u0069", "\u004A\u0075\u006C\u0061\u0061\u0069", "\u0041\u0067\u0075\u0073\u0069\u0074\u006F", "\u0053\u0065\u0062\u0075\u0074\u0074\u0065\u006D\u0062\u0061", "\u004F\u006B\u0069\u0074\u006F\u0062\u0062\u0061", "\u004E\u006F\u0076\u0065\u006D\u0062\u0061", "\u0044\u0065\u0073\u0065\u006D\u0062\u0061"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0075", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0062", "\u004F\u006B\u0069", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0070\u0075", "\u004D\u0061\u0061", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u0075", "\u0053\u0065\u0062", "\u004F\u006B\u0069", "\u004E\u006F\u0076", "\u0044\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.lg_UG;
					}
					break;
				case "lo":
				case "lo_LA":
				case "lo_la":
					{

						if (!nexacro.Locale.lo_LA) {
							nexacro.Locale.lo_LA = {
								name : "lo_LA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004C\u0041\u004B\u0020", 
								currency_symbol : "\u20AD", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 2, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0EAD\u0EB2\u0E97\u0EB4\u0E94", "\u0E88\u0EB1\u0E99", "\u0EAD\u0EB1\u0E87\u0E84\u0EB2\u0E99", "\u0E9E\u0EB8\u0E94", "\u0E9E\u0EB0\u0EAB\u0EB1\u0E94", "\u0EAA\u0EB8\u0E81", "\u0EC0\u0EAA\u0EBB\u0EB2"], 
								weekday_names_short : ["\u0EAD\u0EB2\u002E", "\u0E88\u002E", "\u0E84\u002E", "\u0E9E\u002E", "\u0E9E\u0EAB\u002E", "\u0EAA\u002E", "\u0EAA\u002E"], 
								weekday_names_narrow : ["\u0EAD\u0EB2\u002E", "\u0E88\u002E", "\u0E84\u002E", "\u0E9E\u002E", "\u0E9E\u0EAB\u002E", "\u0EAA\u002E", "\u0EAA\u002E"], 
								month_names_long : ["\u0EA1\u0EB1\u0E87\u0E81\u0EAD\u0E99", "\u0E81\u0EB8\u0EA1\u0E9F\u0EB2", "\u0EA1\u0EB5\u0E99\u0EB2", "\u0EC0\u0EA1\u0EAA\u0EB2", "\u0E9E\u0EB6\u0E94\u0EAA\u0EB0\u0E9E\u0EB2", "\u0EA1\u0EB4\u0E96\u0EB8\u0E99\u0EB2", "\u0E81\u0ECD\u0EA5\u0EB0\u0E81\u0EBB\u0E94", "\u0EAA\u0EB4\u0E87\u0EAB\u0EB2", "\u0E81\u0EB1\u0E99\u0E8D\u0EB2", "\u0E95\u0EB8\u0EA5\u0EB2", "\u0E9E\u0EB0\u0E88\u0EB4\u0E81", "\u0E97\u0EB1\u0E99\u0EA7\u0EB2"], 
								month_names_short : ["\u0EA1\u002E\u0E81\u002E", "\u0E81\u002E\u0E9E\u002E", "\u0EA1\u002E\u0E99\u002E", "\u0EA1\u002E\u0EAA\u002E", "\u0E9E\u002E\u0E9E\u002E", "\u0EA1\u0EB4\u002E\u0E96\u002E", "\u0E81\u002E\u0EA5\u002E", "\u0EAA\u002E\u0EAB\u002E", "\u0E81\u002E\u0E8D\u002E", "\u0E95\u002E\u0EA5\u002E", "\u0E9E\u002E\u0E88\u002E", "\u0E97\u002E\u0EA7\u002E"], 
								month_names_narrow : ["\u0EA1\u002E\u0E81\u002E", "\u0E81\u002E\u0E9E\u002E", "\u0EA1\u002E\u0E99\u002E", "\u0EA1\u002E\u0EAA\u002E", "\u0E9E\u002E\u0E9E\u002E", "\u0EA1\u0EB4\u002E\u0E96\u002E", "\u0E81\u002E\u0EA5\u002E", "\u0EAA\u002E\u0EAB\u002E", "\u0E81\u002E\u0E8D\u002E", "\u0E95\u002E\u0EA5\u002E", "\u0E9E\u002E\u0E88\u002E", "\u0E97\u002E\u0EA7\u002E"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "%d\u002F%m\u002F%Ey", 
								time_format : "%H\u003A%M\u003A%S", 
								time_format_ampm : "%I\u003A%M\u003A%S\u0020%p", 
								date_time_format : "%a\u0020%e\u0020%b\u0020%Ey\u002C\u0020%H\u003A%M\u003A%S", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0045\u0079\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.lo_LA;
					}
					break;
				case "lt":
				case "lt_LT":
				case "lt_lt":
					{

						if (!nexacro.Locale.lt_LT) {
							nexacro.Locale.lt_LT = {
								name : "lt_LT", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004C\u0054\u004C\u0020", 
								currency_symbol : "\u004C\u0074", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0065\u006B\u006D\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0050\u0069\u0072\u006D\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0041\u006E\u0074\u0072\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0054\u0072\u0065\u010D\u0069\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u004B\u0065\u0074\u0076\u0069\u0072\u0074\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0050\u0065\u006E\u006B\u0074\u0061\u0064\u0069\u0065\u006E\u0069\u0073", "\u0160\u0065\u0161\u0074\u0061\u0064\u0069\u0065\u006E\u0069\u0073"], 
								weekday_names_short : ["\u0053\u006B", "\u0050\u0072", "\u0041\u006E", "\u0054\u0072", "\u004B\u0074", "\u0050\u006E", "\u0160\u0074"], 
								weekday_names_narrow : ["\u0053\u006B", "\u0050\u0072", "\u0041\u006E", "\u0054\u0072", "\u004B\u0074", "\u0050\u006E", "\u0160\u0074"], 
								month_names_long : ["\u0073\u0061\u0075\u0073\u0069\u006F", "\u0076\u0061\u0073\u0061\u0072\u0069\u006F", "\u006B\u006F\u0076\u006F", "\u0062\u0061\u006C\u0061\u006E\u0064\u017E\u0069\u006F", "\u0067\u0065\u0067\u0075\u017E\u0117\u0073", "\u0062\u0069\u0072\u017E\u0065\u006C\u0069\u006F", "\u006C\u0069\u0065\u0070\u006F\u0073", "\u0072\u0075\u0067\u0070\u006A\u016B\u010D\u0069\u006F", "\u0072\u0075\u0067\u0073\u0117\u006A\u006F", "\u0073\u0070\u0061\u006C\u0069\u006F", "\u006C\u0061\u0070\u006B\u0072\u0069\u010D\u0069\u006F", "\u0067\u0072\u0075\u006F\u0064\u017E\u0069\u006F"], 
								month_names_short : ["\u0053\u0061\u0075", "\u0056\u0061\u0073", "\u004B\u006F\u0076", "\u0042\u0061\u006C", "\u0047\u0065\u0067", "\u0042\u0069\u0072", "\u004C\u0069\u0065", "\u0052\u0067\u0070", "\u0052\u0067\u0073", "\u0053\u0070\u0061", "\u004C\u0061\u0070", "\u0047\u0072\u0064"], 
								month_names_narrow : ["\u0053\u0061\u0075", "\u0056\u0061\u0073", "\u004B\u006F\u0076", "\u0042\u0061\u006C", "\u0047\u0065\u0067", "\u0042\u0069\u0072", "\u004C\u0069\u0065", "\u0052\u0067\u0070", "\u0052\u0067\u0073", "\u0053\u0070\u0061", "\u004C\u0061\u0070", "\u0047\u0072\u0064"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0059\u0020\u006D\u002E\u0020\u0025\u0042\u0020\u0025\u0064\u0020\u0064\u002E\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u0020\\\u006D\u002E\u0020\u0025\u0042\u0020\u0025\u0065\u0020\\\u0064\u002E", 
								shortdate_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.lt_LT;
					}
					break;
				case "lv":
				case "lv_LV":
				case "lv_lv":
					{

						if (!nexacro.Locale.lv_LV) {
							nexacro.Locale.lv_LV = {
								name : "lv_LV", 
								decimal_point : "\u002C", 
								thousands_sep : "\u00A0", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004C\u0056\u004C\u0020", 
								currency_symbol : "\u004C\u0073", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 3, 
								n_sign_posn : 3, 
								weekday_names_long : ["\u0073\u0076\u0113\u0074\u0064\u0069\u0065\u006E\u0061", "\u0070\u0069\u0072\u006D\u0064\u0069\u0065\u006E\u0061", "\u006F\u0074\u0072\u0064\u0069\u0065\u006E\u0061", "\u0074\u0072\u0065\u0161\u0064\u0069\u0065\u006E\u0061", "\u0063\u0065\u0074\u0075\u0072\u0074\u0064\u0069\u0065\u006E\u0061", "\u0070\u0069\u0065\u006B\u0074\u0064\u0069\u0065\u006E\u0061", "\u0073\u0065\u0073\u0074\u0064\u0069\u0065\u006E\u0061"], 
								weekday_names_short : ["\u0053\u0076", "\u0050\u00A0", "\u004F\u00A0", "\u0054\u00A0", "\u0043\u00A0", "\u0050\u006B", "\u0053\u00A0"], 
								weekday_names_narrow : ["\u0053\u0076", "\u0050\u00A0", "\u004F\u00A0", "\u0054\u00A0", "\u0043\u00A0", "\u0050\u006B", "\u0053\u00A0"], 
								month_names_long : ["\u006A\u0061\u006E\u0076\u0101\u0072\u0069\u0073", "\u0066\u0065\u0062\u0072\u0075\u0101\u0072\u0069\u0073", "\u006D\u0061\u0072\u0074\u0073", "\u0061\u0070\u0072\u012B\u006C\u0069\u0073", "\u006D\u0061\u0069\u006A\u0073", "\u006A\u016B\u006E\u0069\u006A\u0073", "\u006A\u016B\u006C\u0069\u006A\u0073", "\u0061\u0075\u0067\u0075\u0073\u0074\u0073", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0069\u0073", "\u006F\u006B\u0074\u006F\u0062\u0072\u0069\u0073", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0069\u0073", "\u0064\u0065\u0063\u0065\u006D\u0062\u0072\u0069\u0073"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u016B\u006E", "\u006A\u016B\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u016B\u006E", "\u006A\u016B\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064\u002E", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "%A\u002C %Y\u002E \u0067\u0061\u0064\u0061 %e\u002E %B\u002C \u0070\u006C\u006B\u0073\u0074\u002E %H \u0075\u006E %M", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0059\u002E\u0020\u0067\u0061\\\u0064\u0061\u0020\u0025\u0065\u002E\u0020\u0025\u0042", 
								shortdate_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064\u002E", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.lv_LV;
					}
					break;
				case "mg":
				case "mg_MG":
				case "mg_mg":
					{

						if (!nexacro.Locale.mg_MG) {
							nexacro.Locale.mg_MG = {
								name : "mg_MG", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u004D\u0047\u0041\u0020", 
								currency_symbol : "\u0041\u0052", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0061\u006C\u0061\u0068\u0061\u0064\u0079", "\u0061\u006C\u0061\u0074\u0073\u0069\u006E\u0061\u0069\u006E\u0079", "\u0074\u0061\u006C\u0061\u0074\u0061", "\u0061\u006C\u0061\u0072\u006F\u0062\u0069\u0061", "\u0061\u006C\u0061\u006B\u0061\u006D\u0069\u0073\u0079", "\u007A\u006F\u006D\u0061", "\u0073\u0061\u0062\u006F\u0074\u0073\u0079"], 
								weekday_names_short : ["\u006C\u0068\u0064", "\u006C\u0074\u0073", "\u0074\u006C\u0074", "\u006C\u0072\u0062", "\u006C\u006B\u006D", "\u007A\u006F\u006D", "\u0073\u0061\u0062"], 
								weekday_names_narrow : ["\u006C\u0068\u0064", "\u006C\u0074\u0073", "\u0074\u006C\u0074", "\u006C\u0072\u0062", "\u006C\u006B\u006D", "\u007A\u006F\u006D", "\u0073\u0061\u0062"], 
								month_names_long : ["\u006A\u0061\u006E\u006F\u0061\u0072\u0079", "\u0066\u0065\u0062\u0072\u006F\u0061\u0072\u0079", "\u006D\u0061\u0072\u0074\u0073\u0061", "\u0061\u0070\u0072\u0069\u006C\u0079", "\u006D\u0065\u0079", "\u006A\u006F\u006E\u0061", "\u006A\u006F\u006C\u0061\u0079", "\u0061\u006F\u0067\u006F\u0073\u0069\u0074\u0072\u0061", "\u0073\u0065\u0070\u0074\u0061\u006D\u0062\u0072\u0061", "\u006F\u006B\u0074\u006F\u0062\u0072\u0061", "\u006E\u006F\u0076\u0061\u006D\u0062\u0072\u0061", "\u0064\u0065\u0073\u0061\u006D\u0062\u0072\u0061"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0065\u0079", "\u006A\u006F\u006E", "\u006A\u006F\u006C", "\u0061\u006F\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0065\u0079", "\u006A\u006F\u006E", "\u006A\u006F\u006C", "\u0061\u006F\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.mg_MG;
					}
					break;
				case "mi":
				case "mi_NZ":
				case "mi_nz":
					{

						if (!nexacro.Locale.mi_NZ) {
							nexacro.Locale.mi_NZ = {
								name : "mi_NZ", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004E\u005A\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0052\u0101\u0074\u0061\u0070\u0075", "\u004D\u0061\u006E\u0065", "\u0054\u016B\u0072\u0065\u0069", "\u0057\u0065\u006E\u0065\u0072\u0065\u0069", "\u0054\u0101\u0069\u0074\u0065", "\u0050\u0061\u0072\u0061\u0069\u0072\u0065", "\u0048\u0101\u0074\u0061\u0072\u0065\u0069"], 
								weekday_names_short : ["\u0054\u0061", "\u004D\u0061", "\u0054\u016B", "\u0057\u0065", "\u0054\u0101\u0069", "\u0050\u0061", "\u0048\u0101"], 
								weekday_names_narrow : ["\u0054\u0061", "\u004D\u0061", "\u0054\u016B", "\u0057\u0065", "\u0054\u0101\u0069", "\u0050\u0061", "\u0048\u0101"], 
								month_names_long : ["\u004B\u006F\u0068\u0069\u002D\u0074\u0101\u0074\u0065\u0061", "\u0048\u0075\u0069\u002D\u0074\u0061\u006E\u0067\u0075\u0072\u0075", "\u0050\u006F\u0075\u0074\u016B\u002D\u0074\u0065\u002D\u0072\u0061\u006E\u0067\u0069", "\u0050\u0061\u0065\u006E\u0067\u0061\u002D\u0077\u0068\u0101\u0077\u0068\u0101", "\u0048\u0061\u0072\u0061\u0074\u0075\u0061", "\u0050\u0069\u0070\u0069\u0072\u0069", "\u0048\u014D\u006E\u0067\u006F\u0069\u006E\u0067\u006F\u0069", "\u0048\u0065\u0072\u0065\u002D\u0074\u0075\u0072\u0069\u002D\u006B\u014D\u006B\u0101", "\u004D\u0061\u0068\u0075\u0072\u0075", "\u0057\u0068\u0069\u0072\u0069\u006E\u0067\u0061\u002D\u0101\u002D\u006E\u0075\u006B\u0075", "\u0057\u0068\u0069\u0072\u0069\u006E\u0067\u0061\u002D\u0101\u002D\u0072\u0061\u006E\u0067\u0069", "\u0048\u0061\u006B\u0069\u0068\u0065\u0061"], 
								month_names_short : ["\u004B\u006F\u0068\u0069", "\u0048\u0075\u0069", "\u0050\u006F\u0075", "\u0050\u0061\u0065", "\u0048\u0061\u0072\u0061", "\u0050\u0069\u0070\u0069", "\u0048\u014D\u006E\u0067\u006F\u0069", "\u0048\u0065\u0072\u0065", "\u004D\u0061\u0068\u0075", "\u0057\u0068\u0069\u002D\u006E\u0075", "\u0057\u0068\u0069\u002D\u0072\u0061", "\u0048\u0061\u006B\u0069"], 
								month_names_narrow : ["\u004B\u006F\u0068\u0069", "\u0048\u0075\u0069", "\u0050\u006F\u0075", "\u0050\u0061\u0065", "\u0048\u0061\u0072\u0061", "\u0050\u0069\u0070\u0069", "\u0048\u014D\u006E\u0067\u006F\u0069", "\u0048\u0065\u0072\u0065", "\u004D\u0061\u0068\u0075", "\u0057\u0068\u0069\u002D\u006E\u0075", "\u0057\u0068\u0069\u002D\u0072\u0061", "\u0048\u0061\u006B\u0069"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0054\u0065\u0020\u0025\u0041\u002C\u0020\u0074\u0065\u0020\u0025\u0064\u0020\u006F\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.mi_NZ;
					}
					break;
				case "mk":
				case "mk_MK":
				case "mk_mk":
					{

						if (!nexacro.Locale.mk_MK) {
							nexacro.Locale.mk_MK = {
								name : "mk_MK", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004D\u004B\u0044\u0020", 
								currency_symbol : "\u0434\u0435\u043D\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u043D\u0435\u0434\u0435\u043B\u0430", "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A", "\u0432\u0442\u043E\u0440\u043D\u0438\u043A", "\u0441\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0440\u0442\u043E\u043A", "\u043F\u0435\u0442\u043E\u043A", "\u0441\u0430\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0432\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0430\u0431"], 
								weekday_names_narrow : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0432\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0430\u0431"], 
								month_names_long : ["\u0458\u0430\u043D\u0443\u0430\u0440\u0438", "\u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0458", "\u0458\u0443\u043D\u0438", "\u0458\u0443\u043B\u0438", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0432\u0440\u0438", "\u043E\u043A\u0442\u043E\u043C\u0432\u0440\u0438", "\u043D\u043E\u0435\u043C\u0432\u0440\u0438", "\u0434\u0435\u043A\u0435\u043C\u0432\u0440\u0438"], 
								month_names_short : ["\u0458\u0430\u043D", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
								month_names_narrow : ["\u0458\u0430\u043D", "\u0444\u0435\u0432", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0435", "\u0434\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.mk_MK;
					}
					break;
				case "ml":
				case "ml_IN":
				case "ml_in":
					{

						if (!nexacro.Locale.ml_IN) {
							nexacro.Locale.ml_IN = {
								name : "ml_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0D15", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0D1E\u0D3E\u0D2F\u0D30\u0D4D\u200D", "\u0D24\u0D3F\u0D19\u0D4D\u0D15\u0D33\u0D4D\u200D", "\u0D1A\u0D4A\u0D35\u0D4D\u0D35", "\u0D2C\u0D41\u0D27\u0D28\u0D4D\u200D", "\u0D35\u0D4D\u0D2F\u0D3E\u0D34\u0D02", "\u0D35\u0D46\u0D33\u0D4D\u0D33\u0D3F", "\u0D36\u0D28\u0D3F"], 
								weekday_names_short : ["\u0D1E\u0D3E", "\u0D24\u0D3F", "\u0D1A\u0D4A", "\u0D2C\u0D41", "\u0D35\u0D4D\u0D2F\u0D3E", "\u0D35\u0D46", "\u0D36"], 
								weekday_names_narrow : ["\u0D1E\u0D3E", "\u0D24\u0D3F", "\u0D1A\u0D4A", "\u0D2C\u0D41", "\u0D35\u0D4D\u0D2F\u0D3E", "\u0D35\u0D46", "\u0D36"], 
								month_names_long : ["\u0D1C\u0D28\u0D41\u0D35\u0D30\u0D3F", "\u0D2B\u0D46\u0D2C\u0D4D\u0D30\u0D41\u0D35\u0D30\u0D3F", "\u0D2E\u0D3E\u0D30\u0D4D\u200D\u0D1A\u0D4D\u0D1A\u0D4D", "\u0D0F\u0D2A\u0D4D\u0D30\u0D3F\u0D32\u0D4D\u200D\u0020", "\u0D2E\u0D46\u0D2F\u0D4D", "\u0D1C\u0D42\u0D23\u0D4D\u200D", "\u0D1C\u0D42\u0D32\u0D48", "\u0D06\u0D17\u0D38\u0D4D\u0D31\u0D4D\u0D31\u0D4D", "\u0D38\u0D46\u0D2A\u0D4D\u0D31\u0D4D\u0D31\u0D02\u0D2C\u0D30\u0D4D\u200D", "\u0D12\u0D15\u0D4D\u0D1F\u0D4B\u0D2C\u0D30\u0D4D\u200D", "\u0D28\u0D35\u0D02\u0D2C\u0D30\u0D4D\u200D", "\u0D21\u0D3F\u0D38\u0D02\u0D2C\u0D30\u0D4D\u200D"], 
								month_names_short : ["\u0D1C\u0D28\u0D41", "\u0D2B\u0D46\u0D2C\u0D4D", "\u0D2E\u0D3E\u0D30\u0D4D\u200D", "\u0D0F\u0D2A\u0D4D\u0D30", "\u0D2E\u0D46", "\u0D1C\u0D42\u0D23\u0D4D\u200D", "\u0D1C\u0D42\u0D32\u0D48", "\u0D06\u0D17\u0D4D", "\u0D38\u0D46\u0D2A\u0D4D", "\u0D12\u0D15\u0D4D\u0D1F\u0D4B", "\u0D28\u0D35\u0D02", "\u0D21\u0D3F\u0D38\u0D02"], 
								month_names_narrow : ["\u0D1C\u0D28\u0D41", "\u0D2B\u0D46\u0D2C\u0D4D", "\u0D2E\u0D3E\u0D30\u0D4D\u200D", "\u0D0F\u0D2A\u0D4D\u0D30", "\u0D2E\u0D46", "\u0D1C\u0D42\u0D23\u0D4D\u200D", "\u0D1C\u0D42\u0D32\u0D48", "\u0D06\u0D17\u0D4D", "\u0D38\u0D46\u0D2A\u0D4D", "\u0D12\u0D15\u0D4D\u0D1F\u0D4B", "\u0D28\u0D35\u0D02", "\u0D21\u0D3F\u0D38\u0D02"], 
								ampm : ["\u0D30\u0D3E\u0D35\u0D3F\u0D32\u0D46", "\u0D35\u0D48\u0D15\u0D41"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ml_IN;
					}
					break;
				case "mn":
				case "mn_MN":
				case "mn_mn":
					{

						if (!nexacro.Locale.mn_MN) {
							nexacro.Locale.mn_MN = {
								name : "mn_MN", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004D\u004E\u0054\u0020", 
								currency_symbol : "\u20AE", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u041D\u044F\u043C", "\u0414\u0430\u0432\u0430\u0430", "\u041C\u044F\u0433\u043C\u0430\u0440", "\u041B\u0445\u0430\u0433\u0432\u0430", "\u041F\u04AF\u0440\u044D\u0432", "\u0411\u0430\u0430\u0441\u0430\u043D", "\u0411\u044F\u043C\u0431\u0430"], 
								weekday_names_short : ["\u041D\u044F", "\u0414\u0430", "\u041C\u044F", "\u041B\u0445", "\u041F\u04AF", "\u0411\u0430", "\u0411\u044F"], 
								weekday_names_narrow : ["\u041D\u044F", "\u0414\u0430", "\u041C\u044F", "\u041B\u0445", "\u041F\u04AF", "\u0411\u0430", "\u0411\u044F"], 
								month_names_long : ["\u0425\u0443\u043B\u0433\u0430\u043D\u0430\u0020\u0441\u0430\u0440\u044B\u043D", "\u04AE\u0445\u044D\u0440\u0020\u0441\u0430\u0440\u044B\u043D", "\u0411\u0430\u0440\u0020\u0441\u0430\u0440\u044B\u043D", "\u0422\u0443\u0443\u043B\u0430\u0439\u0020\u0441\u0430\u0440\u044B\u043D", "\u041B\u0443\u0443\u0020\u0441\u0430\u0440\u044B\u043D", "\u041C\u043E\u0433\u043E\u0439\u0020\u0441\u0430\u0440\u044B\u043D", "\u041C\u043E\u0440\u044C\u0020\u0441\u0430\u0440\u044B\u043D", "\u0425\u043E\u043D\u044C\u0020\u0441\u0430\u0440\u044B\u043D", "\u0411\u0438\u0447\u0020\u0441\u0430\u0440\u044B\u043D", "\u0422\u0430\u0445\u0438\u0430\u0020\u0441\u0430\u0440\u044B\u043D", "\u041D\u043E\u0445\u043E\u0439\u0020\u0441\u0430\u0440\u044B\u043D", "\u0413\u0430\u0445\u0430\u0439\u0020\u0441\u0430\u0440\u044B\u043D"], 
								month_names_short : ["\u0425\u0443\u043B", "\u04AE\u0445\u044D", "\u0411\u0430\u0440", "\u0422\u0443\u0443", "\u041B\u0443\u0443", "\u041C\u043E\u0433", "\u041C\u043E\u0440", "\u0425\u043E\u043D", "\u0411\u0438\u0447", "\u0422\u0430\u0445", "\u041D\u043E\u0445", "\u0413\u0430\u0445"], 
								month_names_narrow : ["\u0425\u0443\u043B", "\u04AE\u0445\u044D", "\u0411\u0430\u0440", "\u0422\u0443\u0443", "\u041B\u0443\u0443", "\u041C\u043E\u0433", "\u041C\u043E\u0440", "\u0425\u043E\u043D", "\u0411\u0438\u0447", "\u0422\u0430\u0445", "\u041D\u043E\u0445", "\u0413\u0430\u0445"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002E\u0025\u006D\u002E\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u002C\u0020\u0025\u0061\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u005A\u0020\u0025\u0059\u0020\u043E\u043D\u044B\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0061\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.mn_MN;
					}
					break;
				case "mr":
				case "mr_IN":
				case "mr_in":
					{

						if (!nexacro.Locale.mr_IN) {
							nexacro.Locale.mr_IN = {
								name : "mr_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0930\u0941", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0930\u0935\u093F\u0935\u093E\u0930", "\u0938\u094B\u092E\u0935\u093E\u0930", "\u092E\u0902\u0917\u0933\u0935\u093E\u0930", "\u092E\u0902\u0917\u0933\u0935\u093E\u0930", "\u0917\u0941\u0930\u0941\u0935\u093E\u0930", "\u0936\u0941\u0915\u094D\u0930\u0935\u093E\u0930", "\u0936\u0928\u093F\u0935\u093E\u0930"], 
								weekday_names_short : ["\u0930\u0935\u093F", "\u0938\u094B\u092E", "\u092E\u0902\u0917\u0933", "\u092C\u0941\u0927", "\u0917\u0941\u0930\u0941", "\u0936\u0941\u0915\u094D\u0930", "\u0936\u0928\u093F"], 
								weekday_names_narrow : ["\u0930\u0935\u093F", "\u0938\u094B\u092E", "\u092E\u0902\u0917\u0933", "\u092C\u0941\u0927", "\u0917\u0941\u0930\u0941", "\u0936\u0941\u0915\u094D\u0930", "\u0936\u0928\u093F"], 
								month_names_long : ["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940", "\u092B\u0947\u092C\u0943\u0935\u093E\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u090F\u092A\u094D\u0930\u093F\u0932", "\u092E\u0947", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u0948", "\u0913\u0917\u0938\u094D\u091F", "\u0938\u0947\u092A\u094D\u091F\u0947\u0902\u092C\u0930", "\u0913\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930", "\u0921\u093F\u0938\u0947\u0902\u092C\u0930"], 
								month_names_short : ["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940", "\u092B\u0947\u092C\u0943\u0935\u093E\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u090F\u092A\u094D\u0930\u093F\u0932", "\u092E\u0947", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u0948", "\u0913\u0917\u0938\u094D\u091F", "\u0938\u0947\u092A\u094D\u091F\u0947\u0902\u092C\u0930", "\u0913\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930", "\u0921\u093F\u0938\u0947\u0902\u092C\u0930"], 
								month_names_narrow : ["\u091C\u093E\u0928\u0947\u0935\u093E\u0930\u0940", "\u092B\u0947\u092C\u0943\u0935\u093E\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u090F\u092A\u094D\u0930\u093F\u0932", "\u092E\u0947", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u0948", "\u0913\u0917\u0938\u094D\u091F", "\u0938\u0947\u092A\u094D\u091F\u0947\u0902\u092C\u0930", "\u0913\u0915\u094D\u091F\u094B\u092C\u0930", "\u0928\u094B\u0935\u094D\u0939\u0947\u0902\u092C\u0930", "\u0921\u093F\u0938\u0947\u0902\u092C\u0930"], 
								ampm : ["\u092E\u002E\u092A\u0942\u002E", "\u092E\u002E\u0928\u0902\u002E"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.mr_IN;
					}
					break;
				case "ms":
				case "ms_MY":
				case "ms_my":
					{

						if (!nexacro.Locale.ms_MY) {
							nexacro.Locale.ms_MY = {
								name : "ms_MY", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004D\u0059\u0052\u0020", 
								currency_symbol : "\u0052\u004D", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 0, 
								weekday_names_long : ["\u0041\u0068\u0061\u0064", "\u0049\u0073\u006E\u0069\u006E", "\u0053\u0065\u006C\u0061\u0073\u0061", "\u0052\u0061\u0062\u0075", "\u004B\u0068\u0061\u006D\u0069\u0073", "\u004A\u0075\u006D\u0061\u0061\u0074", "\u0053\u0061\u0062\u0074\u0075"], 
								weekday_names_short : ["\u0041\u0068\u0064", "\u0049\u0073\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0068\u0061", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u0041\u0068\u0064", "\u0049\u0073\u006E", "\u0053\u0065\u006C", "\u0052\u0061\u0062", "\u004B\u0068\u0061", "\u004A\u0075\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u004A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0046\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u004D\u0061\u0063", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C\u0061\u0069", "\u004F\u0067\u006F\u0073", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u004F\u006B\u0074\u006F\u0062\u0065\u0072", "\u004E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0044\u0069\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0063", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u004F\u0067\u006F\u0073", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u0073"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0063", "\u0041\u0070\u0072", "\u004D\u0065\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u004F\u0067\u006F\u0073", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ms_MY;
					}
					break;
				case "mt":
				case "mt_MT":
				case "mt_mt":
					{

						if (!nexacro.Locale.mt_MT) {
							nexacro.Locale.mt_MT = {
								name : "mt_MT", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004D\u0054\u004C\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0069\u006C\u002D\u0126\u0061\u0064\u0064", "\u0069\u0074\u002D\u0054\u006E\u0065\u006A\u006E", "\u0069\u0074\u002D\u0054\u006C\u0069\u0065\u0074\u0061", "\u006C\u002D\u0045\u0072\u0062\u0067\u0127\u0061", "\u0069\u006C\u002D\u0126\u0061\u006D\u0069\u0073", "\u0069\u006C\u002D\u0120\u0069\u006D\u0067\u0127\u0061", "\u0069\u0073\u002D\u0053\u0069\u0062\u0074"], 
								weekday_names_short : ["\u0126\u0061\u0064", "\u0054\u006E\u0065", "\u0054\u006C\u0069", "\u0045\u0072\u0062", "\u0126\u0061\u006D", "\u0120\u0069\u006D", "\u0053\u0069\u0062"], 
								weekday_names_narrow : ["\u0126\u0061\u0064", "\u0054\u006E\u0065", "\u0054\u006C\u0069", "\u0045\u0072\u0062", "\u0126\u0061\u006D", "\u0120\u0069\u006D", "\u0053\u0069\u0062"], 
								month_names_long : ["\u004A\u0061\u006E\u006E\u0061\u0072", "\u0046\u0072\u0061\u0072", "\u004D\u0061\u0072\u007A\u0075", "\u0041\u0070\u0072\u0069\u006C", "\u004D\u0065\u006A\u006A\u0075", "\u0120\u0075\u006E\u006A\u0075", "\u004C\u0075\u006C\u006A\u0075", "\u0041\u0077\u0069\u0073\u0073\u0075", "\u0053\u0065\u0074\u0074\u0065\u006D\u0062\u0072\u0075", "\u004F\u0074\u0074\u0075\u0062\u0072\u0075", "\u004E\u006F\u0076\u0065\u006D\u0062\u0072\u0075", "\u0044\u0069\u010B\u0065\u006D\u0062\u0072\u0075\u0020"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0072\u0061", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u006A", "\u0120\u0075\u006E", "\u004C\u0075\u006C", "\u0041\u0077\u0069", "\u0053\u0065\u0074", "\u004F\u0074\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u010B"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0072\u0061", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0065\u006A", "\u0120\u0075\u006E", "\u004C\u0075\u006C", "\u0041\u0077\u0069", "\u0053\u0065\u0074", "\u004F\u0074\u0074", "\u004E\u006F\u0076", "\u0044\u0069\u010B"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0074\u0061\u0020\u0025\u0062\u002C\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0074\u0061\u0020\u0025\u0062\u002C\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0074\u0061\u0027\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.mt_MT;
					}
					break;
				case "nb":
				case "nb_NO":
				case "nb_no":
					{

						if (!nexacro.Locale.nb_NO) {
							nexacro.Locale.nb_NO = {
								name : "nb_NO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004E\u004F\u004B\u0020", 
								currency_symbol : "\u006B\u0072", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u00F8\u006E\u0064\u0061\u0067", "\u006D\u0061\u006E\u0064\u0061\u0067", "\u0074\u0069\u0072\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F8\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
								weekday_names_narrow : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.nb_NO;
					}
					break;
				case "ne":
				case "ne_NP":
				case "ne_np":
					{

						if (!nexacro.Locale.ne_NP) {
							nexacro.Locale.ne_NP = {
								name : "ne_NP", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0930\u0942", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0906\u0907\u0924\u092C\u093E\u0930\u0020", "\u0938\u094B\u092E\u092C\u093E\u0930\u0020", "\u092E\u0902\u0917\u0932\u092C\u093E\u0930\u0020", "\u092C\u0941\u0927\u092C\u093E\u0930\u0020", "\u092C\u093F\u0939\u093F\u092C\u093E\u0930\u0020", "\u0936\u0941\u0915\u094D\u0930\u092C\u093E\u0930\u0020", "\u0936\u0928\u093F\u092C\u093E\u0930\u0020"], 
								weekday_names_short : ["\u0906\u0907\u0924\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u092C\u093F\u0939\u093F\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
								weekday_names_narrow : ["\u0906\u0907\u0924\u0020", "\u0938\u094B\u092E\u0020", "\u092E\u0902\u0917\u0932\u0020", "\u092C\u0941\u0927\u0020", "\u092C\u093F\u0939\u093F\u0020", "\u0936\u0941\u0915\u094D\u0930\u0020", "\u0936\u0928\u093F\u0020"], 
								month_names_long : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
								month_names_short : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
								month_names_narrow : ["\u091C\u0928\u0935\u0930\u0940", "\u092B\u093C\u0930\u0935\u0930\u0940", "\u092E\u093E\u0930\u094D\u091A", "\u0905\u092A\u094D\u0930\u0947\u0932", "\u092E\u0908", "\u091C\u0942\u0928", "\u091C\u0941\u0932\u093E\u0908", "\u0905\u0917\u0938\u094D\u0924", "\u0938\u093F\u0924\u092E\u094D\u092C\u0930", "\u0905\u0915\u094D\u091F\u0942\u092C\u0930", "\u0928\u0935\u092E\u094D\u092C\u0930", "\u0926\u093F\u0938\u092E\u094D\u092C\u0930"], 
								ampm : ["\u092A\u0942\u0930\u094D\u0935\u093E\u0939\u094D\u0928", "\u0905\u092A\u0930\u093E\u0939\u094D\u0928"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002C\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u006E\u002F\u0025\u0065\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ne_NP;
					}
					break;
				case "nl_BE":
				case "nl_be":
					{

						if (!nexacro.Locale.nl_BE) {
							nexacro.Locale.nl_BE = {
								name : "nl_BE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u007A\u006F\u006E\u0064\u0061\u0067", "\u006D\u0061\u0061\u006E\u0064\u0061\u0067", "\u0064\u0069\u006E\u0073\u0064\u0061\u0067", "\u0077\u006F\u0065\u006E\u0073\u0064\u0061\u0067", "\u0064\u006F\u006E\u0064\u0065\u0072\u0064\u0061\u0067", "\u0076\u0072\u0069\u006A\u0064\u0061\u0067", "\u007A\u0061\u0074\u0065\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
								weekday_names_narrow : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0061\u0072\u0074", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0065\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.nl_BE;
					}
					break;
				case "nl":
				case "nl_NL":
				case "nl_nl":
					{

						if (!nexacro.Locale.nl_NL) {
							nexacro.Locale.nl_NL = {
								name : "nl_NL", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 2, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u007A\u006F\u006E\u0064\u0061\u0067", "\u006D\u0061\u0061\u006E\u0064\u0061\u0067", "\u0064\u0069\u006E\u0073\u0064\u0061\u0067", "\u0077\u006F\u0065\u006E\u0073\u0064\u0061\u0067", "\u0064\u006F\u006E\u0064\u0065\u0072\u0064\u0061\u0067", "\u0076\u0072\u0069\u006A\u0064\u0061\u0067", "\u007A\u0061\u0074\u0065\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
								weekday_names_narrow : ["\u007A\u006F", "\u006D\u0061", "\u0064\u0069", "\u0077\u006F", "\u0064\u006F", "\u0076\u0072", "\u007A\u0061"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0061\u0072\u0074", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0065\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0075\u0073", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0072\u0074", "\u0061\u0070\u0072", "\u006D\u0065\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002D\u0025\u006E\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.nl_NL;
					}
					break;
				case "nn":
				case "nn_NO":
				case "nn_no":
					{

						if (!nexacro.Locale.nn_NO) {
							nexacro.Locale.nn_NO = {
								name : "nn_NO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004E\u004F\u004B\u0020", 
								currency_symbol : "\u006B\u0072", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 3, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u0075\u006E\u0064\u0061\u0067\u0020", "\u006D\u00E5\u006E\u0064\u0061\u0067\u0020", "\u0074\u0079\u0073\u0064\u0061\u0067\u0020", "\u006F\u006E\u0073\u0064\u0061\u0067\u0020", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067\u0020", "\u0066\u0072\u0065\u0064\u0061\u0067\u0020", "\u006C\u0061\u0075\u0072\u0064\u0061\u0067\u0020"], 
								weekday_names_short : ["\u0073\u0075\u0020", "\u006D\u00E5\u0020", "\u0074\u0079\u0020", "\u006F\u006E\u0020", "\u0074\u006F\u0020", "\u0066\u0072\u0020", "\u006C\u0061\u0075\u0020"], 
								weekday_names_narrow : ["\u0073\u0075\u0020", "\u006D\u00E5\u0020", "\u0074\u0079\u0020", "\u006F\u006E\u0020", "\u0074\u006F\u0020", "\u0066\u0072\u0020", "\u006C\u0061\u0075\u0020"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u006B\u006C\u0020\u0025\u0048\u002E\u0025\u004D\u0020\u0025\u005A", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0064\u002E\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u006B\u006C\u0020\u0025\u0048\u002E\u0025\u004D\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u002E\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.nn_NO;
					}
					break;
				case "no":
				case "no_NO":
				case "no_no":
					{

						if (!nexacro.Locale.no_NO) {
							nexacro.Locale.no_NO = {
								name : "no_NO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004E\u004F\u004B\u0020", 
								currency_symbol : "\u006B\u0072", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u00F8\u006E\u0064\u0061\u0067", "\u006D\u0061\u006E\u0064\u0061\u0067", "\u0074\u0069\u0072\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F8\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
								weekday_names_narrow : ["\u0073\u00F8\u006E", "\u006D\u0061\u006E", "\u0074\u0069\u0072", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F8\u0072"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0073\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.no_NO;
					}
					break;
				case "nr":
				case "nr_ZA":
				case "nr_za":
					{

						if (!nexacro.Locale.nr_ZA) {
							nexacro.Locale.nr_ZA = {
								name : "nr_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0075\u0053\u006F\u006E\u0074\u006F", "\u0075\u004D\u0076\u0075\u006C\u006F", "\u0075\u004C\u0065\u0073\u0069\u0062\u0069\u006C\u0069", "\u006C\u0065\u0073\u0069\u0074\u0068\u0061\u0074\u0068\u0075", "\u0075\u004C\u0065\u0073\u0069\u006E\u0065", "\u006E\u0067\u006F\u004C\u0065\u0073\u0069\u0068\u006C\u0061\u006E\u0075", "\u0075\u006D\u0047\u0071\u0069\u0062\u0065\u006C\u006F"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u0076\u0075", "\u0042\u0069\u006C", "\u0054\u0068\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u0047\u0071\u0069"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u0076\u0075", "\u0042\u0069\u006C", "\u0054\u0068\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u0047\u0071\u0069"], 
								month_names_long : ["\u004A\u0061\u006E\u0061\u0062\u0061\u0072\u0069", "\u0075\u0046\u0065\u0062\u0065\u0072\u0062\u0061\u0072\u0069", "\u0075\u004D\u0061\u0074\u006A\u0068\u0069", "\u0075\u002D\u0041\u0070\u0072\u0065\u006C\u0069", "\u004D\u0065\u0079\u0069", "\u004A\u0075\u006E\u0069", "\u004A\u0075\u006C\u0061\u0079\u0069", "\u0041\u0072\u0068\u006F\u0073\u0074\u006F\u0073\u0069", "\u0053\u0065\u0070\u0074\u0065\u006D\u0062\u0061", "\u004F\u006B\u0074\u006F\u0062\u0061", "\u0055\u0073\u0069\u006E\u0079\u0069\u006B\u0068\u0061\u0062\u0061", "\u0044\u0069\u0073\u0065\u006D\u0062\u0061"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0072\u0068", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u0055\u0073\u0069", "\u0044\u0069\u0073"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0062", "\u004D\u0061\u0074", "\u0041\u0070\u0072", "\u004D\u0065\u0079", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0072\u0068", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u0055\u0073\u0069", "\u0044\u0069\u0073"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.nr_ZA;
					}
					break;
				case "oc":
				case "oc_FR":
				case "oc_fr":
					{

						if (!nexacro.Locale.oc_FR) {
							nexacro.Locale.oc_FR = {
								name : "oc_FR", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u006D\u0065\u006E\u0067\u0065", "\u0064\u0069\u006C\u0075\u006E\u0073", "\u0064\u0069\u006D\u0061\u0072\u0073", "\u0064\u0069\u006D\u0065\u0063\u0072\u0065\u0073", "\u0064\u0069\u006A\u00F3\u0075\u0073", "\u0064\u0069\u0076\u0065\u006E\u0064\u0072\u0065\u0073", "\u0064\u0069\u0073\u0061\u0062\u0074\u0065"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0063", "\u006A\u00F3\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u0075\u006E", "\u006D\u0061\u0072", "\u006D\u0065\u0063", "\u006A\u00F3\u0075", "\u0076\u0065\u006E", "\u0073\u0061\u0062"], 
								month_names_long : ["\u0067\u0065\u006E\u0069\u00E8\u0072", "\u0066\u0065\u0062\u0072\u0069\u00E8\u0072", "\u006D\u0061\u0072\u00E7", "\u0061\u0062\u0072\u0069\u0061\u006C", "\u006D\u0061\u0069", "\u006A\u0075\u006E\u0068", "\u006A\u0075\u006C\u0068\u0065\u0074", "\u0061\u0067\u00F3\u0073\u0074", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u0065", "\u006F\u0063\u0074\u006F\u0062\u0072\u0065", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u0065", "\u0064\u0065\u0063\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u00F3", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u0067\u0065\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0062\u0072", "\u006D\u0061\u0069", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0067\u00F3", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.oc_FR;
					}
					break;
				case "om":
				case "om_ET":
				case "om_et":
					{

						if (!nexacro.Locale.om_ET) {
							nexacro.Locale.om_ET = {
								name : "om_ET", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0054\u0042\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0044\u0069\u006C\u0062\u0061\u0074\u0061", "\u0057\u0069\u0069\u0078\u0061\u0074\u0061", "\u0051\u0069\u0062\u0078\u0061\u0074\u0061", "\u0052\u006F\u006F\u0062\u0069\u0069", "\u004B\u0061\u006D\u0069\u0069\u0073\u0061", "\u004A\u0069\u006D\u0061\u0061\u0074\u0061", "\u0053\u0061\u006E\u0062\u0061\u0074\u0061"], 
								weekday_names_short : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
								weekday_names_narrow : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
								month_names_long : ["\u0041\u006D\u0061\u006A\u006A\u0069\u0069", "\u0047\u0075\u0072\u0061\u0061\u006E\u0064\u0068\u0061\u006C\u0061", "\u0042\u0069\u0074\u006F\u006F\u0074\u0065\u0065\u0073\u0073\u0061", "\u0045\u006C\u0062\u0061", "\u0043\u0061\u0061\u006D\u0073\u0061", "\u0057\u0061\u0078\u0061\u0062\u0061\u006A\u006A\u0069\u0069", "\u0041\u0064\u006F\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0048\u0061\u0067\u0061\u0079\u0079\u0061", "\u0046\u0075\u0075\u006C\u0062\u0061\u006E\u0061", "\u004F\u006E\u006B\u006F\u006C\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0053\u0061\u0064\u0061\u0061\u0073\u0061", "\u004D\u0075\u0064\u0064\u0065\u0065"], 
								month_names_short : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
								month_names_narrow : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
								ampm : ["\u0057\u0044", "\u0057\u0042"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.om_ET;
					}
					break;
				case "om_KE":
				case "om_ke":
					{

						if (!nexacro.Locale.om_KE) {
							nexacro.Locale.om_KE = {
								name : "om_KE", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004B\u0045\u0053\u0020", 
								currency_symbol : "\u004B\u0073\u0068", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0044\u0069\u006C\u0062\u0061\u0074\u0061", "\u0057\u0069\u0069\u0078\u0061\u0074\u0061", "\u0051\u0069\u0062\u0078\u0061\u0074\u0061", "\u0052\u006F\u006F\u0062\u0069\u0069", "\u004B\u0061\u006D\u0069\u0069\u0073\u0061", "\u004A\u0069\u006D\u0061\u0061\u0074\u0061", "\u0053\u0061\u006E\u0062\u0061\u0074\u0061"], 
								weekday_names_short : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
								weekday_names_narrow : ["\u0044\u0069\u006C", "\u0057\u0069\u0078", "\u0051\u0069\u0062", "\u0052\u006F\u0062", "\u004B\u0061\u006D", "\u004A\u0069\u006D", "\u0053\u0061\u006E"], 
								month_names_long : ["\u0041\u006D\u0061\u006A\u006A\u0069\u0069", "\u0047\u0075\u0072\u0061\u0061\u006E\u0064\u0068\u0061\u006C\u0061", "\u0042\u0069\u0074\u006F\u006F\u0074\u0065\u0065\u0073\u0073\u0061", "\u0045\u006C\u0062\u0061", "\u0043\u0061\u0061\u006D\u0073\u0061", "\u0057\u0061\u0078\u0061\u0062\u0061\u006A\u006A\u0069\u0069", "\u0041\u0064\u006F\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0048\u0061\u0067\u0061\u0079\u0079\u0061", "\u0046\u0075\u0075\u006C\u0062\u0061\u006E\u0061", "\u004F\u006E\u006B\u006F\u006C\u006F\u006C\u0065\u0065\u0073\u0073\u0061", "\u0053\u0061\u0064\u0061\u0061\u0073\u0061", "\u004D\u0075\u0064\u0064\u0065\u0065"], 
								month_names_short : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
								month_names_narrow : ["\u0041\u006D\u0061", "\u0047\u0075\u0072", "\u0042\u0069\u0074", "\u0045\u006C\u0062", "\u0043\u0061\u006D", "\u0057\u0061\u0078", "\u0041\u0064\u006F", "\u0048\u0061\u0067", "\u0046\u0075\u006C", "\u004F\u006E\u006B", "\u0053\u0061\u0064", "\u004D\u0075\u0064"], 
								ampm : ["\u0057\u0044", "\u0057\u0042"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.om_KE;
					}
					break;
				case "or":
				case "or_IN":
				case "or_in":
					{

						if (!nexacro.Locale.or_IN) {
							nexacro.Locale.or_IN = {
								name : "or_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0B1F", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0B30\u0B2C\u0B3F\u0B2C\u0B3E\u0B30", "\u0B38\u0B4B\u0B2E\u0B2C\u0B3E\u0B30", "\u0B2E\u0B19\u0B4D\u0B17\u0B33\u0B2C\u0B3E\u0B30", "\u0B2C\u0B41\u0B27\u0B2C\u0B3E\u0B30", "\u0B17\u0B41\u0B30\u0B41\u0B2C\u0B3E\u0B30", "\u0B36\u0B41\u0B15\u0B4D\u0B30\u0B2C\u0B3E\u0B30", "\u0B36\u0B28\u0B3F\u0B2C\u0B3E\u0B30"], 
								weekday_names_short : ["\u0B30\u0B2C\u0B3F", "\u0B38\u0B4B\u0B2E", "\u0B2E\u0B19\u0B4D\u0B17\u0B33", "\u0B2C\u0B41\u0B27", "\u0B17\u0B41\u0B30\u0B41", "\u0B36\u0B41\u0B15\u0B4D\u0B30", "\u0B36\u0B28\u0B3F"], 
								weekday_names_narrow : ["\u0B30\u0B2C\u0B3F", "\u0B38\u0B4B\u0B2E", "\u0B2E\u0B19\u0B4D\u0B17\u0B33", "\u0B2C\u0B41\u0B27", "\u0B17\u0B41\u0B30\u0B41", "\u0B36\u0B41\u0B15\u0B4D\u0B30", "\u0B36\u0B28\u0B3F"], 
								month_names_long : ["\u0B1C\u0B3E\u0B28\u0B41\u0B06\u0B30\u0B40", "\u0B2B\u0B47\u0B2C\u0B43\u0B06\u0B30\u0B40", "\u0B2E\u0B3E\u0B30\u0B4D\u0B1A\u0B4D\u0B1A", "\u0B05\u0B2A\u0B4D\u0B30\u0B47\u0B32", "\u0B2E\u0B07", "\u0B1C\u0B41\u0B28", "\u0B1C\u0B41\u0B32\u0B3E\u0B07", "\u0B05\u0B17\u0B37\u0B4D\u0B1F", "\u0B38\u0B47\u0B2A\u0B4D\u0B1F\u0B47\u0B2E\u0B4D\u0B2C\u0B30", "\u0B05\u0B15\u0B4D\u0B1F\u0B4B\u0B2C\u0B30", "\u0B28\u0B2D\u0B47\u0B2E\u0B4D\u0B2C\u0B30", "\u0B21\u0B3F\u0B38\u0B47\u0B2E\u0B4D\u0B2C\u0B30"], 
								month_names_short : ["\u0031", "\u0033", "\u0034", "\u0035", "\u0036", "\u0037", "\u0038", "\u0039", "\u0031\u0030", "\u0031\u0030", "\u0031\u0031", "\u0031\u0032"], 
								month_names_narrow : ["\u0031", "\u0033", "\u0034", "\u0035", "\u0036", "\u0037", "\u0038", "\u0039", "\u0031\u0030", "\u0031\u0030", "\u0031\u0031", "\u0031\u0032"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u004F\u0064\u002D\u0025\u004F\u006D\u002D\u0025\u004F\u0079", 
								time_format : "\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
								time_format_ampm : "\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u004F\u0065\u0020\u0025\u0042\u0020\u0025\u004F\u0079\u0020\u0025\u004F\u0049\u003A\u0025\u004F\u004D\u003A\u0025\u004F\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.or_IN;
					}
					break;
				case "pa":
				case "pa_IN":
				case "pa_in":
					{

						if (!nexacro.Locale.pa_IN) {
							nexacro.Locale.pa_IN = {
								name : "pa_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0A30\u0A41", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0A10\u0A24\u0A35\u0A3E\u0A30\u0020", "\u0A38\u0A4B\u0A2E\u0A35\u0A3E\u0A30\u0020", "\u0A2E\u0A70\u0A17\u0A32\u0A35\u0A3E\u0A30\u0020", "\u0A2C\u0A41\u0A71\u0A27\u0A35\u0A3E\u0A30\u0020", "\u0A35\u0A40\u0A30\u0A35\u0A3E\u0A30\u0020", "\u0A36\u0A41\u0A71\u0A15\u0A30\u0A35\u0A3E\u0A30\u0020", "\u0A36\u0A28\u0A3F\u0A71\u0A1A\u0A30\u0A35\u0A3E\u0A30\u0020"], 
								weekday_names_short : ["\u0A10\u0A24\u0020", "\u0A38\u0A4B\u0A2E\u0020", "\u0A2E\u0A70\u0A17\u0A32\u0020", "\u0A2C\u0A41\u0A71\u0A27\u0020", "\u0A35\u0A40\u0A30\u0020", "\u0A36\u0A41\u0A71\u0A15\u0A30\u0020", "\u0A36\u0A28\u0A3F\u0A71\u0A1A\u0A30\u0020"], 
								weekday_names_narrow : ["\u0A10\u0A24\u0020", "\u0A38\u0A4B\u0A2E\u0020", "\u0A2E\u0A70\u0A17\u0A32\u0020", "\u0A2C\u0A41\u0A71\u0A27\u0020", "\u0A35\u0A40\u0A30\u0020", "\u0A36\u0A41\u0A71\u0A15\u0A30\u0020", "\u0A36\u0A28\u0A3F\u0A71\u0A1A\u0A30\u0020"], 
								month_names_long : ["\u0A1C\u0A28\u0A35\u0A30\u0A40", "\u0A5E\u0A30\u0A35\u0A30\u0A40", "\u0A2E\u0A3E\u0A30\u0A1A", "\u0A05\u0A2A\u0A30\u0A48\u0A32", "\u0A2E\u0A08", "\u0A1C\u0A42\u0A28", "\u0A1C\u0A41\u0A32\u0A3E\u0A08", "\u0A05\u0A17\u0A38\u0A24", "\u0A38\u0A24\u0A70\u0A2C\u0A30", "\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30", "\u0A28\u0A35\u0A70\u0A2C\u0A30", "\u0A26\u0A38\u0A70\u0A2C\u0A30"], 
								month_names_short : ["\u0A1C\u0A28\u0A35\u0A30\u0A40", "\u0A5E\u0A30\u0A35\u0A30\u0A40", "\u0A2E\u0A3E\u0A30\u0A1A", "\u0A05\u0A2A\u0A30\u0A48\u0A32", "\u0A2E\u0A08", "\u0A1C\u0A42\u0A28", "\u0A1C\u0A41\u0A32\u0A3E\u0A08", "\u0A05\u0A17\u0A38\u0A24", "\u0A38\u0A24\u0A70\u0A2C\u0A30", "\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30", "\u0A28\u0A35\u0A70\u0A2C\u0A30", "\u0A26\u0A38\u0A70\u0A2C\u0A30"], 
								month_names_narrow : ["\u0A1C\u0A28\u0A35\u0A30\u0A40", "\u0A5E\u0A30\u0A35\u0A30\u0A40", "\u0A2E\u0A3E\u0A30\u0A1A", "\u0A05\u0A2A\u0A30\u0A48\u0A32", "\u0A2E\u0A08", "\u0A1C\u0A42\u0A28", "\u0A1C\u0A41\u0A32\u0A3E\u0A08", "\u0A05\u0A17\u0A38\u0A24", "\u0A38\u0A24\u0A70\u0A2C\u0A30", "\u0A05\u0A15\u0A24\u0A42\u0A2C\u0A30", "\u0A28\u0A35\u0A70\u0A2C\u0A30", "\u0A26\u0A38\u0A70\u0A2C\u0A30"], 
								ampm : ["\u0A38\u0A35\u0A47\u0A30\u0A47", "\u0A36\u0A3E\u0A2E"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.pa_IN;
					}
					break;
				case "pa_PK":
				case "pa_pk":
					{

						if (!nexacro.Locale.pa_PK) {
							nexacro.Locale.pa_PK = {
								name : "pa_PK", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0050\u004B\u0052\u0020", 
								currency_symbol : "\u0052\u0073", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 2, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
								weekday_names_short : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
								weekday_names_narrow : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
								month_names_long : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
								month_names_narrow : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
								ampm : ["\u0635", "\u0634"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0050\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0648\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u062A\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.pa_PK;
					}
					break;
				case "pl":
				case "pl_PL":
				case "pl_pl":
					{

						if (!nexacro.Locale.pl_PL) {
							nexacro.Locale.pl_PL = {
								name : "pl_PL", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0050\u004C\u004E\u0020", 
								currency_symbol : "\u007A\u0142", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u006E\u0069\u0065\u0064\u007A\u0069\u0065\u006C\u0061", "\u0070\u006F\u006E\u0069\u0065\u0064\u007A\u0069\u0061\u0142\u0065\u006B", "\u0077\u0074\u006F\u0072\u0065\u006B", "\u015B\u0072\u006F\u0064\u0061", "\u0063\u007A\u0077\u0061\u0072\u0074\u0065\u006B", "\u0070\u0069\u0105\u0074\u0065\u006B", "\u0073\u006F\u0062\u006F\u0074\u0061"], 
								weekday_names_short : ["\u006E\u0069\u0065", "\u0070\u006F\u006E", "\u0077\u0074\u006F", "\u015B\u0072\u006F", "\u0063\u007A\u0077", "\u0070\u0069\u0105", "\u0073\u006F\u0062"], 
								weekday_names_narrow : ["\u006E\u0069\u0065", "\u0070\u006F\u006E", "\u0077\u0074\u006F", "\u015B\u0072\u006F", "\u0063\u007A\u0077", "\u0070\u0069\u0105", "\u0073\u006F\u0062"], 
								month_names_long : ["\u0073\u0074\u0079\u0063\u007A\u0065\u0144", "\u006C\u0075\u0074\u0079", "\u006D\u0061\u0072\u007A\u0065\u0063", "\u006B\u0077\u0069\u0065\u0063\u0069\u0065\u0144", "\u006D\u0061\u006A", "\u0063\u007A\u0065\u0072\u0077\u0069\u0065\u0063", "\u006C\u0069\u0070\u0069\u0065\u0063", "\u0073\u0069\u0065\u0072\u0070\u0069\u0065\u0144", "\u0077\u0072\u007A\u0065\u0073\u0069\u0065\u0144", "\u0070\u0061\u017A\u0064\u007A\u0069\u0065\u0072\u006E\u0069\u006B", "\u006C\u0069\u0073\u0074\u006F\u0070\u0061\u0064", "\u0067\u0072\u0075\u0064\u007A\u0069\u0065\u0144"], 
								month_names_short : ["\u0073\u0074\u0079", "\u006C\u0075\u0074", "\u006D\u0061\u0072", "\u006B\u0077\u0069", "\u006D\u0061\u006A", "\u0063\u007A\u0065", "\u006C\u0069\u0070", "\u0073\u0069\u0065", "\u0077\u0072\u007A", "\u0070\u0061\u017A", "\u006C\u0069\u0073", "\u0067\u0072\u0075"], 
								month_names_narrow : ["\u0073\u0074\u0079", "\u006C\u0075\u0074", "\u006D\u0061\u0072", "\u006B\u0077\u0069", "\u006D\u0061\u006A", "\u0063\u007A\u0065", "\u006C\u0069\u0070", "\u0073\u0069\u0065", "\u0077\u0072\u007A", "\u0070\u0061\u017A", "\u006C\u0069\u0073", "\u0067\u0072\u0075"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.pl_PL;
					}
					break;
				case "pt_BR":
				case "pt_br":
					{

						if (!nexacro.Locale.pt_BR) {
							nexacro.Locale.pt_BR = {
								name : "pt_BR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0042\u0052\u004C\u0020", 
								currency_symbol : "\u0052\u0024", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u0073\u0065\u0067\u0075\u006E\u0064\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0074\u0065\u0072\u00E7\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0061\u0072\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0069\u006E\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u0065\u0078\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
								weekday_names_narrow : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
								month_names_long : ["\u006A\u0061\u006E\u0065\u0069\u0072\u006F", "\u0066\u0065\u0076\u0065\u0072\u0065\u0069\u0072\u006F", "\u006D\u0061\u0072\u00E7\u006F", "\u0061\u0062\u0072\u0069\u006C", "\u006D\u0061\u0069\u006F", "\u006A\u0075\u006E\u0068\u006F", "\u006A\u0075\u006C\u0068\u006F", "\u0061\u0067\u006F\u0073\u0074\u006F", "\u0073\u0065\u0074\u0065\u006D\u0062\u0072\u006F", "\u006F\u0075\u0074\u0075\u0062\u0072\u006F", "\u006E\u006F\u0076\u0065\u006D\u0062\u0072\u006F", "\u0064\u0065\u007A\u0065\u006D\u0062\u0072\u006F"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.pt_BR;
					}
					break;
				case "pt":
				case "pt_PT":
				case "pt_pt":
					{

						if (!nexacro.Locale.pt_PT) {
							nexacro.Locale.pt_PT = {
								name : "pt_PT", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u006F\u006D\u0069\u006E\u0067\u006F", "\u0073\u0065\u0067\u0075\u006E\u0064\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0074\u0065\u0072\u00E7\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0061\u0072\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0071\u0075\u0069\u006E\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u0065\u0078\u0074\u0061\u002D\u0066\u0065\u0069\u0072\u0061", "\u0073\u00E1\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
								weekday_names_narrow : ["\u0044\u006F\u006D", "\u0053\u0065\u0067", "\u0054\u0065\u0072", "\u0051\u0075\u0061", "\u0051\u0075\u0069", "\u0053\u0065\u0078", "\u0053\u00E1\u0062"], 
								month_names_long : ["\u004A\u0061\u006E\u0065\u0069\u0072\u006F", "\u0046\u0065\u0076\u0065\u0072\u0065\u0069\u0072\u006F", "\u004D\u0061\u0072\u00E7\u006F", "\u0041\u0062\u0072\u0069\u006C", "\u004D\u0061\u0069\u006F", "\u004A\u0075\u006E\u0068\u006F", "\u004A\u0075\u006C\u0068\u006F", "\u0041\u0067\u006F\u0073\u0074\u006F", "\u0053\u0065\u0074\u0065\u006D\u0062\u0072\u006F", "\u004F\u0075\u0074\u0075\u0062\u0072\u006F", "\u004E\u006F\u0076\u0065\u006D\u0062\u0072\u006F", "\u0044\u0065\u007A\u0065\u006D\u0062\u0072\u006F"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0069", "\u004A\u0075\u006E", "\u004A\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0074", "\u004F\u0075\u0074", "\u004E\u006F\u0076", "\u0044\u0065\u007A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0041\u002C\u0020\u0025\u0065\u0020\u0064\u0065\u0020\u0025\u0042\u0020\u0064\u0065\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.pt_PT;
					}
					break;
				case "ro":
				case "ro_RO":
				case "ro_ro":
					{

						if (!nexacro.Locale.ro_RO) {
							nexacro.Locale.ro_RO = {
								name : "ro_RO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0052\u004F\u004E\u0020", 
								currency_symbol : "\u006C\u0065\u0069", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0075\u006D\u0069\u006E\u0069\u0063\u0103", "\u006C\u0075\u006E\u0069", "\u006D\u0061\u0072\u0163\u0069", "\u006D\u0069\u0065\u0072\u0063\u0075\u0072\u0069", "\u006A\u006F\u0069", "\u0076\u0069\u006E\u0065\u0072\u0069", "\u0073\u00E2\u006D\u0062\u0103\u0074\u0103"], 
								weekday_names_short : ["\u0044\u0075", "\u004C\u0075", "\u004D\u0061", "\u004D\u0069", "\u004A\u006F", "\u0056\u0069", "\u0053\u0062"], 
								weekday_names_narrow : ["\u0044\u0075", "\u004C\u0075", "\u004D\u0061", "\u004D\u0069", "\u004A\u006F", "\u0056\u0069", "\u0053\u0062"], 
								month_names_long : ["\u0069\u0061\u006E\u0075\u0061\u0072\u0069\u0065", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069\u0065", "\u006D\u0061\u0072\u0074\u0069\u0065", "\u0061\u0070\u0072\u0069\u006C\u0069\u0065", "\u006D\u0061\u0069", "\u0069\u0075\u006E\u0069\u0065", "\u0069\u0075\u006C\u0069\u0065", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0072\u0069\u0065", "\u006F\u0063\u0074\u006F\u006D\u0062\u0072\u0069\u0065", "\u006E\u006F\u0069\u0065\u006D\u0062\u0072\u0069\u0065", "\u0064\u0065\u0063\u0065\u006D\u0062\u0072\u0069\u0065"], 
								month_names_short : ["\u0069\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u0069\u0075\u006E", "\u0069\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u0069\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u0069", "\u0069\u0075\u006E", "\u0069\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u0063\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u007A", 
								full_date_time_format : "\u0025\u0041\u0020\u0025\u002D\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u002C\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u007A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ro_RO;
					}
					break;
				case "ru":
				case "ru_RU":
				case "ru_ru":
					{

						if (!nexacro.Locale.ru_RU) {
							nexacro.Locale.ru_RU = {
								name : "ru_RU", 
								decimal_point : "\u002C", 
								thousands_sep : "\u2002", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0052\u0055\u0042\u0020", 
								currency_symbol : "\u0440\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u2002", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 0, 
								n_cs_precedes : 0, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
								weekday_names_narrow : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
								month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"], 
								month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041\u0020\u0433\u002E", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ru_RU;
					}
					break;
				case "ru_UA":
				case "ru_ua":
					{

						if (!nexacro.Locale.ru_UA) {
							nexacro.Locale.ru_UA = {
								name : "ru_UA", 
								decimal_point : "\u002C", 
								thousands_sep : "\u2002", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0055\u0041\u0048\u0020", 
								currency_symbol : "\u0433\u0440", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u043E", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0443\u0431"], 
								weekday_names_narrow : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u043E", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0443\u0431"], 
								month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"], 
								month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ru_UA;
					}
					break;
				case "rw":
				case "rw_RW":
				case "rw_rw":
					{

						if (!nexacro.Locale.rw_RW) {
							nexacro.Locale.rw_RW = {
								name : "rw_RW", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [3], 
								int_curr_symbol : "\u0052\u0057\u0046\u0020", 
								currency_symbol : "\u0046\u0072\u0077", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004B\u0075\u0020\u0063\u0079\u0075\u006D\u0077\u0065\u0072\u0075", "\u004B\u0075\u0077\u0061\u0020\u006D\u0062\u0065\u0072\u0065", "\u004B\u0075\u0077\u0061\u0020\u006B\u0061\u0062\u0069\u0072\u0069", "\u004B\u0075\u0077\u0061\u0020\u0067\u0061\u0074\u0061\u0074\u0075", "\u004B\u0075\u0077\u0061\u0020\u006B\u0061\u006E\u0065", "\u004B\u0075\u0077\u0061\u0020\u0067\u0061\u0074\u0061\u006E\u0075", "\u004B\u0075\u0077\u0061\u0020\u0067\u0061\u0074\u0061\u006E\u0064\u0061\u0074\u0075"], 
								weekday_names_short : ["\u004D\u0077\u0065", "\u004D\u0062\u0065", "\u004B\u0061\u0062", "\u0047\u0074\u0075", "\u004B\u0061\u006E", "\u0047\u006E\u0075", "\u0047\u006E\u0064"], 
								weekday_names_narrow : ["\u004D\u0077\u0065", "\u004D\u0062\u0065", "\u004B\u0061\u0062", "\u0047\u0074\u0075", "\u004B\u0061\u006E", "\u0047\u006E\u0075", "\u0047\u006E\u0064"], 
								month_names_long : ["\u004D\u0075\u0074\u0061\u0072\u0061\u006D\u0061", "\u0047\u0061\u0073\u0068\u0079\u0061\u006E\u0074\u0061\u0072\u0065", "\u0057\u0065\u0072\u0075\u0072\u0077\u0065", "\u004D\u0061\u0074\u0061", "\u0047\u0069\u0063\u0075\u0072\u0061\u006E\u0073\u0069", "\u004B\u0061\u006D\u0065\u006E\u0061", "\u004E\u0079\u0061\u006B\u0061\u006E\u0067\u0061", "\u004B\u0061\u006E\u0061\u006D\u0061", "\u004E\u007A\u0065\u006C\u0069", "\u0055\u006B\u0077\u0061\u006B\u0069\u0072\u0061", "\u0055\u0067\u0075\u0073\u0068\u0079\u0069\u006E\u0067\u006F", "\u0055\u006B\u0075\u0062\u006F\u007A\u0061"], 
								month_names_short : ["\u004D\u0075\u0074", "\u0047\u0061\u0073", "\u0057\u0065\u0072", "\u004D\u0061\u0074", "\u0047\u0069\u0063", "\u004B\u0061\u006D", "\u004E\u0079\u0061", "\u004B\u0061\u006E", "\u004E\u007A\u0065", "\u0055\u006B\u0077", "\u0055\u0067\u0075", "\u0055\u006B\u0075"], 
								month_names_narrow : ["\u004D\u0075\u0074", "\u0047\u0061\u0073", "\u0057\u0065\u0072", "\u004D\u0061\u0074", "\u0047\u0069\u0063", "\u004B\u0061\u006D", "\u004E\u0079\u0061", "\u004B\u0061\u006E", "\u004E\u007A\u0065", "\u0055\u006B\u0077", "\u0055\u0067\u0075", "\u0055\u006B\u0075"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.rw_RW;
					}
					break;
				case "se":
				case "se_NO":
				case "se_no":
					{

						if (!nexacro.Locale.se_NO) {
							nexacro.Locale.se_NO = {
								name : "se_NO", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u004E\u004F\u004B\u0020", 
								currency_symbol : "\u0020\u0072\u0075", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u0073\u006F\u0074\u006E\u0061\u0062\u0065\u0061\u0069\u0076\u0069", "\u0076\u0075\u006F\u0073\u0073\u00E1\u0072\u0067\u0061", "\u006D\u0061\u014B\u014B\u0065\u0062\u0061\u0072\u0067\u0061", "\u0067\u0061\u0073\u006B\u0061\u0076\u0061\u0068\u006B\u006B\u0075", "\u0064\u0075\u006F\u0072\u0061\u0073\u0064\u0061\u0074", "\u0062\u0065\u0061\u0072\u006A\u0061\u0064\u0061\u0074", "\u006C\u00E1\u0076\u0076\u0061\u0072\u0064\u0061\u0074"], 
								weekday_names_short : ["\u0073\u006F\u0074\u006E", "\u0076\u0075\u006F\u0073", "\u006D\u0061\u014B", "\u0067\u0061\u0073\u006B", "\u0064\u0075\u006F\u0072", "\u0062\u0065\u0061\u0072", "\u006C\u00E1\u0076"], 
								weekday_names_narrow : ["\u0073\u006F\u0074\u006E", "\u0076\u0075\u006F\u0073", "\u006D\u0061\u014B", "\u0067\u0061\u0073\u006B", "\u0064\u0075\u006F\u0072", "\u0062\u0065\u0061\u0072", "\u006C\u00E1\u0076"], 
								month_names_long : ["\u006F\u0111\u0111\u0061\u006A\u0061\u0067\u0065\u006D\u00E1\u006E\u0075", "\u0067\u0075\u006F\u0076\u0076\u0061\u006D\u00E1\u006E\u0075", "\u006E\u006A\u0075\u006B\u010D\u0061\u006D\u00E1\u006E\u0075", "\u0063\u0075\u006F\u014B\u006F\u006D\u00E1\u006E\u0075", "\u006D\u0069\u0065\u0073\u0073\u0065\u006D\u00E1\u006E\u0075", "\u0067\u0065\u0061\u0073\u0073\u0065\u006D\u00E1\u006E\u0075", "\u0073\u0075\u006F\u0069\u0064\u006E\u0065\u006D\u00E1\u006E\u0075", "\u0062\u006F\u0072\u0067\u0065\u006D\u00E1\u006E\u0075", "\u010D\u0061\u006B\u010D\u0061\u006D\u00E1\u006E\u0075", "\u0067\u006F\u006C\u0067\u0067\u006F\u0074\u006D\u00E1\u006E\u0075", "\u0073\u006B\u00E1\u0062\u006D\u0061\u006D\u00E1\u006E\u0075", "\u006A\u0075\u006F\u0076\u006C\u0061\u006D\u00E1\u006E\u0075"], 
								month_names_short : ["\u006F\u0111\u0111\u006A", "\u0067\u0075\u006F\u0076", "\u006E\u006A\u0075\u006B", "\u0063\u0075\u006F\u014B", "\u006D\u0069\u0065\u0073", "\u0067\u0065\u0061\u0073", "\u0073\u0075\u006F\u0069", "\u0062\u006F\u0072\u0067", "\u010D\u0061\u006B\u010D", "\u0067\u006F\u006C\u0067", "\u0073\u006B\u00E1\u0062", "\u006A\u0075\u006F\u0076"], 
								month_names_narrow : ["\u006F\u0111\u0111\u006A", "\u0067\u0075\u006F\u0076", "\u006E\u006A\u0075\u006B", "\u0063\u0075\u006F\u014B", "\u006D\u0069\u0065\u0073", "\u0067\u0065\u0061\u0073", "\u0073\u0075\u006F\u0069", "\u0062\u006F\u0072\u0067", "\u010D\u0061\u006B\u010D", "\u0067\u006F\u006C\u0067", "\u0073\u006B\u00E1\u0062", "\u006A\u0075\u006F\u0076"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0062\u0020\u0025\u0065\u002E\u0020\u0062\u002E\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0064\u002E\u0020\u0062\u002E\u0020\u0025\u0059\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.se_NO;
					}
					break;
				case "si":
				case "si_LK":
				case "si_lk":
					{

						if (!nexacro.Locale.si_LK) {
							nexacro.Locale.si_LK = {
								name : "si_LK", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u004C\u004B\u0052\u0020", 
								currency_symbol : "\u20A8", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0D89\u0DBB\u0DD2\u0DAF\u0DCF", "\u0DC3\u0DB3\u0DD4\u0DAF\u0DCF", "\u0D85\u0D9F\u0DC4\u0DBB\u0DD4\u0DC0\u0DCF\u0DAF\u0DCF", "\u0DB6\u0DAF\u0DCF\u0DAF\u0DCF", "\u0DB6\u0DCA\u200D\u0DBB\u0DC4\u0DC3\u0DCA\u0DB4\u0DAD\u0DD2\u0DB1\u0DCA\u0DAF\u0DCF", "\u0DC3\u0DD2\u0D9A\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF", "\u0DC3\u0DD9\u0DB1\u0DC3\u0DD4\u0DBB\u0DCF\u0DAF\u0DCF"], 
								weekday_names_short : ["\u0D89", "\u0DC3", "\u0D85", "\u0DB6", "\u0DB6\u0DCA\u200D\u0DBB", "\u0DC3\u0DD2", "\u0DC3\u0DD9"], 
								weekday_names_narrow : ["\u0D89", "\u0DC3", "\u0D85", "\u0DB6", "\u0DB6\u0DCA\u200D\u0DBB", "\u0DC3\u0DD2", "\u0DC3\u0DD9"], 
								month_names_long : ["\u0DA2\u0DB1\u0DC0\u0DCF\u0DBB\u0DD2", "\u0DB4\u0DD9\u0DB6\u0DBB\u0DC0\u0DCF\u0DBD\u0DD2", "\u0DB8\u0DCF\u0DBB\u0DCA\u0DAD\u0DD4", "\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DD2\u0DBA\u0DD9\u0DBD\u0DCA", "\u0DB8\u0DD0\u0DBA\u0DD2", "\u0DA2\u0DD6\u0DB1\u0DD2", "\u0DA2\u0DD6\u0DBD\u0DD2", "\u0D85\u0D9C\u0DDD\u0DC3\u0DCA\u0DAD\u0DD4", "\u0DC3\u0DD0\u0DB4\u0DCA\u0DAD\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA", "\u0D94\u0D9A\u0DCA\u0DAD\u0DDD\u0DB6\u0DBB\u0DCA", "\u0DB1\u0DD9\u0DC0\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA", "\u0DAF\u0DD9\u0DC3\u0DD0\u0DB8\u0DCA\u0DB6\u0DBB\u0DCA"], 
								month_names_short : ["\u0DA2\u0DB1", "\u0DB4\u0DD9\u0DB6", "\u0DB8\u0DCF\u0DBB\u0DCA", "\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DD2", "\u0DB8\u0DD0\u0DBA\u0DD2", "\u0DA2\u0DD6\u0DB1\u0DD2", "\u0DA2\u0DD6\u0DBD\u0DD2", "\u0D85\u0D9C\u0DDD", "\u0DC3\u0DD0\u0DB4\u0DCA", "\u0D94\u0D9A\u0DCA", "\u0DB1\u0DD9\u0DC0\u0DD0", "\u0DAF\u0DD9\u0DC3\u0DD0"], 
								month_names_narrow : ["\u0DA2\u0DB1", "\u0DB4\u0DD9\u0DB6", "\u0DB8\u0DCF\u0DBB\u0DCA", "\u0D85\u0DB4\u0DCA\u200D\u0DBB\u0DD2", "\u0DB8\u0DD0\u0DBA\u0DD2", "\u0DA2\u0DD6\u0DB1\u0DD2", "\u0DA2\u0DD6\u0DBD\u0DD2", "\u0D85\u0D9C\u0DDD", "\u0DC3\u0DD0\u0DB4\u0DCA", "\u0D94\u0D9A\u0DCA", "\u0DB1\u0DD9\u0DC0\u0DD0", "\u0DAF\u0DD9\u0DC3\u0DD0"], 
								ampm : ["\u0DB4\u0DD9\u002E\u0DC0\u002E", "\u0DB4\u002E\u0DC0\u002E"], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u007A", 
								full_date_time_format : "\u0025\u0059\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u0DC0\u0DD0\u0DB1\u0DD2\u0020\u0025\u0041\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u007A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.si_LK;
					}
					break;
				case "sk":
				case "sk_SK":
				case "sk_sk":
					{

						if (!nexacro.Locale.sk_SK) {
							nexacro.Locale.sk_SK = {
								name : "sk_SK", 
								decimal_point : "\u002C", 
								thousands_sep : "\u00A0", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0053\u004B\u004B\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004E\u0065\u0064\u0065\u013E\u0061", "\u0050\u006F\u006E\u0064\u0065\u006C\u006F\u006B", "\u0055\u0074\u006F\u0072\u006F\u006B", "\u0053\u0074\u0072\u0065\u0064\u0061", "\u0160\u0074\u0076\u0072\u0074\u006F\u006B", "\u0050\u0069\u0061\u0074\u006F\u006B", "\u0053\u006F\u0062\u006F\u0074\u0061"], 
								weekday_names_short : ["\u004E\u0065", "\u0050\u006F", "\u0055\u0074", "\u0053\u0074", "\u0160\u0074", "\u0050\u0069", "\u0053\u006F"], 
								weekday_names_narrow : ["\u004E\u0065", "\u0050\u006F", "\u0055\u0074", "\u0053\u0074", "\u0160\u0074", "\u0050\u0069", "\u0053\u006F"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u00E1\u0072", "\u0066\u0065\u0062\u0072\u0075\u00E1\u0072", "\u006D\u0061\u0072\u0065\u0063", "\u0061\u0070\u0072\u00ED\u006C", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u00F3\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u00E1\u006A", "\u006A\u00FA\u006E", "\u006A\u00FA\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0025\u0061\u00A0\u0025\u0065\u002E\u00A0\u0025\u0042\u00A0\u0025\u0059\u002C\u00A0\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u00A0\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002E\u0020\u0025\u006E\u002E\u0020\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.sk_SK;
					}
					break;
				case "sl":
				case "sl_SI":
				case "sl_si":
					{

						if (!nexacro.Locale.sl_SI) {
							nexacro.Locale.sl_SI = {
								name : "sl_SI", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u006E\u0065\u0064\u0065\u006C\u006A\u0061", "\u0070\u006F\u006E\u0065\u0064\u0065\u006C\u006A\u0065\u006B", "\u0074\u006F\u0072\u0065\u006B", "\u0073\u0072\u0065\u0064\u0061", "\u010D\u0065\u0074\u0072\u0074\u0065\u006B", "\u0070\u0065\u0074\u0065\u006B", "\u0073\u006F\u0062\u006F\u0074\u0061"], 
								weekday_names_short : ["\u006E\u0065\u0064", "\u0070\u006F\u006E", "\u0074\u006F\u0072", "\u0073\u0072\u0065", "\u010D\u0065\u0074", "\u0070\u0065\u0074", "\u0073\u006F\u0062"], 
								weekday_names_narrow : ["\u006E\u0065\u0064", "\u0070\u006F\u006E", "\u0074\u006F\u0072", "\u0073\u0072\u0065", "\u010D\u0065\u0074", "\u0070\u0065\u0074", "\u0073\u006F\u0062"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072", "\u006D\u0061\u0072\u0065\u0063", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069\u006A", "\u006A\u0075\u006C\u0069\u006A", "\u0061\u0076\u0067\u0075\u0073\u0074", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0076\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0076\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0020\u0025\u006D\u002E\u0020\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.sl_SI;
					}
					break;
				case "so_DJ":
				case "so_dj":
					{

						if (!nexacro.Locale.so_DJ) {
							nexacro.Locale.so_DJ = {
								name : "so_DJ", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0044\u004A\u0046\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0061\u0078\u0061", "\u0069\u0073\u006E", "\u0073\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0068\u0061", "\u006A\u0069\u006D", "\u0073\u0061\u0062"], 
								weekday_names_narrow : ["\u0061\u0078\u0061", "\u0069\u0073\u006E", "\u0073\u0061\u006C", "\u0061\u0072\u0062", "\u006B\u0068\u0061", "\u006A\u0069\u006D", "\u0073\u0061\u0062"], 
								month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
								month_names_short : ["\u006B\u006F\u0062", "\u006C\u0061\u0062", "\u0073\u0061\u0064", "\u0061\u0066\u0072", "\u0073\u0068\u0061", "\u006C\u0069\u0078", "\u0074\u006F\u0064", "\u0073\u0069\u0064", "\u0073\u0061\u0067", "\u0074\u006F\u0062", "\u006B\u0069\u0074", "\u006C\u0069\u0074"], 
								month_names_narrow : ["\u006B\u006F\u0062", "\u006C\u0061\u0062", "\u0073\u0061\u0064", "\u0061\u0066\u0072", "\u0073\u0068\u0061", "\u006C\u0069\u0078", "\u0074\u006F\u0064", "\u0073\u0069\u0064", "\u0073\u0061\u0067", "\u0074\u006F\u0062", "\u006B\u0069\u0074", "\u006C\u0069\u0074"], 
								ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.so_DJ;
					}
					break;
				case "so_ET":
				case "so_et":
					{

						if (!nexacro.Locale.so_ET) {
							nexacro.Locale.so_ET = {
								name : "so_ET", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0054\u0042\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0064\u0064\u0065\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
								month_names_short : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
								month_names_narrow : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
								ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.so_ET;
					}
					break;
				case "so_KE":
				case "so_ke":
					{

						if (!nexacro.Locale.so_KE) {
							nexacro.Locale.so_KE = {
								name : "so_KE", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0054\u0042\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0064\u0064\u0065\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
								month_names_short : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
								month_names_narrow : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
								ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.so_KE;
					}
					break;
				case "so":
				case "so_SO":
				case "so_so":
					{

						if (!nexacro.Locale.so_SO) {
							nexacro.Locale.so_SO = {
								name : "so_SO", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0053\u004F\u0053\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0041\u0078\u0061\u0064", "\u0049\u0073\u006E\u0069\u0069\u006E", "\u0053\u0061\u006C\u0061\u0061\u0073\u006F", "\u0041\u0072\u0062\u0061\u0063\u006F", "\u004B\u0068\u0061\u006D\u0069\u0069\u0073", "\u004A\u0069\u006D\u0063\u006F", "\u0053\u0061\u0062\u0074\u0069"], 
								weekday_names_short : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u0041\u0078\u0061", "\u0049\u0073\u006E", "\u0053\u0061\u006C", "\u0041\u0072\u0062", "\u004B\u0068\u0061", "\u004A\u0069\u006D", "\u0053\u0061\u0062"], 
								month_names_long : ["\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0064\u0064\u0065\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0041\u0066\u0072\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0068\u0061\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0069\u0078\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0064\u006F\u0062\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0069\u0064\u0065\u0065\u0064\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0053\u0061\u0067\u0061\u0061\u006C\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004B\u006F\u0077 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064", "\u0042\u0069\u0073\u0068\u0061 \u004C\u0061\u0062\u0061 \u0069\u0079\u006F \u0054\u006F\u0062\u006E\u0061\u0061\u0064"], 
								month_names_short : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
								month_names_narrow : ["\u004B\u006F\u0062", "\u004C\u0061\u0062", "\u0053\u0061\u0064", "\u0041\u0066\u0072", "\u0053\u0068\u0061", "\u004C\u0069\u0078", "\u0054\u006F\u0064", "\u0053\u0069\u0064", "\u0053\u0061\u0067", "\u0054\u006F\u0062", "\u004B\u0049\u0054", "\u004C\u0049\u0054"], 
								ampm : ["\u0073\u0075\u0062\u0061\u0078\u006E\u0069\u006D\u006F", "\u0067\u0061\u006C\u0061\u0062\u006E\u0069\u006D\u006F"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0042\u0020\u0025\u0065\u002C\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.so_SO;
					}
					break;
				case "sq":
				case "sq_AL":
				case "sq_al":
					{

						if (!nexacro.Locale.sq_AL) {
							nexacro.Locale.sq_AL = {
								name : "sq_AL", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3], 
								int_curr_symbol : "\u0041\u004C\u004C\u0020", 
								currency_symbol : "\u004C\u0065\u006B", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 3, 
								frac_digits : 3, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0065\u0020\u0064\u0069\u0065\u006C\u0020", "\u0065\u0020\u0068\u00EB\u006E\u00EB\u0020", "\u0065\u0020\u006D\u0061\u0072\u0074\u00EB\u0020", "\u0065\u0020\u006D\u00EB\u0072\u006B\u0075\u0072\u00EB\u0020", "\u0065\u0020\u0065\u006E\u006A\u0074\u0065\u0020", "\u0065\u0020\u0070\u0072\u0065\u006D\u0074\u0065\u0020", "\u0065\u0020\u0073\u0068\u0074\u0075\u006E\u00EB\u0020"], 
								weekday_names_short : ["\u0044\u0069\u0065\u0020", "\u0048\u00EB\u006E\u0020", "\u004D\u0061\u0072\u0020", "\u004D\u00EB\u0072\u0020", "\u0045\u006E\u006A\u0020", "\u0050\u0072\u0065\u0020", "\u0053\u0068\u0074\u0020"], 
								weekday_names_narrow : ["\u0044\u0069\u0065\u0020", "\u0048\u00EB\u006E\u0020", "\u004D\u0061\u0072\u0020", "\u004D\u00EB\u0072\u0020", "\u0045\u006E\u006A\u0020", "\u0050\u0072\u0065\u0020", "\u0053\u0068\u0074\u0020"], 
								month_names_long : ["\u006A\u0061\u006E\u0061\u0072", "\u0073\u0068\u006B\u0075\u0072\u0074", "\u006D\u0061\u0072\u0073", "\u0070\u0072\u0069\u006C\u006C", "\u006D\u0061\u006A", "\u0071\u0065\u0072\u0073\u0068\u006F\u0072", "\u006B\u006F\u0072\u0072\u0069\u006B", "\u0067\u0075\u0073\u0068\u0074", "\u0073\u0068\u0074\u0061\u0074\u006F\u0072", "\u0074\u0065\u0074\u006F\u0072", "\u006E\u00EB\u006E\u0074\u006F\u0072", "\u0064\u0068\u006A\u0065\u0074\u006F\u0072"], 
								month_names_short : ["\u004A\u0061\u006E", "\u0053\u0068\u006B", "\u004D\u0061\u0072", "\u0050\u0072\u0069", "\u004D\u0061\u006A", "\u0051\u0065\u0072", "\u004B\u006F\u0072", "\u0047\u0073\u0068", "\u0053\u0068\u0074", "\u0054\u0065\u0074", "\u004E\u00EB\u006E", "\u0044\u0068\u006A"], 
								month_names_narrow : ["\u004A\u0061\u006E", "\u0053\u0068\u006B", "\u004D\u0061\u0072", "\u0050\u0072\u0069", "\u004D\u0061\u006A", "\u0051\u0065\u0072", "\u004B\u006F\u0072", "\u0047\u0073\u0068", "\u0053\u0068\u0074", "\u0054\u0065\u0074", "\u004E\u00EB\u006E", "\u0044\u0068\u006A"], 
								ampm : ["\u0050\u0044", "\u004D\u0044"], 
								date_format : "\u0025\u0059\u002D\u0025\u0062\u002D\u0025\u0064", 
								time_format : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u002E\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u002E\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0059\u002D\u0025\u0062\u002D\u0025\u0064\u0020\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u002E\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.sq_AL;
					}
					break;
				case "sr_ME":
				case "sr_me":
					{

						if (!nexacro.Locale.sr_ME) {
							nexacro.Locale.sr_ME = {
								name : "sr_ME", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u043D\u0435\u0434\u0458\u0435\u0459\u0430", "\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A", "\u0443\u0442\u043E\u0440\u0430\u043A", "\u0441\u0440\u0438\u0458\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A", "\u043F\u0435\u0442\u0430\u043A", "\u0441\u0443\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0438", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
								weekday_names_narrow : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0438", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
								month_names_long : ["\u0458\u0430\u043D\u0443\u0430\u0440", "\u0444\u0435\u0431\u0440\u0443\u0430\u0440", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440", "\u043E\u043A\u0442\u043E\u0431\u0430\u0440", "\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440", "\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440"], 
								month_names_short : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
								month_names_narrow : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059\u002E", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0054", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u002c\u0020\u0025\u0065\u002E\u0020\u0025\u0062\u0020\u0025\u0059\u002E\u0020\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u000A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.sr_ME;
					}
					break;
				case "sr":
				case "sr_RS":
				case "sr_rs":
					{

						if (!nexacro.Locale.sr_RS) {
							nexacro.Locale.sr_RS = {
								name : "sr_RS", 
								decimal_point : "\u002C", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0052\u0053\u0044\u0020", 
								currency_symbol : "\u0434\u0438\u043D", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u043D\u0435\u0434\u0435\u0459\u0430", "\u043F\u043E\u043D\u0435\u0434\u0435\u0459\u0430\u043A", "\u0443\u0442\u043E\u0440\u0430\u043A", "\u0441\u0440\u0435\u0434\u0430", "\u0447\u0435\u0442\u0432\u0440\u0442\u0430\u043A", "\u043F\u0435\u0442\u0430\u043A", "\u0441\u0443\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
								weekday_names_narrow : ["\u043D\u0435\u0434", "\u043F\u043E\u043D", "\u0443\u0442\u043E", "\u0441\u0440\u0435", "\u0447\u0435\u0442", "\u043F\u0435\u0442", "\u0441\u0443\u0431"], 
								month_names_long : ["\u0458\u0430\u043D\u0443\u0430\u0440", "\u0444\u0435\u0431\u0440\u0443\u0430\u0440", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440\u0438\u043B", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433\u0443\u0441\u0442", "\u0441\u0435\u043F\u0442\u0435\u043C\u0431\u0430\u0440", "\u043E\u043A\u0442\u043E\u0431\u0430\u0440", "\u043D\u043E\u0432\u0435\u043C\u0431\u0430\u0440", "\u0434\u0435\u0446\u0435\u043C\u0431\u0430\u0440"], 
								month_names_short : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
								month_names_narrow : ["\u0458\u0430\u043D", "\u0444\u0435\u0431", "\u043C\u0430\u0440", "\u0430\u043F\u0440", "\u043C\u0430\u0458", "\u0458\u0443\u043D", "\u0458\u0443\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043F", "\u043E\u043A\u0442", "\u043D\u043E\u0432", "\u0434\u0435\u0446"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059\u002E", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0054", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u002E\u0020\u0025\u0042\u0020\u0025\u0059\u002E\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u002C\u0020\u0025\u0065\u002E\u0020\u0025\u0062\u0020\u0025\u0059\u002E\u0020\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u000A", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.sr_RS;
					}
					break;
				case "ss":
				case "ss_ZA":
				case "ss_za":
					{

						if (!nexacro.Locale.ss_ZA) {
							nexacro.Locale.ss_ZA = {
								name : "ss_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004C\u0069\u0073\u006F\u006E\u0074\u0066\u006F", "\u0075\u004D\u0073\u006F\u006D\u0062\u0075\u006C\u0075\u006B\u006F", "\u004C\u0065\u0073\u0069\u0062\u0069\u006C\u0069", "\u004C\u0065\u0073\u0069\u0074\u0073\u0061\u0074\u0066\u0075", "\u004C\u0065\u0073\u0069\u006E\u0065", "\u004C\u0065\u0073\u0069\u0068\u006C\u0061\u006E\u0075", "\u0075\u004D\u0067\u0063\u0069\u0062\u0065\u006C\u006F"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u0073\u006F", "\u0042\u0069\u006C", "\u0054\u0073\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u0067\u0063"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u0073\u006F", "\u0042\u0069\u006C", "\u0054\u0073\u0061", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u0067\u0063"], 
								month_names_long : ["\u0042\u0068\u0069\u006D\u0062\u0069\u0064\u0076\u0077\u0061\u006E\u0065", "\u0069\u004E\u0064\u006C\u006F\u0076\u0061\u006E\u0065", "\u0069\u004E\u0064\u006C\u006F\u0076\u0075\u006C\u0065\u006E\u006B\u0068\u0075\u006C\u0075", "\u004D\u0061\u0062\u0061\u0073\u0061", "\u0049\u006E\u006B\u0068\u0077\u0065\u006E\u006B\u0068\u0077\u0065\u0074\u0069", "\u0069\u004E\u0068\u006C\u0061\u0062\u0061", "\u004B\u0068\u006F\u006C\u0077\u0061\u006E\u0065", "\u0069\u004E\u0067\u0063\u0069", "\u0069\u004E\u0079\u006F\u006E\u0069", "\u0049\u006D\u0070\u0061\u006C\u0061", "\u004C\u0077\u0065\u0074\u0069", "\u0069\u004E\u0067\u006F\u006E\u0067\u006F\u006E\u0069"], 
								month_names_short : ["\u0042\u0068\u0069", "\u0056\u0061\u006E", "\u0056\u0075\u006C", "\u004D\u0061\u0062", "\u004B\u0068\u006B", "\u004E\u0068\u006C", "\u004B\u0068\u006F", "\u004E\u0067\u0063", "\u004E\u0079\u006F", "\u0049\u006D\u0070", "\u004C\u0077\u0065", "\u004E\u0067\u006F"], 
								month_names_narrow : ["\u0042\u0068\u0069", "\u0056\u0061\u006E", "\u0056\u0075\u006C", "\u004D\u0061\u0062", "\u004B\u0068\u006B", "\u004E\u0068\u006C", "\u004B\u0068\u006F", "\u004E\u0067\u0063", "\u004E\u0079\u006F", "\u0049\u006D\u0070", "\u004C\u0077\u0065", "\u004E\u0067\u006F"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.ss_ZA;
					}
					break;
				case "st":
				case "st_ZA":
				case "st_za":
					{

						if (!nexacro.Locale.st_ZA) {
							nexacro.Locale.st_ZA = {
								name : "st_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u006F\u006E\u0074\u0061\u0068\u0061", "\u004D\u0061\u006E\u0074\u0061\u0068\u0061", "\u004C\u0061\u0062\u006F\u0062\u0065\u0064\u0069", "\u004C\u0061\u0062\u006F\u0072\u0061\u0072\u006F", "\u004C\u0061\u0062\u006F\u006E\u0065", "\u004C\u0061\u0062\u006F\u0068\u006C\u0061\u006E\u006F", "\u004D\u006F\u0071\u0065\u0062\u0065\u006C\u006F"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u006D\u0061", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u006F\u0071"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u006D\u0061", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0048\u006C\u0061", "\u004D\u006F\u0071"], 
								month_names_long : ["\u0050\u0068\u0065\u0072\u0065\u006B\u0067\u006F\u006E\u0067", "\u0048\u006C\u0061\u006B\u006F\u006C\u0061", "\u0054\u006C\u0068\u0061\u006B\u0075\u0062\u0065\u006C\u0065", "\u004D\u006D\u0065\u0073\u0065", "\u004D\u006F\u0074\u0073\u0068\u0065\u0061\u006E\u006F\u006E\u0067", "\u0050\u0068\u0075\u0070\u006A\u0061\u006E\u0065", "\u0050\u0068\u0075\u0070\u0075", "\u0050\u0068\u0061\u0074\u006F", "\u004C\u0065\u006F\u0074\u0073\u0065", "\u004D\u0070\u0068\u0061\u006C\u0061\u006E\u0065", "\u0050\u0075\u0064\u0075\u006E\u0067\u0077\u0061\u006E\u0061", "\u0054\u0073\u0068\u0069\u0074\u0077\u0065"], 
								month_names_short : ["\u0050\u0068\u0065", "\u0048\u006C\u0061", "\u0054\u006C\u0048", "\u004D\u006D\u0065", "\u004D\u006F\u0074", "\u004A\u0061\u006E", "\u0055\u0070\u0075", "\u0050\u0068\u0061", "\u004C\u0065\u006F", "\u004D\u0070\u0068", "\u0050\u0075\u0064", "\u0054\u0073\u0068"], 
								month_names_narrow : ["\u0050\u0068\u0065", "\u0048\u006C\u0061", "\u0054\u006C\u0048", "\u004D\u006D\u0065", "\u004D\u006F\u0074", "\u004A\u0061\u006E", "\u0055\u0070\u0075", "\u0050\u0068\u0061", "\u004C\u0065\u006F", "\u004D\u0070\u0068", "\u0050\u0075\u0064", "\u0054\u0073\u0068"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}


						return nexacro.Locale.st_ZA;
					}
					break;
				case "sv_FI":
				case "sv_fi":
					{

						if (!nexacro.Locale.sv_FI) {
							nexacro.Locale.sv_FI = {
								name : "sv_FI", 
								decimal_point : "\u002C", 
								thousands_sep : "\u00A0", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u00A0", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 2, 
								n_cs_precedes : 0, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0073\u00F6\u006E\u0064\u0061\u0067", "\u006D\u00E5\u006E\u0064\u0061\u0067", "\u0074\u0069\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F6\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
								weekday_names_narrow : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0069", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 1, 
								longdate_format : "\\\u0064\u0065\u006E\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002E\u0025\u006E\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.sv_FI;
					}
					break;
				case "sv":
				case "sv_SE":
				case "sv_se":
					{

						if (!nexacro.Locale.sv_SE) {
							nexacro.Locale.sv_SE = {
								name : "sv_SE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0053\u0045\u004B\u0020", 
								currency_symbol : "\u006B\u0072", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0073\u00F6\u006E\u0064\u0061\u0067", "\u006D\u00E5\u006E\u0064\u0061\u0067", "\u0074\u0069\u0073\u0064\u0061\u0067", "\u006F\u006E\u0073\u0064\u0061\u0067", "\u0074\u006F\u0072\u0073\u0064\u0061\u0067", "\u0066\u0072\u0065\u0064\u0061\u0067", "\u006C\u00F6\u0072\u0064\u0061\u0067"], 
								weekday_names_short : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
								weekday_names_narrow : ["\u0073\u00F6\u006E", "\u006D\u00E5\u006E", "\u0074\u0069\u0073", "\u006F\u006E\u0073", "\u0074\u006F\u0072", "\u0066\u0072\u0065", "\u006C\u00F6\u0072"], 
								month_names_long : ["\u006A\u0061\u006E\u0075\u0061\u0072\u0069", "\u0066\u0065\u0062\u0072\u0075\u0061\u0072\u0069", "\u006D\u0061\u0072\u0073", "\u0061\u0070\u0072\u0069\u006C", "\u006D\u0061\u006A", "\u006A\u0075\u006E\u0069", "\u006A\u0075\u006C\u0069", "\u0061\u0075\u0067\u0075\u0073\u0074\u0069", "\u0073\u0065\u0070\u0074\u0065\u006D\u0062\u0065\u0072", "\u006F\u006B\u0074\u006F\u0062\u0065\u0072", "\u006E\u006F\u0076\u0065\u006D\u0062\u0065\u0072", "\u0064\u0065\u0063\u0065\u006D\u0062\u0065\u0072"], 
								month_names_short : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u006A\u0061\u006E", "\u0066\u0065\u0062", "\u006D\u0061\u0072", "\u0061\u0070\u0072", "\u006D\u0061\u006A", "\u006A\u0075\u006E", "\u006A\u0075\u006C", "\u0061\u0075\u0067", "\u0073\u0065\u0070", "\u006F\u006B\u0074", "\u006E\u006F\u0076", "\u0064\u0065\u0063"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								time_format : "\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0048\u002E\u0025\u004D\u002E\u0025\u0053", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 1, 
								longdate_format : "\\\u0064\u0065\u006E\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0059\u002D\u0025\u006D\u002D\u0025\u0064", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.sv_SE;
					}
					break;
				case "ta":
				case "ta_IN":
				case "ta_in":
					{

						if (!nexacro.Locale.ta_IN) {
							nexacro.Locale.ta_IN = {
								name : "ta_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0BB0\u0BC2", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0B9E\u0BBE\u0BAF\u0BBF\u0BB1\u0BC1", "\u0BA4\u0BBF\u0B99\u0BCD\u0B95\u0BB3\u0BCD", "\u0B9A\u0BC6\u0BB5\u0BCD\u0BB5\u0BBE\u0BAF\u0BCD", "\u0BAA\u0BC1\u0BA4\u0BA9\u0BCD", "\u0BB5\u0BBF\u0BAF\u0BBE\u0BB4\u0BA9\u0BCD", "\u0BB5\u0BC6\u0BB3\u0BCD\u0BB3\u0BBF", "\u0B9A\u0BA9\u0BBF"], 
								weekday_names_short : ["\u0B9E\u0BBE", "\u0BA4\u0BBF", "\u0B9A\u0BC6", "\u0BAA\u0BC1", "\u0BB5\u0BBF", "\u0BB5\u0BC6", "\u0B9A"], 
								weekday_names_narrow : ["\u0B9E\u0BBE", "\u0BA4\u0BBF", "\u0B9A\u0BC6", "\u0BAA\u0BC1", "\u0BB5\u0BBF", "\u0BB5\u0BC6", "\u0B9A"], 
								month_names_long : ["\u0B9C\u0BA9\u0BB5\u0BB0\u0BBF", "\u0BAA\u0BBF\u0BAA\u0BCD\u0BB0\u0BB5\u0BB0\u0BBF", "\u0BAE\u0BBE\u0BB0\u0BCD\u0B9A\u0BCD", "\u0B8F\u0BAA\u0BCD\u0BB0\u0BB2\u0BCD", "\u0BAE\u0BC7", "\u0B9C\u0BC2\u0BA9\u0BCD", "\u0B9C\u0BC2\u0BB2\u0BC8", "\u0B86\u0B95\u0BB8\u0BCD\u0B9F\u0BCD", "\u0B9A\u0BC6\u0BAA\u0BCD\u0B9F\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD", "\u0B85\u0B95\u0BCD\u0B9F\u0BCB\u0BAA\u0BB0\u0BCD", "\u0BA8\u0BB5\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD", "\u0B9F\u0BBF\u0B9A\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD"], 
								month_names_short : ["\u0B9C\u0BA9", "\u0BAA\u0BBF\u0BAA\u0BCD", "\u0BAE\u0BBE\u0BB0\u0BCD", "\u0B8F\u0BAA\u0BCD", "\u0BAE\u0BC7", "\u0B9C\u0BC2\u0BA9\u0BCD", "\u0B9C\u0BC2\u0BB2\u0BC8", "\u0B86\u0B95", "\u0B9A\u0BC6\u0BAA\u0BCD", "\u0B85\u0B95\u0BCD", "\u0BA8\u0BB5", "\u0B9F\u0BBF\u0B9A"], 
								month_names_narrow : ["\u0B9C\u0BA9", "\u0BAA\u0BBF\u0BAA\u0BCD", "\u0BAE\u0BBE\u0BB0\u0BCD", "\u0B8F\u0BAA\u0BCD", "\u0BAE\u0BC7", "\u0B9C\u0BC2\u0BA9\u0BCD", "\u0B9C\u0BC2\u0BB2\u0BC8", "\u0B86\u0B95", "\u0B9A\u0BC6\u0BAA\u0BCD", "\u0B85\u0B95\u0BCD", "\u0BA8\u0BB5", "\u0B9F\u0BBF\u0B9A"], 
								ampm : ["\u0B95\u0BBE\u0BB2\u0BC8", "\u0BAE\u0BBE\u0BB2\u0BC8"], 
								date_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								time_format : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0041\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ta_IN;
					}
					break;
				case "te":
				case "te_IN":
				case "te_in":
					{

						if (!nexacro.Locale.te_IN) {
							nexacro.Locale.te_IN = {
								name : "te_IN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 2], 
								int_curr_symbol : "\u0049\u004E\u0052\u0020", 
								currency_symbol : "\u0C30\u0C42", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 2], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 2, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 4, 
								weekday_names_long : ["\u0C06\u0C26\u0C3F\u0C35\u0C3E\u0C30\u0C02", "\u0C38\u0C4b\u0C2E\u0C35\u0C3E\u0C30\u0C02", "\u0C2E\u0C02\u0C17\u0C33\u0C35\u0C3E\u0C30\u0C02", "\u0C2C\u0C41\u0C27\u0C35\u0C3E\u0C30\u0C02", "\u0C17\u0C41\u0C30\u0C41\u0C35\u0C3E\u0C30\u0C02", "\u0C36\u0C41\u0C15\u0C4d\u0C30\u0C35\u0C3E\u0C30\u0C02", "\u0C36\u0C28\u0C3F\u0C35\u0C3E\u0C30\u0C02"], 
								weekday_names_short : ["\u0C06\u0C26\u0C3F", "\u0C38\u0C4b\u0C2E", "\u0C2E\u0C02\u0C17\u0C33", "\u0C2C\u0C41\u0C27", "\u0C17\u0C41\u0C30\u0C41", "\u0C36\u0C41\u0C15\u0C4D\u0C30", "\u0C36\u0C28\u0C3F"], 
								weekday_names_narrow : ["\u0C06\u0C26\u0C3F", "\u0C38\u0C4b\u0C2E", "\u0C2E\u0C02\u0C17\u0C33", "\u0C2C\u0C41\u0C27", "\u0C17\u0C41\u0C30\u0C41", "\u0C36\u0C41\u0C15\u0C4D\u0C30", "\u0C36\u0C28\u0C3F"], 
								month_names_long : ["\u0C1C\u0C28\u0C35\u0C30\u0C3F", "\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F", "\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F", "\u0C0F\u0C2A\u0C4D\u0C30\u0C3F\u0C32\u0C4D", "\u0C2E\u0C47", "\u0C1C\u0C42\u0C28\u0C4D", "\u0C1C\u0C42\u0C32\u0C48", "\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41", "\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C41", "\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C41", "\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C41", "\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C41"], 
								month_names_short : ["\u0C1C\u0C28\u0C35\u0C30\u0C3F", "\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F", "\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F", "\u0C0F\u0C2a\u0C4D\u0C30\u0C3F\u0C32\u0C4D", "\u0C2E\u0C47", "\u0C1C\u0C42\u0C28\u0C4D", "\u0C1C\u0C42\u0C32\u0C48", "\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41", "\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C41", "\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C41", "\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C41", "\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C41"], 
								month_names_narrow : ["\u0C1C\u0C28\u0C35\u0C30\u0C3F", "\u0C2B\u0C3F\u0C2C\u0C4D\u0C30\u0C35\u0C30\u0C3F", "\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3F", "\u0C0F\u0C2a\u0C4D\u0C30\u0C3F\u0C32\u0C4D", "\u0C2E\u0C47", "\u0C1C\u0C42\u0C28\u0C4D", "\u0C1C\u0C42\u0C32\u0C48", "\u0C06\u0C17\u0C38\u0C4D\u0C1F\u0C41", "\u0C38\u0C46\u0C2A\u0C4D\u0C1F\u0C46\u0C02\u0C2C\u0C30\u0C41", "\u0C05\u0C15\u0C4D\u0C1F\u0C4B\u0C2C\u0C30\u0C41", "\u0C28\u0C35\u0C02\u0C2C\u0C30\u0C41", "\u0C21\u0C3F\u0C38\u0C46\u0C02\u0C2C\u0C30\u0C41"], 
								ampm : ["\u0C09\u002E", "\u0C38\u0C3E\u002E"], 
								date_format : "\u0025\u0042\u0020\u0025\u0064\u0020\u0025\u0041\u0020\u0025\u0059", 
								time_format : "\u0025\u0070\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0070\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
								date_time_format : "\u0025\u0042\u0020\u0025\u0064\u0020\u0025\u0041\u0020\u0025\u0059\u0020\u0025\u0070\u0025\u0049\u002E\u0025\u004D\u002E\u0025\u0053\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0079", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.te_IN;
					}
					break;
				case "tg":
				case "tg_TJ":
				case "tg_tj":
					{

						if (!nexacro.Locale.tg_TJ) {
							nexacro.Locale.tg_TJ = {
								name : "tg_TJ", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0054\u004A\u0053\u0020", 
								currency_symbol : "\u0440\u0443\u0431", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A", "\u0412\u0442\u043E\u0440\u043D\u0438\u043A", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041F\u044F\u0442\u043D\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
								weekday_names_narrow : ["\u0412\u0441\u043A", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
								month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044F", "\u0424\u0435\u0432\u0440\u0430\u043B\u044F", "\u041C\u0430\u0440\u0442\u0430", "\u0410\u043F\u0440\u0435\u043B\u044F", "\u041C\u0430\u044F", "\u0418\u044E\u043D\u044F", "\u0418\u044E\u043B\u044F", "\u0410\u0432\u0433\u0443\u0441\u0442\u0430", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u041E\u043A\u0442\u044F\u0431\u0440\u044F", "\u041D\u043E\u044F\u0431\u0440\u044F", "\u0414\u0435\u043A\u0430\u0431\u0440\u044F"], 
								month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.tg_TJ;
					}
					break;
				case "th":
				case "th_TH":
				case "th_th":
					{

						if (!nexacro.Locale.th_TH) {
							nexacro.Locale.th_TH = {
								name : "th_TH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0054\u0048\u0042\u0020", 
								currency_symbol : "\u0E3F", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								mon_n_sign_posn : 1, 
								weekday_names_long : ["\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C", "\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C", "\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23", "\u0E1E\u0E38\u0E18", "\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35", "\u0E28\u0E38\u0E01\u0E23\u0E4C", "\u0E40\u0E2A\u0E32\u0E23\u0E4C"], 
								weekday_names_short : ["\u0E2D\u0E32\u002E", "\u0E08\u002E", "\u0E2D\u002E", "\u0E1E\u002E", "\u0E1E\u0E24\u002E", "\u0E28\u002E", "\u0E2A\u002E"], 
								weekday_names_narrow : ["\u0E2D\u0E32\u002E", "\u0E08\u002E", "\u0E2D\u002E", "\u0E1E\u002E", "\u0E1E\u0E24\u002E", "\u0E28\u002E", "\u0E2A\u002E"], 
								month_names_long : ["\u0E21\u0E01\u0E23\u0E32\u0E04\u0E21", "\u0E01\u0E38\u0E21\u0E20\u0E32\u0E1E\u0E31\u0E19\u0E18\u0E4C", "\u0E21\u0E35\u0E19\u0E32\u0E04\u0E21", "\u0E40\u0E21\u0E29\u0E32\u0E22\u0E19", "\u0E1E\u0E24\u0E29\u0E20\u0E32\u0E04\u0E21", "\u0E21\u0E34\u0E16\u0E38\u0E19\u0E32\u0E22\u0E19", "\u0E01\u0E23\u0E01\u0E0E\u0E32\u0E04\u0E21", "\u0E2A\u0E34\u0E07\u0E2B\u0E32\u0E04\u0E21", "\u0E01\u0E31\u0E19\u0E22\u0E32\u0E22\u0E19", "\u0E15\u0E38\u0E25\u0E32\u0E04\u0E21", "\u0E1E\u0E24\u0E28\u0E08\u0E34\u0E01\u0E32\u0E22\u0E19", "\u0E18\u0E31\u0E19\u0E27\u0E32\u0E04\u0E21"], 
								month_names_short : ["\u0E21\u002E\u0E04\u002E", "\u0E01\u002E\u0E1E\u002E", "\u0E21\u0E35\u002E\u0E04\u002E", "\u0E40\u0E21\u002E\u0E22\u002E", "\u0E1E\u002E\u0E04\u002E", "\u0E21\u0E34\u002E\u0E22\u002E", "\u0E01\u002E\u0E04\u002E", "\u0E2A\u002E\u0E04\u002E", "\u0E01\u002E\u0E22\u002E", "\u0E15\u002E\u0E04\u002E", "\u0E1E\u002E\u0E22\u002E", "\u0E18\u002E\u0E04\u002E"], 
								month_names_narrow : ["\u0E21\u002E\u0E04\u002E", "\u0E01\u002E\u0E1E\u002E", "\u0E21\u0E35\u002E\u0E04\u002E", "\u0E40\u0E21\u002E\u0E22\u002E", "\u0E1E\u002E\u0E04\u002E", "\u0E21\u0E34\u002E\u0E22\u002E", "\u0E01\u002E\u0E04\u002E", "\u0E2A\u002E\u0E04\u002E", "\u0E01\u002E\u0E22\u002E", "\u0E15\u002E\u0E04\u002E", "\u0E1E\u002E\u0E22\u002E", "\u0E18\u002E\u0E04\u002E"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "%d\u002F%m\u002F%Ey", 
								time_format : "%H\u003A%M\u003A%S", 
								time_format_ampm : "%I\u003A%M\u003A%S\u0020%p", 
								date_time_format : "%a\u0020%e\u0020%b\u0020%Ey\u002C\u0020%H\u003A%M\u003A%S", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0065\u0020\u0025\u0062\u0020\u0025\u0045\u0079\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0020\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.th_TH;
					}
					break;
				case "ti_ER":
				case "ti_er":
					{

						if (!nexacro.Locale.ti_ER) {
							nexacro.Locale.ti_ER = {
								name : "ti_ER", 
								decimal_point : "\u002E", 
								thousands_sep : "", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0052\u004E\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 0, 
								frac_digits : 0, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u1230\u1295\u1260\u1275", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
								weekday_names_short : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
								weekday_names_narrow : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
								month_names_long : ["\u1325\u122A", "\u1208\u12AB\u1272\u1275", "\u1218\u130B\u1262\u1275", "\u121A\u12EB\u12DD\u12EB", "\u130D\u1295\u1266\u1275", "\u1230\u1290", "\u1213\u121D\u1208", "\u1290\u1213\u1230", "\u1218\u1235\u12A8\u1228\u121D", "\u1325\u1245\u121D\u1272", "\u1215\u12F3\u122D", "\u1273\u1215\u1233\u1235"], 
								month_names_short : ["\u1325\u122A\u0020", "\u1208\u12AB\u1272", "\u1218\u130B\u1262", "\u121A\u12EB\u12DD", "\u130D\u1295\u1266", "\u1230\u1290\u0020", "\u1213\u121D\u1208", "\u1290\u1213\u1230", "\u1218\u1235\u12A8", "\u1325\u1245\u121D", "\u1215\u12F3\u122D", "\u1273\u1215\u1233"], 
								month_names_narrow : ["\u1325\u122A\u0020", "\u1208\u12AB\u1272", "\u1218\u130B\u1262", "\u121A\u12EB\u12DD", "\u130D\u1295\u1266", "\u1230\u1290\u0020", "\u1213\u121D\u1208", "\u1290\u1213\u1230", "\u1218\u1235\u12A8", "\u1325\u1245\u121D", "\u1215\u12F3\u122D", "\u1273\u1215\u1233"], 
								ampm : ["\u1295\u1309\u1206> <U1230\u12D3\u1270", "\u12F5\u1215\u122D> <U1230\u12D3\u1275"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u1361\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u1361\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059\u0020\u12D3\u002F\u121D", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ti_ER;
					}
					break;
				case "ti":
				case "ti_ET":
				case "ti_et":
					{

						if (!nexacro.Locale.ti_ET) {
							nexacro.Locale.ti_ET = {
								name : "ti_ET", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0045\u0054\u0042\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u1230\u1295\u1260\u1275", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
								weekday_names_short : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
								weekday_names_narrow : ["\u1230\u1295\u1260", "\u1230\u1291\u12ED", "\u1230\u1209\u1235", "\u1228\u1261\u12D5", "\u1213\u1219\u1235", "\u12D3\u122D\u1262", "\u1240\u12F3\u121D"], 
								month_names_long : ["\u1303\u1295\u12E9\u12C8\u122A", "\u134C\u1265\u1229\u12C8\u122A", "\u121B\u122D\u127D", "\u12A4\u1355\u1228\u120D", "\u121C\u12ED", "\u1301\u1295", "\u1301\u120B\u12ED", "\u12A6\u1308\u1235\u1275", "\u1234\u1355\u1274\u121D\u1260\u122D", "\u12A6\u12AD\u1270\u12CD\u1260\u122D", "\u1296\u126C\u121D\u1260\u122D", "\u12F2\u1234\u121D\u1260\u122D"], 
								month_names_short : ["\u1303\u1295\u12E9", "\u134C\u1265\u1229", "\u121B\u122D\u127D", "\u12A4\u1355\u1228", "\u121C\u12ED\u0020", "\u1301\u1295\u0020", "\u1301\u120B\u12ED", "\u12A6\u1308\u1235", "\u1234\u1355\u1274", "\u12A6\u12AD\u1270", "\u1296\u126C\u121D", "\u12F2\u1234\u121D"], 
								month_names_narrow : ["\u1303\u1295\u12E9", "\u134C\u1265\u1229", "\u121B\u122D\u127D", "\u12A4\u1355\u1228", "\u121C\u12ED\u0020", "\u1301\u1295\u0020", "\u1301\u120B\u12ED", "\u12A6\u1308\u1235", "\u1234\u1355\u1274", "\u12A6\u12AD\u1270", "\u1296\u126C\u121D", "\u12F2\u1234\u121D"], 
								ampm : ["\u1295\u1309\u1206> <U1230\u12D3\u1270", "\u12F5\u1215\u122D> <U1230\u12D3\u1275"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u006C\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0058\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u1363\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u1363\u0020\u0025\u0042\u0020\u0025\u0065\u0020\u1218\u12D3\u120D\u1272\u0020\u0025\u0072\u0020\u0025\u005A\u0020\u0025\u0059\u0020\u12D3\u002F\u121D", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ti_ET;
					}
					break;
				case "tl":
				case "tl_PH":
				case "tl_ph":
					{

						if (!nexacro.Locale.tl_PH) {
							nexacro.Locale.tl_PH = {
								name : "tl_PH", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0050\u0048\u0050\u0020", 
								currency_symbol : "\u0050\u0068\u0050", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u004C\u0069\u006E\u0067\u0067\u006F", "\u004C\u0075\u006E\u0065\u0073", "\u004D\u0061\u0072\u0074\u0065\u0073", "\u004D\u0069\u0079\u0065\u0072\u006B\u006F\u006C\u0065\u0073", "\u0048\u0075\u0077\u0065\u0062\u0065\u0073", "\u0042\u0069\u0079\u0065\u0072\u006E\u0065\u0073", "\u0053\u0061\u0062\u0061\u0064\u006F"], 
								weekday_names_short : ["\u004C\u0069\u006E", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u0069\u0079", "\u0048\u0075\u0077", "\u0042\u0069\u0079", "\u0053\u0061\u0062"], 
								weekday_names_narrow : ["\u004C\u0069\u006E", "\u004C\u0075\u006E", "\u004D\u0061\u0072", "\u004D\u0069\u0079", "\u0048\u0075\u0077", "\u0042\u0069\u0079", "\u0053\u0061\u0062"], 
								month_names_long : ["\u0045\u006E\u0065\u0072\u006F", "\u0050\u0065\u0062\u0072\u0065\u0072\u006F", "\u004D\u0061\u0072\u0073\u006F", "\u0041\u0062\u0072\u0069\u006C", "\u004D\u0061\u0079\u006F", "\u0048\u0075\u006E\u0079\u006F", "\u0048\u0075\u006C\u0079\u006F", "\u0041\u0067\u006F\u0073\u0074\u006F", "\u0053\u0065\u0070\u0074\u0069\u0079\u0065\u006D\u0062\u0072\u0065", "\u004F\u006B\u0074\u0075\u0062\u0072\u0065", "\u004E\u006F\u0062\u0069\u0079\u0065\u006D\u0062\u0072\u0065", "\u0044\u0069\u0073\u0079\u0065\u006D\u0062\u0072\u0065"], 
								month_names_short : ["\u0045\u006E\u0065", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0079", "\u0048\u0075\u006E", "\u0048\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0062", "\u0044\u0069\u0073"], 
								month_names_narrow : ["\u0045\u006E\u0065", "\u0050\u0065\u0062", "\u004D\u0061\u0072", "\u0041\u0062\u0072", "\u004D\u0061\u0079", "\u0048\u0075\u006E", "\u0048\u0075\u006C", "\u0041\u0067\u006F", "\u0053\u0065\u0070", "\u004F\u006B\u0074", "\u004E\u006F\u0062", "\u0044\u0069\u0073"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u006D\u002F\u0025\u0064\u002F\u0025\u0079", 
								time_format : "\u0025\u0072", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0072\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.tl_PH;
					}
					break;
				case "tn":
				case "tn_ZA":
				case "tn_za":
					{

						if (!nexacro.Locale.tn_ZA) {
							nexacro.Locale.tn_ZA = {
								name : "tn_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u006C\u0061\u0054\u0073\u0068\u0069\u0070\u0069", "\u004D\u006F\u0073\u0075\u0070\u006F\u006C\u006F\u0067\u006F", "\u004C\u0061\u0062\u006F\u0062\u0065\u0064\u0069", "\u004C\u0061\u0062\u006F\u0072\u0061\u0072\u006F", "\u004C\u0061\u0062\u006F\u006E\u0065", "\u004C\u0061\u0062\u006F\u0074\u006C\u0068\u0061\u006E\u006F", "\u004C\u0061\u006D\u0061\u0074\u006C\u0068\u0061\u0074\u0073\u006F"], 
								weekday_names_short : ["\u0054\u0073\u0068", "\u004D\u006F\u0073", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0061\u0074"], 
								weekday_names_narrow : ["\u0054\u0073\u0068", "\u004D\u006F\u0073", "\u0042\u0065\u0064", "\u0052\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0061\u0074"], 
								month_names_long : ["\u0046\u0065\u0072\u0069\u006B\u0067\u006F\u006E\u0067", "\u0054\u006C\u0068\u0061\u006B\u006F\u006C\u0065", "\u004D\u006F\u0070\u0069\u0074\u006C\u0077\u0065", "\u004D\u006F\u0072\u0061\u006E\u0061\u006E\u0067", "\u004D\u006F\u0074\u0073\u0068\u0065\u0067\u0061\u006E\u006F\u006E\u0067", "\u0053\u0065\u0065\u0074\u0065\u0062\u006F\u0073\u0069\u0067\u006F", "\u0050\u0068\u0075\u006B\u0077\u0069", "\u0050\u0068\u0061\u0074\u0077\u0065", "\u004C\u0077\u0065\u0074\u0073\u0065", "\u0044\u0069\u0070\u0068\u0061\u006C\u0061\u006E\u0065", "\u004E\u0067\u0077\u0061\u006E\u0061\u0074\u0073\u0065\u006C\u0065", "\u0053\u0065\u0064\u0069\u006D\u006F\u006E\u0074\u0068\u006F\u006C\u0065"], 
								month_names_short : ["\u0046\u0065\u0072", "\u0054\u006C\u0068", "\u004D\u006F\u0070", "\u004D\u006F\u0072", "\u004D\u006F\u0074", "\u0053\u0065\u0065", "\u0050\u0068\u0075", "\u0050\u0068\u0061", "\u004C\u0077\u0065", "\u0044\u0069\u0070", "\u004E\u0067\u0077", "\u0053\u0065\u0064"], 
								month_names_narrow : ["\u0046\u0065\u0072", "\u0054\u006C\u0068", "\u004D\u006F\u0070", "\u004D\u006F\u0072", "\u004D\u006F\u0074", "\u0053\u0065\u0065", "\u0050\u0068\u0075", "\u0050\u0068\u0061", "\u004C\u0077\u0065", "\u0044\u0069\u0070", "\u004E\u0067\u0077", "\u0053\u0065\u0064"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.tn_ZA;
					}
					break;
				case "tr_CY":
				case "tr_cy":
					{

						if (!nexacro.Locale.tr_CY) {
							nexacro.Locale.tr_CY = {
								name : "tr_CY", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0054\u0052\u0059\u0020", 
								currency_symbol : "\u0059\u0054\u004C", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0050\u0061\u007A\u0061\u0072", "\u0050\u0061\u007A\u0061\u0072\u0074\u0065\u0073\u0069", "\u0053\u0061\u006C\u0131", "\u00C7\u0061\u0072\u015F\u0061\u006D\u0062\u0061", "\u0050\u0065\u0072\u015F\u0065\u006D\u0062\u0065", "\u0043\u0075\u006D\u0061", "\u0043\u0075\u006D\u0061\u0072\u0074\u0065\u0073\u0069"], 
								weekday_names_short : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
								weekday_names_narrow : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
								month_names_long : ["\u004F\u0063\u0061\u006B", "\u015E\u0075\u0062\u0061\u0074", "\u004D\u0061\u0072\u0074", "\u004E\u0069\u0073\u0061\u006E", "\u004D\u0061\u0079\u0131\u0073", "\u0048\u0061\u007A\u0069\u0072\u0061\u006E", "\u0054\u0065\u006D\u006D\u0075\u007A", "\u0041\u011F\u0075\u0073\u0074\u006F\u0073", "\u0045\u0079\u006C\u00FC\u006C", "\u0045\u006B\u0069\u006D", "\u004B\u0061\u0073\u0131\u006D", "\u0041\u0072\u0061\u006C\u0131\u006B"], 
								month_names_short : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
								month_names_narrow : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
								ampm : ["\u00D6\u00D6", "\u00D6\u0053"], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.tr_CY;
					}
					break;
				case "tr":
				case "tr_TR":
				case "tr_tr":
					{

						if (!nexacro.Locale.tr_TR) {
							nexacro.Locale.tr_TR = {
								name : "tr_TR", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0054\u0052\u0059\u0020", 
								currency_symbol : "\u0054\u004C", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0050\u0061\u007A\u0061\u0072", "\u0050\u0061\u007A\u0061\u0072\u0074\u0065\u0073\u0069", "\u0053\u0061\u006C\u0131", "\u00C7\u0061\u0072\u015F\u0061\u006D\u0062\u0061", "\u0050\u0065\u0072\u015F\u0065\u006D\u0062\u0065", "\u0043\u0075\u006D\u0061", "\u0043\u0075\u006D\u0061\u0072\u0074\u0065\u0073\u0069"], 
								weekday_names_short : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
								weekday_names_narrow : ["\u0050\u0061\u007A", "\u0050\u007A\u0074", "\u0053\u0061\u006C", "\u00C7\u0072\u015F", "\u0050\u0072\u015F", "\u0043\u0075\u006D", "\u0043\u0074\u0073"], 
								month_names_long : ["\u004F\u0063\u0061\u006B", "\u015E\u0075\u0062\u0061\u0074", "\u004D\u0061\u0072\u0074", "\u004E\u0069\u0073\u0061\u006E", "\u004D\u0061\u0079\u0131\u0073", "\u0048\u0061\u007A\u0069\u0072\u0061\u006E", "\u0054\u0065\u006D\u006D\u0075\u007A", "\u0041\u011F\u0075\u0073\u0074\u006F\u0073", "\u0045\u0079\u006C\u00FC\u006C", "\u0045\u006B\u0069\u006D", "\u004B\u0061\u0073\u0131\u006D", "\u0041\u0072\u0061\u006C\u0131\u006B"], 
								month_names_short : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
								month_names_narrow : ["\u004F\u0063\u0061", "\u015E\u0075\u0062", "\u004D\u0061\u0072", "\u004E\u0069\u0073", "\u004D\u0061\u0079", "\u0048\u0061\u007A", "\u0054\u0065\u006D", "\u0041\u011F\u0075", "\u0045\u0079\u006C", "\u0045\u006B\u0069", "\u004B\u0061\u0073", "\u0041\u0072\u0061"], 
								ampm : ["\u00D6\u00D6", "\u00D6\u0053"], 
								date_format : "\u0025\u0064\u002D\u0025\u006D\u002D\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0041", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.tr_TR;
					}
					break;
				case "ts":
				case "ts_ZA":
				case "ts_za":
					{

						if (!nexacro.Locale.ts_ZA) {
							nexacro.Locale.ts_ZA = {
								name : "ts_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u006F\u006E\u0074\u006F", "\u004D\u0075\u0073\u0075\u006D\u0062\u0068\u0075\u006E\u0075\u006B\u0075", "\u0052\u0061\u0076\u0075\u006D\u0062\u0069\u0072\u0068\u0069", "\u0052\u0061\u0076\u0075\u006E\u0068\u0061\u0072\u0068\u0075", "\u0052\u0061\u0076\u0075\u006D\u0075\u006E\u0065", "\u0052\u0061\u0076\u0075\u006E\u0074\u006C\u0068\u0061\u006E\u0075", "\u004D\u0075\u0067\u0071\u0069\u0076\u0065\u006C\u0061"], 
								weekday_names_short : ["\u0053\u006F\u006E", "\u004D\u0075\u0073", "\u0042\u0069\u0072", "\u0048\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0075\u0067"], 
								weekday_names_narrow : ["\u0053\u006F\u006E", "\u004D\u0075\u0073", "\u0042\u0069\u0072", "\u0048\u0061\u0072", "\u004E\u0065", "\u0054\u006C\u0068", "\u004D\u0075\u0067"], 
								month_names_long : ["\u0053\u0075\u006E\u0067\u0075\u0074\u0069", "\u004E\u0079\u0065\u006E\u0079\u0065\u006E\u0079\u0061\u006E\u0069", "\u004E\u0079\u0065\u006E\u0079\u0061\u006E\u006B\u0075\u006C\u0075", "\u0044\u007A\u0069\u0076\u0061\u006D\u0069\u0073\u006F\u006B\u006F", "\u004D\u0075\u0064\u0079\u0061\u0078\u0069\u0068\u0069", "\u004B\u0068\u006F\u0074\u0061\u0076\u0075\u0078\u0069\u006B\u0061", "\u004D\u0061\u0077\u0075\u0077\u0061\u006E\u0069", "\u004D\u0068\u0061\u0077\u0075\u0072\u0069", "\u004E\u0064\u007A\u0068\u0061\u0074\u0069", "\u004E\u0068\u006C\u0061\u006E\u0067\u0075\u006C\u0061", "\u0048\u0075\u006B\u0075\u0072\u0069", "\u004E\u0027\u0077\u0065\u006E\u0064\u007A\u0061\u006D\u0068\u0061\u006C\u0061"], 
								month_names_short : ["\u0053\u0075\u006E", "\u0059\u0061\u006E", "\u004B\u0075\u006C", "\u0044\u007A\u0069", "\u004D\u0075\u0064", "\u004B\u0068\u006F", "\u004D\u0061\u0077", "\u004D\u0068\u0061", "\u004E\u0064\u007A", "\u004E\u0068\u006C", "\u0048\u0075\u006B", "\u004E\u0027\u0077"], 
								month_names_narrow : ["\u0053\u0075\u006E", "\u0059\u0061\u006E", "\u004B\u0075\u006C", "\u0044\u007A\u0069", "\u004D\u0075\u0064", "\u004B\u0068\u006F", "\u004D\u0061\u0077", "\u004D\u0068\u0061", "\u004E\u0064\u007A", "\u004E\u0068\u006C", "\u0048\u0075\u006B", "\u004E\u0027\u0077"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ts_ZA;
					}
					break;
				case "tt":
				case "tt_RU":
				case "tt_ru":
					{

						if (!nexacro.Locale.tt_RU) {
							nexacro.Locale.tt_RU = {
								name : "tt_RU", 
								decimal_point : "\u002C", 
								thousands_sep : "\u2002", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0052\u0055\u0042\u0020", 
								currency_symbol : "\u0440\u002E", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u042F\u043A\u0448\u04D9\u043C\u0431\u0435", "\u0414\u044B\u0448\u04D9\u043C\u0431\u0435", "\u0421\u0438\u0448\u04D9\u043C\u0431\u0435", "\u0427\u04D9\u0440\u0448\u04D9\u04D9\u043C\u0431\u0435", "\u041F\u04D9\u043D\u0497\u0435\u0448\u043C\u0431\u0435", "\u0496\u043E\u043C\u0433\u0430", "\u0428\u0438\u043C\u0431\u04D9"], 
								weekday_names_short : ["\u042F\u043A\u0448", "\u0414\u044B\u0448", "\u0421\u0438\u0448", "\u0427\u04D9\u0440\u0448", "\u041F\u04D9\u043D\u0497", "\u0496\u043E\u043C", "\u0428\u0438\u043C"], 
								weekday_names_narrow : ["\u042F\u043A\u0448", "\u0414\u044B\u0448", "\u0421\u0438\u0448", "\u0427\u04D9\u0440\u0448", "\u041F\u04D9\u043D\u0497", "\u0496\u043E\u043C", "\u0428\u0438\u043C"], 
								month_names_long : ["\u042F\u043D\u0432\u0430\u0440\u044F", "\u0424\u0435\u0432\u0440\u0430\u043B\u044F", "\u041C\u0430\u0440\u0442\u0430", "\u0410\u043F\u0440\u0435\u043B\u044F", "\u041C\u0430\u044F", "\u0418\u044E\u043D\u044F", "\u0418\u044E\u043B\u044F", "\u0410\u0432\u0433\u0443\u0441\u0442\u0430", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044F", "\u041E\u043A\u0442\u044F\u0431\u0440\u044F", "\u041D\u043E\u044F\u0431\u0440\u044F", "\u0414\u0435\u043A\u0430\u0431\u0440\u044F"], 
								month_names_short : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								month_names_narrow : ["\u042F\u043D\u0432", "\u0424\u0435\u0432", "\u041C\u0430\u0440", "\u0410\u043F\u0440", "\u041C\u0430\u0439", "\u0418\u044E\u043D", "\u0418\u044E\u043B", "\u0410\u0432\u0433", "\u0421\u0435\u043D", "\u041E\u043A\u0442", "\u041D\u043E\u044F", "\u0414\u0435\u043A"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.tt_RU;
					}
					break;
				case "uk":
				case "uk_UA":
				case "uk_ua":
					{

						if (!nexacro.Locale.uk_UA) {
							nexacro.Locale.uk_UA = {
								name : "uk_UA", 
								decimal_point : "\u002C", 
								thousands_sep : "\u0020", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0055\u0041\u0048\u0020", 
								currency_symbol : "\u20B4", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u0020", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 0, 
								n_cs_precedes : 0, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u041D\u0435\u0434\u0456\u043B\u044F", "\u041F\u043E\u043D\u0435\u0434\u0456\u043B\u043E\u043A", "\u0412\u0456\u0432\u0442\u043E\u0440\u043E\u043A", "\u0421\u0435\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440", "\u041F\u0027\u044F\u0442\u043D\u0438\u0446\u044F", "\u0421\u0443\u0431\u043E\u0442\u0430"], 
								weekday_names_short : ["\u041D\u0434\u043B", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
								weekday_names_narrow : ["\u041D\u0434\u043B", "\u041F\u043D\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041F\u0442\u043D", "\u0421\u0431\u0442"], 
								month_names_long : ["\u0421\u0456\u0447\u0435\u043D\u044C", "\u041B\u044E\u0442\u0438\u0439", "\u0411\u0435\u0440\u0435\u0437\u0435\u043D\u044C", "\u041A\u0432\u0456\u0442\u0435\u043D\u044C", "\u0422\u0440\u0430\u0432\u0435\u043D\u044C", "\u0427\u0435\u0440\u0432\u0435\u043D\u044C", "\u041B\u0438\u043F\u0435\u043D\u044C", "\u0421\u0435\u0440\u043F\u0435\u043D\u044C", "\u0412\u0435\u0440\u0435\u0441\u0435\u043D\u044C", "\u0416\u043E\u0432\u0442\u0435\u043D\u044C", "\u041B\u0438\u0441\u0442\u043E\u043F\u0430\u0434", "\u0413\u0440\u0443\u0434\u0435\u043D\u044C"], 
								month_names_short : ["\u0421\u0456\u0447", "\u041B\u044E\u0442", "\u0411\u0435\u0440", "\u041A\u0432\u0456", "\u0422\u0440\u0430", "\u0427\u0435\u0440", "\u041B\u0438\u043F", "\u0421\u0435\u0440", "\u0412\u0435\u0440", "\u0416\u043E\u0432", "\u041B\u0438\u0441", "\u0413\u0440\u0443"], 
								month_names_narrow : ["\u0421\u0456\u0447", "\u041B\u044E\u0442", "\u0411\u0435\u0440", "\u041A\u0432\u0456", "\u0422\u0440\u0430", "\u0427\u0435\u0440", "\u041B\u0438\u043F", "\u0421\u0435\u0440", "\u0412\u0435\u0440", "\u0416\u043E\u0432", "\u041B\u0438\u0441", "\u0413\u0440\u0443"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0065\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0070\u002E", 
								shortdate_format : "\u0025\u0064\u002E\u0025\u006D\u002E\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.uk_UA;
					}
					break;
				case "ur":
				case "ur_PK":
				case "ur_pk":
					{

						if (!nexacro.Locale.ur_PK) {
							nexacro.Locale.ur_PK = {
								name : "ur_PK", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0050\u004B\u0052\u0020", 
								currency_symbol : "\u0052\u0073", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 2, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
								weekday_names_short : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
								weekday_names_narrow : ["\u0627\u062A\u0648\u0627\u0631", "\u067E\u064A\u0631", "\u0645\u0646\u06AF\u0644", "\u0628\u062F\u06BE", "\u062C\u0645\u0639\u0631\u0627\u062A", "\u062C\u0645\u0639\u0647", "\u0647\u0641\u062A\u0647"], 
								month_names_long : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
								month_names_short : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
								month_names_narrow : ["\u062C\u0646\u0648\u0631\u064A", "\u0641\u0631\u0648\u0631\u064A", "\u0645\u0627\u0631\u0686", "\u0627\u067E\u0631\u064A\u0644", "\u0645\u0653\u06CC", "\u062C\u0648\u0646", "\u062C\u0648\u0644\u0627\u064A", "\u0627\u06AF\u0633\u062A", "\u0633\u062A\u0645\u0628\u0631", "\u0627\u0643\u062A\u0648\u0628\u0631", "\u0646\u0648\u0645\u0628\u0631", "\u062F\u0633\u0645\u0628\u0631"], 
								ampm : ["\u0635", "\u0634"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0050\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0648\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u062A\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "rtl"
							};
						}

						return nexacro.Locale.ur_PK;
					}
					break;
				case "uz":
				case "uz_UZ":
				case "uz_uz":
					{

						if (!nexacro.Locale.uz_UZ) {
							nexacro.Locale.uz_UZ = {
								name : "uz_UZ", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0055\u005A\u0053\u0020", 
								currency_symbol : "\u0073\u006F\u0027\u006D", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0059\u0061\u006B\u0073\u0068\u0061\u006E\u0062\u0061", "\u0044\u0075\u0073\u0068\u0061\u006E\u0062\u0061", "\u0053\u0065\u0073\u0068\u0061\u006E\u0062\u0061", "\u0043\u0068\u006F\u0072\u0073\u0068\u0061\u006E\u0062\u0061", "\u0050\u0061\u0079\u0073\u0068\u0061\u006E\u0062\u0061", "\u004A\u0075\u006D\u0061", "\u0053\u0068\u0061\u006E\u0062\u0061"], 
								weekday_names_short : ["\u0059\u0061\u006B", "\u0044\u0075", "\u0053\u0065", "\u0043\u0068\u006F", "\u0050\u0061\u0079", "\u004A\u0075", "\u0053\u0068\u0061"], 
								weekday_names_narrow : ["\u0059\u0061\u006B", "\u0044\u0075", "\u0053\u0065", "\u0043\u0068\u006F", "\u0050\u0061\u0079", "\u004A\u0075", "\u0053\u0068\u0061"], 
								month_names_long : ["\u0059\u0061\u006E\u0076\u0061\u0072", "\u0046\u0065\u0076\u0072\u0061\u006C", "\u004D\u0061\u0072\u0074", "\u0041\u0070\u0072\u0065\u006C", "\u004D\u0061\u0079", "\u0049\u0079\u0075\u006E", "\u0049\u0079\u0075\u006C", "\u0041\u0076\u0067\u0075\u0073\u0074", "\u0053\u0065\u006E\u0074\u0079\u0061\u0062\u0072", "\u004F\u006B\u0074\u0079\u0061\u0062\u0072", "\u004E\u006F\u0079\u0061\u0062\u0072", "\u0044\u0065\u006B\u0061\u0062\u0072"], 
								month_names_short : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0049\u0079\u006E", "\u0049\u0079\u006C", "\u0041\u0076\u0067", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
								month_names_narrow : ["\u0059\u0061\u006E", "\u0046\u0065\u0076", "\u004D\u0061\u0072", "\u0041\u0070\u0072", "\u004D\u0061\u0079", "\u0049\u0079\u006E", "\u0049\u0079\u006C", "\u0041\u0076\u0067", "\u0053\u0065\u006E", "\u004F\u006B\u0074", "\u004E\u006F\u0079", "\u0044\u0065\u006B"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0054\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0079\u0069\u006C\u002C\u0020\u0025\u0041", 
								full_date_time_format : "\u0025\u0064\u0020\u0025\u0042\u002C\u0020\u0025\u0059\u0020\u0079\u0069\u006C\u002C\u0020\u0025\u0041", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.uz_UZ;
					}
					break;
				case "ve":
				case "ve_ZA":
				case "ve_za":
					{

						if (!nexacro.Locale.ve_ZA) {
							nexacro.Locale.ve_ZA = {
								name : "ve_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0053\u0077\u006F\u006E\u0064\u0061\u0068\u0061", "\u004D\u0075\u0073\u0075\u006D\u0062\u0075\u006C\u0075\u0077\u006F", "\u1E3C\u0061\u0076\u0068\u0075\u0076\u0068\u0069\u006C\u0069", "\u1E3C\u0061\u0076\u0068\u0075\u0072\u0061\u0072\u0075", "\u1E3C\u0061\u0076\u0068\u0075\u1E4B\u0061", "\u1E3C\u0061\u0076\u0068\u0075\u1E71\u0061\u006E\u0075", "\u004D\u0075\u0067\u0069\u0076\u0068\u0065\u006C\u0061"], 
								weekday_names_short : ["\u0053\u0077\u006F", "\u004D\u0075\u0073", "\u0056\u0068\u0069", "\u0052\u0061\u0072", "\u1E4B\u0061", "\u1E70\u0061\u006E", "\u004D\u0075\u0067"], 
								weekday_names_narrow : ["\u0053\u0077\u006F", "\u004D\u0075\u0073", "\u0056\u0068\u0069", "\u0052\u0061\u0072", "\u1E4B\u0061", "\u1E70\u0061\u006E", "\u004D\u0075\u0067"], 
								month_names_long : ["\u0050\u0068\u0061\u006E\u0064\u006F", "\u004C\u0075\u0068\u0075\u0068\u0069", "\u1E70\u0068\u0061\u0066\u0061\u006D\u0075\u0068\u0077\u0065", "\u004C\u0061\u006D\u0062\u0061\u006D\u0061\u0069", "\u0053\u0068\u0075\u006E\u0064\u0075\u006E\u0074\u0068\u0075\u006C\u0065", "\u0046\u0075\u006C\u0077\u0069", "\u0046\u0075\u006C\u0077\u0061\u006E\u0061", "\u1E70\u0068\u0061\u006E\u0067\u0075\u006C\u0065", "\u004B\u0068\u0075\u0062\u0076\u0075\u006D\u0065\u0064\u007A\u0069", "\u0054\u0073\u0068\u0069\u006D\u0065\u0064\u007A\u0069", "\u1E3C\u0061\u0072\u0061", "\u004E\u0079\u0065\u006E\u0064\u0061\u0076\u0068\u0075\u0073\u0069\u006B\u0075"], 
								month_names_short : ["\u0050\u0068\u0061", "\u004C\u0075\u0068", "\u0046\u0061\u006D", "\u004C\u0061\u006D", "\u0053\u0068\u0075", "\u004C\u0077\u0069", "\u004C\u0077\u0061", "\u004E\u0067\u0075", "\u004B\u0068\u0075", "\u0054\u0073\u0068", "\u1E3C\u0061\u0072", "\u004E\u0079\u0065"], 
								month_names_narrow : ["\u0050\u0068\u0061", "\u004C\u0075\u0068", "\u0046\u0061\u006D", "\u004C\u0061\u006D", "\u0053\u0068\u0075", "\u004C\u0077\u0069", "\u004C\u0077\u0061", "\u004E\u0067\u0075", "\u004B\u0068\u0075", "\u0054\u0073\u0068", "\u1E3C\u0061\u0072", "\u004E\u0079\u0065"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u0064\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.ve_ZA;
					}
					break;
				case "vi":
				case "vi_VN":
				case "vi_vn":
					{

						if (!nexacro.Locale.vi_VN) {
							nexacro.Locale.vi_VN = {
								name : "vi_VN", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0056\u004E\u0044\u0020", 
								currency_symbol : "\u20AB", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0043\u0068\u1EE7\u0020\u006E\u0068\u1EAD\u0074", "\u0054\u0068\u1EE9\u0020\u0068\u0061\u0069", "\u0054\u0068\u1EE9\u0020\u0062\u0061", "\u0054\u0068\u1EE9\u0020\u0074\u01B0", "\u0054\u0068\u1EE9\u0020\u006E\u0103\u006D", "\u0054\u0068\u1EE9\u0020\u0073\u00E1\u0075", "\u0054\u0068\u1EE9\u0020\u0062\u1EA3\u0079"], 
								weekday_names_short : ["\u0043\u004E", "\u0054\u0032", "\u0054\u0033", "\u0054\u0034", "\u0054\u0035", "\u0054\u0036", "\u0054\u0037"], 
								weekday_names_narrow : ["\u0043\u004E", "\u0054\u0032", "\u0054\u0033", "\u0054\u0034", "\u0054\u0035", "\u0054\u0036", "\u0054\u0037"], 
								month_names_long : ["\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u1ED9\u0074", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0068\u0061\u0069", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0062\u0061", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0074\u01B0", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006E\u0103\u006D", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0073\u00E1\u0075", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0062\u1EA3\u0079", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0074\u00E1\u006D", "\u0054\u0068\u00E1\u006E\u0067\u0020\u0063\u0068\u00ED\u006E", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u01B0\u1EDD\u0069", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u01B0\u1EDD\u0069\u0020\u006D\u1ED9\u0074", "\u0054\u0068\u00E1\u006E\u0067\u0020\u006D\u01B0\u1EDD\u0069\u0020\u0068\u0061\u0069"], 
								month_names_short : ["\u0054\u0068\u0030\u0031", "\u0054\u0068\u0030\u0032", "\u0054\u0068\u0030\u0033", "\u0054\u0068\u0030\u0034", "\u0054\u0068\u0030\u0035", "\u0054\u0068\u0030\u0036", "\u0054\u0068\u0030\u0037", "\u0054\u0068\u0030\u0038", "\u0054\u0068\u0030\u0039", "\u0054\u0068\u0031\u0030", "\u0054\u0068\u0031\u0031", "\u0054\u0068\u0031\u0032"], 
								month_names_narrow : ["\u0054\u0068\u0030\u0031", "\u0054\u0068\u0030\u0032", "\u0054\u0068\u0030\u0033", "\u0054\u0068\u0030\u0034", "\u0054\u0068\u0030\u0035", "\u0054\u0068\u0030\u0036", "\u0054\u0068\u0030\u0037", "\u0054\u0068\u0030\u0038", "\u0054\u0068\u0030\u0039", "\u0054\u0068\u0031\u0030", "\u0054\u0068\u0031\u0031", "\u0054\u0068\u0031\u0032"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u0020\u0025\u0070", 
								date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u004E\u0103\u006D\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0041\u002C\u0020\u0025\u0064\u0020\u0025\u0042\u0020\u006E\u0103\u006D\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059", 
								shortdate_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.vi_VN;
					}
					break;
				case "wa":
				case "wa_BE":
				case "wa_be":
					{

						if (!nexacro.Locale.wa_BE) {
							nexacro.Locale.wa_BE = {
								name : "wa_BE", 
								decimal_point : "\u002C", 
								thousands_sep : "\u002E", 
								grouping : [0, 0], 
								int_curr_symbol : "\u0045\u0055\u0052\u0020", 
								currency_symbol : "\u20AC", 
								mon_decimal_point : "\u002C", 
								mon_thousands_sep : "\u002E", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 0, 
								p_sep_by_space : 1, 
								n_cs_precedes : 0, 
								n_sep_by_space : 1, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0064\u0069\u006D\u0065\u0067\u006E\u0065", "\u006C\u006F\u006E\u0064\u0069", "\u006D\u00E5\u0072\u0064\u0069", "\u006D\u0069\u0065\u0072\u006B\u0069\u0064\u0069", "\u0064\u006A\u0075\u0064\u0069", "\u0076\u00E9\u006E\u0072\u0064\u0069", "\u0073\u0065\u006D\u0064\u0069"], 
								weekday_names_short : ["\u0064\u0069\u006D", "\u006C\u006F\u006E", "\u006D\u00E5\u0072", "\u006D\u0069\u0065", "\u0064\u006A\u0075", "\u0076\u00E9\u006E", "\u0073\u0065\u006D"], 
								weekday_names_narrow : ["\u0064\u0069\u006D", "\u006C\u006F\u006E", "\u006D\u00E5\u0072", "\u006D\u0069\u0065", "\u0064\u006A\u0075", "\u0076\u00E9\u006E", "\u0073\u0065\u006D"], 
								month_names_long : ["\u0064\u006A\u0061\u006E\u0076\u00EE", "\u0066\u0065\u0076\u0072\u00EE", "\u006D\u00E5\u0073\u0073", "\u0061\u0076\u0072\u0069", "\u006D\u0061\u0079", "\u0064\u006A\u0075\u006E", "\u0064\u006A\u0075\u006C\u0065\u0074\u0065", "\u0061\u0077\u006F\u0075\u0073\u0073\u0065", "\u0073\u0065\u0074\u0069\u006D\u0062\u0065", "\u006F\u0063\u0074\u00F4\u0062\u0065", "\u006E\u00F4\u0076\u0069\u006D\u0062\u0065", "\u0064\u0065\u0063\u0069\u006D\u0062\u0065"], 
								month_names_short : ["\u0064\u006A\u0061", "\u0066\u0065\u0076", "\u006D\u00E5\u0073", "\u0061\u0076\u0072", "\u006D\u0061\u0079", "\u0064\u006A\u006E", "\u0064\u006A\u006C", "\u0061\u0077\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u00F4\u0076", "\u0064\u0065\u0063"], 
								month_names_narrow : ["\u0064\u006A\u0061", "\u0066\u0065\u0076", "\u006D\u00E5\u0073", "\u0061\u0076\u0072", "\u006D\u0061\u0079", "\u0064\u006A\u006E", "\u0064\u006A\u006C", "\u0061\u0077\u006F", "\u0073\u0065\u0074", "\u006F\u0063\u0074", "\u006E\u00F4\u0076", "\u0064\u0065\u0063"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0070", 
								date_time_format : "\u004C\u0069\u0020\u0025\u0041\u0020\u0025\u0064\u0020\u0064\u0069\u0020\u0025\u0042\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.wa_BE;
					}
					break;
				case "xh":
				case "xh_ZA":
				case "xh_za":
					{

						if (!nexacro.Locale.xh_ZA) {
							nexacro.Locale.xh_ZA = {
								name : "xh_ZA", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u005A\u0041\u0052\u0020", 
								currency_symbol : "\u0052", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u0069\u0043\u0061\u0077\u0061", "\u0075\u004D\u0076\u0075\u006C\u006F", "\u006C\u0077\u0065\u0073\u0069\u0042\u0069\u006E\u0069", "\u006C\u0077\u0065\u0073\u0069\u0054\u0068\u0061\u0074\u0068\u0075", "\u0075\u006C\u0077\u0065\u0053\u0069\u006E\u0065", "\u006C\u0077\u0065\u0073\u0069\u0048\u006C\u0061\u006E\u0075", "\u0075\u004D\u0067\u0071\u0069\u0062\u0065\u006C\u006F"], 
								weekday_names_short : ["\u0043\u0061\u0077", "\u004D\u0076\u0075", "\u0042\u0069\u006E", "\u0054\u0068\u0061", "\u0053\u0069\u006E", "\u0048\u006C\u0061", "\u004D\u0067\u0071"], 
								weekday_names_narrow : ["\u0043\u0061\u0077", "\u004D\u0076\u0075", "\u0042\u0069\u006E", "\u0054\u0068\u0061", "\u0053\u0069\u006E", "\u0048\u006C\u0061", "\u004D\u0067\u0071"], 
								month_names_long : ["\u0065\u0079\u006F\u004D\u0071\u0075\u006E\u0067\u0075", "\u0065\u0079\u006F\u004D\u0064\u0075\u006D\u0062\u0061", "\u0065\u0079\u006F\u004B\u0077\u0069\u006E\u0064\u006C\u0061", "\u0075\u0054\u0073\u0068\u0061\u007A\u0069\u006D\u0070\u0075\u007A\u0069", "\u0075\u0043\u0061\u006E\u007A\u0069\u0062\u0065", "\u0065\u0079\u0065\u0053\u0069\u006C\u0069\u006D\u0065\u006C\u0061", "\u0065\u0079\u0065\u004B\u0068\u0061\u006C\u0061", "\u0065\u0079\u0065\u0054\u0068\u0075\u0070\u0061", "\u0065\u0079\u006F\u004D\u0073\u0069\u006E\u0074\u0073\u0069", "\u0065\u0079\u0065\u0044\u0077\u0061\u0072\u0068\u0061", "\u0065\u0079\u0065\u004E\u006B\u0061\u006E\u0067\u0061", "\u0065\u0079\u006F\u004D\u006E\u0067\u0061"], 
								month_names_short : ["\u004D\u0071\u0075", "\u004D\u0064\u0075", "\u004B\u0077\u0069", "\u0054\u0073\u0068", "\u0043\u0061\u006E", "\u0053\u0069\u006C", "\u004B\u0068\u0061", "\u0054\u0068\u0075", "\u004D\u0073\u0069", "\u0044\u0077\u0061", "\u004E\u006B\u0061", "\u004D\u006E\u0067"], 
								month_names_narrow : ["\u004D\u0071\u0075", "\u004D\u0064\u0075", "\u004B\u0077\u0069", "\u0054\u0073\u0068", "\u0043\u0061\u006E", "\u0053\u0069\u006C", "\u004B\u0068\u0061", "\u0054\u0068\u0075", "\u004D\u0073\u0069", "\u0044\u0077\u0061", "\u004E\u006B\u0061", "\u004D\u006E\u0067"], 
								ampm : ["", ""], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059", 
								time_format : "\u0025\u0054", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0061\u0020\u0025\u002D\u0065\u0020\u0025\u0062\u0020\u0025\u0059\u0020\u0025\u0054\u0020\u0025\u005A", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u002D\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.xh_ZA;
					}
					break;
				case "yi":
				case "yi_US":
				case "yi_us":
					{

						if (!nexacro.Locale.yi_US) {
							nexacro.Locale.yi_US = {
								name : "yi_US", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3, 3], 
								int_curr_symbol : "\u0055\u0053\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3, 3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 1, 
								n_cs_precedes : 1, 
								n_sep_by_space : 1, 
								p_sign_posn : 2, 
								n_sign_posn : 2, 
								weekday_names_long : ["\u05D6\u05D5\u05E0\u05D8\u05D9\u05E7", "\u05DE\u05D0\u05B8\u05E0\u05D8\u05D9\u05E7", "\u05D3\u05D9\u05E0\u05E1\u05D8\u05D9\u05E7", "\u05DE\u05D9\u05D8\u05F0\u05D0\u05B8\u05DA", "\u05D3\u05D0\u05B8\u05E0\u05E2\u05E8\u05E9\u05D8\u05D9\u05E7", "\u05E4\u05BF\u05E8\u05F2\u05B7\u05D8\u05D9\u05E7", "\u05E9\u05D1\u05EA"], 
								weekday_names_short : ["\u05D6\u05D5\u05E0\u0027", "\u05DE\u05D0\u05B8\u05E0\u0027", "\u05D3\u05D9\u05E0\u0027", "\u05DE\u05D9\u05D8\u0027", "\u05D3\u05D0\u05B8\u05E0\u0027", "\u05E4\u05BF\u05E8\u05F2\u05B7\u0027", "\u05E9\u05D1\u05EA"], 
								weekday_names_narrow : ["\u05D6\u05D5\u05E0\u0027", "\u05DE\u05D0\u05B8\u05E0\u0027", "\u05D3\u05D9\u05E0\u0027", "\u05DE\u05D9\u05D8\u0027", "\u05D3\u05D0\u05B8\u05E0\u0027", "\u05E4\u05BF\u05E8\u05F2\u05B7\u0027", "\u05E9\u05D1\u05EA"], 
								month_names_long : ["\u05D9\u05D0\u05B7\u05E0\u05D5\u05D0\u05B7\u05E8", "\u05E4\u05BF\u05E2\u05D1\u05E8\u05D5\u05D0\u05B7\u05E8", "\u05DE\u05D0\u05B7\u05E8\u05E5", "\u05D0\u05B7\u05E4\u05BC\u05E8\u05D9\u05DC", "\u05DE\u05F2\u05B7", "\u05D9\u05D5\u05E0\u05D9", "\u05D9\u05D5\u05DC\u05D9", "\u05D0\u05F1\u05D2\u05D5\u05E1\u05D8", "\u05E1\u05E2\u05E4\u05BC\u05D8\u05E2\u05DE\u05D1\u05E2\u05E8", "\u05D0\u05B8\u05E7\u05D8\u05D0\u05B8\u05D1\u05E2\u05E8", "\u05E0\u05D0\u05B8\u05F0\u05E2\u05DE\u05D1\u05E2\u05E8", "\u05D3\u05E2\u05E6\u05E2\u05DE\u05D1\u05E2\u05E8"], 
								month_names_short : ["\u05D9\u05D0\u05B7\u05E0", "\u05E4\u05BF\u05E2\u05D1", "\u05DE\u05D0\u05B7\u05E8", "\u05D0\u05B7\u05E4\u05BC\u05E8", "\u05DE\u05F2\u05B7\u0020", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05F1\u05D2", "\u05E1\u05E2\u05E4\u05BC", "\u05D0\u05B8\u05E7\u05D8", "\u05E0\u05D0\u05B8\u05F0", "\u05D3\u05E2\u05E6"], 
								month_names_narrow : ["\u05D9\u05D0\u05B7\u05E0", "\u05E4\u05BF\u05E2\u05D1", "\u05DE\u05D0\u05B7\u05E8", "\u05D0\u05B7\u05E4\u05BC\u05E8", "\u05DE\u05F2\u05B7\u0020", "\u05D9\u05D5\u05E0", "\u05D9\u05D5\u05DC", "\u05D0\u05F1\u05D2", "\u05E1\u05E2\u05E4\u05BC", "\u05D0\u05B8\u05E7\u05D8", "\u05E0\u05D0\u05B8\u05F0", "\u05D3\u05E2\u05E6"], 
								ampm : ["\u0041\u004D", "\u0050\u004D"], 
								date_format : "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0079", 
								time_format : "\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								time_format_ampm : "\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0050", 
								date_time_format : "\u0025\u005A\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u0059\u0020\u0025\u0062\u0020\u0025\u0064\u0020\u0025\u0061", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "", 
								shortdate_format : "", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.yi_US;
					}
					break;
				case "zh":
				case "zh_CN":
				case "zh_cn":
					{

						if (!nexacro.Locale.zh_CN) {
							nexacro.Locale.zh_CN = {
								name : "zh_CN", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0043\u004E\u0059\u0020", 
								currency_symbol : "\uFFE5", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 4, 
								n_sign_posn : 4, 
								weekday_names_long : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
								weekday_names_short : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
								weekday_names_narrow : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
								month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
								month_names_short : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								month_names_narrow : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
								date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
								time_format : "\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2", 
								time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2", 
								date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0041\u0020\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2", 
								full_date_time_format : "\u0025\u0059\u5E74\u0020\u0025\u006D\u6708\u0020\u0025\u0064\u65E5\u0020\u0025\u0041\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
								shortdate_format : "\u0025\u0059\u002F\u0025\u006E\u002F\u0025\u0065", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.zh_CN;
					}
					break;
				case "zh_HK":
				case "zh_hk":
					{

						if (!nexacro.Locale.zh_HK) {
							nexacro.Locale.zh_HK = {
								name : "zh_HK", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0048\u004B\u0044\u0020", 
								currency_symbol : "\u0048\u004B\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
								weekday_names_short : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
								weekday_names_narrow : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
								month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
								month_names_short : ["\u0031\u6708", "\u0032\u6708", "\u0033\u6708", "\u0034\u6708", "\u0035\u6708", "\u0036\u6708", "\u0037\u6708", "\u0038\u6708", "\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								month_names_narrow : ["\u0031\u6708", "\u0032\u6708", "\u0033\u6708", "\u0034\u6708", "\u0035\u6708", "\u0036\u6708", "\u0037\u6708", "\u0038\u6708", "\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
								date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0041", 
								time_format : "\u0025\u0049\u6642\u0025\u004D\u5206\u0025\u0053\u79D2\u0020\u0025\u005A", 
								time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u003A\u0025\u004D\u003A\u0025\u0053", 
								date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0041\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.zh_HK;
					}
					break;
				case "zh_SG":
				case "zh_sg":
					{

						if (!nexacro.Locale.zh_SG) {
							nexacro.Locale.zh_SG = {
								name : "zh_SG", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0053\u0047\u0044\u0020", 
								currency_symbol : "\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								mon_n_sign_posn : 0, 
								weekday_names_long : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
								weekday_names_short : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
								weekday_names_narrow : ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"], 
								month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
								month_names_short : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
								month_names_narrow : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
								ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
								date_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
								time_format : "\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2\u0020\u0025\u005A", 
								time_format_ampm : "", 
								date_time_format : "\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0025\u0048\u65F6\u0025\u004D\u5206\u0025\u0053\u79D2\u0020\u0025\u005A", 
								full_date_time_format : "", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
								shortdate_format : "\u0025\u0065\u002F\u0025\u006E\u002F\u0025\u0059", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.zh_SG;
					}
					break;
				case "zh_TW":
				case "zh_tw":
					{

						if (!nexacro.Locale.zh_TW) {
							nexacro.Locale.zh_TW = {
								name : "zh_TW", 
								decimal_point : "\u002E", 
								thousands_sep : "\u002C", 
								grouping : [3], 
								int_curr_symbol : "\u0054\u0057\u0044\u0020", 
								currency_symbol : "\u004E\u0054\u0024", 
								mon_decimal_point : "\u002E", 
								mon_thousands_sep : "\u002C", 
								mon_grouping : [3], 
								positive_sign : "", 
								negative_sign : "\u002D", 
								int_frac_digits : 2, 
								frac_digits : 2, 
								p_cs_precedes : 1, 
								p_sep_by_space : 0, 
								n_cs_precedes : 1, 
								n_sep_by_space : 0, 
								p_sign_posn : 1, 
								n_sign_posn : 1, 
								weekday_names_long : ["\u9031\u65E5", "\u9031\u4E00", "\u9031\u4E8C", "\u9031\u4E09", "\u9031\u56DB", "\u9031\u4E94", "\u9031\u516D"], 
								weekday_names_short : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
								weekday_names_narrow : ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], 
								month_names_long : ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"], 
								month_names_short : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								month_names_narrow : ["\u0020\u0031\u6708", "\u0020\u0032\u6708", "\u0020\u0033\u6708", "\u0020\u0034\u6708", "\u0020\u0035\u6708", "\u0020\u0036\u6708", "\u0020\u0037\u6708", "\u0020\u0038\u6708", "\u0020\u0039\u6708", "\u0031\u0030\u6708", "\u0031\u0031\u6708", "\u0031\u0032\u6708"], 
								ampm : ["\u4E0A\u5348", "\u4E0B\u5348"], 
								date_format : "\u897F\u5143\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5", 
								time_format : "\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
								time_format_ampm : "\u0025\u0070\u0020\u0025\u0049\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
								date_time_format : "\u897F\u5143\u0025\u0059\u5E74\u0025\u006D\u6708\u0025\u0064\u65E5\u0020\u0028\u0025\u0041\u0029\u0020\u0025\u0048\u6642\u0025\u004D\u5206\u0025\u0053\u79D2", 
								full_date_time_format : "\u0025\u0061\u0020\u0025\u0062\u0020\u0025\u0065\u0020\u0025\u0048\u003A\u0025\u004D\u003A\u0025\u0053\u0020\u0025\u005A\u0020\u0025\u0059", 
								first_weekday : 0, 
								longdate_format : "\u0025\u0059\u5E74\u0025\u006E\u6708\u0025\u0065\u65E5", 
								shortdate_format : "\u0025\u0059\u002F\u0025\u006E\u002F\u0025\u0065", 
								direction : "ltr"
							};
						}

						return nexacro.Locale.zh_TW;
					}
					break;
				default:
					{

						return nexacro.Locale.getLocaleInfo(nexacro._getLocale());
					}
					break;
			}
		};

		nexacro.Locale._replaceLocaleDigits = function (locale, str) {
			var locale_info = nexacro.Locale.getLocaleInfo(locale);

			if (locale_info.locale_digits) {
				var locale_digits = locale_info.locale_digits;

				str = str.replace(/0/g, locale_digits[0]);
				str = str.replace(/1/g, locale_digits[1]);
				str = str.replace(/2/g, locale_digits[2]);
				str = str.replace(/3/g, locale_digits[3]);
				str = str.replace(/4/g, locale_digits[4]);
				str = str.replace(/5/g, locale_digits[5]);
				str = str.replace(/6/g, locale_digits[6]);
				str = str.replace(/7/g, locale_digits[7]);
				str = str.replace(/8/g, locale_digits[8]);
				str = str.replace(/9/g, locale_digits[9]);
			}

			return str;
		};

		nexacro.Locale._makeDateMaskString = function (locale, opt) {
			var locale_info = nexacro.Locale.getLocaleInfo(locale);
			var format_string = "";

			if (opt == "SHORTDATE") {
				format_string = locale_info.shortdate_format;
			}
			else if (opt == "LONGDATE") {
				format_string = locale_info.longdate_format;
			}

			if (format_string == "") {
				return "yyyy-MM-dd";
			}

			format_string = format_string.replace(/%a/g, "ddd");
			format_string = format_string.replace(/%A/g, "dddd");
			format_string = format_string.replace(/%b/g, "MMMM");
			format_string = format_string.replace(/%B/g, "MMMM");

			format_string = format_string.replace(/%y/g, "yy");
			format_string = format_string.replace(/%Y/g, "yyyy");
			format_string = format_string.replace(/%n/g, "M");
			format_string = format_string.replace(/%m/g, "MM");
			format_string = format_string.replace(/%d/g, "dd");
			format_string = format_string.replace(/%e/g, "d");

			return format_string;
		};

		nexacro.Locale._default_longdate_format = "\u0025\u0064\u0020\u0025\u0042\u0020\u0025\u0059";
		nexacro.Locale._default_shortdate_format = "\u0025\u0064\u002F\u0025\u006D\u002F\u0025\u0059";

		nexacro.makeLocaleFormatString = function (obj, locale) {
			var locale_string = "";

			if (obj instanceof Number) {
				var new_obj = new nexacro.Number(obj);
				locale_string = new_obj.toLocaleString(locale);
			}
			else if (obj instanceof nexacro.Number) {
				locale_string = obj.toLocaleString(locale);
			}
			else if (obj instanceof Date) {
				var new_obj = new nexacro.Date(obj);
				locale_string = new_obj.toLocaleString(locale);
			}
			else if (obj instanceof nexacro.Date) {
				locale_string = obj.toLocaleString(locale);
			}
			else if (obj instanceof nexacro.Decimal) {
				locale_string = obj.toLocaleString(locale);
			}
			else {
				locale_string = obj.toLocaleString();
			}

			return locale_string;
		};
	}



	nexacro._setTrackInfo = function (targetwin, target, windowX, windowY) {
		var trackData = target._on_starttrack();
		nexacro._cur_track_info = {
			"targetwin" : targetwin, 
			"target" : target, 
			"startX" : windowX, 
			"startY" : windowY, 
			"distX" : 0, 
			"distY" : 0, 
			"data" : trackData
		};
	};

	nexacro._setExtraTrackInfo = function (targetwin, target, windowX, windowY, screenX, screenY, keepstart) {
		var trackData = target._on_start_extratrack(windowX, windowY, screenX, screenY, keepstart);
		nexacro._cur_extra_track_info = {
			"targetwin" : targetwin, 
			"target" : target, 
			"startX" : windowX, 
			"startY" : windowY, 
			"screenX" : screenX, 
			"screenY" : screenY, 
			"distX" : 0, 
			"distY" : 0, 
			"data" : trackData
		};
	};

	nexacro._setDragInfo = function (targetwin, target_elem, windowX, windowY, dragimage, imagealign) {
		nexacro._cur_drag_info = {
			"targetwin" : targetwin, 
			"isDragging" : false, 
			"target_elem" : target_elem, 
			"target" : null, 
			"referTarget" : null, 
			"startX" : windowX, 
			"startY" : windowY, 
			"image" : dragimage, 
			"imagealign" : imagealign, 
			"data" : null, 
			"userdata" : null
		};
	};

	nexacro._setRepeatInfo = function (target, win, refer_comp, windowX, windowY, canvasX, canvasY) {
		var _handle = nexacro._getWindowHandle(win._handle);
		var repeatData = target._on_startrepeat(refer_comp, canvasX, canvasY);

		nexacro._cur_repeat_info = {
			"targetwin" : win, 
			"target" : target, 
			"startX" : windowX, 
			"startY" : windowY, 
			"distX" : 0, 
			"distY" : 0, 
			"startCanvasX" : canvasX, 
			"startCanvasY" : canvasY, 
			"canvasX" : canvasX, 
			"canvasY" : canvasY, 
			"data" : repeatData, 
			"refer_comp" : refer_comp, 
			"step" : "first", 
			"_repeatfunc" : null, 
			"_timer" : null
		};

		if (!nexacro._cur_repeat_info._repeatfunc) {
			nexacro._cur_repeat_info._repeatfunc = nexacro._nexacroBind(win, win._on_sys_repeat);
		}

		nexacro._cur_repeat_info._timer = nexacro._setSystemTimer(_handle, nexacro._cur_repeat_info._repeatfunc, 500);
	};

	nexacro._getImageLocation = function (str, baseurl) {
		var url = application.images[str];
		if (url) {
			baseurl = nexacro._project_url + application._globalvar_uri;
		}
		else {
			url = str;
		}

		return nexacro._getServiceLocation(url, baseurl);
	};

	nexacro._hasLocalThemeCacheUrl = function (url) {
		return (url in application._localthemecaches);
	};


	nexacro._transfullurl = function (baseurl, url) {
		if (nexacro._isAbsolutePath(url) == true) {
			return url;
		}

		baseurl = nexacro._getBaseUrl(baseurl);

		var fullurl = null;

		if (baseurl.indexOf("?") >= 0) {
			fullurl = baseurl + url;
		}
		else {
			fullurl = nexacro._mergeUrl(baseurl, url);
		}

		var urlarr = fullurl.split("/");

		var n = urlarr.length;

		var realpath = [];

		var i = 0;
		while (i < n) {
			if (urlarr[i] != "." && urlarr[i] != "..") {
				break;
			}
			realpath.push(urlarr[i]);
			i++;
		}

		while (i < n) {
			if (urlarr[i] != ".") {
				if (urlarr[i] == "..") {
					realpath.pop();
				}
				else {
					realpath.push(urlarr[i]);
				}
			}
			i++;
		}

		return realpath.join("/");
	};

	nexacro._addLocalCacheUrl = function (url, localurl) {
		if (localurl) {
			localurl = localurl.replace(/\\/g, "/");
		}
		application._localcaches[url] = localurl;
	};

	nexacro._addLocalThemeCacheUrl = function (url, localurl) {
		if (localurl) {
			localurl = localurl.replace(/\\/g, "/");
		}
		application._localthemecaches[url] = localurl;
	};

	nexacro._hasLocalCacheUrl = function (url) {
		return (url in application._localcaches);
	};

	nexacro._getService = function (prefix, typedefintion_url) {
		return application.services[prefix];
	};


	nexacro._transurl = function (baseurl, typedefintionurl, url) {
		var exturl = url;

		if (exturl.indexOf("theme://") >= 0) {
			var bLocalCacheType = false;
			if (nexacro._hasLocalCacheUrl(url)) {
				var local_url = application._getLocalCacheUrl(url);
				if (local_url) {
					return local_url;
				}

				bLocalCacheType = true;
			}

			var strA = exturl.split("://");
			var name = strA[0];
			var suburl = strA[1];

			var realpath = [];
			var separator = "/";

			var theme_uri = application._theme_uri;
			realpath.push(theme_uri);

			if (theme_uri.charAt(theme_uri.length - 1) == "/") {
				separator = "";
			}
			realpath.push(suburl);

			exturl = realpath.join(separator).replace(/\\/g, "/");
			if (nexacro._isAbsolutePath(exturl) != true) {
				if (bLocalCacheType) {
					exturl = nexacro._transfullurl(application._localcache_path, exturl);
				}
				else {
					exturl = nexacro._transfullurl(nexacro._project_url, exturl);
				}
			}

			if (bLocalCacheType) {
				nexacro._addLocalCacheUrl(url, exturl);
			}
		}
		else {
			var bLocalCacheType = false;
			if (nexacro._hasLocalCacheUrl(url)) {
				var local_url = application._getLocalCacheUrl(url);
				if (local_url) {
					return local_url;
				}

				bLocalCacheType = true;
			}

			if (exturl.indexOf("::") < 0) {
				if (bLocalCacheType) {
					baseurl = application._localcache_path;
				}
				exturl = nexacro._transfullurl(baseurl, exturl);
			}
			else {
				var strA = exturl.split("::");
				var prefix = strA[0];
				var suburl = strA[1];
				var service = nexacro._getService(prefix, typedefintionurl);
				if (service != null) {
					var serviceurl = service.url;
					if (serviceurl.charAt(serviceurl.length - 1) != "/") {
						serviceurl = serviceurl + "/";
					}
					if (nexacro._isAbsolutePath(serviceurl) == true) {
						exturl = nexacro._transfullurl(serviceurl, suburl);
					}
					else {
						var basepath;
						if (bLocalCacheType) {
							basepath = nexacro._transfullurl(application._localcache_path, serviceurl);
						}
						else {
							basepath = nexacro._transfullurl(typedefintionurl, serviceurl);
						}
						exturl = nexacro._transfullurl(basepath, suburl);
					}
				}
				else {
					exturl = exturl.replace(/\\/g, "/");
				}
			}

			if (bLocalCacheType) {
				nexacro._addLocalCacheUrl(url, exturl);
			}
		}
		return exturl;
	};

	nexacro._getServiceLocation = function (url, baseurl, typedefinition_url) {
		if (!typedefinition_url) {
			typedefinition_url = nexacro._typedefinition_url;
		}

		if (!baseurl) {
			baseurl = nexacro._project_url;
		}

		return nexacro._transurl(baseurl, typedefinition_url, url);
	};

	nexacro._div_property_list = ["_accessibility_role", "_adjust_height", "_adjust_left", "_adjust_left_ltr", "_adjust_top", "_adjust_width", "_apply_client_border", "_apply_client_padding", "_attached_comp", "_base_url", "_bind_manager", "_bottom", "_callclasscnt", "_callstylecnt", "_child_count", "_child_list", "_client_height", "_client_width", "_contents_pseudo", "_control_element", "_control_pseudo", "_css_finder", "_css_selectors", "_cssfinder_cache", "_cssclass", "_cur_real_layout", "_default_zindex", "_display_text", "_event_list", "_executescriptlist", "_find_csslist", "_has_dirty_rect", "_has_parent", "_hotkey_list", "_height", "_hittest_type", "_includescriptlist", "_index", "_init_height", "_init_width", "_is_async", "_is_completed", "_is_created", "_is_created_contents", "_is_form", "_is_init", "_is_loaded", "_isLoaded", "_is_loading", "_is_popup_control", "_is_reference_control", "_is_scrollable", "_is_selfclose", "_isSelfClass", "_isSelfStyle", "_is_window", "_last_focused", "_layout_list", "_left", "_linkedcssclass", "_linkstyles", "_load_callbacklist", "_load_manager", "_margin", "_oldstyletype", "_originStyles", "_pseudo", "_real_enable", "_real_visible", "_ref_css_finder", "_refcssid", "_refcssobj", "_refform", "_right", "_scrollbars", "_setclasscomplete", "_setstylecomplete", "_style", "_styles", "_styletype", "_taborder", "_text_elem", "_timerManager", "_top", "_track_on", "_track_capture", "_type_name", "_unique_id", "_user_property_list", "_url", "_urlloading", "_variables", "_want_tab", "_want_arrow", "_wait_pop_position", "_width", "_zoomFactor", "all", "applystyletype", "async", "binds", "bottom", "classname", "components", "cssclass", "currentstyle", "dragscrolltype", "enable", "enableflag", "height", "hscrollbar", "id", "layout", "layoutautofittype", "left", "name", "objects", "on_create", "on_initEvent", "parent", "position", "positionstep", "right", "returnvalue", "scrollbars", "style", "taborder", "text", "top", "url", "version", "visible", "vscrollbar", "width"
	];

	nexacro._pluginCallMethod = function (obj, args) {
		return nexacro.__pluginCallMethod(obj, args);
	};

	nexacro._openSystemCalendar = function (calendar, v) {
		nexacro.__openSystemCalendar(calendar, v);
	};

	nexacro._closeSystemCalendar = function () {
		nexacro.__closeSystemCalendar();
	};

	nexacro.Deserializer = {
		"SSV" : function (strRecvData, target) {
			var variablelist = {
			};
			var datasetlist = [];

			var _rs_ = String.fromCharCode(30);
			var _cs_ = String.fromCharCode(31);

			var code = 0;
			var message = "SUCCESS";

			if (!strRecvData) {
				return [-1, "Stream Data is null!"];
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
								variablelist[id] = code;
							}
							else if (id == "ErrorMsg") {
								variablelist[id] = val;
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
						}
					}
				}
				else {
					if (code < 0) {
						return [variablelist, null];
					}
					var sep_pos = curStr.indexOf(":");
					if (sep_pos >= 0) {
						var remoteId = curStr.substring(sep_pos + 1);
						if (remoteId && remoteId.length) {
							var ds = target && target._getDataset(remoteId);
							if (!ds) {
								ds = new nexacro.Dataset(remoteId);
							}
							if (ds) {
								ds.rowposition = -1;
								curIdx = ds.loadFromSSVArray(ssvLines, lineCnt, curIdx, true);
								datasetlist.push(ds);
							}
						}
					}
				}
			}
			return [variablelist, datasetlist];
		}, 
		"XML" : function (doc, target) {
			var variablelist = {
			};
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
							variablelist[id] = code;
						}
						else if (id == "ErrorMsg") {
							variablelist[id] = val;
						}
						else {
							target && target._setParamter(id, val);
						}
					}
				}
			}
			if (code < 0) {
				return [variablelist, null];
			}
			var datasetlist = [];
			var datasets = doc.getElementsByTagName("Dataset");
			if (datasets && datasets.length) {
				var dataCnt = datasets.length;
				for (var i = 0; i < dataCnt; i++) {
					var remoteId = datasets[i].getAttribute("id");
					if (remoteId && remoteId.length) {
						var ds = target && target._getDataset(remoteId);
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
		}
	};
}
