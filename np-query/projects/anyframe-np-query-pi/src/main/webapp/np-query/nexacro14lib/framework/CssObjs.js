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

if (!nexacro._bInitCssObjects) {
	nexacro.Style_value = function (v) {
		this.value = "";

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";

		if (v) {
			if (typeof (v) == "string") {
				var val = v.trim();
				if (val) {
					this._parseInfo(val);
					var str = this._getValueStr();
					this._is_empty = (str == "");
					this._value = str;
				}
			}
			else {
				this.value = v;
				var str = v + "";
				this._is_empty = (str == "");
				this._value = str;
			}
		}
		else if (v === false || v === 0) {
			this.value = v;
			var str = v + "";
			this._is_empty = (str == "");
			this._value = str;
		}
	};

	var _pStyleValue = nexacro._createPrototype(nexacro.Object, nexacro.Style_value);
	nexacro.Style_value.prototype = _pStyleValue;
	_pStyleValue._type_name = "Value";

	_pStyleValue.valueOf = function () {
		return this.value;
	};
	_pStyleValue.toString = function () {
		return this._value + "";
	};

	_pStyleValue.clone = function () {
		var newobj = new nexacro.Style_value();
		newobj.value = this.value;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleValue.isEmpty = function () {
		return (this._bindtype = 0 && this._value != "");
	};

	_pStyleValue._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				return this.value + "";
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};
	_pStyleValue._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this.value = "";
		}
		else {
			this._bindtype = 0;
			this._bindexpr = "";
			this.value = val;
		}
	};
	_pStyleValue._parseEnumInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this.value = "";
		}
		else {
			this._bindtype = 0;
			this._bindexpr = "";
			var len = enumvals.length;
			for (var i = 0; i < len; i++) {
				if (v == enumvals[i]) {
					this.value = v;
					return;
				}
			}
			this.value = "";
		}
	};
	_pStyleValue._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._value = "";
			this._bindtype = 0;
			this._bindexpr = "";
			this.value = "";
			return true;
		}
		return false;
	};
	_pStyleValue._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleValue._setValue = function (v) {
		if (v) {
			if ((typeof v) == "string") {
				var val = v.trim();
				if (val != this._value) {
					if (val) {
						this._parseInfo(val);
						return this._updateValue();
					}
					else {
						return this._empty();
					}
				}
				return false;
			}
			else {
				if (v != this._value) {
					this._bindtype = 0;
					this._bindexpr = "";
					this.value = v;
					return this._updateValue();
				}
				return false;
			}
		}
		return this._empty();
	};
	_pStyleValue._setEnumValue = function (v, enumvals) {
		if (v) {
			if ((typeof v) == "string") {
				var val = v.trim();
				if (val != this._value) {
					if (val) {
						this._parseEnumInfo(val, enumvals);
						return this._updateValue();
					}
					else {
						return this._empty();
					}
				}
				return false;
			}
			else {
				if (v != this._value) {
					this._bindtype = 0;
					this._bindexpr = "";
					var len = enumvals.length;
					for (var i = 0; i < len; i++) {
						if (v == enumvals[i]) {
							this.value = v;
							return this._updateValue();
						}
					}
					return this._empty();
				}
				return false;
			}
		}
		return this._empty();
	};

	delete _pStyleValue;


	nexacro.getStyleValueFloat = function (v, def) {
		if (!v || v.isEmpty()) {
			return def;
		}
		var val = (v.value - 0);
		return isNaN(val) ? def : val;
	};
	nexacro.getStyleValueInt = function (v, def) {
		if (!v || v.isEmpty()) {
			return def;
		}
		var val = (v.value | 0);
		return isNaN(val) ? def : val;
	};
	nexacro.getStyleValueText = function (v, def) {
		if (!v || v.isEmpty()) {
			return def;
		}
		return v.value;
	};
	nexacro.getStyleValueText2 = function (v, chkval, def) {
		if (!v || v.isEmpty() || v._value == chkval) {
			return def;
		}
		return v.value;
	};
	nexacro.getStyleValueBoolean = function (v, def) {
		if (!v || v.isEmpty()) {
			return def;
		}
		return (!!v.value);
	};

	nexacro._createValueAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if ((v != null && v != undefined) || v === false) {\n"
			 + "		var styleobj = nexacro._getCachedValueObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};
	nexacro._createEnumValueAttributeEvalStr = function (ptype_id, attr_id, enumvals_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = new nexacro.Style_value();\n"
			 + "		styleobj._setEnumValue(v, $ENUM$);\n"
			 + "        if (!oldobj || oldobj._value != styleobj._value) {\n"
			 + "            if (styleobj._bindtype != 0) {\n"
			 + "                this.$ATTR$ = styleobj;\n"
			 + "			    if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "            }\n"
			 + "            else {\n"
			 + "                styleobj = nexacro._registerCachedValueObj(styleobj);\n"
			 + "                this.$ATTR$ = styleobj;\n"
			 + "			    if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "            }\n"
			 + "		}\n"
			 + "	}\n"
			 + "	else if (styleobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id).replace(/\$ENUM\$/g, enumvals_id);
	};

	nexacro.Style_color = function (v) {
		this.value = "";

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";
		this._syscolor = "";
		this._sysalpha = 255;

		if (v) {
			var val = v.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this.value = val;
				this._value = str;
			}
		}
	};

	var _pStyleColor = nexacro._createPrototype(nexacro.Object, nexacro.Style_color);
	nexacro.Style_color.prototype = _pStyleColor;
	_pStyleColor._type_name = "Color";

	_pStyleColor.valueOf = function () {
		return this.value;
	};

	_pStyleColor.toString = function () {
		return this.value;
	};

	_pStyleColor.clone = function () {
		var newobj = new nexacro.Style_color();
		newobj.value = this.value;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		newobj._syscolor = this._syscolor;
		newobj._sysalpha = this._sysalpha;
		return newobj;
	};

	_pStyleColor._getValueStr = function (val) {
		switch (this._bindtype) {
			case 0:
				return this._value;
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};
	_pStyleColor._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this.value = "";
		}
		else {
			this._bindtype = 0;
			this._bindexpr = "";
			this.value = val;
			this._syscolor = nexacro._getWebColorFromXreColor(val);
			this._sysalpha = nexacro._getXreColorAlpha(val);
			var str = val + "";
			this._is_empty = (str == "");
			this._value = str;
		}
	};
	_pStyleColor._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._value = "";
			this._bindtype = 0;
			this._bindexpr = "";
			this.value = "";
			this._syscolor = "";
			this._sysalpha = 255;
			return true;
		}
		return false;
	};

	_pStyleColor._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			if (this._bindtype != 0) {
				this._syscolor = "";
				this._sysalpha = 255;
			}
			else {
				this._syscolor = nexacro._getWebColorFromXreColor(this.value);
				this._sysalpha = nexacro._getXreColorAlpha(this.value);
			}
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleColor._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	nexacro._createColorAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedColorObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_align = function (v1, v2) {
		this.halign = "";
		this.valign = "";
		this._halign = "";
		this._valign = "";

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";

		if (v2 != null) {
			this._bindtype = 0;
			this.valign = v1;
			this.halign = v2;
			var str;
			if (this.halign && this.valign) {
				str = this.halign + " " + this.valign;
			}
			else {
				str = this.halign + this.valign;
			}
			this._is_empty = (str == "");
			this._value = str;
		}
		else if (v1 && (typeof (v1) == "string")) {
			var val = v1.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = str;
			}
		}
	};
	var _pStyleAlign = nexacro._createPrototype(nexacro.Object, nexacro.Style_align);
	nexacro.Style_align.prototype = _pStyleAlign;
	_pStyleAlign._type_name = "Align";

	_pStyleAlign.valueOf = function () {
		return this._value;
	};
	_pStyleAlign.toString = function () {
		return this._value;
	};

	_pStyleAlign.clone = function () {
		var newobj = new nexacro.Style_align();
		newobj.halign = this.halign;
		newobj.valign = this.valign;
		newobj._halign = this._halign;
		newobj._valign = this._valign;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleAlign._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				if (this.halign && this.valign) {
					return this.halign + " " + this.valign;
				}
				else {
					return this.halign + this.valign;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};
	_pStyleAlign._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this.halign = "";
			this.valign = "";
			this._halign = "";
			this._valign = "";
		}
		else {
			this._bindtype = 0;
			var valarr = val.split(/\s+/);
			this.halign = "";
			this.valign = "";
			this._halign = "";
			this._valign = "";
			var checked = 0;

			switch (valarr[0]) {
				case "left":
					this.halign = "left";
					this._halign = "left";
					checked = 1;
					break;
				case "center":
					this.halign = "center";
					this._halign = "center";
					checked = 1;
					break;
				case "right":
					this.halign = "right";
					this._halign = "right";
					checked = 1;
					break;
				case "lefttext":
					this.halign = "lefttext";
					this._halign = "left";
					checked = 1;
					break;
				case "righttext":
					this.halign = "righttext";
					this._halign = "right";
					checked = 1;
					break;
				case "top":
					this.valign = "top";
					this._valign = "top";
					checked = 2;
					break;
				case "middle":
					this.valign = "middle";
					this._valign = "middle";
					checked = 2;
					break;
				case "bottom":
					this.valign = "bottom";
					this._valign = "bottom";
					checked = 2;
					break;
				case "toptext":
					this.valign = "toptext";
					this._valign = "top";
					checked = 2;
					break;
				case "bottomtext":
					this.valign = "bottomtext";
					this._valign = "bottom";
					checked = 2;
					break;
			}

			if (valarr.length > 1) {
				if (checked == 1) {
					switch (valarr[1]) {
						case "top":
							this.valign = "top";
							this._valign = "top";
							break;
						case "middle":
							this.valign = "middle";
							this._valign = "middle";
							break;
						case "bottom":
							this.valign = "bottom";
							this._valign = "bottom";
							break;
						case "toptext":
							this.valign = "toptext";
							this._valign = "top";
							break;
						case "bottomtext":
							this.valign = "bottomtext";
							this._valign = "bottom";
							break;
					}
				}
				else if (checked == 2) {
					switch (valarr[1]) {
						case "left":
							this.halign = "left";
							this._halign = "left";
							break;
						case "center":
							this.halign = "center";
							this._halign = "center";
							break;
						case "right":
							this.halign = "right";
							this._halign = "right";
							break;
						case "lefttext":
							this.halign = "lefttext";
							this._halign = "left";
							break;
						case "righttext":
							this.halign = "righttext";
							this._halign = "right";
							break;
					}
				}
				else {
					switch (valarr[1]) {
						case "left":
							this.halign = "left";
							this._halign = "left";
							break;
						case "center":
							this.halign = "center";
							this._halign = "center";
							break;
						case "right":
							this.halign = "right";
							this._halign = "right";
							break;
						case "lefttext":
							this.halign = "lefttext";
							this._halign = "left";
							break;
						case "righttext":
							this.halign = "righttext";
							this._halign = "right";
							break;
						case "top":
							this.valign = "top";
							this._valign = "top";
							break;
						case "middle":
							this.valign = "middle";
							this._valign = "middle";
							break;
						case "bottom":
							this.valign = "bottom";
							this._valign = "bottom";
							break;
						case "toptext":
							this.valign = "toptext";
							this._valign = "top";
							break;
						case "bottomtext":
							this.valign = "bottomtext";
							this._valign = "bottom";
							break;
					}
				}
			}
		}
	};
	_pStyleAlign._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._value = "";
			this._bindtype = 0;
			this._bindexpr = "";
			this.valign = "";
			this.halign = "";
			this._valign = "";
			this._halign = "";
			return true;
		}
		return false;
	};
	_pStyleAlign._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};
	_pStyleAlign._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleAlign.set_halign = function (v) {
		if (v != this.halign) {
			this._bindtype = 0;
			this.halign = "";
			this._halign = "";
			switch (v) {
				case "left":
					this.halign = "left";
					this._halign = "left";
					break;
				case "center":
					this.halign = "center";
					this._halign = "center";
					break;
				case "right":
					this.halign = "right";
					this._halign = "right";
					break;
				case "lefttext":
					this.halign = "lefttext";
					this._halign = "left";
					break;
				case "righttext":
					this.halign = "righttext";
					this._halign = "right";
					break;
				default:
					this.halign = "left";
					this._halign = "left";
					break;
			}
			return this._updateValue();
		}
	};
	_pStyleAlign.set_valign = function (v) {
		if (v != this.valign) {
			this._bindtype = 0;
			this.valign = "";
			this._valign = "";
			switch (v) {
				case "top":
					this.valign = "top";
					this._valign = "top";
					break;
				case "middle":
					this.valign = "middle";
					this._valign = "middle";
					break;
				case "bottom":
					this.valign = "bottom";
					this._valign = "bottom";
					break;
				case "toptext":
					this.valign = "toptext";
					this._valign = "toptext";
					break;
				case "bottomtext":
					this.valign = "bottomtext";
					this._valign = "bottomtext";
					break;
				default:
					this.valign = "top";
					this._valign = "top";
					break;
			}
			return this._updateValue();
		}
	};

	_pStyleAlign._createRtlValue = function () {
		if (!this._rtlvalue) {
			var strValue;
			if (this.halign == "left") {
				strValue = "right " + this.valign;
			}
			else if (this.halign == "right") {
				strValue = "left " + this.valign;
			}

			this._rtlvalue = strValue;
		}
	};

	_pStyleAlign._getStyleObject = function (bRtl) {
		this._createRtlValue();
		if (bRtl && this._rtlvalue) {
			return nexacro._getCachedAlignObj(this._rtlvalue);
		}
		else {
			return this;
		}
	};

	nexacro._createAlignAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedAlignObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_halign = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_align());\n"
			 + "	newobj.set_halign(v);\n"
			 + "    newobj = nexacro._registerCachedAlignObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_valign = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_align());\n"
			 + "	newobj.set_valign(v);\n"
			 + "    newobj = nexacro._registerCachedAlignObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_background = function (v1, v2, v3, v4, v5, v6, v7) {
		this.color = "";
		this.image = "";
		this.repeat = "";
		this.imageedge = "";
		this.imageedge_x = 0;
		this.imageedge_y = 0;
		this.position = "";
		this.position_x = 0;
		this.position_y = 0;

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";

		this._syscolor = "";
		this._sysopacity = 100;
		this._sysopacityfilter = "";

		if (v7 != null) {
			this._is_empty = false;
			this._bindtype = 0;
			if (v1 == "transparent") {
				this.color = "";
			}
			else {
				this.color = v1;
			}

			this.image = v2;
			if (v2) {
				this.image = v2;
			}

			this.repeat = v3;

			this.imageedge_x = (v4 | 0);
			this.imageedge_y = (v5 | 0);
			if (this.imageedge_x || this.imageedge_y) {
				this.imageedge = this.imageedge_x + "," + this.imageedge_y;
			}

			this.__load_position1(v6);
			this.__load_position2(v7);
			this._updateValue();
		}
		else if (v1 && (typeof (v1) == "string")) {
			var val = v1.trim();
			if (val) {
				this._parseInfo(val);
				this._updateValue();
			}
		}
	};
	var _pStyleBackground = nexacro._createPrototype(nexacro.Object, nexacro.Style_background);
	nexacro.Style_background.prototype = _pStyleBackground;
	_pStyleBackground._type_name = "Background";

	_pStyleBackground.valueOf = function () {
		return this._value;
	};
	_pStyleBackground.toString = function () {
		return this._value;
	};

	_pStyleBackground.clone = function () {
		var newobj = new nexacro.Style_background();
		newobj.color = this.color;
		newobj.image = this.image;
		newobj.repeat = this.repeat;
		newobj.imageedge = this.imageedge;
		newobj.imageedge_x = this.imageedge_x;
		newobj.imageedge_y = this.imageedge_y;
		newobj.position = this.position;
		newobj.position_x = this.position_x;
		newobj.position_y = this.position_y;
		newobj.clientonly = this.clientonly;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleBackground.isEdgeType = function () {
		return (this.image && (this.imageedge_x > 0 || this.imageedge_y > 0));
	};

	_pStyleBackground._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var val;
					if (this.color) {
						val = this.color;
					}
					else {
						val = "transparent";
					}

					if (this.image) {
						val += " URL('" + this.image + "')";
					}

					if (this.repeat) {
						val += ' ' + this.repeat;
					}
					if (this.imageedge) {
						val += ' ' + this.imageedge;
					}
					if (this.position) {
						val += ' ' + this.position;
					}

					return val;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleBackground.__load_color = function (str) {
		str = str.replace(/^'/, "").replace(/'$/, "");

		if (str.substring(1) == "gradation") {
			this.color = "@gradation";
			return true;
		}

		if (str == "transparent") {
			this.color = "transparent";
			return true;
		}

		if (nexacro._xreNamedColorList) {
			if (str in nexacro._xreNamedColorList) {
				this.color = str;
				return true;
			}
		}

		if (str.charAt(0) == "#" && (str.length == 7 || str.length == 9)) {
			this.color = str;
			return true;
		}
		return false;
	};
	_pStyleBackground.__load_repeat = function (str) {
		if (str == "repeat" || str == "repeat-x" || str == "repeat-y" || 
			str == "no-repeat" || str == "stretch" || str == "quad") {
			this.repeat = str;
			return true;
		}
		else {
			this.repeat = "";
			return false;
		}
	};
	_pStyleBackground.__load_imageedge = function (str) {
		if (str.indexOf(",") >= 0) {
			var valarr = str.split(',');
			this.imageedge_x = (valarr[0] | 0);
			this.imageedge_y = (valarr[1] | 0);
			if (this.imageedge_x < 0) {
				this.imageedge_x = 0;
			}
			if (this.imageedge_y < 0) {
				this.imageedge_y = 0;
			}
			this.imageedge = this.imageedge_x + "," + this.imageedge_y;
			return true;
		}


		return false;
	};
	_pStyleBackground.__load_position1 = function (str) {
		if (str == "left") {
			this.position_x = 0;
			this.position = "left";
			return true;
		}
		else if (str == "center") {
			this.position_x = 50;
			this.position = "center";
			return true;
		}
		else if (str == "right") {
			this.position_x = 100;
			this.position = "right";
			return true;
		}
		else {
			var v = parseInt(str) | 0;
			if (isFinite(v)) {
				this.position_x = v;
				if (v == 0) {
					this.position = "left";
				}
				else if (v == 50) {
					this.position = "center";
				}
				else if (v == 100) {
					this.position = "right";
				}
				else {
					this.position = v + "%";
				}
				return true;
			}
			return false;
		}
	};
	_pStyleBackground.__load_position2 = function (str) {
		if (str == "top") {
			this.position_y = 0;
			this.position += " top";
			return true;
		}
		else if (str == "middle") {
			this.position_y = 50;
			this.position += " middle";
			return true;
		}
		else if (str == "bottom") {
			this.position_y = 100;
			this.position += " bottom";
			return true;
		}
		else {
			var v = parseInt(str) | 0;
			if (isFinite(v)) {
				this.position_y = v;
				if (v == 0) {
					this.position += " top";
				}
				else if (v == 50) {
					this.position += " middle";
				}
				else if (v == 100) {
					this.position += " bottom";
				}
				else {
					this.position += " " + v + "%";
				}
				return true;
			}
			return false;
		}
	};
	_pStyleBackground._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this.color = "";
			this.image = "";
			this.repeat = "";
			this.imageedge = "";
			this.imageedge_x = 0;
			this.imageedge_y = 0;
			this.position = "";
			this.position_x = 0;
			this.position_y = 0;

			this._syscolor = "";
			this._sysopacity = 100;
			this._sysopacityfilter = "";
		}
		else {
			var bLoadColor = true;
			var bLoadImage = true;
			var bLoadRepeat = true;
			var bLoadClientOnly = true;
			var bLoadImageEdge = true;
			var bLoadPosition1 = true;
			var bLoadPosition2 = true;
			var part;
			var valarr = val.split(/\s+/);
			var cnt = valarr.length;
			for (var i = 0; i < cnt; i++) {
				part = valarr[i];
				if (part) {
					if (bLoadColor && this.__load_color(part)) {
						bLoadColor = false;
						continue;
					}
					else if (bLoadImage && part.length >= 5 && part.substring(0, 3).toLowerCase() == "url") {
						var image_uri;
						var ch = part.charAt(4);
						if (ch == '\'' || ch == '\"') {
							image_uri = part.substring(5, part.length - 2);
						}
						else {
							image_uri = part.substring(4, part.length - 1);
						}

						this.image = image_uri;
						bLoadImage = false;
						continue;
					}
					else if (bLoadRepeat && this.__load_repeat(part)) {
						bLoadRepeat = false;
						continue;
					}
					else if (bLoadImageEdge && this.__load_imageedge(part)) {
						bLoadImageEdge = false;
						continue;
					}
					else if (bLoadPosition1 && this.__load_position1(part)) {
						bLoadPosition1 = false;
						continue;
					}
					else if (bLoadPosition2 && this.__load_position2(part)) {
						bLoadPosition2 = false;
						continue;
					}
				}
			}
		}
	};

	_pStyleBackground._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._value = "";
			this._bindtype = 0;
			this._bindexpr = "";
			this.color = "";
			this.image = "";
			this.repeat = "";
			this.imageedge_x = 0;
			this.imageedge_y = 0;
			this.position_x = 0;
			this.position_y = 0;
			this.clientonly = true;
			this._image_url = "";

			this._syscolor = "";
			this._sysopacity = 100;
			this._sysopacityfilter = "";
			return true;
		}
		return false;
	};
	_pStyleBackground._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			if (this.color && this.color != "@gradation") {
				if (this.color == "transparent") {
					this._syscolor = "";
					this._sysopacity = 0;
				}
				else {
					this._syscolor = nexacro._getWebColorFromXreColor(this.color);
					this._sysopacity = nexacro._getXreColorOpacity(this.color);
				}
				if (this._sysopacity != 100) {
					this._sysopacityfilter = nexacro._getOpacityFilterFromXreColor(this.color);
				}
				else {
					this._sysopacityfilter = "";
				}
			}
			else {
				this._syscolor = "";
				this._sysopacity = 100;
				this._sysopacityfilter = "";
			}
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};
	_pStyleBackground._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleBackground.set_color = function (v) {
		v = v.trim();
		if (v != this.color) {
			this._bindtype = 0;
			this._bindexpr = "";
			this.color = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleBackground.set_image = function (v) {
		var str = v.toString().trim();
		if (str.length >= 5 && str.substring(0, 3).toLowerCase() == "url") {
			var ch = str.charAt(4);
			if (ch == '\'' || ch == '\"') {
				str = str.substring(5, v.length - 2);
			}
			else {
				str = str.substring(4, str.length - 1);
			}
		}

		if (str != this.image) {
			this._bindtype = 0;
			this._bindexpr = "";
			this.image = str;
			return this._updateValue();
		}
		return false;
	};
	_pStyleBackground.set_repeat = function (v) {
		if (v != "no-repeat" && v != "repeat" && v != "repeat-x" && 
			v != "repeat-y" && v != "stretch" && v != "quad") {
			v = "";
		}
		if (v != this.repeat) {
			this._bindtype = 0;
			this._bindexpr = "";
			this.repeat = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleBackground.set_imageedge = function (v) {
		var str = v.toString().trim();
		var valarr = str.split(',');
		var valx = 0;
		var valy = 0;
		switch (valarr.length) {
			case 0:
				break;
			case 1:
				valx = valy = ((valarr[0].trim()) | 0);
				break;
			default:
				valx = ((valarr[0].trim()) | 0);
				valy = ((valarr[1].trim()) | 0);
				break;
		}
		if (valx < 0) {
			valx = 0;
		}
		if (valy < 0) {
			valy = 0;
		}
		str = valx + "," + valy;
		if (str != this.imageedge) {
			this._bindtype = 0;
			this._bindexpr = "";
			this.imageedge = str;
			this.imageedge_x = valx;
			this.imageedge_y = valy;
			return this._updateValue();
		}
		return false;
	};

	_pStyleBackground.set_clientonly = nexacro._emptyFn;

	_pStyleBackground.set_position = function (v) {
		var valarr = v.trim().split(/\s+/);
		var cnt = valarr.length;
		if (cnt == 0) {
			if (this.position != "") {
				this._is_empty = false;
				this._bindtype = 0;
				this._bindexpr = "";
				this.position = "";
				this.position_x = 0;
				this.position_y = 0;
				return this._updateValue();
			}
			return false;
		}
		else if (cnt == 2) {
			var _old_position = this.position;
			this.__load_position1(valarr[0]);
			this.__load_position2(valarr[1]);
			if (_old_position != this.position) {
				this._is_empty = false;
				this._bindtype = 0;
				this._bindexpr = "";
				return this._updateValue();
			}
			return false;
		}
		return false;
	};

	delete _pStyleBackground;
	nexacro._createBackgroundAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedBackgroundObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_background());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedBackgroundObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_image = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_background());\n"
			 + "	newobj.set_image(v);\n"
			 + "    newobj = nexacro._registerCachedBackgroundObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_repeat = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_background());\n"
			 + "	newobj.set_repeat(v);\n"
			 + "    newobj = nexacro._registerCachedBackgroundObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_position = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_background());\n"
			 + "	newobj.set_position(v);\n"
			 + "    newobj = nexacro._registerCachedBackgroundObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_imageedge = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_background());\n"
			 + "	newobj.set_imageedge(v);\n"
			 + "    newobj = nexacro._registerCachedBackgroundObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_clientonly = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_background());\n"
			 + "	newobj.set_clientonly(v);\n"
			 + "    newobj = nexacro._registerCachedBackgroundObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_line = function (v1, v2, v3, v4) {
		this.width = "";
		this.style = "";
		this.color = "";

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";
		this._width = 0;
		this._syscolor = "";
		this._sysalpha = 255;

		if (v3 != null) {
			this._is_empty = false;
			this.width = v1;
			this._width = (parseInt(v1) | 0);
			this.style = v2;
			this.color = (v3 && v3 != "transparent") ? v3 : "";

			this._syscolor = (this.color) ? nexacro._getWebColorFromXreColor(this.color) : "";
			this._sysalpha = (this.color) ? nexacro._getXreColorAlpha(this.color) : "";
		}
		else if (v1 && (typeof (v1) == "string")) {
			if (v1 != "none") {
				var val = v1.trim();
				if (val) {
					this._parseInfo(val);
					var str = this._getValueStr();
					this._is_empty = (str == "");

					this._syscolor = (this.color) ? nexacro._getWebColorFromXreColor(this.color) : "";
					this._sysalpha = (this.color) ? nexacro._getXreColorAlpha(this.color) : "";

					this._value = str;
				}
			}
		}
	};
	var _pStyleLine = nexacro._createPrototype(nexacro.Object, nexacro.Style_line);
	nexacro.Style_line.prototype = _pStyleLine;
	_pStyleLine._type_name = "Line";

	_pStyleLine.valueOf = function () {
		return this._value;
	};
	_pStyleLine.toString = function () {
		return this._value;
	};

	_pStyleLine.clone = function () {
		var newobj = new nexacro.Style_line();
		newobj.width = this.width;
		newobj.style = this.style;
		newobj.color = this.color;
		newobj._width = this._width;
		newobj._syscolor = this._syscolor;
		newobj._sysalpha = this._sysalpha;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleLine._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				return this._width + "px " + ((this.style) ? this.style : "none") + " " + ((this.color) ? this.color : "transparent");
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleLine._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this.width = "";
			this.style = "";
			this.color = "";
			this._width = 0;
			this._syscolor = "";
			this._sysalpha = 255;
		}
		else {
			var valarr = val.trim().split(/\s+/);
			if (valarr.length < 3) {
				return;
			}
			this.width = valarr[0];
			this._width = (parseInt(valarr[0]) | 0);
			switch (valarr[1]) {
				case "solid":
				case "double":
				case "dotted":
				case "dashed":
					this.style = valarr[1];
					break;
				default:
					this.style = "";
					break;
			}
			this.color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
		}
	};


	_pStyleLine._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._value = "";
			this._bindtype = 0;
			this._bindexpr = "";
			this.width = "";
			this._width = 0;
			this.style = "";
			this.color = "";
			this._syscolor = "";
			this._sysalpha = 255;
			return true;
		}
		return false;
	};
	_pStyleLine._copyInfo = function (from) {
		this._is_empty = from._is_empty;
		this._value = from_value;
		this._bindtype = from.binetype;
		this._bindexpr = from.bineexpr;
		this.width = from.width;
		this.style = from.style;
		this.color = from.color;
		this._width = from._width;
		this._syscolor = from._syscolor;
		this._sysalpha = from._sysalpha;
	};

	_pStyleLine._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			if (this.color) {
				this._syscolor = nexacro._getWebColorFromXreColor(this.color);
				this._sysalpha = nexacro._getXreColorAlpha(this.value);
			}
			else {
				this._syscolor = "";
				this._sysalpha = 255;
			}
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleLine._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleLine.set_width = function (v) {
		if (v != this.width) {
			this._is_empty = false;
			this.width = v;
			this._width = (parseInt(v) | 0);
			return this._updateValue();
		}
		return false;
	};
	_pStyleLine.set_style = function (v) {
		var val = "";
		switch (v) {
			case "solid":
			case "double":
			case "dotted":
			case "dashed":
				val = v;
				break;
		}
		if (val != this.style) {
			this._bindtype = 0;
			this._bindexpr = "";
			this.style = val;
			return this._updateValue();
		}
		return false;
	};
	_pStyleLine.set_color = function (v) {
		if (v != this.color) {
			this._bindtype = 0;
			this._bindexpr = "";
			this.color = (v && v != "transparent") ? v : "";
			return this._updateValue();
		}
		return false;
	};

	_pStyleLine._isValid = function () {
		return (!this._is_empty && this._width && this.style && this.color);
	};

	delete _pStyleLine;


	nexacro._createLineAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedLineObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_line());\n"
			 + "	newobj.set_width(v);\n"
			 + "    newobj = nexacro._registerCachedLineObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_style = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_line());\n"
			 + "	newobj.set_style(v);\n"
			 + "    newobj = nexacro._registerCachedLineObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_line());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedLineObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_border = function (tw, ts, tc, tc2, rw, rs, rc, rc2, bw, bs, bc, bc2, lw, ls, lc, lc2) {
		this.top = "";
		this.top_width = "";
		this.top_style = "";
		this.top_color = "";
		this.top_color2 = "";

		this.right = "";
		this.right_width = "";
		this.right_style = "";
		this.right_color = "";
		this.right_color2 = "";

		this.bottom = "";
		this.bottom_width = "";
		this.bottom_style = "";
		this.bottom_color = "";
		this.bottom_color2 = "";

		this.left = "";
		this.left_width = "";
		this.left_style = "";
		this.left_color = "";
		this.left_color2 = "";

		this.width = "";
		this.color = "";
		this.color2 = "";
		this.style = "";

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";
		this._linecnt = 1;

		this._left_width = 0;
		this._top_width = 0;
		this._right_width = 0;
		this._bottom_width = 0;

		this._left_syscolor = "";
		this._top_syscolor = "";
		this._right_syscolor = "";
		this._bottom_syscolor = "";

		this._systop = "";
		this._sysright = "";
		this._sysbottom = "";
		this._sysleft = "";

		this.top = this.left = this.right = this.bottom = "";

		if ((arguments.length == 1) && ((typeof (tw) == "string"))) {
			var val = tw.trim();
			if (val) {
				this._parseInfo(val);
				this._updateValue();
			}
		}
		else {
			var argcnt = (rw == null) ? 4 : ((bw == null) ? 8 : ((lw == null) ? 12 : 16));
			if (argcnt == 4 || argcnt == 8 || argcnt == 12 || argcnt == 16) {
				this._is_empty = false;
				switch (argcnt) {
					case 16:
						this.left = lw + " " + ls + " " + lc;
						this._left_width = (parseInt(lw) | 0);
						this.left_width = this._left_width ? (this._left_width + "px") : "";
						this.left_style = (ls && ls != "none") ? ls : "";
						this.left_color = (lc && lc != "transparent") ? lc : "";
						this._left_syscolor = (this.left_color) ? nexacro._getWebColorFromXreColor(this.left_color) : "";
						this._sysleft = (this._left_width) ? (this._left_width + "px " + ((this._left_syscolor) ? (this.left_style + " " + this._left_syscolor) : "solid transparent")) : "";
					case 12:
						this.bottom = bw + " " + bs + " " + bc;
						this.bottom_width = bw;
						this._bottom_width = (parseInt(bw) | 0);
						this.bottom_style = (bs && bs != "none") ? bs : "";
						this.bottom_color = (bc && bc != "transparent") ? bc : "";
						this._bottom_syscolor = (this.bottom_color) ? nexacro._getWebColorFromXreColor(this.bottom_color) : "";
						this._sysbottom = (this._bottom_width) ? (this._bottom_width + "px " + ((this._bottom_syscolor) ? (this.bottom_style + " " + this._bottom_syscolor) : "solid transparent")) : "";
					case 8:
						this.right = rw + " " + rs + " " + rc;
						this.right_width = rw;
						this._right_width = (parseInt(rw) | 0);
						this.right_style = (rs && rs != "none") ? rs : "";
						this.right_color = (rc && rc != "transparent") ? rc : "";
						this._right_syscolor = (this.right_color) ? nexacro._getWebColorFromXreColor(this.right_color) : "";
						this._sysright = (this._right_width) ? (this._right_width + "px " + ((this._right_syscolor) ? (this.right_style + " " + this._right_syscolor) : "solid transparent")) : "";
					case 4:
						this.top = tw + " " + ts + " " + tc;
						this.width = this.top_width = tw;
						this._top_width = (parseInt(tw) | 0);
						this.style = this.top_style = (ts && ts != "none") ? ts : "";
						this.color = this.top_color = (tc && tc != "transparent") ? tc : tc;
						this._top_syscolor = (this.top_color) ? nexacro._getWebColorFromXreColor(this.top_color) : "";
						this._systop = (this._top_width) ? (this._top_width + "px " + ((this._top_syscolor) ? (this.top_style + " " + this._top_syscolor) : "solid transparent")) : "";
				}
				this._linecnt = ((argcnt / 4) | 0);
				this._copytoSubObjects();
				this._updateValue();
			}
		}
	};

	var _pStyleBorder = nexacro._createPrototype(nexacro.Style_line, nexacro.Style_border);
	nexacro.Style_border.prototype = _pStyleBorder;
	_pStyleBorder._type_name = "Border";

	_pStyleBorder.valueOf = function () {
		return this._value;
	};
	_pStyleBorder.toString = function () {
		return this._value;
	};

	_pStyleBorder.clone = function () {
		var newobj = new nexacro.Style_border();
		newobj.style = this.style;
		newobj.width = this.width;
		newobj.color = this.color;
		newobj.color2 = this.color2;
		newobj.style = this.style;

		newobj.top = this.top;
		newobj.top_width = this.top_width;
		newobj.top_style = this.top_style;
		newobj.top_color = this.top_color;
		newobj.top_color2 = this.top_color2;

		newobj.right = this.right;
		newobj.right_width = this.right_width;
		newobj.right_style = this.right_style;
		newobj.right_color = this.right_color;
		newobj.right_color2 = this.right_color2;

		newobj.bottom = this.bottom;
		newobj.bottom_width = this.bottom_width;
		newobj.bottom_style = this.bottom_style;
		newobj.bottom_color = this.bottom_color;
		newobj.bottom_color2 = this.bottom_color2;

		newobj.left = this.left;
		newobj.left_width = this.left_width;
		newobj.left_style = this.left_style;
		newobj.left_color = this.left_color;
		newobj.left_color2 = this.left_color2;

		newobj._linecnt = this._linecnt;

		newobj._left_width = this._left_width;
		newobj._top_width = this._top_width;
		newobj._right_width = this._right_width;
		newobj._bottom_width = this._bottom_width;

		newobj._left_syscolor = this._left_syscolor;
		newobj._top_syscolor = this._top_syscolor;
		newobj._right_syscolor = this._right_syscolor;
		newobj._bottom_syscolor = this._bottom_syscolor;

		newobj._systop = this._systop;
		newobj._sysright = this._sysright;
		newobj._sysbottom = this._sysbottom;
		newobj._sysleft = this._sysleft;

		newobj._is_empty = this._is_empty;
		newobj._value = this._value;

		return newobj;
	};

	_pStyleBorder._emptySubObjects = function () {
		if (this._linecnt) {
			this.top_width = "";
			this.top_style = "";
			this.top_color = "";
			this._top_width = 0;
			this._top_syscolor = "";
			this._systop = "";
			this.top = "";

			this.right_width = "";
			this.right_style = "";
			this.right_color = "";
			this._right_width = 0;
			this._right_syscolor = "";
			this._sysright = "";
			this.right = "";

			this.bottom_width = "";
			this.bottom_style = "";
			this.bottom_color = "";
			this._bottom_width = 0;
			this._bottom_syscolor = "";
			this._sysbottom = "";
			this.bottom = "";

			this.left_width = "";
			this.left_style = "";
			this.left_color = "";
			this._left_width = 0;
			this._left_syscolor = "";
			this._sysleft = "";
			this.left = "";
		}
	};

	_pStyleBorder._is_real_empty = function () {
		if (this._top_width != 0 || this._left_width != 0 || this._bottom_width != 0 || this._right_width != 0) {
			return false;
		}
		return true;
	};

	_pStyleBorder._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._value = "";
			this._bindtype = 0;
			this._bindexpr = "";
			this._emptySubObjects();
			this._linecnt = 0;
			return true;
		}
		return false;
	};

	_pStyleBorder._copytoSubObjects = function () {
		switch (this._linecnt) {
			case 1:
				this._right_width = this._top_width;
				this.right_width = this.top_width;
				this.right_style = this.top_style;
				this.right_color = this.top_color;
				this.right = this.top;
			case 2:
				this._bottom_width = this._top_width;
				this.bottom_width = this.top_width;
				this.bottom_style = this.top_style;
				this.bottom_color = this.top_color;
				this.bottom = this.top;
			case 3:
				this._left_width = this._right_width;
				this.left_width = this.right_width;
				this.left_style = this.right_style;
				this.left_color = this.right_color;
				this.left = this.right;
		}
	};

	_pStyleBorder._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			if (val.charAt(4) == '(') {
				this._bindexpr = val.substr(5, val.length - 6);
			}
			else {
				this._bindexpr = val.substring(5);
			}
			this._emptySubObjects();
			this._linecnt = 0;
		}
		else {
			var linearr = val.split(',');
			this._linecnt = linearr.length;
			if (this._linecnt > 4) {
				this._linecnt = 4;
			}
			switch (this._linecnt) {
				case 4:
					this.left = linearr[3];
					var valarr = linearr[3].trim().split(/\s+/);
					if (valarr.length < 3) {
						return;
					}
					this._left_width = (parseInt(valarr[0]) | 0);
					this.left_width = this._left_width >= 0 ? (this._left_width + "px") : "";
					switch (valarr[1]) {
						case "solid":
						case "double":
						case "dotted":
						case "dashed":
						case "none":
							this.left_style = valarr[1];
							break;
						default:
							this.left_style = "";
							break;
					}
					this.left_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				case 3:
					this.bottom = linearr[2];
					var valarr = linearr[2].trim().split(/\s+/);
					if (valarr.length < 3) {
						return;
					}
					this._bottom_width = (parseInt(valarr[0]) | 0);
					this.bottom_width = this._bottom_width ? (this._bottom_width + "px") : "";
					switch (valarr[1]) {
						case "solid":
						case "double":
						case "dotted":
						case "dashed":
						case "none":
							this.bottom_style = valarr[1];
							break;
						default:
							this.bottom_style = "";
							break;
					}
					this.bottom_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				case 2:
					this.right = linearr[1];
					valarr = linearr[1].trim().split(/\s+/);
					if (valarr.length < 3) {
						return;
					}
					this._right_width = (parseInt(valarr[0]) | 0);
					this.right_width = this._right_width ? (this._right_width + "px") : "";
					switch (valarr[1]) {
						case "solid":
						case "double":
						case "dotted":
						case "dashed":
						case "none":
							this.right_style = valarr[1];
							break;
						default:
							this.right_style = "";
							break;
					}
					this.right_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				case 1:
					this.top = linearr[0];
					var valarr = linearr[0].trim().split(/\s+/);
					if (valarr.length < 3) {
						return;
					}
					this._top_width = (parseInt(valarr[0]) | 0);

					this.top_width = this._top_width >= 0 ? (this._top_width + "px") : "";
					this.top_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";

					switch (valarr[1]) {
						case "solid":
						case "double":
						case "dotted":
						case "dashed":
						case "none":
							this.top_style = valarr[1];
							break;
						default:
							this.top_style = "";
							break;
					}

					if (this._linecnt == 1) {
						this.width = this.top_width;
						this.style = this.top_style;
						this.color = this.top_color;
					}
			}
			this._copytoSubObjects();
		}
	};

	_pStyleBorder._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var str = "";
					str += this._top_width + "px " + (this.top_color ? ((this.top_style ? this.top_style : "") + ' ' + this.top_color) : this.top_style + " transparent");

					switch (this._linecnt) {
						case 1:
							break;
						case 2:
							str += ", " + this._right_width + "px " + (this.right_color ? ((this.right_style ? this.right_style : "") + ' ' + this.right_color) : "transparent");
							break;
						case 3:
							str += ", " + this._right_width + "px " + (this.right_color ? ((this.right_style ? this.right_style : "") + ' ' + this.right_color) : "transparent");
							str += ", " + this._bottom_width + "px " + (this.bottom_color ? ((this.bottom_style ? this.bottom_style : "") + ' ' + this.bottom_color) : "transparent");
							break;
						case 4:
							str += ", " + this._right_width + "px " + (this.right_color ? ((this.right_style ? this.right_style : "") + ' ' + this.right_color) : "transparent");
							str += ", " + this._bottom_width + "px " + (this.bottom_color ? ((this.bottom_style ? this.bottom_style : "") + ' ' + this.bottom_color) : "transparent");
							str += ", " + this._left_width + "px " + (this.left_color ? ((this.left_style ? this.left_style : "") + ' ' + this.left_color) : this.left_style + " transparent");
							break;
						default:
							if (this._bindtype == 0) {
								return "";
							}
					}
					return (str != "none" && str != "none, none" && str != "none, none, none" && str != "none, none, none, none") ? str : "";
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
	};

	_pStyleBorder._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			switch (this._linecnt) {
				case 1:
					this._top_syscolor = (this.top_color) ? nexacro._getWebColorFromXreColor(this.top_color) : "";
					this._systop = (this._top_width) ? (this._top_width + "px " + ((this._top_syscolor) ? (this.top_style + " " + this._top_syscolor) : this.top_style + " " + "transparent")) : "";
					this._right_syscolor = this._bottom_syscolor = this._left_syscolor = this._top_syscolor;
					this._right_width = this._bottom_width = this._left_width = this._top_width;
					this.right_style = this.bottom_style = this.left_style = this.top_style;
					this.right_color = this.bottom_color = this.left_color = this.top_color;
					this._sysright = this._sysbottom = this._sysleft = this._systop;

					this.top = this.top_width + " " + this.top_style + " " + this.top_color;
					this.right = this.bottom = this.left = this.top;
					break;
				case 2:
					this._top_syscolor = (this.top_color) ? nexacro._getWebColorFromXreColor(this.top_color) : "";
					this._systop = (this._top_width) ? (this._top_width + "px " + ((this._top_syscolor) ? (this.top_style + " " + this._top_syscolor) : this.top_style + " " + "transparent")) : "";
					this._right_syscolor = (this.right_color) ? nexacro._getWebColorFromXreColor(this.right_color) : "";
					this._sysright = (this._right_width) ? (this._right_width + "px " + ((this._right_syscolor) ? (this.right_style + " " + this._right_syscolor) : this.right_style + " " + "transparent")) : "";
					this._bottom_syscolor = this._top_syscolor;
					this._left_syscolor = this._right_syscolor;
					this._sysbottom = this._systop;
					this._sysleft = this._sysright;
					this._left_width = this._right_width;
					this._bottom_width = this._top_width;

					this.top = this.top_width + " " + this.top_style + " " + this.top_color;
					this.right = this.right_width + " " + this.right_style + " " + this.right_color;
					this.bottom = this.top;
					this.left = this.right;
					break;
				case 3:
					this._top_syscolor = (this.top_color) ? nexacro._getWebColorFromXreColor(this.top_color) : "";
					this._systop = (this._top_width) ? (this._top_width + "px " + ((this._top_syscolor) ? (this.top_style + " " + this._top_syscolor) : this.top_style + " " + "transparent")) : "";
					this._right_syscolor = (this.right_color) ? nexacro._getWebColorFromXreColor(this.right_color) : "";
					this._sysright = (this._right_width) ? (this._right_width + "px " + ((this._right_syscolor) ? (this.right_style + " " + this._right_syscolor) : this.right_style + " " + "transparent")) : "";
					this._bottom_syscolor = (this.bottom_color) ? nexacro._getWebColorFromXreColor(this.bottom_color) : "";
					this._sysbottom = (this._bottom_width) ? (this._bottom_width + "px " + ((this._bottom_syscolor) ? (this.bottom_style + " " + this._bottom_syscolor) : this.bottom_style + " " + "transparent")) : "";
					this._left_syscolor = this._right_syscolor;
					this._left_width = this._right_width;
					this._sysleft = this._sysright;

					this.top = this.top_width + " " + this.top_style + " " + this.top_color;
					this.right = this.right_width + " " + this.right_style + " " + this.right_color;
					this.bottom = this.bottom_width + " " + this.bottom_style + " " + this.bottom_color;
					this.left = this.right;
					break;
				case 4:
					this._top_syscolor = (this.top_color) ? nexacro._getWebColorFromXreColor(this.top_color) : "";
					this._systop = (this._top_width) ? (this._top_width + "px " + ((this._top_syscolor) ? (this.top_style + " " + this._top_syscolor) : this.top_style + " " + "transparent")) : "";
					this._right_syscolor = (this.right_color) ? nexacro._getWebColorFromXreColor(this.right_color) : "";
					this._sysright = (this._right_width) ? (this._right_width + "px " + ((this._right_syscolor) ? (this.right_style + " " + this._right_syscolor) : this.right_style + " " + "transparent")) : "";
					this._bottom_syscolor = (this.bottom_color) ? nexacro._getWebColorFromXreColor(this.bottom_color) : "";
					this._sysbottom = (this._bottom_width) ? (this._bottom_width + "px " + ((this._bottom_syscolor) ? (this.bottom_style + " " + this._bottom_syscolor) : this.bottom_style + " " + "transparent")) : "";
					this._left_syscolor = (this.left_color) ? nexacro._getWebColorFromXreColor(this.left_color) : "";
					this._sysleft = (this._left_width) ? (this._left_width + "px " + ((this._left_syscolor) ? (this.left_style + " " + this._left_syscolor) : this.left_style + " " + "transparent")) : "";

					this.top = this.top_width + " " + this.top_style + " " + this.top_color;
					this.right = this.right_width + " " + this.right_style + " " + this.right_color;
					this.bottom = this.bottom_width + " " + this.bottom_style + " " + this.bottom_color;
					this.left = this.left_width + " " + this.left_style + " " + this.left_color;
					break;
			}
			this._updateSubProp();
			return true;
		}
		return false;
	};

	_pStyleBorder._updateSubProp = function () {
		if (this.top) {
			this.top = this._top_width + "px " + (this.top_color ? ((this.top_style ? this.top_style : "") + ' ' + this.top_color) : this.top_style + " transparent");
		}
		if (this.right) {
			this.right = this._right_width + "px " + (this.right_color ? ((this.right_style ? this.right_style : "") + ' ' + this.right_color) : "transparent");
		}
		if (this.bottom) {
			this.bottom = this._bottom_width + "px " + (this.bottom_color ? ((this.bottom_style ? this.bottom_style : "") + ' ' + this.bottom_color) : "transparent");
		}
		if (this.left) {
			this.left = this._left_width + "px " + (this.left_color ? ((this.left_style ? this.left_style : "") + ' ' + this.left_color) : "transparent");
		}
	};

	_pStyleBorder._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleBorder._isValid = function () {
		return (!this._is_empty);
	};

	_pStyleBorder._getBorderLeftWidth = function () {
		if (this._is_empty) {
			return 0;
		}

		return (this.left_style && this.left_style != "none") ? this._left_width : 0;
	};

	_pStyleBorder._getBorderTopWidth = function () {
		if (this._is_empty) {
			return 0;
		}

		return (this.top_style && this.top_style != "none") ? this._top_width : 0;
	};

	_pStyleBorder._getBorderRightWidth = function () {
		if (this._is_empty) {
			return 0;
		}

		return (this.right_style && this.right_style != "none") ? this._right_width : 0;
	};

	_pStyleBorder._getBorderBottomWidth = function () {
		if (this._is_empty) {
			return 0;
		}

		return (this.bottom_style && this.bottom_style != "none") ? this._bottom_width : 0;
	};

	_pStyleBorder._getBorderWidth = function () {
		if (this._is_empty) {
			return 0;
		}
		if (this._linecnt > 1) {
			var left_width = (this.left_style && this.left_style != "none") ? this._left_width : 0;
			var right_width = (this.right_style && this.right_style != "none") ? this._right_width : 0;
		}
		else {
			var left_width = (this.top_style && this.top_style != "none") ? this._left_width : 0;
			var right_width = left_width;
		}
		return left_width + right_width;
	};

	_pStyleBorder._getBorderHeight = function () {
		if (this._is_empty) {
			return 0;
		}

		if (this._linecnt > 1) {
			var top_width = (this.top_style && this.top_style != "none") ? this._top_width : 0;
			var bottom_width = (this.bottom_style && this.bottom_style != "none") ? this._bottom_width : 0;
		}
		else {
			var top_width = (this.top_style && this.top_style != "none") ? this._top_width : 0;
			var bottom_width = top_width;
		}
		return top_width + bottom_width;
	};

	_pStyleBorder.set_width = function (v) {
		if (!this.width || v !== this.width) {
			this._is_empty = false;
			this._bindtype = 0;
			var _v = (parseInt(v) | 0);
			if (this._linecnt > 1) {
				this.top_width = v;
				this._top_width = _v;
				this.right_width = v;
				this._right_width = _v;
				this.bottom_width = v;
				this._bottom_width = _v;
				this.left_width = v;
				this._left_width = _v;
			}
			else {
				this.top_width = v;
				this._top_width = _v;
			}
			this.width = v;
			this._width = _v;

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_style = function (v) {
		if (v != this.style) {
			this._is_empty = false;
			this._bindtype = 0;
			switch (v) {
				case "none":
				case "solid":
				case "double":
				case "dotted":
				case "dashed":
					break;
				default:
					v = "";
					break;
			}
			this.style = v;

			if (this._linecnt > 1) {
				this.top_style = this.right_style = this.bottom_style = this.left_style = v;
			}
			else {
				this.top_style = v;
			}
			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder.set_color = function (v) {
		if (v != this.color) {
			v = (v && v != "transparent") ? v : "";
			this._is_empty = false;
			this._bindtype = 0;
			this.color = v;

			if (this._linecnt > 1) {
				this.top_color = this.right_color = this.bottom_color = this.left_color = v;
			}
			else {
				this.top_color = v;
			}
			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder.set_color2 = function (v) {
		if (v != this.color2) {
			v = (v && v != "transparent") ? v : "";
			this._is_empty = false;
			this._bindtype = 0;
			this.color2 = v;

			if (this._linecnt > 1) {
				this.top_color2 = this.right_color2 = this.bottom_color2 = this.left_color2 = v;
			}
			else {
				this.top_color2 = v;
			}
			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder.set_top = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._linecnt = 4;
		}
		if (v != this._systop) {
			var valarr = v.trim().split(/\s+/);
			if (valarr.length >= 3) {
				this.top_width = valarr[0];
				this._top_width = parseInt(valarr[0]);
				switch (valarr[1]) {
					case "none":
					case "solid":
					case "double":
					case "dotted":
					case "dashed":
						this.top_style = valarr[1];
						break;
					default:
						this.top_style = "";
						break;
				}
				this.top_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				this.top_color2 = (valarr[3] && valarr[3] != "transparent") ? valarr[3] : "";
				this.top = v;
			}
			else {
				this.top_width = "";
				this._top_width = 0;
				this.top_style = "";
				this.top_color = "";
				this.top_color2 = "";
				this.top = "";
			}

			if (this._linecnt < 1) {
				this._linecnt = 1;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_top_width = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.top_width) {
			this.top_width = v;
			this._top_width = (parseInt(v) | 0);

			if (this._linecnt < 1) {
				this._linecnt = 1;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_top_style = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.top_style) {
			switch (v) {
				case "none":
				case "solid":
				case "double":
				case "dotted":
				case "dashed":
					this.top_style = v;
					break;
				default:
					this.top_style = "";
					break;
			}

			if (this._linecnt < 1) {
				this._linecnt = 1;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_top_color = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.top_color) {
			this.top_color = (v && v != "transparent") ? v : "";

			if (this._linecnt < 1) {
				this._linecnt = 1;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_top_color2 = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.top_color2) {
			this.top_color2 = (v && v != "transparent") ? v : "";

			if (this._linecnt < 1) {
				this._linecnt = 1;
			}

			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder.set_right = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._linecnt = 4;
		}
		if (v != this._sysright) {
			var valarr = v.trim().split(/\s+/);
			if (valarr.length >= 3) {
				this.right_width = valarr[0];
				this._right_width = parseInt(valarr[0]);
				switch (valarr[1]) {
					case "none":
					case "solid":
					case "double":
					case "dotted":
					case "dashed":
						this.right_style = valarr[1];
						break;
					default:
						this.right_style = "";
						break;
				}
				this.right_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				this.right_color2 = (valarr[3] && valarr[3] != "transparent") ? valarr[3] : "";
				this.right = v;
			}
			else {
				this.right_width = "";
				this._right_width = 0;
				this.right_style = "";
				this.right_color = "";
				this.right_color2 = "";
				this.right = "";
			}

			if (this._linecnt < 2) {
				this._linecnt = 2;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_right_width = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.right_width) {
			this.right_width = v;
			this._right_width = (parseInt(v) | 0);
			return this._updateValue();
		}

		if (this._linecnt < 2) {
			this._linecnt = 2;
		}

		return false;
	};
	_pStyleBorder.set_right_style = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.right_style) {
			switch (v) {
				case "none":
				case "solid":
				case "double":
				case "dotted":
				case "dashed":
					this.right_style = v;
					break;
				default:
					this.right_style = "";
					break;
			}

			if (this._linecnt < 2) {
				this._linecnt = 2;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_right_color = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.right_color) {
			this.right_color = (v && v != "transparent") ? v : "";

			if (this._linecnt < 2) {
				this._linecnt = 2;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_right_color2 = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.right_color2) {
			if (this._linecnt > 1) {
				this._emptySubObjects();
			}

			if (this._linecnt < 2) {
				this._linecnt = 2;
			}

			this.right_color2 = (v && v != "transparent") ? v : "";
			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder.set_bottom = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._linecnt = 4;
		}
		if (v != this._sysbottom) {
			var valarr = v.trim().split(/\s+/);
			if (valarr.length >= 3) {
				this.bottom_width = valarr[0];
				this._bottom_width = (parseInt(valarr[0]) | 0);
				switch (valarr[1]) {
					case "none":
					case "solid":
					case "double":
					case "dotted":
					case "dashed":
						this.bottom_style = valarr[1];
						break;
					default:
						this.bottom_style = "";
						break;
				}
				this.bottom_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				this.bottom_color2 = (valarr[3] && valarr[3] != "transparent") ? valarr[3] : "";
				this.bottom = v;
			}
			else {
				this.bottom_width = "";
				this._bottom_width = 0;
				this.bottom_style = "";
				this.bottom_color = "";
				this.bottom_color2 = "";
				this.bottom = "";
			}

			if (this._linecnt < 3) {
				this._linecnt = 3;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_bottom_width = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.bottom_width) {
			this.bottom_width = v;
			this._bottom_width = (parseInt(v) | 0);

			if (this._linecnt < 3) {
				this._linecnt = 3;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_bottom_style = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.right_style) {
			switch (v) {
				case "none":
				case "solid":
				case "double":
				case "dotted":
				case "dashed":
					this.bottom_style = v;
					break;
				default:
					this.bottom_style = "";
					break;
			}

			if (this._linecnt < 3) {
				this._linecnt = 3;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_bottom_color = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.bottom_color) {
			this.bottom_color = (v && v != "transparent") ? v : "";

			if (this._linecnt < 3) {
				this._linecnt = 3;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_bottom_color2 = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.right_color2) {
			this.bottom_color2 = (v && v != "transparent") ? v : "";

			if (this._linecnt < 3) {
				this._linecnt = 3;
			}

			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder.set_left = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._linecnt = 4;
		}
		if (v != this._sysleft) {
			var valarr = v.trim().split(/\s+/);
			if (valarr.length >= 3) {
				this.left_width = valarr[0];
				this._left_width = (parseInt(valarr[0]) | 0);
				switch (valarr[1]) {
					case "none":
					case "solid":
					case "double":
					case "dotted":
					case "dashed":
						this.left_style = valarr[1];
						break;
					default:
						this.left_style = "";
						break;
				}
				this.left_color = (valarr[2] && valarr[2] != "transparent") ? valarr[2] : "";
				this.left_color2 = (valarr[3] && valarr[3] != "transparent") ? valarr[3] : "";
				this.left = v;
			}
			else {
				this.left_width = "";
				this._left_width = 0;
				this.left_style = "";
				this.left_color = "";
				this.left_color2 = "";
				this.left = "";
			}

			if (this._linecnt < 4) {
				this._linecnt = 4;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_left_width = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.left_width) {
			this.left_width = v;
			this._left_width = (parseInt(v) | 0);

			if (this._linecnt < 4) {
				this._linecnt = 4;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_left_style = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.left_style) {
			switch (v) {
				case "none":
				case "solid":
				case "double":
				case "dotted":
				case "dashed":
					this.left_style = v;
					break;
				default:
					this.left_style = "";
					break;
			}

			if (this._linecnt < 4) {
				this._linecnt = 4;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_left_color = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.left_color) {
			this.left_color = (v && v != "transparent") ? v : "";

			if (this._linecnt < 4) {
				this._linecnt = 4;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleBorder.set_left_color2 = function (v) {
		this._is_empty = false;
		this._bindtype = 0;
		if (this._linecnt <= 1) {
			this._copytoSubObjects();
		}
		if (v != this.left_color2) {
			this.left_color2 = (v && v != "transparent") ? v : "";

			if (this._linecnt < 4) {
				this._linecnt = 4;
			}

			return this._updateValue();
		}
		return false;
	};

	_pStyleBorder._createRtlValue = function () {
		if (!this._rtlvalue) {
			if (this._sysleft != this._sysright) {
				var arrValue = this._value.split(",");
				var strValue;
				if (arrValue.length == 4) {
					strValue = arrValue[0] + ", " + arrValue[3] + ", " + arrValue[2] + ", " + arrValue[1];
					this._rtlvalue = strValue;
				}
			}
		}
	};

	_pStyleBorder._getStyleObject = function (bRtl) {
		this._createRtlValue();
		if (bRtl && this._rtlvalue) {
			return nexacro._getCachedBorderObj(this._rtlvalue);
		}
		else {
			return this;
		}
	};

	delete _pStyleBorder;

	nexacro._createBorderAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedBorderObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_width(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_style = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_style(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target  && this._target._control_element) \n"
			 + "            this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color2 = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_color2(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_top = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_top(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_top_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_top_width(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target  && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_top_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_top_color(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_top_color2 = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_top_color2(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			
			 + "$PTYPE$.set_$ATTR$_right = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_right(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_right_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_right_width(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_right_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_right_color(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_right_color2 = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_right_color2(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_bottom = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_bottom(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_bottom_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_bottom_width(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_bottom_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_bottom_color(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_bottom_color2 = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_bottom_color2(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_left = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_left(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_left_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_left_width(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_left_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_left_color(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_left_color2 = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_border());\n"
			 + "	newobj.set_left_color2(v);\n"
			 + "    newobj = nexacro._registerCachedBorderObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_bordertype = function (type, radiusx, radiusy, lefttop, righttop, leftbottom, rightbottom) {
		this.type = "";
		this.radiusx = "";
		this.radiusy = "";
		this.lefttop = undefined;
		this._lefttop = false;
		this.righttop = undefined;
		this._righttop = false;
		this.leftbottom = undefined;
		this._leftbottom = false;
		this.rightbottom = undefined;
		this._rightbottom = false;

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";
		this._sysvalue = "";
		this._radiusx = 0;
		this._radiusy = 0;

		if (radiusx != null) {
			this._is_empty = false;
			this._bindtype = 0;
			this.type = type;

			if (radiusx != undefined && radiusy != undefined) {
				this.radiusx = radiusx;
				this.radiusy = radiusy;
				this._radiusx = (parseInt(radiusx) | 0);
				this._radiusy = (parseInt(radiusy) | 0);
			}

			this.lefttop = this._lefttop = nexacro._toBoolean(lefttop);
			this.righttop = this._righttop = nexacro._toBoolean(righttop);
			this.leftbottom = this._leftbottom = nexacro._toBoolean(leftbottom);
			this.rightbottom = this._rightbottom = nexacro._toBoolean(rightbottom);

			var strobj = this._getValueStr();
			this._is_empty = (strobj.value == "");
			this._value = strobj.value;
			this._sysvalue = strobj.sysvalue;
		}
		else if (type && (typeof (type) == "string")) {
			var val = type.trim();
			if (val) {
				this._parseInfo(val);
				this._updateValue();
			}
		}
	};
	var _pStyleBordertype = nexacro._createPrototype(nexacro.Object, nexacro.Style_bordertype);
	nexacro.Style_bordertype.prototype = _pStyleBordertype;
	_pStyleBordertype._type_name = "Bordertype";


	_pStyleBordertype.valueOf = function () {
		return this._value;
	};
	_pStyleBordertype.toString = function () {
		return this._value;
	};

	_pStyleBordertype.clone = function () {
		var newobj = new nexacro.Style_bordertype();
		newobj.type = this.type;
		newobj.radiusx = this.radiusx;
		newobj.radiusy = this.radiusy;
		newobj.lefttop = this.lefttop;
		newobj._lefttop = this._lefttop;
		newobj.righttop = this.righttop;
		newobj._righttop = this._righttop;
		newobj.leftbottom = this.leftbottom;
		newobj._leftbottom = this._leftbottom;
		newobj.rightbottom = this.rightbottom;
		newobj._rightbottom = this._rightbottom;

		newobj._radiusx = this._radiusx;
		newobj._radiusy = this._radiusy;

		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		newobj._sysvalue = this._sysvalue;
		return newobj;
	};

	_pStyleBordertype._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.type = "";
			this.radiusx = "";
			this.radiusy = "";
			this._radiusx = 0;
			this._radiusy = 0;
			this.lefttop = undefined;
			this.righttop = undefined;
			this.leftbottom = undefined;
			this.rightbottom = undefined;
			this._lefttop = false;
			this._righttop = false;
			this._leftbottom = false;
			this._rightbottom = false;
			this._value = "";
			this._sysvalue = "";
			return true;
		}
		return false;
	};

	_pStyleBordertype._isRound = function () {
		return (this.type == "round" && this._radiusx > 0 && this._radiusy > 0);
	};

	_pStyleBordertype._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var val = this.type;
					var sysval;
					if (val == "round") {
						if (this._radiusx >= 0 && this._radiusy >= 0) {
							val += " " + this.radiusx + " " + this.radiusy;
							sysval = val;
							if (this.lefttop) {
								val += " lefttop";
								sysval += " true";
							}
							else if (this.lefttop == false) {
								sysval += " false";
							}
							else {
								sysval += " undefined";
							}

							if (this.righttop) {
								val += " righttop";
								sysval += " true";
							}
							else if (this.righttop == false) {
								sysval += " false";
							}
							else {
								sysval += " undefined";
							}

							if (this.leftbottom) {
								val += " leftbottom";
								sysval += " true";
							}
							else if (this.leftbottom == false) {
								sysval += " false";
							}
							else {
								sysval += " undefined";
							}

							if (this.rightbottom) {
								val += " rightbottom";
								sysval += " true";
							}
							else if (this.rightbottom == false) {
								sysval += " false";
							}
							else {
								sysval += " undefined";
							}
						}
						else {
							val = "normal " + this.radiusx + " " + this.radiusy;
							sysval = val;
						}
					}
					else {
						val = "normal " + this.radiusx + " " + this.radiusy;
						sysval = val;
						if (this.lefttop) {
							val += " lefttop";
							sysval += " true";
						}
						else if (this.lefttop == false) {
							sysval += " false";
						}
						else {
							sysval += " undefined";
						}

						if (this.righttop) {
							val += " righttop";
							sysval += " true";
						}
						else if (this.righttop == false) {
							sysval += " false";
						}
						else {
							sysval += " undefined";
						}

						if (this.leftbottom) {
							val += " leftbottom";
							sysval += " true";
						}
						else if (this.leftbottom == false) {
							sysval += " false";
						}
						else {
							sysval += " undefined";
						}

						if (this.rightbottom) {
							val += " rightbottom";
							sysval += " true";
						}
						else if (this.rightbottom == false) {
							sysval += " false";
						}
						else {
							sysval += " undefined";
						}
					}
					return {
						value : val, 
						sysvalue : sysval
					};
				}
			case 1:
				var val = "bind:" + this._bindexpr;
				return {
					value : val, 
					sysvalue : val
				};
			case 2:
				var val = "expr:" + this._bindexpr;
				return {
					value : val, 
					sysvalue : val
				};
		}
		return "";
	};

	_pStyleBordertype._updateValue = function () {
		var strobj = this._getValueStr();
		if (strobj.sysvalue != this._sysvalue) {
			this._resetValue();
			this._is_empty = (strobj.value == "");
			this._sysvalue = strobj.sysvalue;
			this._value = strobj.value;
			return true;
		}
		return false;
	};

	_pStyleBordertype._resetValue = function () {
		var lt = this.lefttop, rt = this.righttop, lb = this.leftbottom, rb = this.rightbottom;

		if (lt == undefined && rt == undefined && lb == undefined && rb == undefined) {
			this._lefttop = true;
			this._righttop = true;
			this._leftbottom = true;
			this._rightbottom = true;
		}
		else {
			if (lt == undefined) {
				this._lefttop = false;
			}
			if (rt == undefined) {
				this._righttop = false;
			}
			if (lb == undefined) {
				this._leftbottom = false;
			}
			if (rb == undefined) {
				this._rightbottom = false;
			}
		}
	};

	_pStyleBordertype._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var parts = val.split(/\s+/);
			var part;
			this.type = parts[0];
			if (parts[1] != undefined && parts[2] != undefined) {
				this.radiusx = parts[1];
				this.radiusy = parts[2];
				this._radiusx = (parseInt(parts[1]) | 0);
				this._radiusy = (parseInt(parts[2]) | 0);
			}
			if (parts.length > 3) {
				this._lefttop = false;
				this._righttop = false;
				this._leftbottom = false;
				this._rightbottom = false;
				for (var i = 3; i < parts.length; i++) {
					part = parts[i];
					switch (part) {
						case "lefttop":
							this.lefttop = true;
							this._lefttop = true;
							break;
						case "righttop":
							this.righttop = true;
							this._righttop = true;
							break;
						case "leftbottom":
							this.leftbottom = true;
							this._leftbottom = true;
							break;
						case "rightbottom":
							this.rightbottom = true;
							this._rightbottom = true;
							break;
					}
				}
			}
			else {
				this._lefttop = true;
				this._righttop = true;
				this._leftbottom = true;
				this._rightbottom = true;
			}
		}
	};

	_pStyleBordertype._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._sysvalue) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleBordertype.set_type = function (v) {
		if (v != this.type) {
			this._is_empty = false;
			this._bindtype = 0;
			this.type = v;
			return this._updateValue(true);
		}
		return false;
	};
	_pStyleBordertype.set_radiusx = function (v) {
		if (v != this.radiusx) {
			this._is_empty = false;
			this._bindtype = 0;
			this.radiusx = v;
			this._radiusx = (parseInt(v) | 0);
			return this._updateValue(true);
		}
		return false;
	};
	_pStyleBordertype.set_radiusy = function (v) {
		if (v != this.radiusy) {
			this._is_empty = false;
			this._bindtype = 0;
			this.radiusy = v;
			this._radiusy = (parseInt(v) | 0);
			return this._updateValue(true);
		}
		return false;
	};
	_pStyleBordertype.set_lefttop = function (v) {
		if (typeof v == "string") {
			v = (v == "true");
		}
		if (v != this.lefttop) {
			this._is_empty = false;
			this._bindtype = 0;
			this._lefttop = this.lefttop = (v ? true : false);
			return this._updateValue(true);
		}
		return false;
	};
	_pStyleBordertype.set_leftbottom = function (v) {
		if (typeof v == "string") {
			v = (v == "true");
		}
		if (v != this.leftbottom) {
			this._is_empty = false;
			this._bindtype = 0;
			this._leftbottom = this.leftbottom = (v ? true : false);
			return this._updateValue(true);
		}
		return false;
	};
	_pStyleBordertype.set_righttop = function (v) {
		if (typeof v == "string") {
			v = (v == "true");
		}
		if (v != this.righttop) {
			this._is_empty = false;
			this._bindtype = 0;
			this._righttop = this.righttop = (v ? true : false);
			return this._updateValue(true);
		}
		return false;
	};
	_pStyleBordertype.set_rightbottom = function (v) {
		if (typeof v == "string") {
			v = (v == "true");
		}
		if (v != this.rightbottom) {
			this._is_empty = false;
			this._bindtype = 0;
			this._rightbottom = this.rightbottom = (v ? true : false);
			return this._updateValue(true);
		}
		return false;
	};

	_pStyleBordertype._createRtlValue = function () {
		if (!this._rtlvalue) {
			if (this.lefttop != this.righttop || this.leftbottom != this.rightbottom) {
				var strValue;
				strValue = this.type + " " + this.radiusx + " " + this.radiusy;

				if (this.lefttop) {
					strValue = strValue + " righttop";
				}
				if (this.righttop) {
					strValue = strValue + " lefttop";
				}
				if (this.leftbottom) {
					strValue = strValue + " rightbottom";
				}
				if (this.rightbottom) {
					strValue = strValue + " leftbottom";
				}

				this._rtlvalue = strValue;
			}
		}
	};

	_pStyleBordertype._getStyleObject = function (bRtl) {
		this._createRtlValue();
		if (bRtl && this._rtlvalue) {
			return nexacro._getCachedBordertypeObj(this._rtlvalue);
		}
		else {
			return this;
		}
	};

	nexacro._createBordertypeAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedBordertypeObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_type = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_type(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_radiusx = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_radiusx(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_radiusy = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_radiusy(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_lefttop = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_lefttop(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_leftbottom = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_leftbottom(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_righttop = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_righttop(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_rightbottom = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_bordertype());\n"
			 + "	newobj.set_rightbottom(v);\n"
			 + "    newobj = nexacro._registerCachedBordertypeObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/gi, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_pointColor = function (v1, v2) {
		this.point = "";
		this.color = "";

		this._is_empty = true;
		this._target = null;
		this._itemidx = 0;
		this._value = "";
		this._x = 0;
		this._y = 0;
		this._syscolor = "";
		this._sysalpha = 255;

		if (v2 != null) {
			this._is_empty = false;
			this.point = v1;
			if (v2 == "transparent") {
				this.color = "";
			}
			else {
				this.color = v2;
			}
		}
		else if (v1 && (typeof (v1) == "string")) {
			var val = v.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				if (this.color) {
					this._syscolor = nexacro._getWebColorFromXreColor(this.color);
					this._sysalpha = nexacro._getXreColorAlpha(this.color);
				}
				else {
					this._syscolor = "";
					this._sysalpha = 255;
				}
				this._value = str;
			}
		}
	};
	var _pStylePointColor = nexacro._createPrototype(nexacro.Object, nexacro.Style_pointColor);
	nexacro.Style_pointColor.prototype = _pStylePointColor;
	_pStylePointColor._type_name = "PointColor";

	_pStylePointColor.valueOf = function () {
		return this._value;
	};

	_pStylePointColor.toString = function () {
		return this._value;
	};

	_pStylePointColor._empty = function () {
		if (!this._is_empty) {
			this._value = "";
			this.point = "";
			this.color = "";
			this._syscolor = "";
			this._sysalpha = 255;
			this._x = 0;
			this._y = 0;
			this._is_empty = true;
			return true;
		}
		return false;
	};

	_pStylePointColor._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var val = "";
					if (!this._is_empty) {
						val = this.point + " " + this.color;
					}
					return val;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStylePointColor._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			if (this.color) {
				this._syscolor = nexacro._getWebColorFromXreColor(this.color);
				this._sysalpha = nexacro._getXreColorAlpha(this.color);
			}
			return true;
		}
		return false;
	};

	_pStylePointColor._parseInfo = function (val) {
		this._is_empty = false;
		var parts = val.split(/\s+/);
		this.point = parts[0];
		var ptarr = this.point.split(',');
		this._x = (parseInt(ptarr[0]) | 0);
		this._y = (parseInt(ptarr[1]) | 0);
		this.color = parts[1];
	};

	_pStylePointColor._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStylePointColor.update = function (_apply_) {
		if (this._updateValue() && _apply_) {
			if (this._target) {
				this._target.on_update_style_pointcolor();
			}
		}
	};

	_pStylePointColor.set_point = function (v) {
		if (v != this.point) {
			this._is_empty = false;
			this.point = v;
			var ptarr = this.point.split(',');
			this._x = (parseInt(ptarr[0]) | 0);
			this._y = (parseInt(ptarr[1]) | 0);
			this.update(true);
		}
	};
	_pStylePointColor.set_color = function (v) {
		if (v != this.color) {
			this._is_empty = false;
			this.color = v;
			this.update(true);
		}
	};


	nexacro.Style_gradation = function (style, sX, sY, sColor, eX, eY, eColor, peglist) {
		this.style = "";
		this.peglist = "";
		this.start = null;
		this.end = null;

		this.start_point = "";
		this.start_color = "";

		this.end_point = "";
		this.end_color = "";

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		this._sysvalue = "";
		this._sysvalue2 = "";

		this._start_x = 0;
		this._start_y = 0;
		this._start_syscolor = "";
		this._start_vmlcolor = "";

		this._end_x = 100;
		this._end_y = 100;
		this._end_syscolor = "";
		this._end_vmlcolor = "";

		if (sX != null) {
			this._is_empty = false;
			this._bindtype = 0;
			this.style = style;
			this._start_x = sX;
			this._start_y = sY;
			this.start_point = sX + "," + sY;
			this.start_color = sColor;
			this._end_x = eX;
			this._end_y = eY;
			this.end_point = sX + "," + sY;
			this.end_color = eColor;
			this.peglist = peglist;
			nexacro._makeGradationSysValue(this);
		}
		else if (style && (typeof style) == "string") {
			var val = style.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = val;
				nexacro._makeGradationSysValue(this);
			}
		}
	};
	var _pStyleGradation = nexacro._createPrototype(nexacro.Object, nexacro.Style_gradation);
	nexacro.Style_gradation.prototype = _pStyleGradation;
	_pStyleGradation._type_name = "Gradation";

	_pStyleGradation.valueOf = function () {
		return this._value;
	};
	_pStyleGradation.toString = function () {
		return this._value;
	};

	_pStyleGradation.clone = function () {
		var newobj = new nexacro.Style_gradation();

		newobj.style = this.style;
		newobj.peglist = this.peglist;
		newobj.start = this.start;
		newobj.end = this.end;

		newobj.start_point = this.start_point;
		newobj.start_color = this.start_color;

		newobj.end_point = this.end_point;
		newobj.end_color = this.end_color;

		newobj._sysvalue = this._sysvalue;
		newobj._sysvalue2 = this._sysvalue2;

		newobj._start_x = this._start_x;
		newobj._start_y = this._start_y;
		newobj._start_syscolor = this._start_syscolor;
		newobj._start_vmlcolor = this._start_vmlcolor;

		newobj._end_x = this._end_x;
		newobj._end_y = this._end_y;
		newobj._end_syscolor = this._end_syscolor;
		newobj._end_vmlcolor = this._end_vmlcolor;

		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleGradation._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.style = "";
			this.peglist = "";
			this.start_point = "";
			this.start_color = "";
			this._start_x = 0;
			this._start_y = 0;
			this.end_point = "";
			this.end_color = "";
			this._end_x = 100;
			this._end_y = 100;
			this._sysvalue = "";
			this._sysvalue2 = "";
			return true;
		}
		return false;
	};

	_pStyleGradation._parsePegList = function (peglist) {
		var arr = [];
		var str = peglist;
		var spos, len, valarr, peg;
		spos = 0;
		spos = str.indexOf("[", spos);
		while (spos >= 0) {
			spos += 1;
			len = str.indexOf("]", spos);
			if (len < 0) {
				break;
			}
			peg = str.substring(spos, len);
			spos = len + 1;
			valarr = peg.trim().split(/\s+/);
			if (valarr.length >= 2) {
				pos = (parseInt(valarr[0]) | 0);
				if (pos > 0 && pos < 100) {
					arr.push([pos, valarr[valarr.length - 1]]);
				}
			}
			spos = str.indexOf("[", spos);
		}
		return arr;
	};

	_pStyleGradation._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var val = this.style + " " + this.start_point + " " + this.start_color + " " + this.end_point + " " + this.end_color;
					val += " " + this.peglist;
					return val;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleGradation._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			nexacro._makeGradationSysValue(this);
			return true;
		}
		return false;
	};

	_pStyleGradation._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}

			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
		}
		else {
			if (val.indexOf("linear-gradient") >= 0) {
				this.style = "linear";

				var idx = val.indexOf("(");
				var all_prop = val.substring(idx + 1, val.length - 1);
				var split_prop = all_prop.split(",");
				var prop_len = split_prop.length;

				var first_prop = split_prop[1].trim().split(" ");
				var first_pos = first_prop[1] && parseInt(first_prop[1]) > 0 ? parseInt(first_prop[1]) : 0;
				var last_prop = split_prop[prop_len - 1].trim().split(" ");
				var last_pos = last_prop[1] && parseInt(last_prop[1]) < 100 ? parseInt(last_prop[1]) : 100;

				if (prop_len == 2) {
					this._start_x = this._start_y = first_pos;
					this._end_x = this._end_y = last_pos;

					this.start_point = this._start_x + "," + this._start_y;
					this.start_color = first_prop[0];

					this.end_point = this._end_x + "," + this._end_y;
					this.end_color = last_prop[0];
				}
				else if (prop_len >= 3) {
					var str = split_prop[0].trim();

					if ((/left|top|right|bottom/).test(str)) {
						if (str.indexOf("top") >= 0) {
							if (str.indexOf("right") >= 0) {
								this._setPosition("top right", first_pos, last_pos);
							}
							else if (str.indexOf("left") >= 0) {
								this._setPosition("top left", first_pos, last_pos);
							}
							else {
								this._setPosition("top", first_pos, last_pos);
							}
						}
						else if (str.indexOf("bottom") >= 0) {
							if (str.indexOf("right") >= 0) {
								this._setPosition("bottom right", first_pos, last_pos);
							}
							else if (str.indexOf("left") >= 0) {
								this._setPosition("bottom left", first_pos, last_pos);
							}
							else {
								this._setPosition("bottom", first_pos, last_pos);
							}
						}
						else if (str.indexOf("left") >= 0) {
							this._setPosition("left", first_pos, last_pos);
						}
						else if (str.indexOf("right") >= 0) {
							this._setPosition("right", first_pos, last_pos);
						}

						if (prop_len > 3) {
							var peg_arr = split_prop.slice(2, prop_len - 1);
							var peglist = "", pegstr = "", newstr = "", pegarr = [];
							for (var i = 0; i < peg_arr.length; i++) {
								pegstr = peg_arr[i].trim();
								pegarr = pegstr.split(" ");
								newstr = "[" + pegarr[1] + " " + pegarr[0] + "]";
								peglist += newstr;
							}
							this.peglist = peglist;
						}
					}
					else if (str.indexOf("to") >= 0) {
						var strarr = str.split(" ");

						this._start_x = (parseInt(strarr[0]) | 0);
						this._start_y = (parseInt(strarr[1]) | 0);
						this._end_x = (parseInt(strarr[3]) | 0);
						this._end_y = (parseInt(strarr[4]) | 0);

						if (prop_len > 3) {
							var peg_arr = split_prop.slice(2, prop_len - 1);
							var peglist = "", pegstr = "", newstr = "", pegarr = [];
							for (var i = 0; i < peg_arr.length; i++) {
								pegstr = peg_arr[i].trim();
								pegarr = pegstr.split(" ");
								newstr = "[" + pegarr[1] + " " + pegarr[0] + "]";
								peglist += newstr;
							}
							this.peglist = peglist;
						}
					}
					else if (str.indexOf("deg") >= 0) {
						var deg = (parseInt(str) | 0);
						if (deg < 0) {
							while (deg < 0) {
								deg += 360;
							}
						}
						else if (deg >= 360) {
							while (deg >= 360) {
								deg -= 360;
							}
						}

						switch (Math.floor(deg / 45)) {
							case 0:
								this._setPosition("top", first_pos, last_pos);
								break;
							case 1:
								this._setPosition("top right", first_pos, last_pos);
								break;
							case 2:
								this._setPosition("right", first_pos, last_pos);
								break;
							case 3:
								this._setPosition("bottom right", first_pos, last_pos);
								break;
							case 4:
								this._setPosition("bottom", first_pos, last_pos);
								break;
							case 5:
								this._setPosition("bottom left", first_pos, last_pos);
								break;
							case 6:
								this._setPosition("left", first_pos, last_pos);
								break;
							case 7:
								this._setPosition("top left", first_pos, last_pos);
								break;
						}

						if (prop_len > 3) {
							var peg_arr = split_prop.slice(2, prop_len - 1);
							var peglist = "", pegstr = "", newstr = "", pegarr = [];
							for (var i = 0; i < peg_arr.length; i++) {
								pegstr = peg_arr[i].trim();
								pegarr = pegstr.split(" ");
								newstr = "[" + pegarr[1] + " " + pegarr[0] + "]";
								peglist += newstr;
							}
							this.peglist = peglist;
						}
					}
					else {
						this._start_x = this._start_y = first_pos;
						this._end_x = this._end_y = last_pos;

						var peg_arr = split_prop.slice(1, prop_len - 1);
						var peglist = "", pegstr = "", newstr = "", pegarr = [];
						for (var i = 0; i < peg_arr.length; i++) {
							pegstr = peg_arr[i].trim();
							pegarr = pegstr.split(" ");
							newstr = "[" + pegarr[1] + " " + pegarr[0] + "]";
							peglist += newstr;
						}
						this.peglist = peglist;
					}
					this.start_point = this._start_x + "," + this._start_y;
					this.start_color = first_prop[0];

					this.end_point = this._end_x + "," + this._end_y;
					this.end_color = last_prop[0];
				}
			}
			else if (val.indexOf("radial-gradient") >= 0) {
				this.style = "radial";
			}
			else {
				var valarr = val.split(/\s+/);
				if (valarr.length > 4) {
					switch (valarr[0]) {
						case "none":
						case "linear":
						case "radial":
							this.style = valarr[0];
							break;
						default:
							this.style = "";
							break;
					}
					var ptarr = valarr[1].split(',');
					this._start_x = (parseInt(ptarr[0]) | 0);
					this._start_y = (parseInt(ptarr[1]) | 0);
					this.start_point = this._start_x + "," + this._start_y;
					this.start_color = valarr[2];
					var ptarr = valarr[3].split(',');
					this._end_x = (parseInt(ptarr[0]) | 0);
					this._end_y = (parseInt(ptarr[1]) | 0);
					this.end_point = this._end_x + "," + this._end_y;
					this.end_color = valarr[4];
					if (valarr.length > 5) {
						var tmppeg = [];
						for (var i = 5; i < valarr.length; i++) {
							tmppeg.push(valarr[i]);
						}
						this.peglist = tmppeg.join(" ");
					}
					else {
						this.peglist = "";
					}
				}
			}
		}
	};

	_pStyleGradation._setPosition = function (pos, first, last) {
		switch (pos) {
			case "top":
				this._start_x = this._end_x = 0;
				this._start_y = 100 - first;
				this._end_y = 100 - last;
				break;
			case "top right":
				this._start_x = first;
				this._start_y = 100 - first;
				this._end_x = last;
				this._end_y = 100 - last;
				break;
			case "top left":
				this._start_x = this._start_y = 100 - first;
				this._end_x = this._end_y = 100 - last;
				break;
			case "bottom":
				this._start_x = this._end_x = 0;
				this._start_y = first;
				this._end_y = last;
				break;
			case "bottom right":
				this._start_x = this._start_y = first;
				this._end_x = this._end_y = last;
				break;
			case "bottom left":
				this._start_x = 100 - first;
				this._start_y = first;
				this._end_x = 100 - last;
				this._end_y = last;
				break;
			case "left":
				this._start_x = 100 - first;
				this._start_y = this._end_y = 0;
				this._end_x = 100 - last;
				break;
			case "right":
				this._start_x = first;
				this._start_y = this._end_y = 0;
				this._end_x = last;
				break;
		}
	};

	_pStyleGradation._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleGradation.set_style = function (v) {
		if (v != this.style) {
			this._is_empty = false;
			this._bindtype = 0;
			switch (v) {
				case "none":
				case "linear":
				case "radial":
					this.style = v;
					break;
				default:
					this.style = "";
					break;
			}
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_start = function (v) {
		if (v != (this.start_point + " " + this.start_color)) {
			this._is_empty = false;
			this._bindtype = 0;
			var val = (v) ? v.toString().trim() : "";
			var parts = val.split(/\s+/);
			var ptarr = parts[0].split(',');
			this._start_x = (parseInt(ptarr[0]) | 0);
			this._start_y = (parseInt(ptarr[1]) | 0);
			this.start_point = this._start_x + "," + this._start_y;
			this.start_color = parts[1];
			this.start = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_start_point = function (v) {
		if (v != this.start_point) {
			this._is_empty = false;
			this._bindtype = 0;
			var val = (v) ? v.toString().trim() : "";
			var ptarr = val.split(',');
			this._start_x = (parseInt(ptarr[0]) | 0);
			this._start_y = (parseInt(ptarr[1]) | 0);
			this.start_point = this._start_x + "," + this._start_y;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_start_color = function (v) {
		if (v != this.start_color) {
			this._is_empty = false;
			this._bindtype = 0;
			this.start_color = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_end = function (v) {
		if (v != (this.end_point + " " + this.end_color)) {
			this._is_empty = false;
			this._bindtype = 0;
			var val = (v) ? v.toString().trim() : "";
			var parts = val.split(/\s+/);
			var ptarr = parts[0].split(',');
			this._end_x = (parseInt(ptarr[0]) | 0);
			this._end_y = (parseInt(ptarr[1]) | 0);
			this.end_point = this._end_x + "," + this._end_y;
			this.end_color = parts[1];
			this.end = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_end_point = function (v) {
		if (v != this.end_point) {
			this._is_empty = false;
			this._bindtype = 0;
			var val = (v) ? v.toString().trim() : "";
			var ptarr = val.split(',');
			this._end_x = (parseInt(ptarr[0]) | 0);
			this._end_y = (parseInt(ptarr[1]) | 0);
			this.end_point = this._end_x + "," + this._end_y;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_end_color = function (v) {
		if (v != this.end_color) {
			this._is_empty = false;
			this._bindtype = 0;
			this.end_color = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGradation.set_peglist = function (v) {
		if (v != this.peglist) {
			this._is_empty = false;
			this._bindtype = 0;
			this.peglist = v;
			return this._updateValue();
		}
		return false;
	};

	_pStyleGradation._createRtlValue = function () {
		if (!this._rtlvalue) {
			if (this._start_x != this._end_x) {
				var strValue;
				strValue = this.style + " " + this._end_x + "," + this._start_y + " " + this.start_color + " " + this._start_x + "," + this._end_y + " " + this.end_color;

				this._rtlvalue = strValue;
			}
		}
	};

	_pStyleGradation._getStyleObject = function (bRtl) {
		this._createRtlValue();
		if (bRtl && this._rtlvalue) {
			return nexacro._getCachedGradationObj(this._rtlvalue);
		}
		else {
			return this;
		}
	};

	nexacro._createGradationAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedGradationObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_style = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_style(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_peglist = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_peglist(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_start = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_start(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_start_point = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_start_point(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_start_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_start_color(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_end = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_end(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_end_point = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_end_point(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_end_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_gradation());\n"
			 + "	newobj.set_end_color(v);\n"
			 + "    newobj = nexacro._registerCachedGradationObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_font = function (face, size, bold, italic, underline, strikeout, antialias) {
		this.face = "";
		this.size = 0;
		this.type = "";

		this._default_face = "굴림";
		this._default_size = "9";
		this._default_type = "normal";

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		this._bold = false;
		this._italic = false;
		this._underline = false;
		this._strikeout = false;
		this._antialias = false;


		this._sysvalue = "";
		this._sysdecoration = "";

		if (size != null) {
			this._is_empty = false;
			this._bindtype = 0;
			this.face = face;
			this.size = (parseInt(size) | 0);
			if (bold) {
				this._bold = true;
			}
			if (italic) {
				this._italic = true;
			}
			if (underline) {
				this._underline = true;
			}
			if (strikeout) {
				this._strikeout = true;
			}
			if (antialias) {
				this._antialias = true;
			}
		}
		else if (size == null && (typeof (face) == "string")) {
			var val = face.trim();
			if (val) {
				this._parseInfo(val);
				this._updateValue();
			}
		}
	};
	var _pStyleFont = nexacro._createPrototype(nexacro.Object, nexacro.Style_font);
	nexacro.Style_font.prototype = _pStyleFont;
	_pStyleFont._type_name = "Font";


	_pStyleFont.valueOf = function () {
		return this._value;
	};
	_pStyleFont.toString = function () {
		return this._value;
	};

	_pStyleFont.clone = function () {
		var newobj = new nexacro.Style_font();
		newobj.face = this.face;
		newobj.size = this.size;
		newobj.type = this.type;

		newobj._bold = this._bold;
		newobj._italic = this._italic;
		newobj._underline = this._underline;
		newobj._strikeout = this._strikeout;
		newobj._antialias = this._antialias;

		newobj._sysvalue = this._sysvalue;
		newobj._sysdecoration = this._sysdecoration;

		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleFont._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.face = "";
			this.size = 0;
			this.type = "";
			this._bold = false;
			this._italic = false;
			this._underline = false;
			this._strikeout = false;
			this._antialias = false;

			this._sysvalue = "";
			this._sysdecoration = "";

			return true;
		}
		return false;
	};

	_pStyleFont._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var parts = val.split(/\s+/);
			var part;
			var faces = [], size = 0;
			var webfont_style = true;
			for (var i = 0; i < parts.length && webfont_style; i++) {
				part = parts[i];
				switch (part) {
					case "bold":
						this._bold = true;
						break;
					case "italic":
						this._italic = true;
						break;
					case "underline":
						this._underline = true;
						break;
					case "strikeout":
						this._strikeout = true;
						break;
					case "antialias":
						this._antialias = true;
						break;
					default:
						{

							var intpart = parseInt(part);
							if (intpart != intpart) {
								if (size == 0) {
									webfont_style = false;
								}
								else {
									faces.push(part);
								}
							}
							else {
								size = intpart;
							}
						}
						break;
				}
			}

			if (webfont_style) {
				this.face = (faces.length > 0) ? faces.join(" ") : this._default_face;
				this.size = (size > 0) ? size : this._default_size;
			}
			else {
				var parts = val.split(',');
				if (parts.length >= 2) {
					this.face = parts[0];
					this.size = (parseInt(parts[1]) | 0);
					if (parts[2]) {
						var parts0 = parts[2].split(/\s+/);
						var part;
						for (var i = 0; i < parts0.length; i++) {
							part = parts0[i];
							switch (part) {
								case "bold":
									this._bold = true;
									break;
								case "italic":
									this._italic = true;
									break;
								case "underline":
									this._underline = true;
									break;
								case "strikeout":
									this._strikeout = true;
									break;
								case "antialias":
									this._antialias = true;
									break;
							}
						}
					}
				}
			}
		}
	};

	_pStyleFont._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var arr_type = [];
					if (this._bold) {
						arr_type.push("bold");
						this._bold = true;
					}
					if (this._italic) {
						arr_type.push("italic");
						this._italic = true;
					}
					if (this._underline) {
						arr_type.push("underline");
						this._underline = true;
					}
					if (this._strikeout) {
						arr_type.push("strikeout");
						this._strikeout = true;
					}
					if (this._antialias) {
						arr_type.push("antialias");
						this._antialias = true;
					}

					if (arr_type.length > 0) {
						this.type = arr_type.join(" ");
					}
					else {
						this.type = "";
					}

					arr_type.push(this.size);
					arr_type.push(this.face);

					return arr_type.join(' ');
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleFont._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			if (this._italic || this._bold || this._underline || this._strikeout || this.size) {
				this._sysvalue = (this._italic == true ? "italic " : "") + (this._bold == true ? "bold " : "") + (this.size >= 0 ? this.size + "pt " : Math.abs(this.size) + "px ") + this.face;

				if (this._underline == true) {
					if (this._strikeout == true) {
						this._sysdecoration = "underline line-through";
					}
					else {
						this._sysdecoration = "underline";
					}
				}
				else {
					if (this._strikeout == true) {
						this._sysdecoration = "line-through";
					}
					else {
						this._sysdecoration = "";
					}
				}
			}
			else {
				this._sysvalue = "";
				this._sysdecoration = "";
			}
			this._is_empty = (str == "" || str == 0);
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleFont._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleFont.set_face = function (v) {
		if (v != this.face) {
			this._is_empty = false;
			this._bindtype = 0;
			this.face = v;
			if (!this.size) {
				this.size = this._default_size;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleFont.set_size = function (v) {
		var iv = (parseInt(v) | 0);
		if (iv != this.size) {
			this._is_empty = false;
			this._bindtype = 0;
			this.size = iv;
			if (!this.face) {
				this.face = this._default_face;
			}

			return this._updateValue();
		}
		return false;
	};
	_pStyleFont.set_type = function (v) {
		if (v != this.type) {
			this._is_empty = false;
			this._bindtype = 0;
			var parts0 = v.split(/\s+/);
			var part;
			this._bold = false;
			this._italic = false;
			this._underline = false;
			this._strikeout = false;
			this._antialias = false;

			for (var i = 0; i < parts0.length; i++) {
				part = parts0[i];
				switch (part) {
					case "bold":
						this._bold = true;
						break;
					case "italic":
						this._italic = true;
						break;
					case "underline":
						this._underline = true;
						break;
					case "strikeout":
						this._strikeout = true;
						break;
					case "antialias":
						this._antialias = true;
						break;
				}
			}

			if (!this.size) {
				this.size = this._default_size;
			}
			if (!this.face) {
				this.face = this._default_face;
			}

			return this._updateValue();
		}
		return false;
	};

	nexacro._createFontAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedFontObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_face = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_font());\n"
			 + "	newobj.set_face(v);\n"
			 + "    newobj = nexacro._registerCachedFontObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_size = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_font());\n"
			 + "	newobj.set_size(v);\n"
			 + "    newobj = nexacro._registerCachedFontObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_type = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_font());\n"
			 + "	newobj.set_type(v);\n"
			 + "    newobj = nexacro._registerCachedFontObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};


	nexacro.Style_padding = function (t, r, b, l) {
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
		this.left = 0;

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";
		this._sysvalue = "";

		if (r != null) {
			this._is_empty = false;
			this._bindtype = 0;
			this.top = (parseInt(t) | 0);
			this.right = (parseInt(r) | 0);
			this.bottom = (parseInt(b) | 0);
			this.left = (parseInt(l) | 0);
		}
		else if (t && (typeof (t) == "string")) {
			var val = t.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = val;
				this._sysvalue = str;
			}
		}
	};
	var _pStylePadding = nexacro._createPrototype(nexacro.Object, nexacro.Style_padding);
	nexacro.Style_padding.prototype = _pStylePadding;
	_pStylePadding._type_name = "Padding";


	_pStylePadding.valueOf = function () {
		return this._value;
	};
	_pStylePadding.toString = function () {
		return this._value;
	};

	_pStylePadding.clone = function () {
		var newobj = new nexacro.Style_padding();
		newobj.top = this.top;
		newobj.right = this.right;
		newobj.bottom = this.bottom;
		newobj.left = this.left;
		newobj._is_empty = this._is_empty;
		newobj._sysvalue = this._sysvalue;
		newobj._value = this._value;
		return newobj;
	};

	_pStylePadding._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.top = 0;
			this.right = 0;
			this.bottom = 0;
			this.left = 0;
			this._value = "";
			this._sysvalue = "";
			return true;
		}
		return false;
	};

	_pStylePadding._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				return this.top + " " + this.right + " " + this.bottom + " " + this.left;
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStylePadding._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/\s+/);
			switch (valarr.length) {
				case 1:
					val = (parseInt(valarr[0]) | 0);
					this.top = this.right = this.bottom = this.left = val;
					break;
				case 2:
					val = (parseInt(valarr[0]) | 0);
					this.top = this.bottom = val;
					val = (parseInt(valarr[1]) | 0);
					this.right = this.left = val;
					break;
				case 3:
					val = (parseInt(valarr[0]) | 0);
					this.top = val;
					val = (parseInt(valarr[1]) | 0);
					this.right = this.left = val;
					val = (parseInt(valarr[2]) | 0);
					this.bottom = val;
					break;
				default:
					val = (parseInt(valarr[0]) | 0);
					this.top = val;
					val = (parseInt(valarr[1]) | 0);
					this.right = val;
					val = (parseInt(valarr[2]) | 0);
					this.bottom = val;
					val = (parseInt(valarr[3]) | 0);
					this.left = val;
					break;
			}
		}
	};

	_pStylePadding._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStylePadding._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._sysvalue) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStylePadding._set_value = function () {
		this._value = this.left + " " + this.top + " " + this.right + " " + this.bottom;
	};

	_pStylePadding.set_top = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.top && v >= 0) {
			this._is_empty = false;
			this._bindtype = 0;
			this.top = v;
			this._set_value();
			return this._updateValue();
		}
		return false;
	};
	_pStylePadding.set_right = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.right && v >= 0) {
			this._is_empty = false;
			this._bindtype = 0;
			this.right = v;
			this._set_value();
			return this._updateValue();
		}
		return false;
	};
	_pStylePadding.set_bottom = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.bottom && v >= 0) {
			this._is_empty = false;
			this._bindtype = 0;
			this.bottom = v;
			this._set_value();
			return this._updateValue();
		}
		return false;
	};
	_pStylePadding.set_left = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.left && v >= 0) {
			this._is_empty = false;
			this._bindtype = 0;
			this.left = v;
			this._set_value();
			return this._updateValue();
		}
		return false;
	};

	_pStylePadding._getPaddingWidth = function () {
		return (this._is_empty) ? 0 : (this.left + this.right);
	};
	_pStylePadding._getPaddingHeight = function () {
		return (this._is_empty) ? 0 : (this.top + this.bottom);
	};

	_pStylePadding._createRtlValue = function () {
		if (!this._rtlvalue) {
			if (this.left != this.right) {
				var strValue;
				strValue = this.top + " " + this.left + " " + this.bottom + " " + this.right;

				this._rtlvalue = strValue;
			}
		}
	};

	_pStylePadding._getStyleObject = function (bRtl) {
		this._createRtlValue();
		if (bRtl && this._rtlvalue) {
			return nexacro._getCachedPaddingObj(this._rtlvalue);
		}
		else {
			return this;
		}
	};

	nexacro._createPaddingAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedPaddingObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_top = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_padding());\n"
			 + "	newobj.set_top(v);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_right = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_padding());\n"
			 + "	newobj.set_right(v);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_bottom = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_padding());\n"
			 + "	newobj.set_bottom(v);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_left = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_padding());\n"
			 + "	newobj.set_left(v);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_margin = function (t, r, b, l) {
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
		this.left = 0;

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._sysvalue = "";
		this._value = "";

		if (r != null) {
			this._is_empty = true;
			this._bindtype = 0;
			this.top = t;
			this.right = r;
			this.bottom = b;
			this.left = l;
		}
		else if (t && (typeof (t) == "string")) {
			var val = t.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._sysvalue = str;
				this._value = val;
			}
		}
	};
	var _pStyleMargin = nexacro._createPrototype(nexacro.Object, nexacro.Style_margin);
	nexacro.Style_margin.prototype = _pStyleMargin;
	_pStyleMargin._type_name = "Margin";

	_pStyleMargin.valueOf = function () {
		return this._value;
	};
	_pStyleMargin.toString = function () {
		return this._value;
	};

	_pStyleMargin.clone = function () {
		var newobj = new nexacro.Style_margin();
		newobj.top = this.top;
		newobj.right = this.right;
		newobj.bottom = this.bottom;
		newobj.left = this.left;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		newobj._sysvalue = this._sysvalue;
		return newobj;
	};

	_pStyleMargin._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.top = 0;
			this.right = 0;
			this.bottom = 0;
			this.left = 0;
			this._value = "";
			this._sysvalue = "";
			return true;
		}
		return false;
	};

	_pStyleMargin._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				return this.top + " " + this.right + " " + this.bottom + " " + this.left;
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};
	_pStyleMargin._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/\s+/);
			switch (valarr.length) {
				case 1:
					val = (parseInt(valarr[0]) | 0);
					this.top = this.right = this.bottom = this.left = val;
					break;
				case 2:
					val = (parseInt(valarr[0]) | 0);
					this.top = this.bottom = val;
					val = (parseInt(valarr[1]) | 0);
					this.right = this.left = val;
					break;
				case 3:
					val = (parseInt(valarr[0]) | 0);
					this.top = val;
					val = (parseInt(valarr[1]) | 0);
					this.right = this.left = val;
					val = (parseInt(valarr[2]) | 0);
					this.bottom = val;
					break;
				default:
					val = (parseInt(valarr[0]) | 0);
					this.top = val;
					val = (parseInt(valarr[1]) | 0);
					this.right = val;
					val = (parseInt(valarr[2]) | 0);
					this.bottom = val;
					val = (parseInt(valarr[3]) | 0);
					this.left = val;
					break;
			}
		}
	};

	_pStyleMargin._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._sysvalue) {
			this._is_empty = (str == "");
			this._sysvalue = str;
			return true;
		}
		return false;
	};

	_pStyleMargin._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._sysvalue) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleMargin._getMarginWidth = function () {
		return (this.left + this.right);
	};
	_pStyleMargin._getMarginHeight = function () {
		return (this.top + this.bottom);
	};

	_pStyleMargin.set_top = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.top) {
			this._is_empty = false;
			this._bindtype = 0;
			this.top = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleMargin.set_right = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.right) {
			this._is_empty = false;
			this._bindtype = 0;
			this.right = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleMargin.set_bottom = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.bottom) {
			this._is_empty = false;
			this._bindtype = 0;
			this.bottom = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleMargin.set_left = function (v) {
		v = (parseInt(v) | 0);
		if (v != this.left) {
			this._is_empty = false;
			this._bindtype = 0;
			this.left = v;
			return this._updateValue();
		}
		return false;
	};

	nexacro._createMarginAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedMarginObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_top = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_margin());\n"
			 + "	newobj.set_top(v);\n"
			 + "    newobj = nexacro._registerCachedMarginObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_right = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_margin());\n"
			 + "	newobj.set_right(v);\n"
			 + "    newobj = nexacro._registerCachedMarginObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_bottom = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_margin());\n"
			 + "	newobj.set_bottom(v);\n"
			 + "    newobj = nexacro._registerCachedMarginObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_left = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_margin());\n"
			 + "	newobj.set_left(v);\n"
			 + "    newobj = nexacro._registerCachedMarginObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_shadow = function (type, color, offsetx, offsety, f) {
		this.type = "";
		this.color = "";
		this.offset = "";
		this.factor = 0;

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";
		this._sysvalue = "";
		this._syscolor = "";

		if (color != null) {
			this._is_empty = true;
			this._bindtype = 0;
			this.type = type;
			this.color = color;
			this._offset_x = offsetx;
			this._offset_y = offsety;
			this.offset = this._offset_x + "," + this._offset_y;
			this.factor = f;
		}
		else if (type && (typeof (type) == "string")) {
			var val = type.trim();
			if (val) {
				this._parseInfo(val);
				this._updateValue();
			}
		}
	};
	var _pStyleShadow = nexacro._createPrototype(nexacro.Object, nexacro.Style_shadow);
	nexacro.Style_shadow.prototype = _pStyleShadow;
	_pStyleShadow._type_name = "Shadow";


	_pStyleShadow.valueOf = function () {
		return this._value;
	};
	_pStyleShadow.toString = function () {
		return this._value;
	};

	_pStyleShadow.clone = function () {
		var newobj = new nexacro.Style_shadow();
		newobj.type = this.type;
		newobj.color = this.color;
		newobj.offset = this.offset;
		newobj._offset_x = this._offset_x;
		newobj._offset_y = this._offset_y;
		newobj.factor = this.factor;
		newobj._sysvalue = this._sysvalue;
		newobj._syscolor = this._syscolor;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleShadow._empty = function () {
		if (!this._is_empty) {
			this.type = "";
			this.color = "";
			this.offset = "";
			this._offset_x = 0;
			this._offset_y = 0;
			this.factor = 0;
			this._value = "";
			this._is_empty = true;
			this._bindtype = 0;
			this._sysvalue = "";
			this._syscolor = "";
			return true;
		}
		return false;
	};


	_pStyleShadow._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var str = "";
					str += this.type;
					str += " ";
					this.offset = this._offset_x + "," + this._offset_y;
					str += this.offset;
					str += " ";
					str += this.factor;
					str += " ";
					str += this.color;
					return str;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleShadow._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/\s+/);
			if (valarr.length == 4) {
				if (valarr[0] == "outer") {
					this.type = valarr[0];
				}
				var vals = valarr[1].split(',');
				val = (parseInt(vals[0]) | 0);
				this._offset_x = val;
				if (vals.length > 1) {
					val = (parseInt(vals[1]) | 0);
					this._offset_y = val;
				}
				else {
					this._offset_y = this._offset_x;
				}
				val = (parseInt(valarr[2]) | 0);
				this.factor = val;
				this.color = valarr[3];
			}
		}
	};

	_pStyleShadow._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			if (this.color) {
				var _syscolor = nexacro._getWebColorFromXreColor(this.color);
				this._syscolor = _syscolor;

				this._sysvalue = this._offset_x + "px "
					 + this._offset_y + "px "
					 + this.factor + "px "
					 + _syscolor;
			}
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleShadow._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleShadow.set_type = function (v) {
		if (v != this.type) {
			this._is_empty = false;
			this._bindtype = 0;
			if (v == "outer") {
				this.type = v;
			}
			return this._updateValue();
		}
		return false;
	};
	_pStyleShadow.set_offset = function (v) {
		if (v != this.offset) {
			if (this._is_empty) {
				this.type = "outer";
				this.factor = 0;
				this.color = "gray";
			}
			this._is_empty = false;
			this._bindtype = 0;
			var vals = v.split(',');
			var val = (parseInt(vals[0]) | 0);
			this._offset_x = val;
			if (vals.length > 1) {
				val = (parseInt(vals[1]) | 0);
				this._offset_y = val;
			}
			else {
				this._offset_y = this._offset_x;
			}
			return this._updateValue();
		}
		return false;
	};
	_pStyleShadow.set_factor = function (v) {
		if (v != this.factor) {
			if (this._is_empty) {
				this.type = "outer";
				this._offset_x = this._offset_y = 0;
				this.color = "gray";
			}
			this._is_empty = false;
			this._bindtype = 0;
			var val = (parseInt(v) | 0);
			this.factor = val;
			return this._updateValue();
		}
		return false;
	};
	_pStyleShadow.set_color = function (v) {
		if (v != this.color) {
			if (this._is_empty) {
				this.type = "outer";
				this._offset_x = this._offset_y = 0;
				this.factor = 0;
			}
			this._is_empty = false;
			this._bindtype = 0;
			this.color = v;
			return this._updateValue();
		}
		return false;
	};

	_pStyleShadow._createRtlValue = function () {
		if (!this._rtlvalue) {
			if (this._offset_x != 0) {
				var strValue;
				strValue = this.type + " " + this._offset_x * (-1) + "," + this._offset_y + " " + this.factor + " " + this.color;

				this._rtlvalue = strValue;
			}
		}
	};

	_pStyleShadow._getStyleObject = function (bRtl) {
		this._createRtlValue();
		if (bRtl && this._rtlvalue) {
			return nexacro._getCachedShadowObj(this._rtlvalue);
		}
		else {
			return this;
		}
	};

	nexacro._createShadowAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedShadowObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_type = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_shadow());\n"
			 + "	newobj.set_type(v);\n"
			 + "    newobj = nexacro._registerCachedShadowObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_offset = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_shadow());\n"
			 + "	newobj.set_offset(v);\n"
			 + "    newobj = nexacro._registerCachedShadowObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_factor = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_shadow());\n"
			 + "	newobj.set_factor(v);\n"
			 + "    newobj = nexacro._registerCachedShadowObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_shadow());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedShadowObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};


	nexacro.Style_blur = function (f) {
		this.factor = 0;

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		if (f) {
			this._is_empty = true;
			this._bindtype = 0;
			f = (parseInt(f) | 0);
			this.factor = f;
		}
	};
	var _pStyleBlur = nexacro._createPrototype(nexacro.Object, nexacro.Style_blur);
	nexacro.Style_blur.prototype = _pStyleBlur;
	_pStyleBlur._type_name = "Blur";

	_pStyleBlur.valueOf = function () {
		return this._value;
	};
	_pStyleBlur.toString = function () {
		return this._value;
	};

	_pStyleBlur.clone = function () {
		var newobj = new nexacro.Style_blur();
		newobj.factor = this.factor;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleBlur._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.factor = 0;
			this._value = "";
			return true;
		}
		return false;
	};

	_pStyleBlur._setValueStr = function () {
		var str = "";
		if (this.factor > 0) {
			str = "" + this.factor;
		}
		else {
			str = "";
		}
		return str;
	};

	_pStyleBlur._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var val = (parseInt(v) | 0);
			this.factor = val;
		}
	};

	_pStyleBlur._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleBlur._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleBlur.set_factor = function (v) {
		if (v != this.factor) {
			this._is_empty = false;
			this._bindtype = 0;
			var val = (parseInt(v) | 0);
			this.factor = val;
			return this._updateValue();
		}
		return false;
	};

	nexacro._createBlurAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedBlurObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_factor = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_blur());\n"
			 + "	newobj.set_factor(v);\n"
			 + "    newobj = nexacro._registerCachedBlurObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_glow = function (color, f) {
		this.color = "";
		this.factor = 0;

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		if (f != null) {
			this._is_empty = false;
			this._bindtype = 0;
			this.color = color;
			this.factor = f;
		}
		else if (color && (typeof (color) == "string")) {
			var val = color.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = str;
			}
		}
	};
	var _pStyleGlow = nexacro._createPrototype(nexacro.Object, nexacro.Style_glow);
	nexacro.Style_glow.prototype = _pStyleGlow;
	_pStyleGlow._type_name = "Glow";

	_pStyleGlow.valueOf = function () {
		return this._value;
	};
	_pStyleGlow.toString = function () {
		return this._value;
	};

	_pStyleGlow.clone = function () {
		var newobj = new nexacro.Style_glow();
		newobj.color = this.factor;
		newobj.factor = this.factor;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleGlow._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.color = "";
			this.factor = 0;
			this._value = "";
			return true;
		}
		return false;
	};

	_pStyleGlow._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var str = "";
					if (this.factor > 0) {
						str += this.factor + " " + this.color;
					}
					return str;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleGlow._parseInfo = function (val) {
		var tag = val.substring(0, 4).toUpperCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/\s+/);
			if (valarr.length == 1) {
				val = (parseInt(valarr[0]) | 0);
				this.factor = val;
				this.color = "yellow";
			}
			else {
				val = (parseInt(valarr[0]) | 0);
				this.factor = val;
				this.color = valarr[1];
			}
		}
	};

	_pStyleGlow._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleGlow._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleGlow.set_factor = function (v) {
		if (v != this.factor) {
			if (this._is_empty) {
				this.color = "yellow";
			}
			this._is_empty = false;
			this._bindtype = 0;
			var val = (parseInt(v) | 0);
			this.factor = val;
			return this._updateValue();
		}
		return false;
	};
	_pStyleGlow.set_color = function (v) {
		if (v != this.color._value) {
			if (this._is_empty) {
				this.factor = 0;
			}
			this._is_empty = false;
			this._bindtype = 0;
			this.color = v;
			return this._updateValue();
		}
		return false;
	};

	nexacro._createGlowAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedGlowObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_factor = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_glow());\n"
			 + "	newobj.set_factor(v);\n"
			 + "    newobj = nexacro._registerCachedGlowObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_glow());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedGlowObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};


	nexacro.Style_accessibility = function (role, bflag, desclevel, lab, des, act) {
		this.role = "";
		this.enable = true;
		this.label = "";
		this.description = "";
		this.action = "";
		this.desclevel = "all";

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		if (lab != null) {
			this._is_empty = false;
			this._bindtype = 0;
			this.role = role;
			this.enable = nexacro._toBoolean(bflag);
			this.label = lab;
			this.description = des;
			this.action = act;
			this.desclevel = desclevel;
		}
		else if (role && (typeof (role) == "string")) {
			var val = role.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = str;
			}
		}
	};
	var _pStyleAccessibility = nexacro._createPrototype(nexacro.Object, nexacro.Style_accessibility);
	nexacro.Style_accessibility.prototype = _pStyleAccessibility;
	_pStyleAccessibility._type_name = "Accessibility";

	_pStyleAccessibility.clone = function () {
		var newobj = new nexacro.Style_accessibility();
		newobj.role = this.role;
		newobj.label = this.label;
		newobj.desclevel = this.desclevel;
		newobj.enable = this.enable;
		newobj.description = this.description;
		newobj.action = this.action;

		newobj._role = this._role;
		newobj._label = this._label;
		newobj._description = this._description;
		newobj._action = this._action;
		newobj._value = this._value;
		newobj._convertedValue = this._convertedValue;
		return newobj;
	};

	_pStyleAccessibility.valueOf = function () {
		return this._value;
	};
	_pStyleAccessibility.toString = function () {
		return this._value;
	};

	_pStyleAccessibility._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.role = "";
			this.enable = true;
			this.label = "";
			this.description = "";
			this.action = "";
			this.desclevel = "";
			this._value = "";
			return true;
		}
		return false;
	};

	_pStyleAccessibility._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var str = "";
					if (this.role) {
						str += this.role + " ";
					}
					if (this.enable) {
						str += "enable ";
					}
					else {
						str += "disable ";
					}
					str += this.desclevel + " '" + this.label + "' '" + this.description + "' '" + this.action + "'";
					return str;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleAccessibility._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}

			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/ +/);
			if (valarr.length >= 3) {
				var j = 0;
				var role = valarr[j];
				var isRole = true;
				var n = 0;
				if (role == "enable" || role == "disable") {
					this.role = "";
					isRole = false;
				}
				else {
					this.role = role;
					j++;
					n = 1;
				}
				if (valarr[j++] == "disable") {
					this.enable = false;
				}
				else {
					this.enable = true;
				}
				switch (valarr[j]) {
					case "none":
					case "self":
					case "child":
						this.desclevel = valarr[j];
						break;
					default:
						this.desclevel = "all";
						break;
				}

				if (valarr.length > 2 + n) {
					j++;
					for (var i = j; valarr[i + 1] && (!(valarr[i + 1][0] == "'") || !(valarr[i][valarr[i].length - 1] == "'")); ) {
						valarr[i] = valarr[i].concat(" " + valarr[i + 1]);
						valarr.splice(i + 1, 1);
					}
					if (valarr[i] == valarr[i + 1] && valarr[i] == "'") {
						valarr.splice(i + 1, 1);
						this.label = " ";
					}
					else {
						var len = valarr[j].length - 2;
						this.label = valarr[j].substr(1, len);
					}
				}
				else {
					this.label = "";
				}

				if (valarr.length > 3 + n) {
					j++;
					for (var i = j; valarr[i + 1] && (!(valarr[i + 1][0] == "'") || !(valarr[i][valarr[i].length - 1] == "'")); ) {
						valarr[i] = valarr[i].concat(" " + valarr[i + 1]);
						valarr.splice(i + 1, 1);
					}
					if (valarr[i] == valarr[i + 1] && valarr[i] == "'") {
						valarr.splice(i + 1, 1);
						this.description = " ";
					}
					else {
						var len = valarr[j].length - 2;
						this.description = valarr[j].substr(1, len);
					}
				}
				else if (valarr.length == 4 && !isRole) {
					this.description = valarr[j];
				}
				else {
					this.description = "";
				}

				if (valarr.length > 4 + n) {
					j++;
					for (var i = j; i < valarr.length - 1; ) {
						valarr[i] = valarr[i].concat(" " + valarr[i + 1]);
						valarr.splice(i + 1, 1);
					}
					var len = valarr[j].length - 2;

					if (len < 0) {
						len = 0;
					}
					this.action = valarr[j].substr(1, len);
				}
				else if (valarr.length == 5 && !isRole) {
					this.action = valarr[j];
				}
				else {
					this.action = "";
				}
			}
		}
	};

	_pStyleAccessibility._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._is_empty = (str == "");
			this._value = str;
			return true;
		}
		return false;
	};

	_pStyleAccessibility._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleAccessibility.set_role = function (v) {
		if (this.role != v) {
			this._is_empty = false;
			this._bindtype = 0;
			this.role = v;
			return this._updateValue();
		}
	};
	_pStyleAccessibility.set_enable = function (v) {
		v = (v ? true : false);
		if (v != this.enable) {
			if (this._is_empty) {
				this.desclevel = "all";
			}
			this._is_empty = false;
			this._bindtype = 0;
			this.enable = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleAccessibility.set_desclevel = function (v) {
		if (v != this.desclevel) {
			this._is_empty = false;
			this._bindtype = 0;
			switch (v) {
				case "none":
				case "self":
				case "child":
					this.desclevel = v;
					break;
				default:
					this.desclevel = "all";
					break;
			}
			return this._updateValue();
		}
		return false;
	};
	_pStyleAccessibility.set_label = function (v) {
		if (v != this.label) {
			this._is_empty = false;
			this._bindtype = 0;
			this.label = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleAccessibility.set_description = function (v) {
		if (v != this.description) {
			this._is_empty = false;
			this._bindtype = 0;
			this.description = v;
			return this._updateValue();
		}
		return false;
	};

	_pStyleAccessibility.set_action = function (v) {
		if (v != this.action) {
			this._is_empty = false;
			this._bindtype = 0;
			this.action = v;
			return this._updateValue();
		}
		return false;
	};

	_pStyleAccessibility.apply = function () {
		return false;
	};

	nexacro._createAccessibilityAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "		if (styleobj._setValue(v) && this._target && this._target._control_element)\n"
			 + "			this._target.$CALL$();\n"
			 + "	}\n"
			 + "	else if (styleobj) {\n"
			 + "		this[attr] = null;\n"
			 + "		if (this._target)\n"
			 + "			this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_role = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "	if (styleobj.set_role(v) && this._target && this._target._control_element);\n"
			 + "		this._target.$CALL$();\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_enable = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "	if (styleobj.set_enable(v) && this._target && this._target._control_element);\n"
			 + "		this._target.$CALL$();\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_desclevel = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "	if (styleobj.set_desclevel(v) && this._target && this._target._control_element);\n"
			 + "		this._target.$CALL$();\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_label = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "	if (styleobj.set_label(v) && this._target && this._target._control_element);\n"
			 + "		this._target.$CALL$();\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_description = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "	if (styleobj.set_description(v) && this._target && this._target._control_element);\n"
			 + "		this._target.$CALL$();\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_action = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	if (!styleobj) this.$ATTR$ = styleobj = new nexacro.Style_accessibility();\n"
			 + "	if (styleobj.set_action(v) && this._target && this._target._control_element);\n"
			 + "		this._target.$CALL$();\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};


	nexacro.Style_fillbrush = function (s, color, antialiasing) {
		this.style = "";
		this.color = "";
		this.antialiasing = "";

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		if (color != null) {
			this._is_empty = true;
			this._bindtype = 0;
			this.color = color;
			this.style = s;
			this.antialiasing = antialiasing;
		}
		else if (s && (typeof (s) == "string")) {
			var val = s.trim();
			if (val) {
				this._parseInfo(val);
				var str = this._getValueStr();
				this._is_empty = (str == "");
				if (this.color.length > 0) {
					this._syscolor = nexacro._getWebColorFromXreColor(this.color);
				}
				else {
					this._syscolor = "";
				}
				this._value = str;
			}
		}
	};
	var _pStyleFillbrush = nexacro.Style_fillbrush.prototype = nexacro._createPrototype(nexacro.Object, nexacro.Style_fillbrush);
	_pStyleFillbrush._type_name = "Fillbrush";

	_pStyleFillbrush.valueOf = function () {
		return this._value;
	};
	_pStyleFillbrush.toString = function () {
		return this._value;
	};

	_pStyleFillbrush.clone = function () {
		var newobj = new nexacro.Style_fillbrush();
		newobj.style = this.style;
		newobj.color = this.color;
		newobj.antialiasing = this.antialiasing;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleFillbrush._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.color = "";
			this.style = "";
			this.antialiasing = "";
			this._value = "";
			return true;
		}
		return false;
	};

	_pStyleFillbrush._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var val = "";
					if (this.style) {
						val += this.style + " ";
					}
					if (this.color) {
						val += this.color;
					}
					return val;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleFillbrush._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var linearr = val.trim().split(",");
			if (linearr.length == 0) {
				return;
			}
			if (linearr.length == 1) {
				var valarr = val.trim().split(/\s+/);
				switch (valarr[0]) {
					case "none":
					case "solid":
					case "hatch":
					case "gradation":
						this.style = valarr[0];
				}
				valarr[1] && (this.color = valarr[1]);
				valarr[2] && (this.antialiasing = valarr[2]);
			}
		}
	};
	_pStyleFillbrush._updateValue = function () {
		var str = this._getValueStr();
		if (str != this._value) {
			this._value = str;
			this._is_empty = (str == "");
			if (this.color.length > 0) {
				this._syscolor = nexacro._getWebColorFromXreColor(this.color);
			}
			else {
				this._syscolor = "";
			}
			return true;
		}
		return false;
	};

	_pStyleFillbrush._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};
	_pStyleFillbrush._isValid = function () {
		return (!this._is_empty && this.style && this.style != "none" && this.color && this.color != "transparent");
	};

	_pStyleFillbrush.set_style = function (v) {
		var val = "";
		switch (v) {
			case "none":
			case "solid":
			case "hatch":
			case "gradation":
				val = v;
				break;
		}
		if (val != this.style) {
			this._is_empty = false;
			this._bindtype = 0;
			this.style = val;
			return this._updateValue();
		}
		return false;
	};
	_pStyleFillbrush.set_color = function (v) {
		if (v == "transparent") {
			v = "";
		}
		if (v != this.color) {
			this._is_empty = false;
			this._bindtype = 0;
			this.color = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleFillbrush.set_antialiasing = function (v) {
		if (v != this.antialiasing._value) {
			this._is_empty = false;
			this._bindtype = 0;
			this.antialiasing = v;
			return this._updateValue();
		}
		return false;
	};

	nexacro._createFillbrushAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedFillbrushObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_style = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_fillbrush());\n"
			 + "	newobj.set_style(v);\n"
			 + "    newobj = nexacro._registerCachedFillbrushObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_fillbrush());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedFillbrushObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_antialiasing = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_fillbrush());\n"
			 + "	newobj.set_antialiasing(v);\n"
			 + "    newobj = nexacro._registerCachedFillbrushObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_strokepen = function (w, s, color, antialiasing) {
		this.width = "";
		this.style = "";
		this.color = "";
		this.antialiasing = "";

		this._is_empty = true;
		this._bindtype = 0;
		this._bindexpr = "";
		this._value = "";

		if (s != null) {
			this.width = w;
			this.style = s;
			if (color == "transparent") {
				this.color = "";
			}
			else {
				this.color = color;
			}
			this.antialiasing = antialiasing;
		}
		else if (w && (typeof (w) == "string")) {
			var val = w.trim();
			if (val) {
				this._parseInfo(val);
				if (this.color.length > 0) {
					this._syscolor = nexacro._getWebColorFromXreColor(this.color);
				}
				else {
					this._syscolor = "";
				}
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = str;
			}
		}
	};
	var _pStyleStrokepen = nexacro.Style_strokepen.prototype = nexacro._createPrototype(nexacro.Object, nexacro.Style_strokepen);
	_pStyleStrokepen._type_name = "Strokepen";


	_pStyleStrokepen.valueOf = function () {
		return this._value;
	};
	_pStyleStrokepen.toString = function () {
		return this._value;
	};

	_pStyleStrokepen.clone = function () {
		var newobj = new nexacro.Style_strokepen();
		newobj.width = this.width;
		newobj.style = this.style;
		newobj.color = this.color;
		newobj.antialiasing = this.antialiasing;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleStrokepen._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this._bindtype = 0;
			this.width = "";
			this.style = "";
			this.color = "";
			this.antialiasing = "";
			this._value = "";
			return true;
		}
		return false;
	};
	_pStyleStrokepen._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					var val = "";
					if (this.width) {
						val += this.width + " ";
					}
					if (this.style) {
						val += this.style + " ";
					}
					if (this.color) {
						val += this.color;
					}
					return val;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
	};

	_pStyleStrokepen._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/\s+/);
			var w = (parseInt(valarr[0]) | 0);
			this.width = w;
			this.style = valarr[1];
			this.color = valarr[2];
			this.antialiasing = valarr[3];
		}
	};

	_pStyleStrokepen._updateValue = function () {
		var val = this._getValueStr();
		if (val != this._value) {
			this._value = val;
			if (this.color.length > 0) {
				this._syscolor = nexacro._getWebColorFromXreColor(this.color);
			}
			else {
				this._syscolor = "";
			}
			return true;
		}
		return false;
	};

	_pStyleStrokepen._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleStrokepen._isValid = function () {
		return (!this._is_empty && this.style && this.style != "none" && this.color && this.color != "transparent");
	};


	_pStyleStrokepen.set_width = function (v) {
		var val = (parseInt(v) | 0);
		if (val != this.width) {
			this._is_empty = false;
			this.width = val;
			return this._updateValue();
		}
		return false;
	};

	_pStyleStrokepen.set_style = function (v) {
		var val = "";
		switch (v) {
			case "none":
			case "solid":
			case "dashdot":
			case "dotted":
			case "dashdotdot":
			case "dashed":
				val = v;
				break;
		}
		if (val != this.style) {
			this._is_empty = false;
			this._bindtype = 0;
			this.style = val;
			return this._updateValue();
		}
		return false;
	};

	_pStyleStrokepen.set_color = function (v) {
		if (v == "transparent") {
			v = "";
		}
		if (v != this.color) {
			this._is_empty = false;
			this._bindtype = 0;
			this.color = v;
			return this._updateValue();
		}
		return false;
	};

	_pStyleStrokepen.set_antialiasing = function (v) {
		if (v != this.antialiasing._value) {
			this._is_empty = false;
			this._bindtype = 0;
			this.antialiasing = v;
			return this._updateValue();
		}
		return false;
	};

	nexacro._createStrokepenAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedStrokepenObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_width = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_strokepen());\n"
			 + "	newobj.set_width(v);\n"
			 + "    newobj = nexacro._registerCachedStrokepenObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_style = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_strokepen());\n"
			 + "	newobj.set_style(v);\n"
			 + "    newobj = nexacro._registerCachedStrokepenObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_strokepen());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedStrokepenObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_antialiasing = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_strokepen());\n"
			 + "	newobj.set_antialiasing(v);\n"
			 + "    newobj = nexacro._registerCachedStrokepenObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro.Style_hatch = function (s, color) {
		this.color = "";
		this.style = "";

		this._is_empty = true;
		this._value = "";
		this._bindtype = 0;
		this._bindexpr = "";

		if (color != null) {
			this._is_empty = false;
			this._bindtype = 0;
			if (color == "transparent") {
				this.color = "";
			}
			else {
				this.color = color;
			}
			this.style = s;
		}
		else if (s && (typeof (s) == "string")) {
			var val = s.trim();
			if (val) {
				this._parseInfo(val);
				if (this.color.length > 0) {
					this._syscolor = nexacro._getWebColorFromXreColor(this.color);
				}
				else {
					this._syscolor = "";
				}
				var str = this._getValueStr();
				this._is_empty = (str == "");
				this._value = str;
			}
		}
	};
	var _pStyleHatch = nexacro.Style_hatch.prototype = nexacro._createPrototype(nexacro.Object, nexacro.Style_hatch);
	_pStyleHatch._type_name = "Hatch";

	_pStyleHatch.valueOf = function () {
		return this._value;
	};
	_pStyleHatch.toString = function () {
		return this._value;
	};

	_pStyleHatch.clone = function () {
		var newobj = new nexacro.Style_hatch();
		newobj.color = this.color;
		newobj.style = this.style;
		newobj._is_empty = this._is_empty;
		newobj._value = this._value;
		return newobj;
	};

	_pStyleHatch._empty = function () {
		if (!this._is_empty) {
			this.color = "";
			this.style = "";
			this._value = "";
			this._is_empty = true;
			this._bindtype = 0;
			return true;
		}
		return false;
	};

	_pStyleHatch._getValueStr = function () {
		switch (this._bindtype) {
			case 0:
				{

					if (this.style) {
						val += this.style + " ";
						if (this.color) {
							val += this.color;
						}
					}
					return val;
				}
			case 1:
				return "bind:" + this._bindexpr;
			case 2:
				return "expr:" + this._bindexpr;
		}
		return "";
		var val = "";
	};

	_pStyleHatch._parseInfo = function (val) {
		var tag = val.substring(0, 4).toLowerCase();
		if (tag == "expr" || tag == "bind") {
			if (tag == "bind") {
				this._bindtype = 1;
			}
			else {
				this._bindtype = 2;
			}
			var expr = val.substring(4).trim();
			if (expr.charAt(0) == '(') {
				this._bindexpr = expr.substr(1, expr.length - 2);
			}
			else {
				this._bindexpr = expr.substring(1);
			}
		}
		else {
			var valarr = val.split(/\s+/);
			switch (valarr[0]) {
				case "none":
				case "horizontal":
				case "vertical":
				case "leftrightdiagonal":
				case "rightleftdiagonal":
				case "cross":
				case "xcross":
				case "lightdense":
				case "heavydense":
					this.style = valarr[0];
					break;
				default:
					this.style = "";
					break;
			}
			this.color = valarr[1];
		}
	};
	_pStyleHatch._updateValue = function () {
		var val = this._getValueStr();

		if (val != this._value) {
			this._value = val;
			if (this.color.length > 0) {
				this._syscolor = nexacro._getWebColorFromXreColor(this.color);
			}
			else {
				this._syscolor = "";
			}
			return true;
		}
		return false;
	};

	_pStyleHatch._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyleHatch.set_color = function (v) {
		if (v == "transparent") {
			v = "";
		}
		if (v != this.color) {
			this._is_empty = false;
			this._bindtype = 0;
			this.color = v;
			return this._updateValue();
		}
		return false;
	};
	_pStyleHatch.set_style = function (v) {
		var val = "";
		switch (v) {
			case "horizontal":
			case "vertical":
			case "leftrightdiagonal":
			case "rightleftdiagonal":
			case "cross":
			case "xcross":
			case "lightdense":
			case "heavydense":
				val = v;
				break;
			default:
				val = "horizontal";
				break;
		}
		if (val != this.style) {
			this._is_empty = false;
			this._bindtype = 0;
			this.style = val;
			return this._updateValue();
		}
		return false;
	};

	nexacro._createHatchAttributeEvalStr = function (ptype_id, attr_id) {
		var callback_id = "on_update_style_" + attr_id;
		var str = "$PTYPE$.set_$ATTR$ = function (v) {\n"
			 + "	var oldobj = this.$ATTR$;\n"
			 + "	if (v) {\n"
			 + "		var styleobj = nexacro._getCachedHatchObj(v);\n"
			 + "        if (oldobj != styleobj) {\n"
			 + "		    this.$ATTR$ = styleobj;\n"
			 + "            if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	    }\n"
			 + "	}\n"
			 + "	else if (oldobj) {\n"
			 + "		this.$ATTR$ = null;\n"
			 + "		if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "	}\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_style = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_hatch());\n"
			 + "	newobj.set_style(v);\n"
			 + "    newobj = nexacro._registerCachedHatchObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n"
			 + "$PTYPE$.set_$ATTR$_color = function (v) {\n"
			 + "	var styleobj = this.$ATTR$;\n"
			 + "	var newobj = styleobj ? styleobj.clone() : (new nexacro.Style_hatch());\n"
			 + "	newobj.set_color(v);\n"
			 + "    newobj = nexacro._registerCachedHatchObj(newobj);\n"
			 + "    if (newobj != styleobj) {\n"
			 + "		this.$ATTR$ = newobj;\n"
			 + "        if (this._target && this._target._control_element) this._target.$CALL$();\n"
			 + "    }\n"
			 + "};\n";
		return str.replace(/\$PTYPE\$/g, ptype_id).replace(/\$ATTR\$/g, attr_id).replace(/\$CALL\$/g, callback_id);
	};

	nexacro._style_caches = {
	};
	nexacro._getCachedStyleObj = function (type, val) {
		var type_cache = nexacro._style_caches[type];
		if (!type_cache) {
			nexacro._style_caches[type] = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			switch (type) {
				case "background":
					obj = new nexacro.Style_background(val);
					break;
				case "border":
					obj = new nexacro.Style_border(val);
					break;
				case "bordertype":
					obj = new nexacro.Style_bordertype(val);
					break;
				case "gradation":
					obj = new nexacro.Style_gradation(val);
					break;
				case "font":
					obj = new nexacro.Style_font(val);
					break;
				case "color":
					obj = new nexacro.Style_color(val);
					break;
				case "align":
					obj = new nexacro.Style_align(val);
					break;
				case "margin":
					obj = new nexacro.Style_margin(val);
					break;
				case "padding":
					obj = new nexacro.Style_padding(val);
					break;
				case "line":
					obj = new nexacro.Style_line(val);
					break;
				case "fillbrush":
					obj = new nexacro.Style_fillbrush(val);
					break;
				case "strokepen":
					obj = new nexacro.Style_strokepen(val);
					break;
				case "hatch":
					obj = new nexacro.Style_hatch(val);
					break;
				case "pointcolor":
					obj = new nexacro.Style_pointColor(val);
					break;
				case "shadow":
					obj = new nexacro.Style_shadow(val);
					break;
				case "blur":
					obj = new nexacro.Style_blur(val);
					break;
				case "glow":
					obj = new nexacro.Style_glow(val);
					break;
				case "accessibility":
					obj = new nexacro.Style_accessibility(val);
					return obj;
					break;
				default:
					obj = new nexacro.Style_value(val);
			}

			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};

	nexacro._getCachedBackgroundObj = function (val) {
		var type_cache = nexacro._style_caches.background;
		if (!type_cache) {
			nexacro._style_caches.background = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_background(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedBackgroundObj = function (obj) {
		var type_cache = nexacro._style_caches.background;
		if (!type_cache) {
			nexacro._style_caches.background = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedBorderObj = function (val) {
		var type_cache = nexacro._style_caches.border;
		if (!type_cache) {
			nexacro._style_caches.border = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_border(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedBorderObj = function (obj) {
		var type_cache = nexacro._style_caches.border;
		if (!type_cache) {
			nexacro._style_caches.border = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedBordertypeObj = function (val) {
		var type_cache = nexacro._style_caches.bordertype;
		if (!type_cache) {
			nexacro._style_caches.bordertype = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_bordertype(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._sysvalue];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._sysvalue] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedBordertypeObj = function (obj) {
		var type_cache = nexacro._style_caches.bordertype;
		if (!type_cache) {
			nexacro._style_caches.bordertype = type_cache = {
			};
			type_cache[obj._sysvalue] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._sysvalue];
		if (!cacheobj) {
			type_cache[obj._sysvalue] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedGradationObj = function (val) {
		var type_cache = nexacro._style_caches.gradation;
		if (!type_cache) {
			nexacro._style_caches.gradation = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_gradation(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedGradationObj = function (obj) {
		var type_cache = nexacro._style_caches.gradation;
		if (!type_cache) {
			nexacro._style_caches.gradation = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedFontObj = function (val) {
		var type_cache = nexacro._style_caches.font;
		if (!type_cache) {
			nexacro._style_caches.font = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_font(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedFontObj = function (obj) {
		var type_cache = nexacro._style_caches.font;
		if (!type_cache) {
			nexacro._style_caches.font = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedColorObj = function (val) {
		var type_cache = nexacro._style_caches.color;
		if (!type_cache) {
			nexacro._style_caches.color = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_color(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedColorObj = function (obj) {
		var type_cache = nexacro._style_caches.color;
		if (!type_cache) {
			nexacro._style_caches.color = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedAlignObj = function (val) {
		var type_cache = nexacro._style_caches.align;
		if (!type_cache) {
			nexacro._style_caches.align = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_align(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedAlignObj = function (obj) {
		var type_cache = nexacro._style_caches.align;
		if (!type_cache) {
			nexacro._style_caches.align = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedMarginObj = function (val) {
		var type_cache = nexacro._style_caches.margin;
		if (!type_cache) {
			nexacro._style_caches.margin = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_margin(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedMarginObj = function (obj) {
		var type_cache = nexacro._style_caches.margin;
		if (!type_cache) {
			nexacro._style_caches.margin = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedPaddingObj = function (val) {
		var type_cache = nexacro._style_caches.padding;
		if (!type_cache) {
			nexacro._style_caches.padding = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_padding(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedPaddingObj = function (obj) {
		var type_cache = nexacro._style_caches.padding;
		if (!type_cache) {
			nexacro._style_caches.padding = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedLineObj = function (val) {
		var type_cache = nexacro._style_caches.line;
		if (!type_cache) {
			nexacro._style_caches.line = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_line(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedLineObj = function (obj) {
		var type_cache = nexacro._style_caches.line;
		if (!type_cache) {
			nexacro._style_caches.line = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedGlowObj = function (val) {
		var type_cache = nexacro._style_caches.glow;
		if (!type_cache) {
			nexacro._style_caches.glow = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_glow(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedGlowObj = function (obj) {
		var type_cache = nexacro._style_caches.glow;
		if (!type_cache) {
			nexacro._style_caches.glow = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedBlurObj = function (val) {
		var type_cache = nexacro._style_caches.blur;
		if (!type_cache) {
			nexacro._style_caches.blur = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_blur(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedBlurObj = function (obj) {
		var type_cache = nexacro._style_caches.blur;
		if (!type_cache) {
			nexacro._style_caches.blur = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedShadowObj = function (val) {
		var type_cache = nexacro._style_caches.shadow;
		if (!type_cache) {
			nexacro._style_caches.shadow = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_shadow(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._sysvalue != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedShadowObj = function (obj) {
		var type_cache = nexacro._style_caches.shadow;
		if (!type_cache) {
			nexacro._style_caches.shadow = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedFillbrushObj = function (val) {
		var type_cache = nexacro._style_caches.fillbrush;
		if (!type_cache) {
			nexacro._style_caches.fillbrush = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_fillbrush(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedFillbrushObj = function (obj) {
		var type_cache = nexacro._style_caches.fillbrush;
		if (!type_cache) {
			nexacro._style_caches.fillbrush = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedStrokepenObj = function (val) {
		var type_cache = nexacro._style_caches.stroke;
		if (!type_cache) {
			nexacro._style_caches.stroke = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_strokepen(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedStrokepenObj = function (obj) {
		var type_cache = nexacro._style_caches.stroke;
		if (!type_cache) {
			nexacro._style_caches.stroke = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedHatchObj = function (val) {
		var type_cache = nexacro._style_caches.hatch;
		if (!type_cache) {
			nexacro._style_caches.hatch = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_hatch(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedHatchObj = function (obj) {
		var type_cache = nexacro._style_caches.hatch;
		if (!type_cache) {
			nexacro._style_caches.hatch = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedAccessibilityObj = function (val) {
		var type_cache = nexacro._style_caches.accessibility;
		if (!type_cache) {
			nexacro._style_caches.accessibility = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_accessibility(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedAccessibilityObj = function (obj) {
		var type_cache = nexacro._style_caches.accessibility;
		if (!type_cache) {
			nexacro._style_caches.accessibility = type_cache = {
			};
			type_cache[obj._value] = obj;
			return obj;
		}
		var cacheobj = type_cache[obj._value];
		if (!cacheobj) {
			type_cache[obj._value] = obj;
			return obj;
		}
		return cacheobj;
	};

	nexacro._getCachedValueObj = function (val) {
		var type_cache = nexacro._style_caches.value;
		if (!type_cache) {
			nexacro._style_caches.value = type_cache = {
			};
		}
		var obj = type_cache[val];
		if (!obj) {
			obj = new nexacro.Style_value(val);
			if (obj._bindtype != 0) {
				return obj;
			}

			if (obj._value != val) {
				var cacheobj = type_cache[obj._value];
				if (cacheobj) {
					type_cache[val] = cacheobj;
					return cacheobj;
				}
				type_cache[obj._value] = obj;
				type_cache[val] = obj;
				return obj;
			}
			else {
				type_cache[val] = obj;
				return obj;
			}
		}
		return obj;
	};
	nexacro._registerCachedValueObj = function (v, obj) {
		var type_cache = nexacro._style_caches.value;
		if (!type_cache) {
			nexacro._style_caches.value = type_cache = {
			};
			type_cache[v] = obj;
			if (v != obj._value) {
				type_cache[obj._value] = obj;
			}
			return obj;
		}
		var cacheobj = type_cache[v];
		if (!cacheobj) {
			if (v == obj._value) {
				type_cache[obj._value] = obj;
				return obj;
			}
			cacheobj = type_cache[obj._value];
			if (!cacheobj) {
				type_cache[v] = obj;
				type_cache[obj._value] = obj;
				return obj;
			}
			type_cache[v] = cacheobj;
			return cacheobj;
		}
		return cacheobj;
	};

	nexacro.Style = function (target) {
		this._target = target || null;
	};
	var _pStyle = nexacro._createPrototype(nexacro.Object, nexacro.Style);
	nexacro.Style.prototype = _pStyle;

	_pStyle.accessibility = null;
	_pStyle.bordertype = null;
	_pStyle.border = null;
	_pStyle.background = null;
	_pStyle.gradation = null;
	_pStyle.margin = null;
	_pStyle.padding = null;
	_pStyle.cursor = null;
	_pStyle.opacity = null;
	_pStyle.shadow = null;
	_pStyle.align = null;
	_pStyle.font = null;
	_pStyle.color = null;
	_pStyle.letterspace = null;
	_pStyle._value = "";
	_pStyle.rtlimagemirroring = null;
	_pStyle._rtlvalue = "";

	eval(nexacro._createAccessibilityAttributeEvalStr("_pStyle", "accessibility"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pStyle", "bordertype"));
	eval(nexacro._createBorderAttributeEvalStr("_pStyle", "border"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pStyle", "background"));
	eval(nexacro._createGradationAttributeEvalStr("_pStyle", "gradation"));
	eval(nexacro._createMarginAttributeEvalStr("_pStyle", "margin"));
	eval(nexacro._createPaddingAttributeEvalStr("_pStyle", "padding"));
	eval(nexacro._createValueAttributeEvalStr("_pStyle", "cursor"));
	eval(nexacro._createValueAttributeEvalStr("_pStyle", "opacity"));
	eval(nexacro._createShadowAttributeEvalStr("_pStyle", "shadow"));
	eval(nexacro._createAlignAttributeEvalStr("_pStyle", "align"));
	eval(nexacro._createFontAttributeEvalStr("_pStyle", "font"));
	eval(nexacro._createColorAttributeEvalStr("_pStyle", "color"));
	eval(nexacro._createValueAttributeEvalStr("_pStyle", "rtlimagemirroring"));
	eval(nexacro._createValueAttributeEvalStr("_pStyle", "letterspace"));

	_pStyle._use_NC_border = true;
	_pStyle._use_NC_padding = true;




	_pStyle.__custom_emptyObject = function () {
	};
	_pStyle._empty = function () {
		if (!this._is_empty) {
			this._is_empty = true;
			this.accessibility = null;
			this.bordertype = null;
			this.border = null;
			this.background = null;
			this.gradation = null;
			this.margin = null;
			this.padding = null;
			this.cursor = null;
			this.opacity = null;
			this.shadow = null;
			this.align = null;
			this.font = null;
			this.color = null;
			this.letterspace = null;
			this.__custom_emptyObject();
			return true;
		}
		return false;
	};

	_pStyle.destroy = function () {
		this._empty();
		this._target = null;
	};

	_pStyle.__get_custom_style_value = function () {
		return "";
	};

	_pStyle._getValueStr = function () {
		var val = "";
		if (!this._is_empty) {
			if (this.bordertype && !this.bordertype._is_empty) {
				val += "bordertype:" + this.bordertype._value + "; ";
			}
			if (this.border && !this.border._is_empty) {
				val += "border:" + this.border._value + "; ";
			}
			if (this.background && !this.background._is_empty) {
				val += "background:" + this.background._value + "; ";
			}
			if (this.gradation && !this.gradation._is_empty) {
				val += "gradation:" + this.gradation._value + "; ";
			}
			if (this.margin && !this.margin._is_empty) {
				val += "margin:" + this.margin._value + "; ";
			}
			if (this.padding && !this.padding._is_empty) {
				val += "padding:" + this.padding._value + "; ";
			}
			if (this.cursor && !this.cursor._is_empty) {
				val += "cursor:" + this.cursor._value + "; ";
			}
			if (this.opacity && !this.opacity._is_empty) {
				val += "opacity:" + this.opacity._value + "; ";
			}
			if (this.shadow && !this.shadow._is_empty) {
				val += "shadow:" + this.shadow._value + "; ";
			}
			if (this.align && !this.align._is_empty) {
				val += "align:" + this.align._value + "; ";
			}
			if (this.font && !this.font._is_empty) {
				val += "font:" + this.font._value + "; ";
			}
			if (this.color && !this.color._is_empty) {
				val += "color:" + this.color._value + "; ";
			}
			if (this.accessibility && !this.accessibility._is_empty) {
				val += "accessibility:" + this.accessibility._value + "; ";
			}
			if (this.rtlimagemirroring && !this.rtlimagemirroring._is_empty) {
				val += "rtlimagemirroring:" + this.rtlimagemirroring._value + "; ";
			}
			if (this.letterspace && !this.letterspace._is_empty) {
				val += "letterspace:" + this.letterspace._value + "; ";
			}
			val += this.__get_custom_style_value();
			val = val.trim();
		}
		return val;
	};

	_pStyle._parseInfo = function (val) {
		var linearr = val.split(";");
		var propname1, propval1;
		for (var i = 0; i < linearr.length; i++) {
			var tmpstr = linearr[i];
			var idx = tmpstr.indexOf(":");
			propname = tmpstr.substring(0, idx).trim();
			propval = tmpstr.substring(idx + 1).trim();

			if (propname && propval) {
				var getFn = this["set_" + propname];
				if (getFn) {
					getFn.call(this, propval);
				}
			}
		}
	};

	_pStyle._updateValue = function () {
		var val = this._getValueStr();
		if (val != this._value) {
			this._is_empty = (val == "");
			this._value = val;
		}
		return this._value;
	};

	_pStyle._setValue = function (v) {
		if (v && typeof (v) == "string") {
			var val = v.trim();
			if (val != this._value) {
				if (val) {
					this._parseInfo(val);
					return this._updateValue();
				}
				else {
					return this._empty();
				}
			}
			return false;
		}
		return this._empty();
	};

	_pStyle.getStyleValue = function (stylePropID, pseudo) {
		var obj;
		if (pseudo == "normal") {
			obj = this._target.style[stylePropID];
		}
		else {
			obj = this._target._styles[pseudo];
		}
		return obj ? obj.toString() : undefined;
	};


	_pStyle.setStyleValue = function (stylePropID, pseudo, value) {
		var retval = false;

		if (!stylePropID || !pseudo || !value) {
			return false;
		}

		if (pseudo == "normal") {
			var fn = this["set_" + stylePropID];
			if (fn) {
				eval("this.set_" + stylePropID + "(value)");
			}
			return true;
		}
		else {
			var styleType = this._find_styleType(stylePropID);
			switch (styleType) {
				case 0:
					retval = this._setAlignPseudoStyle(stylePropID, pseudo, value);
					break;
				case 1:
					retval = this._setBackgroundPseudoStyle(stylePropID, pseudo, value);
					break;
				case 2:
					retval = this._setBorderPseudoStyle(stylePropID, pseudo, value);
					break;
				case 3:
					retval = this._setBordertypePseudoStyle(stylePropID, pseudo, value);
					break;
				case 4:
					retval = this._setColorPseudoStyle(stylePropID, pseudo, value);
					break;
				case 5:
					retval = this._setCursorPseudoStyle(stylePropID, pseudo, value);
					break;
				case 6:
					retval = this._setFontPseudoStyle(stylePropID, pseudo, value);
					break;
				case 7:
					retval = this._setGlowPseudoStyle(stylePropID, pseudo, value);
					break;
				case 8:
					retval = this._setGradationPseudoStyle(stylePropID, pseudo, value);
					break;
				case 9:
					retval = this._setMarginPseudoStyle(stylePropID, pseudo, value);
					break;
				case 10:
					retval = this._setOpacityPseudoStyle(stylePropID, pseudo, value);
					break;
				case 11:
					retval = this._setPaddingPseudoStyle(stylePropID, pseudo, value);
					break;
				case 12:
					retval = this._setShadowPseudoStyle(stylePropID, pseudo, value);
					break;
				case 13:
					retval = this._setAccessibilityPseudoStyle(stylePropID, pseudo, value);
					break;
				default:
					return retval;
			}
		}
		return retval;
	};

	_pStyle._find_styleType = function (stylePropID) {
		var retval = -1;

		if (stylePropID.indexOf("align") >= 0) {
			retval = 0;
		}
		else if (stylePropID.indexOf("background") >= 0) {
			retval = 1;
		}
		else if (stylePropID.indexOf("bordertype") >= 0) {
			retval = 3;
		}
		else if (stylePropID.indexOf("border") >= 0) {
			retval = 2;
		}
		else if (stylePropID.indexOf("color") >= 0) {
			retval = 4;
		}
		else if (stylePropID.indexOf("cursor") >= 0) {
			retval = 5;
		}
		else if (stylePropID.indexOf("font") >= 0) {
			retval = 6;
		}
		else if (stylePropID.indexOf("glow") >= 0) {
			retval = 7;
		}
		else if (stylePropID.indexOf("gradation") >= 0) {
			retval = 8;
		}
		else if (stylePropID.indexOf("margin") >= 0) {
			retval = 9;
		}
		else if (stylePropID.indexOf("opacity") >= 0) {
			retval = 10;
		}
		else if (stylePropID.indexOf("padding") >= 0) {
			retval = 11;
		}
		else if (stylePropID.indexOf("shadow") >= 0) {
			retval = 12;
		}
		else if (stylePropID.indexOf("accessibility") >= 0) {
			retval = 13;
		}

		return retval;
	};
	_pStyle._setAlignPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}

		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedAlignObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedAlignObj(value);
			comp._styles[pseudo] = newStyle;
		}
		if (!obj) {
			return false;
		}
		return true;
	};
	_pStyle._setBackgroundPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedBackgroundObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedBackgroundObj(value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setBorderPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedBorderObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedBorderObj(value);
			comp._styles[pseudo] = newStyle;
		}
		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setBordertypePseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}

		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedBordertypeObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedBordertypeObj(value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setColorPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedColorObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedColorObj(value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setCursorPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedStyleObj("cursor", value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedStyleObj("cursor", value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setFontPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedFontObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedFontObj(value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setGlowPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedGlowObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedGlowObj(value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setGradationPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedGradationObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedGradationObj(value);
			comp._styles[pseudo] = newStyle;
		}
		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setMarginPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedMarginObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedMarginObj(value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setOpacityPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedStyleObj("opacity", value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedStyleObj("opacity", value);
			comp._styles[pseudo] = newStyle;
		}

		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setPaddingPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedPaddingObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedPaddingObj(value);
			comp._styles[pseudo] = newStyle;
		}
		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setShadowPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedShadowObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedShadowObj(value);
			comp._styles[pseudo] = newStyle;
		}
		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle._setAccessibilityPseudoStyle = function (stylePropID, pseudo, value) {
		var obj = null;
		var comp = this._target;
		if (!comp) {
			return false;
		}
		if (comp._styles[pseudo]) {
			obj = comp._styles[pseudo][stylePropID] = nexacro._getCachedAccessibilityObj(value);
		}
		else {
			var newStyle = comp.on_create_custom_style();
			obj = newStyle[stylePropID] = nexacro._getCachedAccessibilityObj(value);
			comp._styles[pseudo] = newStyle;
		}
		if (!obj) {
			return false;
		}
		return true;
	};

	_pStyle.set_glow = function (v) {
	};
	_pStyle.set_blur = function (v) {
	};

	delete _pStyle;

	nexacro.CurrentStyle = function () {
	};
	var _pCurrentStyle = nexacro._createPrototype(nexacro.Object, nexacro.CurrentStyle);
	nexacro.CurrentStyle.prototype = _pCurrentStyle;

	_pCurrentStyle.accessibility = null;
	_pCurrentStyle.bordertype = null;
	_pCurrentStyle.border = null;
	_pCurrentStyle.background = null;
	_pCurrentStyle.gradation = null;
	_pCurrentStyle.margin = null;
	_pCurrentStyle.padding = null;
	_pCurrentStyle.cursor = null;
	_pCurrentStyle.opacity = null;
	_pCurrentStyle.shadow = null;
	_pCurrentStyle.align = null;
	_pCurrentStyle.font = null;
	_pCurrentStyle.color = null;
	_pCurrentStyle.rtlimagemirroring = null;
	_pCurrentStyle.letterspace = null;
	_pCurrentStyle._value = "";
	_pCurrentStyle._rtlvalue = "";

	_pCurrentStyle.__get_custom_style_value = function () {
		return "";
	};


	_pCurrentStyle.getStyleValue = function (stylePropID) {
		return this[stylePropID] ? this[stylePropID]._value : undefined;
	};
	_pCurrentStyle.__custom_emptyObject = function () {
	};

	_pCurrentStyle._empty = function () {
		this._is_empty = true;
		this.accessibility = null;
		this.bordertype = null;
		this.border = null;
		this.background = null;
		this.gradation = null;
		this.margin = null;
		this.padding = null;
		this.cursor = null;
		this.opacity = null;
		this.shadow = null;
		this.align = null;
		this.font = null;
		this.letterspace = null;
		this.color = null;
		this.__custom_emptyObject();

		return true;
	};

	nexacro._cloneStyleObject = function (oldObject) {
		var tempClone = {
		}, prop;

		if (typeof (oldObject) == "object") {
			for (prop in oldObject) {
				if (prop != "_target") {
					var propVal = oldObject[prop];
					if (propVal == null) {
						tempClone[prop] = null;
					}
					else {
						if (typeof (propVal) == "object") {
							if (propVal._is_array) {
								tempClone[prop] = nexacro._cloneStyleArray(oldObject[prop]);
							}
							else if (propVal.__is_selector) {
								tempClone[prop] = nexacro._cloneStyleObject(propVal);
							}
							else {
								tempClone[prop] = propVal;
							}
						}
						else {
							tempClone[prop] = propVal;
						}
					}
				}
			}
		}
		return tempClone;
	};
	nexacro._cloneStyleArray = function (oldArray) {
		var tempClone = [];
		for (var idx = 0, cnt = oldArray.length; idx <= cnt; idx++) {
			var propVal = oldArray[idx];
			if (typeof (propVal) == "object") {
				if (propVal._is_array) {
					tempClone.push(nexacro._cloneStyleArray(oldObject[prop]));
				}
				else if (propVal._is_selector) {
					tempClone.push(nexacro._cloneStyleObject(propVal));
				}
				else {
					tempClone.push(propVal);
				}
			}
			else {
				tempClone.push(propVal);
			}
		}
		return tempClone;
	};

	nexacro._bInitCssObjects = true;
}
