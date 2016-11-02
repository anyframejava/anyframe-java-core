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

if (!nexacro.Static) {
	nexacro.Static_Style = function (target) {
		nexacro.Style.call(this);

		if (target) {
			this._target = target;
		}
		this.linespace = null;
	};
	var _pStaticStyle = nexacro._createPrototype(nexacro.Style, nexacro.Static_Style);
	nexacro.Static_Style.prototype = _pStaticStyle;

	eval(nexacro._createValueAttributeEvalStr("_pStaticStyle", "linespace"));

	_pStaticStyle.__custom_emptyObject = function () {
		this.linespace = null;
	};

	_pStaticStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.linespace && this.linespace._is_empty) {
			val += "linespace:" + this.linespace._value + "; ";
		}
		return val;
	};

	nexacro.Static_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.linespace = null;
	};

	var _pStaticCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Static_CurrentStyle);
	nexacro.Static_CurrentStyle.prototype = _pStaticCurrentStyle;

	_pStaticCurrentStyle.__custom_emptyObject = _pStaticStyle.__custom_emptyObject;
	_pStaticCurrentStyle.__get_custom_style_value = _pStaticStyle.__get_custom_style_value;

	delete _pStaticStyle;
	delete _pStaticCurrentStyle;


	nexacro.Static = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.text = "";
		this.expr = null;
		this.wordwrap = "none";
		this.usedecorate = false;
		this.tabstop = false;

		this._text = "";
		this._expr = null;
		this._text_elem = null;
		this._decorate_text = "";
		this._decorate_link_url = "";
		this._is_focus_accept = false;
		this._accessibility_role = "static";
	};

	var _pStatic = nexacro._createPrototype(nexacro.Component, nexacro.Static);
	nexacro.Static.prototype = _pStatic;
	_pStatic._type_name = "Static";

	_pStatic.on_apply_custom_pseudo = function (pseudo) {
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
		if (align != curstyle.align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var linespace = this.on_find_CurrentStyle_linespace(pseudo);
		if (linespace != curstyle.linespace) {
			curstyle.linespace = linespace;
			this.on_apply_style_linespace(linespace);
		}
	};

	_pStatic.on_apply_style_color = function (color) {
		if (this._text_elem) {
			if (color) {
				this._text_elem.setElementColor(color);
			}
			else {
				var color = new nexacro.Style_color("");
				this._text_elem.setElementColor(color);
				color = null;
			}
		}
	};

	_pStatic.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
		}
	};

	_pStatic.on_apply_style_align = function (align) {
		if (this._text_elem && align) {
			var halign = align.halign == "" ? "center" : align._halign;
			var valign = align.valign == "" ? "middle" : align._valign;
			this._text_elem.setElementAlignXY(halign, valign);
		}
	};

	_pStatic.on_apply_style_linespace = function (v) {
		var text_elem = this._text_elem;
		if (text_elem) {
			var lineHeight = v ? v : 0;
			var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);

			var font_size = nexacro._getTextSize2(letterspace, "Wj", this.on_find_CurrentStyle_font(this._pseudo));
			var linespace = font_size[1] + nexacro._toInt(lineHeight);
			if (this._adjust_height < linespace) {
				lineHeight = (this._adjust_height > font_size[1]) ? (this._adjust_height - font_size[1]) : 0;
			}

			text_elem.setElementLineSpace(lineHeight);
		}
	};

	_pStatic.on_find_CurrentStyle_linespace = function (pseudo) {
		return this._find_pseudo_obj("linespace", pseudo);
	};

	_pStatic.on_update_style_padding = function () {
		var padding = this.currentstyle.padding = this.on_find_CurrentStyle_padding(this._pseudo);
		this._control_element.setElementPadding(padding);
		this._updateClientSize(this._control_element);
	};

	_pStatic.on_update_style_linespace = function () {
		this.on_apply_style_linespace(this.currentstyle.linespace = this.on_find_CurrentStyle_linespace(this._pseudo));
	};

	_pStatic.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem && this.text) {
			var text_elem = new nexacro.TextBoxElement(control_elem);
			var halign = "left";
			var valign = "middle";
			var style_align = this.currentstyle.align;
			if (style_align) {
				halign = style_align.halign == "" ? "center" : style_align._halign;
				valign = style_align.valign == "" ? "middle" : style_align._valign;
			}
			this._text_elem = text_elem;
			text_elem.setElementSize(this._client_width, this._client_height);
			text_elem.setElementColor(this.currentstyle.color);
			text_elem.setElementFont(this.currentstyle.font);
			text_elem.setElementAlignXY(halign, valign);
			text_elem.setElementLetterSpace(this.currentstyle.letterspace);
			text_elem = null;
		}
		else if (control_elem && !this.text && this._text_elem) {
			this._text_elem.setParentElement(control_elem);
		}
	};

	_pStatic.on_created_contents = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create();
		}
		if (this.expr) {
			this.on_apply_expr();
		}
		this.on_apply_wordwrap();
		this.on_apply_style_linespace(this.currentstyle.linespace);

		this.on_apply_prop_rtldirection();
	};

	_pStatic.on_destroy_contents = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}
		text_elem = null;
	};

	_pStatic.on_change_containerRect = function (width, height) {
		var text_elem = this._text_elem;
		var align = this.on_find_CurrentStyle_align(this._pseudo);
		if (this._text_elem) {
			text_elem.setElementSize(width, height);
			this.on_apply_style_align(align);
		}
	};

	_pStatic.on_create_custom_style = function () {
		return new nexacro.Static_Style(this);
	};

	_pStatic.on_create_custom_currentStyle = function () {
		return new nexacro.Static_CurrentStyle();
	};

	_pStatic.on_apply_text = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem;

			if (text_elem && this.usedecorate && (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) && this._is_created) {
				this._text_elem.destroy();
				this._text_elem = null;
				delete this._text_elem;
				text_elem = null;
			}

			if (!text_elem) {
				var text_elem = new nexacro.TextBoxElement(this.getElement());
				var halign = "left";
				var valign = "middle";
				var style_align = this.currentstyle.align;
				if (style_align) {
					halign = style_align.halign == "" ? "center" : style_align._halign;
					valign = style_align.valign == "" ? "middle" : style_align._valign;
				}
				this._text_elem = text_elem;
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);

				if (this._is_created) {
					text_elem.create();
				}

				this.on_apply_wordwrap();
				this.on_apply_style_linespace(this.currentstyle.linespace);
			}

			var val = this.text;
			var expr = this.expr;

			val = nexacro._toString(val);
			if (val && val.indexOf("\r") != -1) {
				val = val.replace(/\r/g, "");
			}

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
						val = nexacro._toString(exprfn.call(null, this));
						this.displaytext = this._parse_decoratetext(val);
					}
					catch (e) {
						return;
					}
				}
			}
			else {
				this.displaytext = this._parse_decoratetext(val);
			}

			if (this.usedecorate) {
				text_elem.setElementDecorateText(val);
			}
			else {
				text_elem.decoration = "";
				text_elem.setElementText(this.displaytext);
			}
			this._refreshAccessibilityValue();
		}
	};

	_pStatic.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pStatic.set_usedecorate = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.usedecorate) {
			this.usedecorate = v;
			this.on_apply_usedecorate();
		}
	};

	_pStatic.on_apply_usedecorate = function () {
		this.on_apply_text();
		this.on_apply_wordwrap();
	};

	_pStatic.set_wordwrap = function (v) {
		if (v != this.wordwrap) {
			this.wordwrap = v;
			this.on_apply_wordwrap();
		}
	};

	_pStatic.on_apply_wordwrap = function () {
		if (this._text_elem) {
			this._text_elem.setElementWordWrap(this.wordwrap);
		}
	};

	_pStatic.set_linespace = function (v) {
		v = nexacro._toInt(v);

		if (v && v != this.linespace) {
			this.linespace = v;
			this.on_apply_linespace();
		}
	};
	_pStatic.on_apply_linespace = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			var lineHeight = (this.linespace < 0) ? "" : this.linespace + "px";
			text_elem.setElementLineSpace(lineHeight);
		}
	};


	_pStatic.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var width = this._client_width;
		var height = this._client_height;
		this.on_change_containerRect(width, height);
	};

	_pStatic.on_get_prop_tabstop = function () {
		if (nexacro._enableaccessibility) {
			var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
			if (accessibility && accessibility.enable && accessibility.role == "link") {
				return true;
			}
		}
		return false;
	};

	_pStatic._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pStatic.on_get_style_accessibility_label = function () {
		if (this.usedecorate) {
			return this.displaytext;
		}
		else {
			return this.text;
		}
	};



	_pStatic._getUrl = function () {
		var text_elem = this._text_elem;
		if (text_elem && this.usedecorate) {
			var v = text_elem.decoration;
			if (v != this._decorate_text) {
				this._decorate_text = v;
				var len = v ? v.length : 0;
				var val = "";
				for (var i = 0; i < len; i++) {
					var c = v.charAt(i);
					if (c == '<' && v.charAt(i + 1) == 'l') {
						var quote_idx = 0;
						for (var j = i + 4; j < len; j++) {
							var ch = v.charAt(j);
							if (ch == '\'') {
								if (quote_idx != 0 && quote_idx != j) {
									break;
								}

								quote_idx = j;
								continue;
							}

							if (quote_idx != 0) {
								val += ch;
							}
						}

						break;
					}
				}

				this._decorate_link_url = val;
			}

			return this._decorate_link_url;
		}

		return "";
	};

	_pStatic._parse_decoratetext = function (text) {
		var strtemp = text;

		if (this.usedecorate) {
			var expPrefixMap = [/<\/?ff\s+[v]\s*=\'.*?>/g, /<\/?fs\s+[v]\s*=\'.*?>/g, /<\/?fc\s+[v]\s*=\'.*?>/g, /<\/?b\s+[v].*?>/g, /<\/?i\s+[v].*?>/g, /<\/?u\s+[v].*?>/g, /<\/?s\s+[v].*?>/g, /<\/?l\s+[v].*?>/g];
			var expSufixMap = [/<\/ff>/g, /<\/fs>/g, /<\/fc>/g, /<\/b>/g, /<\/i>/g, /<\/u>/g, /<\/s>/g, /<\/l>/g];
			for (var i = 0; i <= expPrefixMap.length - 1; i++) {
				var idx = 0;
				var preexp = expPrefixMap[i];
				var sufexp = expSufixMap[i];
				var preexec = preexp.exec(strtemp);

				while (preexec) {
					var sufexec = sufexp.exec(strtemp);
					var startidx = preexec.index;
					var endidx = sufexp.lastIndex;

					var frontstr = strtemp.substring(0, startidx);
					var endstr = strtemp.substring(endidx, strtemp.length);
					var changestr = strtemp.substring(startidx, endidx);

					changestr = changestr.replace(preexec[0], "");
					if (sufexec[0]) {
						changestr = changestr.replace(sufexec[0], "");
					}

					strtemp = frontstr + changestr + endstr;

					preexp.lastIndex = 0;
					sufexp.lastIndex = 0;
					preexec = preexp.exec(strtemp);
				}
			}
		}

		return strtemp;
	};

	delete _pStatic;

	nexacro.StaticCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Static.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pStaticCtrl = nexacro.StaticCtrl.prototype = nexacro._createPrototype(nexacro.Static, nexacro.StaticCtrl);
	_pStaticCtrl._type_name = "StaticControl";

	nexacro._setForControlStyleFinder(_pStaticCtrl);

	delete _pStaticCtrl;
}
